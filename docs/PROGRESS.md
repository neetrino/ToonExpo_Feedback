# Прогресс — ToonExpo Feedback

**Проект.** ToonExpo Feedback
**Фаза.** Документация / онбординг
**Общий прогресс.** 15%

**Обновлено.** 2026-09-10

---

## Сводка

| Фаза | Статус | Прогресс |
|------|--------|----------|
| 1. Документы и TECH_CARD | 🔄 В работе | 80% |
| 2. Scaffold + качество | ⏳ Ждёт утверждения | 0% |
| 3. MVP формы + Neon | ⏳ Ждёт | 0% |
| 4. Google Sheets sync | ⏳ Ждёт | 0% |
| 5. Дизайн / домен / релиз | ⏳ Ждёт | 0% |

Код приложения не начат специально.

---

## Сделано

### Фаза 1. Онбординг

- [x] Разобрана анкета (две аудитории, условные поля)
- [x] Зафиксирован размер A
- [x] Заполнен `docs/BRIEF.md`
- [x] Черновик `docs/TECH_CARD.md`
- [x] `docs/01-ARCHITECTURE.md`
- [x] `docs/GOOGLE-SHEETS.md`
- [x] `docs/DECISIONS.md`
- [x] Проектный `README.md`
- [x] `.env.example` под этот продукт
- [ ] Подтверждение TECH_CARD владельцем
- [x] Клиент: языки `hy` + `ru`, без English
- [x] Клиент: собираем имя, фамилию, телефон, email
- [ ] Ок на вход «был / не был»
- [ ] Ок на лимиты БД 4.4–4.7
- [ ] Service account Editor на таблицу

---

## В работе

Подтверждение решений. Реализация не стартует.

**Блокеры.** См. ниже.

---

## Следующие задачи (после «можно писать код»)

### Приоритет 1

1. Scaffold Next.js 16 + pnpm + Tailwind + Prisma (Size A)
2. CI quality + migrate-on-deploy (GitHub Actions → Vercel)
3. Схема `FeedbackSubmission` и локальная миграция на **dev** Neon
4. Формы Visited / Missed + Zod
5. POST: запись в Neon, ответ пользователю, затем Sheet
6. Cron догона Sheet
7. UI: логотип, плоский бренд без градиента
8. Домен `feedback.toonexpo.com`

### Позже

- Playwright smoke
- Vercel Analytics — по желанию

---

## Блокеры

### Критичные для кода

- [x] Структура Sheet: листы Visited / Missed и заголовки
- [ ] **Sheet webhook.** Apps Script webhook заведём вместе с кодом

### Не критично

- [ ] Точный текст страницы «спасибо»
- [ ] noindex vs обычное SEO
- [ ] Создать листы `Visited` / `Missed` заранее или в коде

---

## Заметки

### 2026-09-10

- Админки не будет; серверный слой всё равно нужен.
- Sheet не в критическом пути.
- Дизайн опирается на Registration, но без градиента и проще.
- Языки: hy + ru. Контакты: firstName, lastName, phone, email.
- Вход: две карточки → Visited / Missed.
- Sheet: Apps Script webhook, не service account.
- 2026-09-10: в Google Sheet созданы листы Visited / Missed и заголовки.

---

## Ссылки

- Анкета: [`Ֆիդբեքի հարցաշար այցելուներին.md`](./Ֆիդբեքի%20հարցաշար%20այցելուներին.md)
- Референс UI: https://github.com/neetrino/ToonExpo_Registration
- Sheet: https://docs.google.com/spreadsheets/d/1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY/edit?usp=sharing
- Прод-домен: https://feedback.toonexpo.com

**Следующее обновление.** После ответов клиента и подтверждения TECH_CARD.
