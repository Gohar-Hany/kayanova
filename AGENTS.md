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

### Component Conventions

- All components are **functional components** using React hooks.
- Props are documented inline via destructuring in the function signature.
- No PropTypes or TypeScript types are used.
- `useState` and `useEffect` are the primary hooks; `useCallback` is used for event handlers that would cause re-renders.
- Conditional rendering uses short-circuit (`&&`) or ternaries.
- Lists are rendered with `.map()` and always include a `key` prop.

---

## UI/UX Design Reference

See `.agent/workflows/ui-ux-guidelines.md` for the design system guidelines including typography scale, spacing grid, button hierarchy, animation timings, shadow levels, and accessibility requirements.

---

## Response Structure Fixtures

The `Response Stracture/` directory contains sample text responses from the n8n backend. Use these as reference when building or updating display components (`src/components/displays/`) to ensure the UI handles the actual data shape returned by the API.

---

## Important Notes for the Coding Agent

- **No backend code lives in this repo.** The n8n workflows are hosted externally. Backend changes require modifying the n8n instance directly.
- **No routing library** — all navigation is prop-drilling through `App.jsx`.
- **Coming Soon modules** (`analytics`, `automations`, `design`) render `<ComingSoonGenerator>` — do not add full implementations for these without explicit instructions.
- The `linkedGenerationState` pattern in `App.jsx` ensures the Marketing Plan and Content Calendar are generated together via a single POST request, but displayed independently.
- The ElevenLabs `<elevenlabs-convai>` web component is loaded via a CDN script in `index.html` and rendered in `AppLayout.jsx` as a floating widget.
