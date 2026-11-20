# Fred Finance — v0.3 (React + Vite)

**Private design and usability prototype.** Working product/mascot names; trademark clearance pending. **Do not enter real sensitive financial information.**

## Start locally

Install [Node.js](https://nodejs.org/) 20.19+ or 22+, then run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Deploy to GitHub Pages

1. Upload the **contents of this folder** into the repository root on the `main` branch (not the folder itself).
2. In GitHub, open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and deploys automatically on pushes to `main`.
4. Find the site URL under **Settings → Pages** or the deployment job. Use HTTPS on your phone and choose **Add to Home Screen** in your browser if desired.

**Important:** GitHub Free generally requires a public repo for Pages. Public repositories expose code and all committed files. Never commit secrets or real user financial records. Pages itself is publicly accessible, even if your repo is private on an eligible paid plan.

### What's new in v0.3

- React/Vite source split into pages, components, and finance/storage/data modules.
- Purple-first design, mint and gold highlights, and branded safe icon retained.
- Classic/Winter Fred with lightweight CSS motion and reduced-motion support.
- Budget pie chart and monthly income/bills/spending bar chart using Recharts.
- Interactive Money Academy with 5 lessons, quizzes, and completion tracking.
- Rewards tab with XP, levels, badges, and a learning path.
- Recurring bill entry, income/expense entry, and editable budget settings.
- Automated unit tests for basic budget calculations.

### Limitations

- Demo begins with fictional financial data; figures are estimates, not bank balances.
- `localStorage` is **per browser/device**, not secure cloud storage. Data does **not** sync between your computer and phone and may be lost when browser data is cleared.
- This is **not** a full offline PWA (no service worker), even though it has a manifest and can be added to the home screen.
- Fred's movement is CSS animation of the whole image; articulated character animation will need separate assets/rigging.
- No authentication, bank connection, payment processing, notifications, real invoice upload, tax filing, or production-grade data security.
- Icons currently use a consistent vector icon library, not custom Fred-themed 3D illustrations; original icon assets are a later design task.
- General financial education is introductory and should be reviewed before a public release.

### Project map

- `src/pages/` — screens and interactive learning
- `src/components/` — reusable Fred, navigation, charts and icons
- `src/lib/` — data, persistence and finance calculations
- `public/assets/` — mascot art, safe app icon, and archived alternate icon concepts
- `tests/` — unit tests
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Commands

```bash
npm run dev
npm test
npm run build
```

### v0.3.1 mobile layout and Fred animation
- Prevents horizontal overflow; onboarding uses available dynamic viewport height and compact spacing.
- Replaces the moving static mascot image with an **articulated 2D SVG prototype**: independent arm waves, leg walking cycle, blink and celebration motions. This is not yet a rigged 3D Fred; exact 3D fidelity requires a separately produced rig.
- Includes the corrected YAML indentation for GitHub Pages workflow.
- On very small screens, large system fonts, or when the keyboard is open, onboarding may scroll internally for accessibility.
