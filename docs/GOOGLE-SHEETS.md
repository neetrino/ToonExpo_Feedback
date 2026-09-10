# Google Sheets — доступ и колонки

Таблица: [ToonExpo_Feedback](https://docs.google.com/spreadsheets/d/1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY/edit?usp=sharing)

Spreadsheet ID: `1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY`

Сейчас лист пустой. Публичная ссылка «посмотреть» **не даёт** серверу писать строки.

---

## Какой доступ нужен

| Кому | Роль | Зачем |
|------|------|--------|
| Люди команды | Editor или Viewer | Смотреть ответы |
| **Service account** приложения | **Редактор (Editor)** | Добавлять строки через API |
| «Все, у кого есть ссылка» | лучше убрать edit | Иначе любой сможет портить таблицу |

Viewer у бота недостаточно — append не пройдёт.
Owner боту не нужен.
Публичный «anyone with the link can edit» не используем.

Публичный **просмотр** можно оставить, если так удобнее заказчику. Для записи он не используется.

---

## Что сделать один раз (без кода)

1. [Google Cloud Console](https://console.cloud.google.com/) — проект (новый или существующий).
2. Включить **Google Sheets API**.
3. IAM → Service Accounts → Create (имя например `toonexpo-feedback`).
4. У аккаунта будет email вида `toonexpo-feedback@PROJECT.iam.gserviceaccount.com`.
5. Keys → Add key → JSON. Файл **не коммитить**. Значения — в Vercel / локальный `.env`.
6. Открыть таблицу → **Настройки доступа** → вставить email сервис-аккаунта → роль **Редактор**.
7. В env (когда начнём код):

```text
GOOGLE_SHEETS_SPREADSHEET_ID="1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY"
GOOGLE_SERVICE_ACCOUNT_EMAIL="...@....iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

JSON-ключ целиком в репозиторий не кладём.

Пока ключа нет — интеграцию Sheet в коде не подключаем. Схему колонок ниже можно создать руками в таблице заранее.

---

## Листы

Два листа в одной таблице (создадим при реализации или можно создать сейчас):

| Лист | Анкета |
|------|--------|
| `Visited` | Был на выставке |
| `Missed` | Зарегистрирован, не пришёл |

Первая строка — заголовки. Новые ответы — append снизу.

---

## Колонки `Visited`

| Колонка | Смысл |
|---------|--------|
| `submitted_at` | Время (ISO) |
| `id` | UUID из Neon |
| `problems` | Q1, несколько, через ` \| ` |
| `problems_org_detail` | Текст, если выбрали орг. проблему |
| `visit_goals` | Q2, несколько |
| `visit_goals_other` | Текст «Другое» |
| `property_outcome` | Q3 недвижимость (если показано) |
| `property_detail` | Текст к выбранному пункту Q3 |
| `b2b_outcome` | Q3 B2B (если показано) |
| `b2b_detail` | Текст к Q3 B2B |
| `expectations_score` | Q4, 1–10 |
| `expectations_improve` | Текст, если оценка 1–6 |
| `recommend_score` | Q5, 1–10 |
| `vol2_plan` | Q6 |
| `vol2_factor` | Текст к Q6 |
| `vol2_wants` | Q7, несколько |
| `vol2_wants_other` | Текст «Другое» |
| `locale` | Когда будет известен язык |

---

## Колонки `Missed`

| Колонка | Смысл |
|---------|--------|
| `submitted_at` | Время (ISO) |
| `id` | UUID из Neon |
| `no_visit_reason` | Q1 |
| `no_visit_other` | Текст «Другое» |
| `would_increase` | Q2, несколько |
| `would_increase_other` | Текст «Другое» |
| `property_relevance` | Q3 |
| `vol2_plan` | Q4 |
| `vol2_factor` | Текст к Q4 |
| `vol2_motivation` | Q5, несколько |
| `vol2_motivation_other` | Текст «Другое» |
| `locale` | Когда будет известен язык |

Контактные колонки не добавляем, пока клиент не решит.

---

## Поведение при сбое

Источник правды — Neon. Sheet — копия.

1. INSERT в БД со статусом `pending`.
2. Пользователь уже видит успех.
3. Попытка append; при ошибке — `failed`.
4. Cron позже повторяет.

Квоты Sheets API спокойно держат ожидаемый объём (сотни, не десятки тысяч записей в минуту).
