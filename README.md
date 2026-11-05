# AcedmiX

**Learn Smarter. Go Further.**

AcedmiX is an editorial-style educational app concept built from scratch with React, TypeScript, and Vite. Its visual direction follows the supplied second mockup: warm ivory surfaces, expressive serif typography, deep forest green, burnt-orange accents, and geometric course artwork.

## Included experience

- **Welcome:** an editorial onboarding screen with a clear route into the app.
- **Home:** featured learning, searchable course discovery, subject categories, and a learning journey.
- **Course detail:** course overview, lesson curriculum, learning outcomes, and lesson completion controls.
- **Progress:** completion overview, study metrics, achievements, and recent learning activity.
- **Profile:** learner preferences and saved progress controls.

The app is intentionally front-end-only in this first version. Course catalogues and learner progress use local demo data; progress is persisted in `localStorage`. No authentication, hosted database, payment service, or AI provider is configured.

## Run locally

Requirements: Node.js 22.12 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Verify a production build

```bash
npm run typecheck
npm run build
npm run preview
```

## Project structure

```text
AcedmiX/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Design system

See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) for the complete visual and component guidelines.


| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F5F0E8` | Main canvas |
| Paper deep | `#EAE2D6` | Soft cards and borders |
| Ink | `#1B1A17` | Primary text |
| Forest | `#173F35` | Primary feature surfaces |
| Ember | `#C95132` | Calls to action and highlights |
| Muted | `#81796F` | Supporting copy |

Display typography uses a high-contrast editorial serif stack with system fallbacks; interface text uses a clean sans-serif stack. The layout is responsive and includes reduced-motion support.

## GitHub setup

See [`GITHUB_SETUP.md`](GITHUB_SETUP.md) for the steps to publish this local Git repository as a new GitHub repository named `AcedmiX`.

## Notes

This is a new, independent codebase. It does not connect to or modify any existing Acadrix, JEE Prep Hub, or Supabase project. Before production use, add a real authentication provider, database, server-side authorization, content management, and privacy/legal pages.

## Study studio update

The current frontend also includes:

- **Study planner:** create, categorize, complete, and remove daily tasks.
- **Focus studio:** 25-minute focus, 5-minute short break, and 15-minute long break timer with pause/resume/reset.
- **Saved courses:** bookmark a course and filter the library to saved items.
- **Appearance:** switch between editorial light and dark themes.
- **Keyboard shortcut:** use `Ctrl/⌘ + K` to open and focus library search; `Escape` closes the mobile menu.

Planner tasks, saved courses, completed lessons, theme preference, and focus-session count are stored locally in the browser. No cloud sync or account backend is included yet.


## Practice Studio

AcedmiX includes a lightweight mixed-subject quiz experience with five sample questions, selectable answers, answer explanations, score feedback, and a locally persisted personal-best percentage. The sample question bank is demo content and can be extended in `src/App.tsx`.

The quiz, study planner, focus timer, saved courses, lesson completion, and appearance preference use browser local storage. They are device-local demo features; they are not synced between devices and do not require an account.
