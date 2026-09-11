# Архитектура — ToonExpo Feedback

Публичная форма обратной связи: ответ сразу в Neon, строка в Google Sheet догоняется асинхронно. Админки нет.

**Размер.** A
**Обновлено.** 2026-09-10

---

## Назначение

Собрать ответы двух анкет TOON EXPO · INVEST 2026 и сохранить их так, чтобы:

- человек увидел «спасибо» сразу после записи в БД;
- команда читала те же данные в [Google Sheet](https://docs.google.com/spreadsheets/d/1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY/edit?usp=sharing);
- сайт оставался лёгким при рассылке ~2000 ссылок.

### Возможности

- Лендинг и две формы с условными полями (`/hy`, `/ru`)
- `POST` только на сервере (секреты не в браузере)
- Outbox-статус синхронизации Sheet + cron-повтор
- Минимальная антибот-защита без Redis и без капчи

### Роли

- **Респондент.** Открывает `feedback.toonexpo.com` (по умолчанию `/hy`), при необходимости переключает на русский, выбирает тип визита, отправляет форму.
- **Команда ToonExpo.** Смотрит Sheet (и при необходимости Neon). Вход в приложение не нужен.

---

## Высокоуровневая схема

```
Респондент
    │
    ▼
┌─────────────────────────────┐
│  Next.js на Vercel          │
│  /hy /ru + /visited /missed │
│  POST /api/feedback         │
└─────────────┬───────────────┘
              │ 1. Zod validate
              │ 2. INSERT Neon (sheet_sync = pending)
              │ 3. HTTP 201 → страница «спасибо»
              │ 4. after() / cron: append Sheet
              ▼
     ┌────────────────┐     ┌─────────────────────┐
     │ Neon PostgreSQL│     │ Apps Script webhook │
     │ (источник)     │────▶│ Այցելել են | Չեն այցելել │
     └────────────────┘     └─────────────────────┘
```

**Стиль.** Модульный монолит Next.js (serverless). Отдельный NestJS и Redis не нужны: один продукт, одна запись, одна интеграция.

---

## Компоненты

### Frontend

- Next.js 16 App Router, React 19, Tailwind 4, shadcn/ui
- Расположение: `src/app`, `src/components`
- Статика формы + клиент только для условных полей и submit
- Без градиентов; палитра и логотип как у ToonExpo Registration

### Backend

- Route Handler `POST /api/feedback` и server-only модули в `src/lib`
- Zod на входе, Prisma на запись
- Google Sheets — отдельный модуль, вызывается после успешного INSERT

### База

- PostgreSQL 17 на Neon, Prisma 7
- Одна таблица ответов с JSON ответов + статус синка Sheet

### Кэш / брокер

- Нет. Повтор Sheet — cron по строкам `pending` / `failed`.

---

## Структура (Size A)

```
src/
  app/
    [locale]/
      page.tsx               # выбор: был / не был
      visited/page.tsx
      missed/page.tsx
      thanks/page.tsx
    api/feedback/route.ts    # POST
    api/cron/sheets-sync/route.ts
    api/health/route.ts
  components/
  lib/
    db.ts
    feedback-schema.ts
    sheets.ts
    logger.ts
  types/
messages/
  hy.json
  ru.json
prisma/
  schema.prisma
docs/
```

| Папка | Назначение |
|-------|------------|
| `src/app/[locale]/` | Страницы hy/ru |
| `src/app/api/` | POST и cron |
| `src/components/` | UI |
| `src/lib/` | БД, Sheets, валидация |
| `messages/` | Каталоги `hy.json`, `ru.json` |
| `prisma/` | Схема и миграции |

Feature-папок Size B нет.

---

## Потоки данных

### Отправка формы

```
1. Браузер → POST /api/feedback  (audience + answers + honeypot)
2. Если honeypot заполнен → тихо 204 / фейковый успех, в БД не писать
3. Zod: audience, обязательные поля, условные поля, лимиты длины
4. INSERT FeedbackSubmission (sheetSyncStatus = pending)
5. Ответ клиенту 201 (honeypot — 204, без тела)
6. После ответа: попытка append в нужный лист Sheet
7. Успех → synced + timestamp; ошибка → failed + короткий код ошибки
8. Cron (например */10 * * * *) повторяет pending/failed, секрет CRON_SECRET
```

Пользователь не ждёт Google. Если Sheet лежит — ответ уже в Neon.

### Аутентификация

Нет. Cron: заголовок `Authorization: Bearer ${CRON_SECRET}`.

---

## Модель данных

### Сущность

| Сущность | Назначение |
|----------|------------|
| FeedbackSubmission | Один ответ одной анкеты |

Предлагаемые поля (код позже):

| Поле | Тип | Заметка |
|------|-----|---------|
| `id` | uuid | |
| `audience` | `VISITED` \| `MISSED` | Какая анкета |
| `answers` | jsonb | ключи вопросов, без PII |
| `locale` | `hy` \| `ru` | язык, на котором отправили |
| `sheetSyncStatus` | `pending` \| `synced` \| `failed` | |
| `sheetSyncedAt` | timestamptz? | |
| `sheetError` | text? | коротко, без секретов и без PII |
| `createdAt` | timestamptz | |

Индекс: `(sheetSyncStatus, createdAt)` для cron. Индекс по `createdAt`.

Идемпотентность v1: достаточно honeypot + UX disable кнопки. Ключ идемпотентности можно добавить, если клиент даст персональную ссылку.

### Условная логика (из анкеты)

**Visited**

- Q3 property — если в Q2 выбраны жильё / инвест РА / зарубежка / коммерция
- Q3 B2B — если в Q2 выбран B2B
- Текстовые поля — от выбранного пункта dropdown
- Q4 1–6 → поле «что улучшить»
- Q6 отдельные тексты для «ещё не решил» / «скорее нет» / «нет»

**Missed**

- Q1 «Другое» → текст
- Q2 / Q5 «Другое» → текст
- Q4 тексты для трёх негативных/неопределённых вариантов

Оба Q3 у посетителей могут быть скрыты, если цели не про недвижимость и не B2B.

---

## Интеграции

| Сервис | Зачем | Документ |
|--------|-------|----------|
| Neon | Хранение ответов | этот файл, TECH_CARD §4 |
| Google Sheets | Копия для команды через Apps Script webhook | [`GOOGLE-SHEETS.md`](./GOOGLE-SHEETS.md) |
| ToonExpo Registration | Только логотип и палитра | [репозиторий](https://github.com/neetrino/ToonExpo_Registration) |

Нет: Resend, Dexatel, R2, Redis, Auth.js, Mootq.

---

## Безопасность

- HTTPS, свой origin
- Секреты только в env (БД, Google JSON/key, cron)
- Валидация Zod: ответы, лимиты строк
- Honeypot-поле, скрытое от людей
- Не логировать ответы и ключи целиком
- Webhook Apps Script и его секрет только в env, не в браузере
- Таблицу не делать «anyone with the link can edit»

---

## Деплой

| Среда | URL | Назначение |
|-------|-----|------------|
| Local | http://localhost:3000 | Dev Neon |
| Production | https://feedback.toonexpo.com | Vercel + prod Neon |

Порядок релиза: коммит → CI проверки → `prisma migrate deploy` (`DIRECT_URL` в CI) → Vercel promote. Миграции не из ноутбука и не на старте приложения.

---

## Нагрузка (Size A, запас)

Ожидание: рассылка ~2000, заполняемость неизвестна, сильного пика не ждут.

Запас без усложнения:

- Сначала короткий INSERT в Neon (pooled URL)
- Sheet не в критическом пути
- Cron редкий, чтобы не держать Neon awake зря (как флаги cron у Registration)
- Без Redis / очередей / NestJS

---

## Ключевые решения

| Решение | Выбор | Почему |
|---------|--------|--------|
| Размер | A | Одна форма, нет админки |
| Хост | Vercel + Next.js | Подтверждено, как Registration |
| БД | Neon + Prisma | Уже есть, стандарт |
| Sheet | Apps Script webhook после БД | Без Cloud API; URL webhook = секрет |
| Вход | Две карточки → `/visited` или `/missed` | Одна рассылка или два разных URL |
| Антибот | Honeypot + валидация | Без сложной капчи |
| Auth | Нет | Админки нет |
| i18n | `hy`, `ru` | Английский не нужен |
| Контакты | не собираем | Решение владельца 2026-09-10 |

---

## Связанные документы

- [`BRIEF.md`](./BRIEF.md)
- [`TECH_CARD.md`](./TECH_CARD.md)
- [`GOOGLE-SHEETS.md`](./GOOGLE-SHEETS.md)
- [`DECISIONS.md`](./DECISIONS.md)
- [`PROGRESS.md`](./PROGRESS.md)
- [`Ֆիդբեքի հարցաշար այցելուներին.md`](./Ֆիդբեքի%20հարցաշար%20այցելուներին.md)

**Версия.** 1.0
**Дата.** 2026-09-10
