# DESIGN — Stamp Rally

## Tone
Nostalgic, tactile, warm — well-worn passport, not sterile SaaS. No glassmorphism, no arbitrary gradients.

## Typography
- Display: `DM Serif Display` serif for stamp initials / headings (officialdom)
- Body: `Inter` sans for memory/metadata
- Hierarchy: H1 app title > summary > card placeName > metadata

## Color
- Semantic: `paper #fdf8ef` / `paper-dark #f5ecd8` bg, `ink #1a1a1a`, `muted #6b5d4d`, `border #e8ddd0` (warm cream, not stark white)
- Accents fixed 5 only for ink stamp: red #c1272d, blue #1e3a8a, green #166534, purple #6b21a8, gold #a16207 (border darker). Not reused in chrome.

## Shape & Surface
- Cards `rounded-xl` paper-corner, modest radius, not pill
- Stamp: true circle 96px, `border-[3px]` + `boxShadow: inset highlight + shadow + inset dark` for ink texture, `textShadow`
- Per-card tilt via `rotate(tiltDeg)` + `animate-stamp-in` settle

## Layout
Top→bottom: Header (H1 + tagline) → SummaryBar (pill counts) → Actions (+ Add stamp + filter All/Stamped/Dream) → Form inline max-w-xl (optional) → Grid (`grid-cols-1 sm:2 lg:3`, gap-4) → EmptyState dashed

## Components
- **SummaryBar**: rounded-xl white border, "12 Stamped · 4 Dreaming"
- **InkStamp**: circle, initials 1-3 uppercase, tracking-widest, faded opacity-50 for dream
- **StampCard**: `li` with badge absolute `Dream Destination` amber / `Stamped` emerald, `h3` placeName, date muted, memory, buttons `Mark as visited` + `Delete` → `Confirm delete?` + `Cancel` (aria-live)
- **AddStampForm**: form `aria-label`, h2, labels tied, radiogroup status, date, radiogroup color swatches `h-11 w-11` aria-label per swatch, textarea memory counter, error `role="alert"`, buttons 44px

## Spacing
Consistent scale, generous card p-5 so stamp has room. Header mb-6, bar mb-4, grid gap-4.

## Motion
- `stamp-in` 0.45s cubic-bezier(0.34,1.56,0.64,1): scale 1.8→0.95→1 + tilt
- Confirm transition subtle, no gratuitous animation

## Responsive
- Mobile ≤640: 1 col, full-width form, touch ≥44×44
- Tablet 641-1024: 2 col
- Desktop 1025-1439: 3 col + centered dialog/panel
- Wide ≥1440: 3-4 col but `max-w-6xl` constrained
- No horizontal overflow: `break-words`, wrap long names/memory
- No hover-only: all actions click/tap+keyboard

## Accessibility
- Semantic: `form`, `label htmlFor`, `ul/li` grid, single `h1`
- Color picker keyboard operable, `aria-checked`, `aria-label` per swatch
- Focus `focus-visible:ring-2` on all interactive
- Delete confirm `aria-live="polite"` + label change
- Status not color alone: text badge
- Contrast: white text on 5 saturated bg via border darker tone

## Visual QA
- Stamp must read as rubber ink, not plain flat circle
- Tilt visible -6..6 but not chaotic
- Dream dashed/faded instantly distinguishable
- Overall passport warm tactile, intentional
