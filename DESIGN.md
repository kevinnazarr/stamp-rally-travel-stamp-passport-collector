---
name: Stamp Rally
description: Nostalgic, tactile travel passport — warm paper, ink stamps, worn rotation. Personal offline souvenir.
colors:
  paper: "#fdf8ef"
  paper-dark: "#f5ecd8"
  ink: "#1a1a1a"
  muted: "#6b5d4d"
  border: "#e8ddd0"
  stamp-red: "#c1272d"
  stamp-red-border: "#8b1a1f"
  stamp-blue: "#1e3a8a"
  stamp-blue-border: "#14265c"
  stamp-green: "#166534"
  stamp-green-border: "#0f4623"
  stamp-purple: "#6b21a8"
  stamp-purple-border: "#4a1775"
  stamp-gold: "#a16207"
  stamp-gold-border: "#713f08"
typography:
  display:
    fontFamily: DM Serif Display
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.1
  h2:
    fontFamily: DM Serif Display
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.04em
  stamp-initials:
    fontFamily: DM Serif Display
    fontSize: 1.125rem
    fontWeight: 700
    letterSpacing: 0.12em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
components:
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 20px
  card-dream:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: 20px
  stamp:
    backgroundColor: "{colors.stamp-red}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    size: 96px
  stamp-red-variant:
    backgroundColor: "{colors.stamp-red}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-blue-variant:
    backgroundColor: "{colors.stamp-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-green-variant:
    backgroundColor: "{colors.stamp-green}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-purple-variant:
    backgroundColor: "{colors.stamp-purple}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-gold-variant:
    backgroundColor: "{colors.stamp-gold}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  summary-bar:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: 12px
  stamp-red-border-ref:
    backgroundColor: "{colors.stamp-red-border}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-blue-border-ref:
    backgroundColor: "{colors.stamp-blue-border}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-green-border-ref:
    backgroundColor: "{colors.stamp-green-border}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-purple-border-ref:
    backgroundColor: "{colors.stamp-purple-border}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  stamp-gold-border-ref:
    backgroundColor: "{colors.stamp-gold-border}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 12px
---

## Overview

Stamp Rally is a personal, offline travel passport. The UI evokes a well-worn paper passport — cream stock, ink stamps, slight rotation, tactile badges — not a sterile SaaS dashboard. Every interaction is local (localStorage), immediate, and warm. The circular ink stamp is the hero: saturated color, darker border, inset highlight, and per-card tilt (-6°..6°) for a rubber-stamp impression.

## Colors

Rooted in warm paper neutrals with five fixed ink accents used **only** for the stamp graphic.

- **Paper (#fdf8ef):** Cream page background, softer than white. Paper-dark #f5ecd8 for depth.
- **Ink (#1a1a1a):** Deep ink for headlines, primary actions.
- **Muted (#6b5d4d):** Dates, metadata, secondary text.
- **Border (#e8ddd0):** Card borders, dividers.
- **Stamp Red (#c1272d / border #8b1a1f), Blue (#1e3a8a), Green (#166534), Purple (#6b21a8), Gold (#a16207):** Fixed palette for the circular stamp. Each has a darker border for double-stroke impression. Never reused arbitrarily in chrome.

Dream destinations desaturate via dashed border + 85% card opacity + 50% stamp opacity + amber badge, versus solid + emerald badge for stamped.

## Typography

- **Display (DM Serif Display, 2.25rem/700):** App title "Stamp Rally", stamp initials. Slab-serif evokes officialdom.
- **H2 (DM Serif Display, 1.25rem):** "Add a stamp", card placeName.
- **Body (Inter, 0.875rem/1.6):** Memory text, dates, summary.
- **Label (Inter, 0.75rem/500, +0.04em):** Form labels, badges.
- **Stamp Initials (DM Serif Display, 1.125rem/700, +0.12em):** 1–3 uppercase initials inside the circle.

Hierarchy: H1 > Summary > Card Title > Metadata. Memory wraps, never clips.

## Layout

Top-down: Header (H1 + tagline) → SummaryBar (pill counts) → Actions (+ Add stamp + filter All/Stamped/Dream) → Form inline max-w-xl (when opened) → Grid → EmptyState.

- **Grid:** `1 col` mobile ≤640, `2 col` tablet 641–1024, `3 col` desktop 1025–1439, `max-w-6xl mx-auto` constrained on wide/ultrawide. Gap 16px. Cards `break-words`.
- **Form:** Full-width inline panel or centered dialog; never obscures whole passport on desktop.
- **EmptyState:** Centered dashed border, warm paper 60% opacity.
- Touch targets ≥44×44 for swatches, delete/confirm, mark-as-visited. No hover-only actions.
- No horizontal overflow at any breakpoint.

## Elevation & Depth

Subtle, paper-like. Cards `shadow-sm` on white, no heavy drop shadows. Stamp adds depth via layered `boxShadow: inset highlight (rgba 255 0.18) + 0 2px 6px rgba(0 0 0 0.15) + inset dark (0.12)` and `textShadow` for ink bleed. No glassmorphism, no gradients.

## Shapes

- Cards `rounded md 12px` — paper-corner, not pill.
- Stamp true circle `96px` `rounded pill 999px` + `border 3px` darker tone for double-stroke.
- Buttons `rounded sm 8px`, badges `pill`, summary `md`.
- Tilt applied via `rotate(tiltDeg)` CSS variable; entrance `stamp-in` animation settles.

## Components

- **SummaryBar:** White, `border stone-200`, shows "12 Stamped · 4 Dreaming" with large display numbers + muted labels.
- **InkStamp:** Circle 96px, bg/border per chosen stamp color, white initials, `aria-hidden`, faded variant for dream. Ink texture via inset shadows.
- **StampCard:** `li` flex column, badge absolute top-right (amber/dream vs emerald/stamped), stamp centered, placeName H2, date muted, memory, actions row: `Mark as visited` (dream only, ink bg) + `Delete` → `Confirm delete?` (red) + `Cancel` (aria-live polite).
- **AddStampForm:** `form aria-label`, H2, labeled inputs tied via htmlFor, radiogroup status, date, radiogroup color swatches `h-11 w-11` with `aria-label` per color, textarea counter `{memory.length}/200`, `role="alert"` error, submit 44px.
- **StampGrid:** `ul` grid, empty state when 0.

## Do's and Don'ts

**Do:**
- Keep stamp as hero — generous card padding so stamp breathes.
- Derive initials/tilt once at creation, store on record (`initials`, `tiltDeg`).
- Use derived counts from state, never stored.
- Render user text via React escaping, never `dangerouslySetInnerHTML`.

**Don't:**
- Reuse stamp accent colors in chrome/backgrounds.
- Re-randomize tilt on re-render.
- Use `<img>` or external icon for stamp shape (CSS only).
- Introduce backend, auth, or routing.
