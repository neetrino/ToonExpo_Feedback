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
 * Tabs: Այցելել են, Չեն այցելել (legacy English names are renamed on first write)
 */

const WEBHOOK_SECRET = 'REPLACE_WITH_SHEETS_WEBHOOK_SECRET';

const LEGACY_TABS = {
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

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = resolveSheet(spreadsheet, audience, payload.tab);
    if (!sheet) {
      return jsonResponse({ error: 'sheet_missing' });
    }

    ensureHeaders(sheet, payload.headers);
    sheet.appendRow(values);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: 'failed' });
  }
}

function resolveSheet(spreadsheet, audience, requestedName) {
  if (typeof requestedName === 'string' && requestedName) {
    const named = spreadsheet.getSheetByName(requestedName);
    if (named) {
      return named;
    }
  }

  const legacy = spreadsheet.getSheetByName(LEGACY_TABS[audience]);
  if (!legacy) {
    return null;
  }

  if (typeof requestedName === 'string' && requestedName && legacy.getName() !== requestedName) {
    legacy.setName(requestedName);
  }

  return legacy;
}

function ensureHeaders(sheet, headers) {
  if (!Array.isArray(headers) || headers.length === 0) {
    return;
  }

  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const same = headers.every(function (header, index) {
    return String(firstRow[index] || '') === String(header);
  });
  if (same) {
    return;
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
