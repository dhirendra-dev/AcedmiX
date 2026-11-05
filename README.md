# AcedmiX

**Learn with intention. Practice with focus. Make measurable progress.**

AcedmiX is a responsive learning workspace built with React, TypeScript and Vite. It brings course discovery, study planning, focused sessions, progress tracking and interactive practice into one calm, editorial interface.

## Included

- Welcome and learning dashboard
- Searchable course library with course details and lesson progress
- Study planner with locally saved tasks
- Focus timer with focus and break sessions
- Saved courses and persistent appearance preference
- Practice Studio with multiple-choice questions, explanations, scoring and personal best
- Responsive navigation and dark theme
- Keyboard shortcuts: `Ctrl/⌘ + K` to open library search, `Esc` to close the mobile menu

## Tech stack

- React 19
- TypeScript
- Vite
- Lucide React
- CSS design system with responsive and dark-theme support

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  App.tsx       Main application and page flows
  main.tsx      React entry point
  styles.css    Design system, responsive layout and themes
public/
  favicon.svg
docs/
  DESIGN_SYSTEM.md
.github/
  workflows/
```

## Current data and integration status

This repository is a frontend starter. Course progress, planner tasks, focus sessions, saved courses, theme settings and practice best scores are stored in the browser using `localStorage`.

There is currently no production authentication, cloud database, cross-device sync, real AI service, teacher portal or live question-bank integration. Sample courses and practice questions are demonstration content. Do not treat demo scores as official exam results.

## Before production launch

1. Install dependencies and run `npm run build`.
2. Add authentication and a server-side database before storing student accounts or syncing progress.
3. Connect any AI service through a protected server endpoint; never expose private API keys in browser code.
4. Replace demo content with reviewed material that you have permission to distribute.
5. Add automated browser tests, accessibility checks, privacy information and appropriate security rules.

## License

MIT. See [LICENSE](LICENSE).


<!-- Source unpack trigger: project files are being expanded from the uploaded archive. -->
