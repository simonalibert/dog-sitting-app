# Project brief — Simon's Dog Sitting (for an AI assistant)

You are picking up an existing mobile app. Read this first, then `ROADMAP.md`.

## What it is
A warm, trust-forward **dog-sitting marketplace** mobile app. A 9-screen onboarding +
booking flow: Welcome → role choice → dog profile → sitter discovery (map) → sitter profile →
date/time → booking confirmation → success → **animated live-walk tracking**, plus a sitter
**chat** modal. Visual identity: cream background, terracotta accent, sage green, a paw mark;
rounded display type (Baloo 2) + Nunito body.

## Stack
- **Expo SDK 56** + **React Native 0.85** + **React 19** + **TypeScript**.
- **expo-router** (file-based) — routes in `app/`, but the whole app is effectively one route
  (`app/index.tsx`) rendering a state-machine flow.
- **react-native-svg** (icons, map shapes, live-walk route), `Animated` (transitions).
- **Supabase** (`@supabase/supabase-js`) — the sitter list is loaded from a `sitters` table.
- Runs on **web** (react-native-web) and is deployed to **Vercel** as a static export.

## How to run (web — easiest)
```bash
npm install
npm run web        # opens http://localhost:8081
```
Device (optional): `npm run start` then scan the QR with Expo Go (needs Expo Go that supports
SDK 56) — but the team tests via the web build, not Expo Go.

Build the static site (what Vercel runs): `npx expo export -p web` → output in `dist/`.

## Project structure
```
app/
  _layout.tsx          # Stack (header hidden) + SafeAreaProvider
  index.tsx            # renders <Flow/>
flow/
  Flow.tsx             # state machine: step 0..8, screen transitions, shared state, chat overlay
  data.ts              # types + static seed (SITTERS, DETAILS, DATES, TIMES, TAGS)
  supabase.ts          # Supabase client + fetchSitters() (falls back to the static seed)
  theme.ts             # design tokens (colors, radii, shadows, fonts, type ramp)
  icons.tsx            # custom SVG icons + the Paw glyph
  ui.tsx               # shared components (PrimaryButton, ImageSlot, NavChrome, Stars, ...)
  screens/             # Welcome, Choice, Dog, Discover, SitterProfile, DateTime,
                       # Booking, Success, LiveWalk, Chat
vercel.json            # buildCommand: expo export -p web → outputDirectory: dist
.env                   # EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY (anon key is public by design)
```

## Data / backend
- `flow/supabase.ts` reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from
  `.env` (committed; the anon/publishable key is public-by-design and the `sitters` table is
  read-only via RLS).
- `sitters` table columns: id, name, rating, reviews, price, dist, verified, x, y, big, avatar, sort.
- If Supabase is unreachable/unconfigured, the app falls back to the static `SITTERS` seed in
  `data.ts`, so it always runs.

## Notes / gotchas
- The "map" screens use a *stylized* map (SVG/Views), not real map tiles. Pin coords are in a
  322-px design space, scaled to the device width.
- The live-walk marker is an HTML/View element positioned over an SVG route by sampling the
  bezier path in JS (see `screens/LiveWalk.tsx`).
- Images: dog photo uses `expo-image-picker`; other avatars/photos are remote demo URLs
  (pravatar / Unsplash / dog.ceo).

## Roadmap
See `ROADMAP.md`. Next planned: real map background via **Mapbox Static Images API**, then an
AI post-walk "report card" (Claude via a Supabase Edge Function).
