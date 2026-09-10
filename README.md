# ToonExpo Feedback

Публичная форма обратной связи **TOON EXPO · INVEST 2026**. Интерфейс на армянском и русском. Ответы пишутся в Neon, затем копия уходит в Google Sheet. Админки нет.

Сайт: `feedback.toonexpo.com`

Документы: [`docs/BRIEF.md`](docs/BRIEF.md) · [`docs/TECH_CARD.md`](docs/TECH_CARD.md) · [`docs/01-ARCHITECTURE.md`](docs/01-ARCHITECTURE.md) · [`docs/GOOGLE-SHEETS.md`](docs/GOOGLE-SHEETS.md)

---

## Локальный запуск

Нужны Node 24 и pnpm 11. В `.env` только **dev** Neon, не production.

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

Открыть `http://localhost:3000` — редирект на `/hy`.

Проверки:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Прод-миграции — из GitHub Actions (`pnpm db:migrate:deploy`), не с ноутбука и не на старте приложения.

---

## Окружение

См. [`.env.example`](.env.example). Нужны:

- `DATABASE_URL` — Neon **dev** (pooled)
- `DIRECT_URL` — Neon **dev** (для `prisma migrate`)
- `SHEETS_WEBHOOK_URL` + `SHEETS_WEBHOOK_SECRET` — после деплоя Apps Script
- `CRON_SECRET` — для догона Sheet; на Vercel тот же секрет уходит как `Authorization: Bearer`

Не подключаем в v1: Redis, Resend, R2, Auth.

Sheet webhook: вставить [`docs/apps-script/Code.gs`](docs/apps-script/Code.gs) в таблицу, задеплоить Web App, затем прописать URL и секрет в Vercel.

---

## Правила репозитория

Шаблон стандартов Cursor остаётся в `.cursor/rules/` и `.agents/`. Это продуктовый репозиторий, не инструкция «как пользоваться шаблоном».
