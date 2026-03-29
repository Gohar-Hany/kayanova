# Kayanova – Coding Agent Instructions

## Project Overview

**Kayanova** is an AI-powered automated marketing agency SaaS platform (Marketing Agency as a Service — MAaaS). It delivers end-to-end marketing execution — competitor analysis, market research, marketing plans, content calendars, and content generation — through a React web app connected to an n8n automation backend via webhooks.

---

## Repository Structure

```
kayanova/
├── web-app/                  # React + Vite frontend (the only runnable app)
│   ├── src/
│   │   ├── App.jsx           # Root component: routing, login state, module switching
│   │   ├── index.css         # Global CSS design system (CSS variables, all styles)
│   │   ├── main.jsx          # React entry point
│   │   ├── components/
│   │   │   ├── LandingPage.jsx       # Public landing page
│   │   │   ├── StartPage.jsx         # Onboarding step (URL/file input)
│   │   │   ├── ServicesPage.jsx      # Services overview page
│   │   │   ├── TransformModal.jsx    # Onboarding modal triggered from landing
│   │   │   ├── layout/
│   │   │   │   └── AppLayout.jsx     # Authenticated shell: sidebar + header
│   │   │   ├── modules/              # Main dashboard feature modules
│   │   │   │   ├── Dashboard.jsx     # Home screen with all tool cards
│   │   │   │   ├── AIChat.jsx        # AI Command Center chat interface
│   │   │   │   ├── Analytics.jsx     # Analytics module (coming soon)
│   │   │   │   ├── Automations.jsx   # Automations module (coming soon)
│   │   │   │   ├── Documents.jsx     # Documents module
│   │   │   │   ├── ComingSoonGenerator.jsx  # Placeholder for unreleased tools
│   │   │   │   └── CompetitorScannerSection.jsx
│   │   │   ├── pages/                # Full-page tool views
│   │   │   │   ├── CompetitorAnalysisPage.jsx
│   │   │   │   ├── ReportPage.jsx
│   │   │   │   ├── MarketingPlanPage.jsx
│   │   │   │   ├── ContentCalendarPage.jsx
│   │   │   │   ├── BuyerPersonasPage.jsx
│   │   │   │   ├── CampaignStrategyPage.jsx
│   │   │   │   ├── BrandVoicePage.jsx
│   │   │   │   ├── AdCopyPage.jsx
│   │   │   │   ├── SocialScriptsPage.jsx
│   │   │   │   ├── EmailSequencesPage.jsx
│   │   │   │   ├── WebsiteCopyPage.jsx
│   │   │   │   └── SEOStrategyPage.jsx
│   │   │   └── displays/             # Structured display components for API data
│   │   │       ├── CompetitorAnalysisDisplay.jsx
│   │   │       ├── ContentCalendarDisplay.jsx
│   │   │       ├── MarketingPlanDisplay.jsx
│   │   │       └── ReportDisplay.jsx
│   │   └── services/
│   │       └── api.js                # All n8n webhook API calls
│   ├── public/                       # Static assets (logo, favicon)
│   ├── index.html                    # HTML entry point (loads ElevenLabs widget)
│   ├── package.json
│   └── vite.config.js
├── Response Stracture/               # Sample API response JSON/text fixtures
│   ├── Competitor Analysis Response.txt
│   ├── Content Calendar Response.txt
│   ├── Marketing Plan Response.txt
│   └── Report Response.txt
├── .agent/
│   └── workflows/
│       └── ui-ux-guidelines.md       # Design system reference for UI work
├── ARCHITECTURE.md                   # System architecture documentation
├── PROJECT_ROADMAP.md                # Product roadmap
└── CLIENT_PITCH.md                   # Business overview / pitch deck content
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + Vite |
| Styling | Plain CSS (single `index.css`, CSS variables design system) |
| Backend / automation | n8n (self-hosted, webhooks only — no direct DB access from frontend) |
| AI voice widget | ElevenLabs Conversational AI (`<elevenlabs-convai>`) |
| Font | Inter (Google Fonts) |
| Package manager | npm |

There is **no TypeScript** in this project. All source files use `.jsx` or `.js`.

---

## Development Setup

```bash
cd web-app
npm install
npm run dev        # Start dev server (Vite, default port 5173)
npm run build      # Production build → web-app/dist/
npm run preview    # Preview production build locally
```

There is **no test suite** in this repository. There are no lint scripts defined in `package.json`.

### Environment Variables

Create `web-app/.env` to override the webhook base URL:

```
VITE_WEBHOOK_URL=https://your-n8n-instance.example.com
```

The default value in `src/services/api.js` is `https://n8n-n8n.vwe4kq.easypanel.host`.

---

## Architecture & Key Patterns

### Routing / Navigation

There is **no React Router**. Navigation is managed entirely through `App.jsx` state:

