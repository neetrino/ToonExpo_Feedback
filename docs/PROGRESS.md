# Прогресс — ToonExpo Feedback

**Проект.** ToonExpo Feedback
**Фаза.** Реализация MVP
**Общий прогресс.** 85%

**Обновлено.** 2026-09-10

---

## Сводка

| Фаза | Статус | Прогресс |
|------|--------|----------|
| 1. Документы и TECH_CARD | ✅ Готово | 100% |
| 2. Scaffold + качество | ✅ Готово | 100% |
| 3. MVP формы + Neon | 🔄 В работе | 90% |
| 4. Google Sheets sync | 🔄 Код готов, webhook не задеплоен | 70% |
| 5. Дизайн / домен / релиз | ⏳ Ждёт секретов и деплоя | 40% |

---

## Сделано

- [x] Размер A, стек Next.js 16 + Prisma 7 + next-intl (`hy` / `ru`)
- [x] Схема `FeedbackSubmission` и код записи в Neon
- [x] Лендинг, формы Visited / Missed, страница «спасибо»
- [x] `POST /api/feedback`, honeypot, origin check
- [x] Маппинг в Sheet + cron `/api/cron/sheets-sync`
- [x] Apps Script: `docs/apps-script/Code.gs`
- [x] Vitest: Zod-ветки и колонки Sheet
- [x] CI quality + migrate-on-deploy workflow
- [x] Применить миграцию на **dev** Neon
- [ ] Задеплоить Apps Script и прописать webhook в env
- [ ] Прод: Vercel, домен, `DIRECT_URL` в GitHub Secrets

---

## В работе

Локальная проверка форм и миграция на dev Neon. Прод-деплой и Sheet webhook — после секретов.

**Блокеры.**

- [ ] Apps Script Web App ещё не задеплоен (URL + secret не в env)
- [ ] Production `DIRECT_URL` только в CI, не на ноутбуке

---

## Заметки

### 2026-09-10

- Админки не будет; серверный слой всё равно нужен.
- Sheet не в критическом пути.
- Дизайн опирается на Registration, но без градиента и проще.
- Языки: hy + ru. Контакты: firstName, lastName, phone, email.
- Вход: две карточки → Visited / Missed.
- Sheet: Apps Script webhook, не service account.
- Код приложения написан. Webhook и прод-env остаются за человеком.

---

## Ссылки

- Анкета: [`Ֆիդբեքի հարցաշար այցելուներին.md`](./Ֆիդբեքի%20հարցաշար%20այցելուներին.md)
- Референс UI: https://github.com/neetrino/ToonExpo_Registration
- Sheet: https://docs.google.com/spreadsheets/d/1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY/edit?usp=sharing
- Прод-домен: https://feedback.toonexpo.com
- Webhook: [`apps-script/Code.gs`](./apps-script/Code.gs)

**Следующее обновление.** После локальной миграции и проверки форм.
