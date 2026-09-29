# Sukoon — Healing Marketplace (Clickable Prototype)

A front-end-only clickable prototype for a curated Pranic / energy-healing marketplace.
No backend, no real accounts, no payments — illustrative data only. Built to show the
concept in partnership meetings and to hand to an engineer as a reference.

> "Sukoon" is a placeholder brand name. Rename freely.

## Run it

Two ways:

1. **Double-click `index.html`** — it opens in any browser and works fully offline.
   (Uses classic scripts + relative paths on purpose, so `file://` works.)
2. **Local server (nicer):** from this folder run `npm start` (needs Node), then open the shown URL.

## Project structure

```
sukoon-app/
  index.html        # entry point, mounts the app + tab bars
  css/styles.css    # all styling / design tokens
  js/data.js        # mock data (healers, courses, bookings, etc.)
  js/screens.js     # one render function per screen (view layer)
  js/app.js         # tiny router + state + navigation
  FEATURES.md       # every feature included, mapped to a screen
```

## Architecture notes (for the engineer who takes this further)

- This is a **presentation prototype**, not production code. State lives in memory.
- The real build should be **one backend (DB + auth + API)** with a **web app (PWA)** and a
  **native app** as two front-ends on the same backend — same account, same data.
- Suggested real stack (cheap, free tiers): Supabase (DB/auth) + Vercel (hosting) +
  a video SDK (100ms/Jitsi) + Razorpay/Stripe (payments, held-in-escrow pattern).
- Data model must, from day one, support: a booking with **multiple healers** (group cases),
  a healer with a **parent mentor** (apprentice model), and **per healer–client pair**
  attribution for commission.
