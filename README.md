# Fred — Finance Learning PWA Prototype

**Status:** v0.2 asset update — early user-testing prototype. **Fred** is the working mascot name; company branding is not legally cleared.

## Start
Open `index.html` locally, or for reliable local hosting run:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000 on your computer. For phone testing, deploy to an HTTPS static host (for example GitHub Pages) **using fictional data only**.

## Features
- Fred-led onboarding (name, confidence, interest, income, bill estimate, goal)
- Responsive home dashboard with Classic Fred and Winter Fred toggle
- Editable monthly income and savings goal
- Expense/income entry and spending-category visualization
- Recurring bills and simple bill entry
- Four short introductory money lessons with completion tracking
- Browser localStorage persistence

## Important limitations
- No accounts, authentication, cloud sync, bank connection, real payment reminders, invoice upload, or tax filing.
- Data stays in the browser and can be lost if storage is cleared; **do not enter sensitive real financial information**.
- The money remaining is a planning estimate, **not** a verified bank balance.
- Demo includes fictional initial data; onboarding figures are examples.
- The mascot images are concept renders. They are not yet production-ready vector/3D assets.
- Educational content is general and should be professionally reviewed before public launch.

## Project structure
`index.html`, `styles.css`, `app.js`, `assets/`, `manifest.webmanifest`

## Suggested next steps
1. Test usability with 5–10 volunteers using fictional finances.
2. Document where onboarding or budgeting is confusing.
3. Refactor into modules, add tests, accessibility checks, secure backend and privacy review before any real-data beta.
4. Complete brand/trademark clearance before naming or public marketing.

## v0.2 branding update
- Selected **mint-green safe with purple vault door and gold star** as the working app icon.
- Browser favicon, iOS home-screen icon and PWA manifest icon sizes added.
- Alternate Fred Classic/Winter growth concepts preserved under `assets/brand-references/`.
- Original full-resolution safe concept preserved separately.
- Branding remains provisional until similarity/trademark checks and final company naming.
- This is an **asset update to the original vanilla JavaScript prototype**. A React/Vite architecture refactor is planned separately; it is not claimed as completed in this release.
- The 192/512 icons are currently declared maskable for testing; review padding and safe-zone suitability before production.
