# AcedmiX Design System

## Visual idea

AcedmiX treats learning like a considered editorial publication: spacious layouts, strong typographic hierarchy, warm paper surfaces, restrained color, and small geometric illustrations. The interface avoids stock photography and uses CSS-built abstract artwork so the visual system stays lightweight and consistent.

## Foundations

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F5F0E8` | Main page background |
| `--paper-soft` | `#FAF7F1` | Elevated content surfaces |
| `--paper-deep` | `#EAE2D6` | Soft controls and separators |
| `--ink` | `#1B1A17` | Primary text |
| `--muted` | `#81796F` | Secondary text |
| `--forest` | `#173F35` | Learning and featured surfaces |
| `--forest-deep` | `#102F28` | Deeper forest tone |
| `--ember` | `#C95132` | Calls to action and emphasis |
| `--line` | `#DED6CA` | Borders and dividers |

### Typography

- Display: Playfair Display, with Georgia as a local fallback.
- Interface: DM Sans, with Helvetica/Arial fallbacks.
- Headlines use a light editorial weight and compact leading.
- Eyebrows use uppercase labels with generous tracking.
- Body copy is intentionally quiet and comfortably readable.

Fonts are loaded from Google Fonts when network access is available. The complete interface remains usable with system fallbacks.

## Layout principles

- Use a warm canvas rather than pure white.
- Keep content widths controlled on large screens.
- Use a fixed bottom navigation on small screens and a persistent sidebar on desktop.
- Keep tap targets comfortable and preserve safe-area padding on mobile.
- Use borders and tonal changes before adding shadows.
- Respect `prefers-reduced-motion`.

## Core components

- **Brand:** serif wordmark with the final X in ember.
- **Button:** compact rectangular actions; dark ink for neutral primary actions and ember for course actions.
- **Category tile:** tinted icon field, serif category name, and small supporting note.
- **Course card:** abstract art header, category, concise title/description, and metadata.
- **Lesson row:** numbered or completed state, lesson metadata, and a completion toggle.
- **Progress ring:** CSS conic gradient driven by locally saved lesson completions.
- **Toast:** brief feedback for local interactions.

## Responsive behavior

- Desktop: sidebar navigation, top utility bar, and a centered reading column.
- Tablet: tighter side navigation and adaptive course layouts.
- Mobile: no sidebar, compact top bar, four-item bottom navigation, stacked content, and full-width course details.

## Content tone

Use calm, encouraging language. Prefer clear guidance over gamified pressure. Avoid fabricated learner identity, rankings, or performance claims. Sample catalog and profile values are demo content only.

## Interaction patterns added in the study-studio update

- Planner tasks use a compact checklist pattern with subject labels, completion toggles, and explicit removal controls.
- Focus uses a three-preset timer (25/5/15 minutes), pause/resume, reset, and a completed-session counter.
- Course details expose a saved-course action; the library can filter to saved courses.
- Appearance preference switches between the editorial light palette and a dark forest/charcoal palette.
- `Ctrl/⌘ + K` opens the learning library and focuses its search field; `Escape` dismisses the mobile menu.

All of these demo preferences are stored in browser local storage. They are device-local and are not synchronized between accounts or browsers.
