# Contributing

Thanks for helping build AcedmiX.

## Local setup

1. Install Node.js 22.12 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.

## Before opening a pull request

Run:

```bash
npm run typecheck
npm run build
```

## UI contribution guidelines

- Preserve the warm editorial design direction documented in `docs/DESIGN_SYSTEM.md`.
- Keep layouts responsive from 320px mobile width upward.
- Use semantic buttons and labels for interactive elements.
- Ensure every control has a working action or is clearly marked as unavailable.
- Support keyboard focus and `prefers-reduced-motion`.
- Keep demo data explicit; do not present sample metrics as real learner analytics.
