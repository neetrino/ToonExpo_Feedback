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

- Лендинг и две формы с условными полями
- `POST` только на сервере (секреты не в браузере)
- Outbox-статус синхронизации Sheet + cron-повтор
- Минимальная антибот-защита без Redis и без капчи

### Роли

- **Респондент.** Открывает `feedback.toonexpo.com`, выбирает тип визита, отправляет форму.
- **Команда ToonExpo.** Смотрит Sheet (и при необходимости Neon). Вход в приложение не нужен.

---

## Высокоуровневая схема

```
Респондент
    │
    ▼
┌─────────────────────────────┐
│  Next.js на Vercel          │
│  /  /visited  /missed       │
│  POST /api/feedback         │
└─────────────┬───────────────┘
              │ 1. Zod validate
              │ 2. INSERT Neon (sheet_sync = pending)
              │ 3. HTTP 200 → страница «спасибо»
              │ 4. after() / cron: append Sheet
              ▼
     ┌────────────────┐     ┌─────────────────────┐
     │ Neon PostgreSQL│     │ Google Sheets API   │
     │ (источник)     │────▶│ Visited | Missed    │
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
    page.tsx                 # выбор: был / не был
    visited/page.tsx
    missed/page.tsx
    thanks/page.tsx
    api/feedback/route.ts    # POST
    api/cron/sheets-sync/route.ts
    api/health/route.ts
  components/                # UI формы, шкалы 1–10, чекбоксы
  lib/
    db.ts
    feedback-schema.ts       # Zod
    sheets.ts
    logger.ts
  types/
prisma/
  schema.prisma
docs/
```

| Папка | Назначение |
|-------|------------|
| `src/app/` | Страницы и API |
| `src/components/` | UI |
| `src/lib/` | БД, Sheets, валидация |
| `src/types/` | Общие типы |
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
5. Ответ клиенту 201/200
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
| `answers` | jsonb | Нормализованные ключи вопросов |
| `locale` | text | Когда будет известен язык |
| `sheetSyncStatus` | `pending` \| `synced` \| `failed` | |
| `sheetSyncedAt` | timestamptz? | |
| `sheetError` | text? | Коротко, без секретов |
| `createdAt` | timestamptz | |

Контактные колонки не закладываем, пока клиент не попросит.

Индекс: `(sheetSyncStatus, createdAt)` для cron. Индекс по `createdAt` для выборок.

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
| Google Sheets | Копия для команды | [`GOOGLE-SHEETS.md`](./GOOGLE-SHEETS.md) |
| ToonExpo Registration | Только логотип и палитра | [репозиторий](https://github.com/neetrino/ToonExpo_Registration) |

Нет: Resend, Dexatel, R2, Redis, Auth.js, Mootq.

---

## Безопасность

- HTTPS, свой origin
- Секреты только в env (БД, Google JSON/key, cron)
- Валидация Zod, лимиты строк
- Honeypot-поле, скрытое от людей
- Не логировать полный текст ответов и ключи
- Service account — **Editor** только на эту таблицу, не Viewer и не «anyone can edit»

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
| Sheet | API + service account, после БД | Публичная ссылка не пишет; Sheet может подождать |
| Антибот | Honeypot + валидация | Без сложной капчи |
| Auth | Нет | Админки нет |

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
