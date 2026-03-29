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
│   │   │   ├── LandingPage.jsx
│   │   │   ├── StartPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── TransformModal.jsx
│   │   │   ├── layout/
│   │   │   │   └── AppLayout.jsx
│   │   │   ├── modules/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AIChat.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── Automations.jsx
│   │   │   │   ├── Documents.jsx
│   │   │   │   ├── ComingSoonGenerator.jsx
│   │   │   │   └── CompetitorScannerSection.jsx
│   │   │   ├── pages/
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
│   │   │   └── displays/
│   │   │       ├── CompetitorAnalysisDisplay.jsx
│   │   │       ├── ContentCalendarDisplay.jsx
│   │   │       ├── MarketingPlanDisplay.jsx
│   │   │       └── ReportDisplay.jsx
│   │   └── services/
│   │       └── api.js
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Response Stracture/
├── .agent/
│   └── workflows/
│       └── ui-ux-guidelines.md
├── ARCHITECTURE.md
├── PROJECT_ROADMAP.md
└── CLIENT_PITCH.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + Vite |
| Styling | Plain CSS (`index.css` only — no modules) |
| Backend / automation | n8n webhooks (self-hosted) |
| AI voice widget | ElevenLabs Conversational AI (`<elevenlabs-convai>`) |
| Font | **Must replace Inter** — see Design Standards below |
| Package manager | npm |

No TypeScript. All files use `.jsx` / `.js`.

---

## Development Setup

```bash
cd web-app
npm install
npm run dev        # Vite dev server → localhost:5173
npm run build      # Production build → web-app/dist/
npm run preview    # Preview production build
```

No test suite. No lint scripts.

### Environment Variables

```bash
# web-app/.env
VITE_WEBHOOK_URL=https://your-n8n-instance.example.com
```

Default: `https://n8n-n8n.vwe4kq.easypanel.host`

---

## Architecture & Key Patterns

### Routing / Navigation

**No React Router.** Navigation is managed entirely through `App.jsx` state:

- `isLoggedIn` (boolean) — toggles landing page vs authenticated dashboard
- `currentModule` (string) — determines which component renders inside `AppLayout`

**IMPORTANT: `currentModule` must be synced to `window.location.hash`** so users can deep-link to any tool and refresh without losing their place. When adding any new module, update the hash sync map in `App.jsx`.

Module IDs: `dashboard`, `chat`, `competitor`, `report`, `marketing`, `calendar`, `personas`, `campaign`, `brandvoice`, `adcopy`, `social`, `email`, `websitecopy`, `seo`, `documents`, `automations`, `analytics`, `design`

To add a new page:
1. Create component in `src/components/pages/`
2. Import in `App.jsx`
3. Add `case` to `renderModule()` switch
4. Add module ID to `getPageTitle()` in `AppLayout.jsx`
5. Add card to `Dashboard.jsx` pointing to the new module ID
6. Update hash sync map in `App.jsx`

### API Layer (`src/services/api.js`)

All backend calls go through n8n webhooks:

```js
export async function getXxx() {
    const response = await fetch(`${WEBHOOK_BASE}/webhook/endpoint-name`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
}
```

**Always wrap API calls in try/catch in the component.** Never let an uncaught webhook error crash the UI — show an inline error state with a retry button instead.

Available functions:
- `submitWebsiteData(url, file)` — onboarding POST
- `getReport()` — GET market research report
- `getCompetitorAnalysis()` — GET competitor analysis
- `generateMarketingPlan()` — POST trigger (shared with content calendar)
- `getMarketingPlan()` — GET generated plan
- `generateContentCalendar()` — POST trigger
- `getContentCalendar()` — GET calendar
- `analyzeFacebookCompetitor(facebookUrl)` — POST Facebook URL

### Styling Conventions

