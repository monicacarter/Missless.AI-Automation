# Missless

The AI front office that never misses a lead.

A single-page marketing site built with **React + Vite**. Structured for production: CSS Modules per component, content separated from components, semantic HTML, accessible interactions.

## Tech Stack

- **React 18** with **Vite** (fast dev server + optimized production builds)
- **CSS Modules** (scoped, collision-free component styles)
- **lucide-react** (tree-shakeable icon set)
- **Plus Jakarta Sans** loaded from Google Fonts
- No router (single-page site with anchor-link navigation), no Tailwind, no TypeScript

## Local setup

```bash
# 1. Open the folder in VS Code
code .

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open the URL Vite prints (usually http://localhost:5173)
```

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├─ assets/images/      missless-logo.png + missless-mark.png
├─ components/         Navbar, Footer, Button, Card
├─ sections/           Hero, HearItInAction, HiddenTax, Solution, HowItWorks,
│                      Platform, Industries, WhyMissless, PricingOnboarding,
│                      FAQ, FinalCTA (11 homepage sections)
├─ layouts/MainLayout  Wraps every page with Navbar + Footer
├─ pages/Home.jsx      Composes the 11 sections
├─ data/siteData.js    All copy + link data (single source of truth)
├─ styles/             variables.css (design tokens) + global.css (reset/base)
├─ utils/helpers.js    Small utilities (cn for classnames)
├─ App.jsx
└─ main.jsx
```

Each component and section folder has:
- `ComponentName.jsx` — the component
- `ComponentName.module.css` — scoped styles
- `index.js` — barrel export for clean imports

## Navigation

Single-page site: all navigation uses anchor links (`#hero`, `#platform`, etc.). Section IDs are defined in `src/data/siteData.js` under `ANCHORS`. When you build out real product/industry pages later, swap the `href` values in `siteData.js` — no component changes needed.

## Logo

Two image files, both in `src/assets/images/`:
- `missless-logo.png` — full wordmark (used in Navbar, Footer)
- `missless-mark.png` — just the headset M character (used in How It Works and Platform section hubs)

The Footer logo uses a CSS `filter: brightness(0) invert(1)` to turn it white over the navy background.

## SEO

- Per-page `<title>`, `<meta description>`, OpenGraph and Twitter tags in `index.html`
- **FAQPage JSON-LD** + **Organization JSON-LD** injected at runtime by `Home.jsx` (eligible for Google rich snippets)
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- One `<h1>` per page; proper heading hierarchy
- Accessible alt text and `aria-label` on icon-only controls

## Brand tokens

All colors, spacing, radii, shadows, and gradients are CSS custom properties defined in `src/styles/variables.css`. Update them in one place; the whole site follows.

## License

© 2026 Missless. All rights reserved.
