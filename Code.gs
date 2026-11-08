// Google Apps Script: receives RSVP submissions and appends them to the sheet.
// Paste this into Extensions > Apps Script of your Google Sheet (see SETUP.md).

const SHEET_NAME = 'RSVPs';
const HEADERS = [
  'Submitted at', 'Version', 'Reply from', 'Attendance',
  'Ceremony count', 'Ceremony guests',
  'Dinner count', 'Dinner guests',
  'Total people', 'Drinking count', 'Drinking alcohol',
  'Dietary', 'Dietary (other)', 'Notes'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);
    const list = a => (Array.isArray(a) ? a : []).map(String).join(', ');
    const count = a => (Array.isArray(a) ? a.length : 0);
    getSheet_().appendRow([
      new Date(), d.version, d.replyName, d.attendance,
      count(d.ceremonyGuests), list(d.ceremonyGuests),
      count(d.dinnerGuests), list(d.dinnerGuests),
      count(d.allGuests), count(d.drinkers), list(d.drinkers),
      list(d.diet), d.dietOther, d.notes
    ].map(safe_));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this, handy for checking the deployment
function doGet() {
  return json_({ ok: true, message: 'RSVP endpoint is live' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

// Stops guest text starting with = + - @ from being read as a spreadsheet formula
function safe_(v) {
  if (v instanceof Date || typeof v === 'number') return v;
  v = v == null ? '' : String(v).slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
