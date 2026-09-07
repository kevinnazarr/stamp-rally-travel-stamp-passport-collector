# PRD — Stamp Rally: Travel Stamp Passport Collector

## 1. Vision
Personal digital passport — log visited places & dream destinations as stamped cards. Nostalgic/tactile, offline, no accounts.

## 2. Target User
Traveler / aspirational traveler wanting lightweight souvenir log, not travel planner.

## 3. Problem
Travel memories scattered; no single delightful low-friction place for stamped memories + bucket list.

## 4. Goals
- Complete SPA, polished, responsive, tested
- Add/view/delete/convert stamps, summary counts, localStorage persistence

## 5. Tech Stack
React + Vite + TypeScript + Tailwind CSS + Vitest + Testing Library. No backend, no auth, no router, no state lib.

## 6. User Journey
Open → empty or passport + summary → Add stamp → fill place/date/color/memory/status → submit → card appears with animation + counts update → delete (confirm) / convert dream→stamped → refresh persists.

## 7. Requirements (P0)
- Form: place name*, status (stamped/dream default stamped), date picker (label Date visited / Target date optional), color palette 5 (red/blue/green/purple/gold), memory textarea optional 1-2 sentences (200 chars)
- Card: rectangular passport page, large circular CSS-only ink stamp (initials, color, tilt -6..6 stable), grid passport pages
- Dream: dashed border + faded; Stamped: solid
- Summary bar top: total stamped vs dream remaining (e.g. "12 Stamped · 4 Dreaming")
- localStorage single key `stamp-rally:v1` JSON array, survives refresh
- Delete requires 2-step confirmation (no silent, no window.confirm)
- No backend, no login

## 8. Requirements (P1)
- Dream→Stamped conversion (mark as visited, default today if no date)
- Validation inline (place required, memory ≤200)
- A11y: labels, focus states, keyboard operable color picker & delete, aria-live, text label for status
- Malformed localStorage graceful fallback (empty, no crash)

## 9. Requirements (P2/P3)
- Press animation, filter All/Stamped/Dream, paper-grain details
- Export/clear-all, legend (optional)

## 10. Data Model
```
Stamp { id, placeName, status: stamped|dream, dateVisited: ISO|null, color: 5, memory, initials, tiltDeg, createdAt }
```

## 11. Business Logic
- Initials: first letter of up to 3 significant words (ignore stopwords), single word → 1-2 letters
- Tilt: random -6..6 stable at creation
- Counts: derived `filter(status)`, never stored
- Conversion: dream→stamped, keep id, default date today if null
- Delete: arm → confirm → remove

## 12. Persistence & Errors
- Load `JSON.parse` try/catch, absent → [], invalid array/items → fallback []
- Save `JSON.stringify` try/catch, write failure → keep in-memory + non-blocking notice

## 13. Acceptance Criteria (Gherkin)
- Valid add → card appears styled + counts update
- Empty place → rejected + inline error
- Delete 1 click → not removed + confirm shown; 2nd → removed + count down
- Dream mark as visited → solid + stamped count up
- Reload with valid data → intact (status/color/tilt)
- Corrupted data → empty state no crash
- Mobile single column no overflow

## 14. Non-Functional
- Responsive mobile 1 col / tablet 2 / desktop 3 / wide max-w-6xl
- A11y, security (text escaping), performance (< tens entries, no virt)
- Tests: 5 coverage areas mandatory, production build succeeds, no console errors

## 15. Out of Scope
Trips, users, albums, backend, auth, image upload, routing lib.