- **All styles live in `src/index.css`** — no CSS modules, no component-level styles, no inline `style` attributes.
- Always use CSS variables — never hardcoded hex, px, or rem values.
- Variable prefixes: `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*`, `--text-*`, `--gradient-*`
- Dark theme only. Background: `--color-bg-primary` (#09090b) → `--color-bg-elevated` (#1c1c21)
- Primary accent: `--color-accent` (#6366f1, indigo)
- `color-scheme: dark` must be set on `:root` — fixes native scrollbars, selects, date inputs.
- New CSS classes follow BEM-like naming: `.module-name__element--modifier`

### Component Conventions

- Functional components with React hooks only — no class components.
- No PropTypes, no TypeScript.
- Primary hooks: `useState`, `useEffect`, `useCallback` (for handlers that would cause re-renders).
- Conditional rendering: short-circuit (`&&`) or ternary only.
- Lists: always `.map()` with a `key` prop.
- **Every data-fetching component must handle loading, error, and empty states** — never render broken UI for missing data.

---

## ⚡ Antigravit Frontend Standards

*These standards are mandatory. No exceptions. Flag any violation immediately.*

---

### 🎨 Design Philosophy

Before writing a single line of code, commit to a **bold aesthetic direction**:

- **Purpose** — What problem does this screen solve? Who uses it?
- **Tone** — Own one and execute it precisely: brutally minimal / maximalist / retro-futuristic / luxury / editorial / brutalist / art-deco / industrial.
- **Differentiation** — What makes this screen unforgettable?

Bold maximalism and refined minimalism both work. The key is **intentionality**, not intensity.

#### ❌ Never — instant reject

- `Inter`, `Roboto`, `Arial`, system fonts as display typeface
- Purple gradients on white or light backgrounds
- Uniform `border-radius` on every element
- Cookie-cutter centered layouts with no spatial tension
- `Space Grotesk` — overused, banned entirely
- `transition: all` — ever, anywhere
- `outline: none` without a `:focus-visible` replacement

#### ✅ Always

- Pair a **distinctive display font** with a refined body font (Google Fonts or Bunny Fonts)
- **CSS variables for everything** — never magic numbers
- Dominant palette + **sharp accent** — not evenly distributed pastels
- Spatial surprise: asymmetry, overlap, diagonal flow, grid-breaking elements
- Atmosphere: gradient meshes, noise textures, geometric patterns, grain overlays, dramatic shadows

---

### ♿ Accessibility

Every interactive element must be keyboard and screen-reader accessible.

- Icon-only buttons **must** have `aria-label="Descriptive action"` — no label = invisible to screen readers
- All form controls need `<label htmlFor="...">` or `aria-label`
- Interactive elements need keyboard handlers: `onKeyDown` where click alone is not enough
- Use `<button>` for actions, `<a>` for navigation — **never** `<div onClick>` or `<span onClick>`
- All `<img>` need `alt="..."` (or `alt=""` if purely decorative)
- Decorative icons need `aria-hidden="true"`
- Async UI updates (webhook responses loading in, toasts, validation) need `aria-live="polite"`
- Prefer semantic HTML (`<button>`, `<nav>`, `<main>`, `<section>`, `<label>`, `<table>`) over ARIA
- Headings hierarchical `<h1>` → `<h6>` — never skip levels
- Include a visually-hidden skip-to-main link for keyboard users

---

### 🎯 Focus States

Keyboard navigation must always be visually obvious.

```css
/* Add to index.css — applies globally */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

- **Never** `outline: none` or `outline: 0` without an explicit `:focus-visible` replacement directly after it
- Use `:focus-visible` — not `:focus` (avoids ring on mouse click)
- Use `:focus-within` for compound controls: input + attached button groups

---

### 📝 Forms

- Inputs need `autocomplete="..."` and a meaningful `name="..."` attribute
- Use correct `type`: `email`, `tel`, `url`, `number`, `search`
- Add `inputMode="url"` on URL fields, `inputMode="email"` on email (mobile keyboard)
- **Never** block paste: no `onPaste` + `e.preventDefault()`
- Labels must be clickable: `<label htmlFor="input-id">` or wrap input inside label
- Disable spellcheck on technical fields: `spellCheck={false}` on email, URL, username, API key inputs
- Submit button stays **enabled** until request fires — then disable and show spinner
- Errors displayed **inline** next to the field — focus first error on submit
- Placeholders end with `…` and show a real example: `placeholder="https://yoursite.com…"`
- Warn on navigate-away with unsaved data: `beforeunload` event

---

### 🎞️ Animation

```css
/* Correct pattern */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

@media (prefers-reduced-motion: no-preference) {
  .card-enter {
    animation: fadeUp 300ms ease both;
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- **Always** wrap `@keyframes` usage in `@media (prefers-reduced-motion: no-preference)`
- Animate only `transform` and `opacity` — compositor-friendly, no layout thrashing
- **Never** `transition: all` — always list specific properties explicitly
- Set `transform-origin` explicitly on every animated element
- Animations must be interruptible — never lock the UI during a transition
- One orchestrated page-load with staggered `animation-delay` beats scattered micro-interactions everywhere

---

### 🔤 Typography & Copy

**Characters:**
- `…` ellipsis character — not `...` three periods
- `"curly quotes"` — not `"straight quotes"`
- Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, product names

**Loading copy:**
- `"Analyzing competitors…"` — not `"Loading..."`
- `"Generating your plan…"` — not `"Please wait..."`

**CSS:**
```css
/* Numbers in tables and data — add to relevant containers */
font-variant-numeric: tabular-nums;

/* All headings */
h1, h2, h3, h4 {
  text-wrap: balance;
}

/* Body paragraphs */
p {
  text-wrap: pretty;
}
```

**Voice:**
- Active voice: "Run the analysis" — not "The analysis will be run"
- Title Case for headings and button labels (Chicago style)
- Numerals: "8 competitors found" — not "eight competitors found"
- Specific CTAs: "Generate Marketing Plan" — not "Continue" or "Submit"
- Error messages say what to do next — not just what went wrong

---

### 📦 Content & Empty States

Every data-fetching component must handle all four states:

```jsx
// Required pattern — pages/* and displays/* components
if (loading) return <LoadingState message="Analyzing…" />;
if (error)   return <ErrorState message={error.message} onRetry={refetch} />;
if (!data || data.length === 0) return <EmptyState />;
return <ActualContent data={data} />;
```

- Flex children containing text need `min-width: 0` to allow truncation
- Long text: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
- Multi-line clamp: `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden`
- User-generated content: test with very short, average, and very long strings

---

### ⚡ Performance

- Lists > 50 items: virtualize with `virtua` or `content-visibility: auto`
- **No layout reads in render** — never call `getBoundingClientRect()`, `offsetHeight`, `scrollTop` during rendering
- Batch DOM reads/writes — never interleave them
- Prefer uncontrolled inputs (`defaultValue`) — controlled inputs must be cheap per keystroke

```html
<!-- index.html — add for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" type="font/woff2" crossorigin href="...">
```

```css
/* index.css — on @font-face or @import */
font-display: swap;
```

---

### 🧭 Navigation & State

- **`currentModule` must be synced to `window.location.hash`** — refresh and deep-links must work
- All navigation uses `<button>` or `<a>` — never bare `<div onClick>`
- Destructive actions (delete, reset, clear generated content) need a **confirmation step** — never fire immediately
- Stateful UI (filters, tabs, expanded panels) should survive page refresh where possible

---

### 📱 Touch & Mobile

```css
/* Add to buttons, links, and interactive elements */
button, a, [role="button"] {
  touch-action: manipulation;        /* eliminates 300ms tap delay */
  -webkit-tap-highlight-color: transparent;
}

/* Modals and drawers */
.modal, .drawer {
  overscroll-behavior: contain;
}
```

- `autoFocus` only on desktop, only on a single primary input — never on mobile
- During drag: set `user-select: none` and `pointer-events: none` on non-dragged elements

---

### 📐 Layout & Safe Areas

```css
/* Full-bleed sidebar/header — add for iPhone notch support */
.app-layout {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

- Prevent horizontal scroll: `overflow-x: hidden` on root — fix the source, don't just mask it
- Flex and grid over JS layout measurement — always

---

### 🌙 Dark Mode & Theming

```css
/* index.css — :root */
:root {
  color-scheme: dark;
}
```

```html
<!-- index.html — inside <head> -->
<meta name="theme-color" content="#09090b">
```

- Never hardcode `#fff`, `#000`, or any hex — always use `--color-*` variables
- Native `<select>` on Windows dark mode needs explicit `background-color` and `color`

---

### 🌍 Locale & Dates

```js
// Always — never hardcoded format strings
new Intl.DateTimeFormat(navigator.language, { dateStyle: 'medium' }).format(date)
new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD' }).format(amount)
```

---

## 🚩 Anti-Patterns — Fix On Sight

If you see any of these, fix them without being asked.

| Anti-Pattern | Fix |
|---|---|
| `transition: all` | List specific properties: `transition: transform 200ms ease` |
| `outline: none` without `:focus-visible` | Add `outline: 2px solid var(--color-accent)` in `:focus-visible` |
| `<div onClick>` or `<span onClick>` | Replace with `<button>` or `<a>` |
| Icon button with no `aria-label` | Add `aria-label="Descriptive action"` |
| Form input with no `<label>` | Add `<label htmlFor="...">` or `aria-label` |
| `<img>` with no `alt` | Add `alt="description"` or `alt=""` if decorative |
| `.map()` on 50+ items without virtualization | Add `content-visibility: auto` or `virtua` |
| Hardcoded hex or px in CSS | Replace with CSS variables |
| `Inter` / `Roboto` / `Arial` as display font | Replace with a distinctive typeface |
| `Space Grotesk` anywhere | Remove — banned |
| `"Loading..."` copy | Replace with `"Loading…"` |
| `currentModule` not synced to URL hash | Add `window.location.hash` sync to `App.jsx` |
| Missing error / empty / loading state | Add all three to every data-fetching component |
| No `color-scheme: dark` on `:root` | Add to `index.css` |
| No `<meta name="theme-color">` | Add to `index.html` |
| `onPaste` + `e.preventDefault()` | Remove — never block paste |
| `user-scalable=no` in viewport meta | Remove — blocks zoom accessibility |
| Hardcoded date/number format strings | Replace with `Intl.DateTimeFormat` / `Intl.NumberFormat` |
| Missing `prefers-reduced-motion` | Wrap all `@keyframes` usage in the media query |
| Destructive action with no confirmation | Add confirmation modal or inline confirm step |
| No `touch-action: manipulation` on buttons | Add to button/link/interactive element styles |
| Missing `aria-live="polite"` on async updates | Add to loading/result containers |