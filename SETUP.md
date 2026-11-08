# Doğa & Deniz RSVP: setup

Files:
- `en.html`: English version
- `tr.html`: Turkish version
- `assets/`: fonts and background images (both pages need this folder next to them)
- `Code.gs`: the small script that writes answers into the spreadsheet (this one does not go on GitHub)

Both versions write into the same sheet. A "Version" column (EN/TR) shows which form each answer came from, and all answer values are stored in English so the columns line up.

## 1. Create the spreadsheet (about 5 minutes)

1. Create a new Google Sheet, e.g. "Wedding RSVPs".
2. In the sheet: Extensions > Apps Script.
3. Delete what's in the editor, paste the contents of `Code.gs`, save.
4. Deploy > New deployment > type "Web app".
   - Execute as: Me
   - Who has access: Anyone
5. Click Deploy and approve the permissions (Google will warn that the app is unverified; choose Advanced > Go to project).
6. Copy the Web app URL (ends in `/exec`).

## 2. Connect the forms

In both `en.html` and `tr.html`, find this line near the top of the script:

    const SCRIPT_URL = '';

and paste the URL between the quotes.

## 3. Put the forms online (GitHub Pages)

1. On GitHub, create a new **public** repository, e.g. `wedding-rsvp` (Pages is free for public repos).
2. Upload `en.html`, `tr.html` and the whole `assets` folder to the root of the repo (Add file > Upload files; you can drag the folder in), after pasting the script URL into both HTML files.
3. Settings > Pages > Build and deployment: Source "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
4. After a minute or two your links are:
   - `https://<your-username>.github.io/wedding-rsvp/en.html` for the English group
   - `https://<your-username>.github.io/wedding-rsvp/tr.html` for the Turkish group

Note: a public repo means the HTML (including the script URL) is visible to anyone who looks. That's fine here: the URL can only add rows, it can't read the sheet. Don't put anything private in these files.

Font licences: Libre Baskerville is under the SIL Open Font License (copy included in `assets/`), so hosting it is fine. Breadley Sans is the free personal-use version; a wedding RSVP is personal, non-commercial use, but the font file does sit publicly in the repo. If you want to be strictly on the safe side, buy the licence or email the designer (ardyanatypes@gmail.com) to confirm.

## 4. Getting the Excel file

Answers appear live in the "RSVPs" tab. For Excel at any time: File > Download > Microsoft Excel (.xlsx).

## Columns

Submitted at, Version, Reply from, Attendance, Ceremony count, Ceremony guests, Dinner count, Dinner guests, Total people, Drinking count, Drinking alcohol, Dietary, Dietary (other), Notes

## If you change Code.gs later

Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy. This keeps the same URL.
