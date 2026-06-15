# Simon's Dog Sitting — Roadmap

## Design direction (decided)
**Keep the warm, branded identity** (cream + terracotta + paw mark, rounded display type).
Rationale: in a market owned by Rover/Wag (utilitarian, transactional), a distinctive
*warm & trust-forward* identity is the differentiation — not a generic native look.
- A native-iOS restyle of the sitter profile was explored as a proof and reverted to stay
  consistent. It lives in git history (commit `4ccc09b`) if we ever want to mine ideas
  (system font, grouped inset lists, monogram avatars).

## How we work (cadence)
1. Pick **one** idea, smallest shippable slice.
2. Build on the warm base → verify in the browser preview.
3. Push to `main` → Vercel auto-deploys → test on iPhone via Expo Go.
4. Iterate. Keep this file updated.

## Feature backlog (prioritized)

### P1 — Trust pillar (our angle; what wins vs Rover)
- [ ] **Post-walk report card** — mood, pee/poo, distance, photos after each walk.
      *(Quick win: extends the existing live-walk completion screen. Great first build.)*
- [ ] **Dog health record** — vaccines, allergies, vet contact; shared with the sitter.
- [ ] **Insurance (AXA-style)** — coverage badge + claim flow. High trust value, but heavy
      (partnership + legal) → design the UX, stub the backend.
- [ ] **Live GPS + SOS** during the walk (extends the live tracking we already have).

### P2 — Retention / habit
- [ ] **Recurring walks / subscription** ("every Mon & Wed") — the real revenue engine.
- [ ] **"Paw passport" loyalty** — stamps per walk → tiers → discount. (Gamification done
      tastefully, not gadget badges.)
- [ ] **Referral** — invite a friend, both get credit.

### P3 — Core marketplace (table stakes to not lose users)
- [ ] **Multi-day boarding** (pension) — beyond single walks.
- [ ] **Vetted professional sitters** — pro tier / verification levels.
- [ ] **Sitter dashboard** — availability calendar, earnings, requests.
- [ ] **Instant book** vs request-to-book.

### P4 — Monetization & expansion
- [ ] **Add-ons**: bath, treats, photo package, premium long walk.
- [ ] **Premium placement** for sitters.
- [ ] **Local community**: park meetups, lost-dog alerts (warm/local edge vs Rover).
- [ ] **Tele-vet** consultation partnership.

## Tech notes
- Expo **SDK 56** (latest). Flow code in `flow/`, routes in `app/`.
- **Testing = Vercel web URL** (same code, full-screen in Safari) — no Expo Go / no local `expo start` needed.
- True **SF Symbols** and **Liquid Glass** materials need a *development build* (separate, later track).
- Deploy: `git push` → Vercel (`vercel.json`: `expo export -p web` → `dist/`).
