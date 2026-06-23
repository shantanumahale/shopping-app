# Shopping App

A small e-commerce app built with **Next.js (App Router) + TypeScript**, **shadcn/ui**,
**Tailwind CSS v4**, and the [DummyJSON](https://dummyjson.com) API — featuring a
product feed with infinite scroll, a persistent cart with a slide-in drawer, light/dark
theming, and an accessible, JIRA-inspired greyscale UI.

## Quick start

Requires **Node 20+** (pinned via `.nvmrc`).

```bash
nvm use
npm install
npm run dev   # http://localhost:3000
```

## Engineering notes

**Design decisions**

- **Server-first**: pages are React Server Components that fetch data; only cart, theme, and scroll bits are `"use client"`.
- **Atomic structure**: shadcn `ui/` primitives → `atoms` → `molecules` → `widgets` → pages, for predictable composition.
- **Cart store** via `useSyncExternalStore` + `localStorage` (not Context): SSR-safe through `getServerSnapshot`, no provider, no hydration mismatch.
- **shadcn/ui (Radix)** for accessibility out of the box (the cart `Sheet` gives focus-trap, `Esc`, ARIA).
- **Infinite scroll** seeds the first page server-side (good LCP/SEO), then appends via `IntersectionObserver`.

**Tradeoffs**

- **Infinite scroll over numbered pagination** — smoother UX, but no deep-linkable page URLs and a DOM that grows as you scroll.
- **Direct browser → DummyJSON fetches** (no API route/proxy) — less code, but no server-side caching, rate-limiting, or secret-keeping.
- **Cart stores a full product snapshot** — renders instantly offline, but price/stock can drift from the live API.
- **Module-singleton store** — minimal and global, at the cost of needing manual reset in tests.
- **`next/dynamic` (`ssr:false`) for the drawer** — smaller initial JS, but a brief non-interactive fallback button before hydration.

**Known limitations (technical)**

- Cart is **per-browser** (localStorage) — not synced across devices and lost if storage is cleared.
- Home product data is **build-time static** (no ISR/`revalidate`), so the first paint can be stale until a rebuild.
- `ProductFeed` has **no error/retry UI** if a client-side page fetch fails.
- The product grid is **not virtualized** — very long scroll sessions keep growing the DOM.
- Contract and E2E tests **require network** (live API) and the E2E run is **Chromium-only**.

## Documentation

See the [`docs/`](./docs) folder:

- [docs/README.md](./docs/README.md) — overview, tech stack, scripts.
- [docs/architecture.md](./docs/architecture.md) — structure, atomic design, data flow, theming, performance, a11y.
- [docs/components.md](./docs/components.md) — component catalog.
- [docs/testing.md](./docs/testing.md) — unit, integration, contract, and E2E tests.
