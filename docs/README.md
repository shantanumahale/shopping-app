# Shopping App — Documentation

A small e-commerce app built with **Next.js (App Router) + TypeScript**, **shadcn/ui**,
**Tailwind CSS v4**, and the [DummyJSON](https://dummyjson.com) API.

## Docs index

- [Architecture](./architecture.md) — folder layout, atomic design, data flow, theming, performance, accessibility.
- [Components](./components.md) — catalog of UI primitives, atoms, molecules, and widgets.

## Tech stack

| Concern       | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 16 (App Router, RSC)                       |
| Language      | TypeScript                                         |
| UI components | shadcn/ui (Radix primitives) + Tailwind CSS v4     |
| Icons         | lucide-react (shadcn's icon set)                   |
| Theming       | next-themes (system default + toggle)              |
| Cart state    | Custom `useSyncExternalStore` store + localStorage |
| Data          | DummyJSON REST API                                 |

## Getting started

This project requires **Node 20+** (pinned via `.nvmrc`).

```bash
nvm use            # selects Node 20 from .nvmrc
npm install
npm run dev        # http://localhost:3000 (Turbopack)
```

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Dev server (Turbopack)               |
| `npm run build`        | Production build                     |
| `npm start`            | Serve the production build           |
| `npm run lint`         | ESLint                               |
| `npm run format`       | Prettier (incl. Tailwind class sort) |
| `npm run format:check` | Prettier check                       |

## Features

- **Home** — product grid with **infinite scroll** (initial page SSR'd, more on scroll).
- **Product detail** (`/products/[id]`) — image, description, price, discount, rating.
- **Cart** — add / increment / decrement / remove, persisted to `localStorage`.
- **Cart drawer** — slide-in `Sheet` from the header with a "Proceed to Checkout" CTA.
- **Checkout** (`/checkout`) — order-total summary stub.
- **Theming** — light/dark, defaults to the OS preference, with a manual toggle.