- `isLoggedIn` (boolean) — toggles between landing page and the authenticated dashboard
- `currentModule` (string) — determines which component to render inside `AppLayout`

Module IDs used in `currentModule`:
`dashboard`, `chat`, `competitor`, `report`, `marketing`, `calendar`, `personas`, `campaign`, `brandvoice`, `adcopy`, `social`, `email`, `websitecopy`, `seo`, `documents`, `automations`, `analytics`, `design`

To add a new page:
1. Create the component in `src/components/pages/`
2. Import it in `App.jsx`
3. Add a `case` to the `renderModule()` switch
4. Add the module ID to `getPageTitle()` in `AppLayout.jsx`
5. Add a card to `Dashboard.jsx` pointing to the new module ID

### API Layer (`src/services/api.js`)

All backend calls go through n8n webhooks. The pattern is:

```js
export async function getXxx() {
    const response = await fetch(`${WEBHOOK_BASE}/webhook/endpoint-name`, {
        method: 'GET',  // or POST
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(payload)  // for POST
    });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return response.json();
}
```

Available API functions:
- `submitWebsiteData(url, file)` — onboarding POST, sends URL or file as base64
- `getReport()` — GET market research report
- `getCompetitorAnalysis()` — GET competitor analysis
- `generateMarketingPlan()` — POST to trigger generation (shared endpoint with content calendar)
- `getMarketingPlan()` — GET generated marketing plan
- `generateContentCalendar()` — POST to trigger generation
- `getContentCalendar()` — GET generated content calendar
- `analyzeFacebookCompetitor(facebookUrl)` — POST Facebook page URL for analysis

### Styling Conventions

