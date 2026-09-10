# ToonExpo Feedback

Публичная форма обратной связи **TOON EXPO · INVEST 2026**. Интерфейс на армянском и русском. Ответы и контакты пишутся в Neon и копируются в Google Sheet. Админки нет.

Сайт: `feedback.toonexpo.com`

Документы: [`docs/BRIEF.md`](docs/BRIEF.md) · [`docs/TECH_CARD.md`](docs/TECH_CARD.md) · [`docs/01-ARCHITECTURE.md`](docs/01-ARCHITECTURE.md) · [`docs/GOOGLE-SHEETS.md`](docs/GOOGLE-SHEETS.md)

---

## Статус

Сейчас только документация и контракт env. Приложения (Next.js / Prisma schema) ещё нет — не начинаем код, пока TECH_CARD не утверждён и не закрыты открытые вопросы.

Размер проекта: **A**.

---

## Когда код появится

```bash
pnpm install
cp .env.example .env   # только dev Neon, не production
pnpm dev
```

Планируемые проверки: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.

Прод-миграции — из CI (`prisma migrate deploy`), не с ноутбука и не на старте приложения.

---

## Окружение

См. [`.env.example`](.env.example). Нужны:

- `DATABASE_URL` — Neon **dev** (pooled)
- `SHEETS_WEBHOOK_URL` + `SHEETS_WEBHOOK_SECRET` — Apps Script в той же таблице (без Google Cloud)
- `CRON_SECRET` — для догона Sheet

Не подключаем в v1: Redis, Resend, R2, Auth.

---

## Правила репозитория

Шаблон стандартов Cursor остаётся в `.cursor/rules/` и `.agents/`. Это продуктовый репозиторий, не инструкция «как пользоваться шаблоном».
