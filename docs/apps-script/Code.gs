/**
 * ToonExpo Feedback — Apps Script webhook.
 *
 * 1. Extensions → Apps Script in the ToonExpo_Feedback spreadsheet.
 * 2. Paste this file. Set WEBHOOK_SECRET to the same value as SHEETS_WEBHOOK_SECRET.
 * 3. Deploy → New deployment → Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Put the /exec URL in SHEETS_WEBHOOK_URL (Vercel / CI only, not git).
 *
 * Spreadsheet: 1nGBUK_Do0MZZ-RzN4MSeJpFuJ-RpQUzrgnDTdBkVJBY
 * Tabs: Visited, Missed
 */

const WEBHOOK_SECRET = 'REPLACE_WITH_SHEETS_WEBHOOK_SECRET';

const TABS = {
  VISITED: 'Visited',
  MISSED: 'Missed',
};

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) {
      return jsonResponse({ error: 'empty' });
    }

    const payload = JSON.parse(event.postData.contents);
    if (!payload.secret || payload.secret !== WEBHOOK_SECRET) {
      return jsonResponse({ error: 'unauthorized' });
    }

    const audience = payload.audience;
    const values = payload.values;
    if ((audience !== 'VISITED' && audience !== 'MISSED') || !Array.isArray(values)) {
      return jsonResponse({ error: 'invalid' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[audience]);
    if (!sheet) {
      return jsonResponse({ error: 'sheet_missing' });
    }

    sheet.appendRow(values);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: 'failed' });
  }
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