- **All styles** live in `src/index.css` — there are no CSS modules or component-level CSS files.
- The design system uses CSS custom properties (variables) defined in `:root`. Always use these variables rather than hard-coded colours or spacing values.
- Key variable prefixes: `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*`, `--text-*`, `--gradient-*`
- Dark theme only; background palette: `--color-bg-primary` (#09090b) → `--color-bg-elevated` (#1c1c21)
- Primary accent: `--color-accent` (#6366f1, indigo)
- When adding new CSS classes, add them to `index.css` and follow the existing BEM-like naming style.
- **Follow the Antigravit Frontend Standards** below for all new styling and visual polish.

### Component Conventions

- All components are **functional components** using React hooks.
- Props are documented inline via destructuring in the function signature.
- No PropTypes or TypeScript types are used.
- `useState` and `useEffect` are the primary hooks; `useCallback` is used for event handlers that would cause re-renders.
- Conditional rendering uses short-circuit (`&&`) or ternaries.
- Lists are rendered with `.map()` and always include a `key` prop.
- **Accessibility**: Follow the standards below (ARIA labels, keyboard handlers, semantic HTML).

---

## ⚡ Antigravit Frontend Standards

*The following standards define the peak aesthetic and technical excellence for this project.*

### 🎨 Design Philosophy

Before writing a single line of code, commit to a **BOLD aesthetic direction**. Ask:
- **Purpose** — What problem does this UI solve? Who uses it?
- **Tone** — Pick one and own it: brutally minimal / maximalist / retro-futuristic / luxury / editorial / brutalist / art-deco / industrial. Execute with precision.
- **Differentiation** — What makes this screen UNFORGETTABLE?

> Bold maximalism and refined minimalism both work. The key is **intentionality**, not intensity.

#### ❌ Never Do (AI Slop)
- Inter, Roboto, Arial, or system fonts as primary typeface
- Purple gradients on white backgrounds
- Uniform rounded corners everywhere
- Cookie-cutter centered layouts with no spatial tension
- `Space Grotesk` — overused, avoid entirely

#### ✅ Always Do
- Pair a **distinctive display font** with a refined body font (use Google Fonts or Bunny Fonts)
- Use **CSS variables** for all colors/spacing — never magic numbers
- Dominant color palette with **sharp accent** — not evenly distributed pastels
- Unexpected layouts: asymmetry, overlap, diagonal flow, grid-breaking elements
- Atmosphere: gradient meshes, noise textures, geometric patterns, grain overlays, dramatic shadows

### ♿ Accessibility

- Icon-only buttons **must** have `aria-label`
- All form controls need `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown` / `onKeyUp`)
- Use `<button>` for actions, `<a>` / `<Link>` for navigation — **never** `<div onClick>`
- All `<img>` need `alt` (or `alt=""` if purely decorative)
- Decorative icons need `aria-hidden="true"`
- Async updates (toasts, validation) need `aria-live="polite"`
- Prefer semantic HTML (`<button>`, `<a>`, `<label>`, `<table>`) over ARIA attributes
- Headings must be hierarchical `<h1>` → `<h6>` — include skip link for main content
- Add `scroll-margin-top` on anchor headings

### 🎯 Focus States

- All interactive elements need **visible focus**: `focus-visible:ring-*` or equivalent
- **Never** use `outline-none` / `outline: 0` without a custom focus-visible replacement
- Use `:focus-visible` over `:focus` — avoid showing ring on mouse click
- Use `:focus-within` for compound controls (e.g., input groups)

### 📝 Forms

- Inputs need `autocomplete` and a meaningful `name` attribute
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- **Never** block paste (`onPaste` + `preventDefault`)
- Labels must be clickable (`htmlFor` or wrapping the control)
- Disable spellcheck on emails, codes, usernames: `spellCheck={false}`
- Checkboxes/radios: label + control share a single hit target — no dead zones
- Submit button stays **enabled** until request fires; show spinner during request
- Errors displayed **inline** next to fields; focus first error on submit
- Placeholders end with `…` and show example pattern
- `autocomplete="off"` only on non-auth fields
- Warn before navigation with unsaved changes (`beforeunload` or router guard)

### 🎞️ Animation

- Always honor `prefers-reduced-motion` — provide reduced variant or disable entirely
- Animate **only** `transform` and `opacity` — compositor-friendly, no layout thrashing
- **Never** use `transition: all` — list properties explicitly
- Always set `transform-origin` explicitly
- SVG animations: use transforms on `<g>` wrapper with `transform-box: fill-box; transform-origin: center`
- Animations must be **interruptible** — respond to user input mid-animation
- Focus on **high-impact moments**: one orchestrated page-load with staggered `animation-delay` > scattered micro-interactions

### 🔤 Typography & Copy

- Use `…` (ellipsis character) — **not** `...` (three dots)
- Curly quotes `"` `"` — **not** straight `"`
- Non-breaking spaces for: `10&nbsp;MB`, `⌘&nbsp;K`, brand names
- Loading states: `"Loading…"`, `"Saving…"` — never `"Loading..."`
- Number columns/comparisons: `font-variant-numeric: tabular-nums`
- Headings: `text-wrap: balance` or `text-pretty` — prevents orphaned words
- **Active voice**: "Install the CLI" — not "The CLI will be installed"
- **Title Case** for headings and buttons (Chicago style)
- **Specific labels**: "Save API Key" — not "Continue"

### 📦 Content Handling

- Text containers must handle long content: `truncate`, `line-clamp-*`, or `break-words`
- Flex children need `min-w-0` to allow text truncation
- **Always** handle empty states — never render broken UI for empty strings/arrays

### ⚡ Performance

- Lists > 50 items: **virtualize** (`virtua`, `react-virtual`, or `content-visibility: auto`)
- **No** layout reads inside render (`getBoundingClientRect`, `offsetHeight`, `scrollTop`)
- Batch DOM reads/writes — never interleave
- Prefer **uncontrolled** inputs; controlled inputs must be cheap per keystroke
- Add `<link rel="preconnect">` for CDN/external asset domains
- Critical fonts: `<link rel="preload" as="font">` + `font-display: swap`

### 🧭 Navigation & State

- **URL reflects state** — filters, tabs, pagination, expanded panels → query params
- Links always use `<a>` / `<Link>` (Cmd+click, middle-click, SEO)
- Deep-link all stateful UI
- Destructive actions need a **confirmation modal or undo window**

### 📐 Layout & Safe Areas

- Full-bleed layouts: use `env(safe-area-inset-*)` for notch/island devices
- Prevent unwanted scrollbars: `overflow-x-hidden` on containers
- Prefer **flex/grid** over JS measurement for layout

### 🌙 Dark Mode & Theming

- Set `color-scheme: dark` on `<html>` for dark themes (fixes scrollbar, native inputs)
- `<meta name="theme-color">` must match the page background color

---

## 🚩 Anti-Patterns — Flag These Immediately

| Anti-Pattern | Why |
|---|---|
| `user-scalable=no` or `maximum-scale=1` | Blocks zoom — accessibility violation |
| `onPaste` + `preventDefault` | Blocks paste — terrible UX |
| `transition: all` | Performance killer — list properties explicitly |
| `outline-none` without focus replacement | Accessibility violation |
| `<div onClick>` for navigation | No keyboard/Cmd+click support |
| `<div>` / `<span>` as buttons | Wrong semantics — use `<button>` |
| `<img>` without `width` + `height` | Causes CLS |
| `.map()` on >50 items without virtualization | Performance issue |
| Form inputs without labels | Accessibility violation |
| Icon buttons without `aria-label` | Screen reader failure |
| Hardcoded date/number formats | Breaks i18n |
| `Inter` / `Roboto` / `Arial` as display font | Generic AI slop |
| Purple gradients on white | Cliché — never |
| `Space Grotesk` | Overused — banned |
