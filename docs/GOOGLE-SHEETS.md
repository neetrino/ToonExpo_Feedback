# Google Sheets — простой webhook, без Cloud API

Таблица: [ToonExpo_Feedback](https://docs.google.com/spreadsheets/d/1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY/edit?usp=sharing)

Spreadsheet ID: `1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY`

Структура создана 2026-09-10: листы `Visited` и `Missed`, шапка в первой строке. Webhook для записи ответов подключим вместе с кодом сайта.

---

## Почему не «просто ссылка»

Публичная ссылка «посмотреть» **не умеет принимать строки**.  
Google Sheets API без входа тоже не пишет.

Значит, совсем без секрета записать из сайта нельзя. Иначе любой бот зальёт таблицу.

Тяжёлый путь (не берём): Google Cloud, включить Sheets API, service account, JSON-ключ, шаринг на email бота.

**Выбран простой путь:** скрипт внутри самой таблицы (Apps Script) + одна секретная ссылка. Cloud Console не нужен.

---

## Как это работает

```
Сайт (сервер)  →  POST на URL скрипта  →  скрипт добавляет строку в лист
```

URL скрипта = пароль. Его кладём только в `.env` / Vercel, не в браузер и не в git.

Команда смотрит таблицу как обычно. «Anyone can edit» не включаем.

---

## Один раз в Google Sheet

1. Открыть таблицу.
2. Создать два листа: `Visited` и `Missed`. Первая строка — заголовки (таблицы ниже).
3. Расширения → Apps Script.
4. Вставить скрипт (ниже). В `WEBHOOK_SECRET` поставить длинную случайную строку — ту же, что потом в env.
5. Деплой → Новый деплой → тип **Веб-приложение**:
   - Выполнять от: меня
   - У кого есть доступ: **все** (иначе Vercel не достучится)
6. Скопировать URL деплоя в `SHEETS_WEBHOOK_URL`.

Доступ людей к таблице: Editor / Viewer как обычно. Скрипт пишет от вашего аккаунта, отдельный «бот-email» не нужен.

---

## Скрипт (вставим при подключении)

Логика: проверить секрет → понять лист `Visited` или `Missed` → `appendRow`.  
Полный текст добавим в репозиторий вместе с кодом сайта, не раньше.

Env:

```text
SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
SHEETS_WEBHOOK_SECRET=""
```

---

## Листы

| Лист | Анкета |
|------|--------|
| `Visited` | Был на выставке |
| `Missed` | Зарегистрирован, не пришёл |

---

## Колонки `Visited`

| Колонка | Смысл |
|---------|--------|
| `submitted_at` | Время (ISO) |
| `id` | UUID из Neon |
| `first_name` | Имя |
| `last_name` | Фамилия |
| `email` | Email |
| `phone` | Телефон |
| `locale` | `hy` или `ru` |
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

---

## Колонки `Missed`

| Колонка | Смысл |
|---------|--------|
| `submitted_at` | Время (ISO) |
| `id` | UUID из Neon |
| `first_name` | Имя |
| `last_name` | Фамилия |
| `email` | Email |
| `phone` | Телефон |
| `locale` | `hy` или `ru` |
| `no_visit_reason` | Q1 |
| `no_visit_other` | Текст «Другое» |
| `would_increase` | Q2, несколько |
| `would_increase_other` | Текст «Другое» |
| `property_relevance` | Q3 |
| `vol2_plan` | Q4 |
| `vol2_factor` | Текст к Q4 |
| `vol2_motivation` | Q5, несколько |
| `vol2_motivation_other` | Текст «Другое» |

---

## Сбой

Источник правды — Neon. Sheet — копия.

1. INSERT в БД (`pending`).
2. Человек уже видит «спасибо».
3. Сервер дергает webhook; ошибка → `failed`.
4. Cron позже повторяет.

Для ~2000 писем этого достаточно. Service account не подключаем, пока этот путь не сломается.
