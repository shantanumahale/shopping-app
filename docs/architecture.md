# Architecture

## Folder structure

```
src/
  app/                       # App Router (server components by default)
    layout.tsx               # RootLayout — fonts, ThemeProvider, Header
    page.tsx                 # HomePage — fetches page 1 + total, renders ProductFeed
    products/[id]/page.tsx   # ProductDetailPage — dynamic route
    cart/page.tsx            # CartPage
    checkout/page.tsx        # CheckoutPage
    globals.css              # Tailwind + theme tokens (greyscale + blue/green/red)
  components/
    ui/                      # shadcn primitives (button, card, sheet, badge, …)
    atoms/                   # domain atoms (Price, Rating, Discount)
    molecules/               # ProductCard, QuantityStepper
    widgets/                 # feature-level client components (see below)
    theme-provider.tsx       # next-themes wrapper
  store/
    cart.ts                  # cart store (useSyncExternalStore + localStorage)
  lib/
    api.ts                   # DummyJSON fetchers
    types.ts                 # Product, CartItem
    utils.ts                 # cn() — shadcn class helper
docs/                        # this documentation
```

## Atomic design

The component layers compose strictly upward:

```
ui (shadcn primitives)  →  atoms  →  molecules  →  widgets  →  app pages
```

- **ui/** — generic, unstyled-by-default primitives from shadcn (Button, Card, Sheet…).
- **atoms/** — the smallest _domain_ pieces (`Price`, `Rating`, `Discount`).
- **molecules/** — small compositions (`ProductCard`, `QuantityStepper`).
- **widgets/** — page-level, **feature-centric client components** that wire UI to the
  cart store: `Header`, `ThemeToggle`, `CartDrawer`, `CartControl`, `CartItemRow`,
  `CartView`, `CheckoutSummary`, `ProductFeed`.

**Server vs client:** pages are server components and do the data fetching. Only the
pieces that need interactivity or browser state are `"use client"` (anything touching
the cart store, the theme, or scroll observers).

## Data flow

- **Initial render** — server pages call `getProducts()` / `getProduct(id)` from
  `lib/api.ts`. The home page passes the first page + total into `ProductFeed`.
- **Infinite scroll** — `ProductFeed` (client) observes a sentinel with
  `IntersectionObserver` and calls `getProducts(limit, skip)` to append the next page
  until `products.length === total`.
- **Cart** — `store/cart.ts` is a module-level store exposed via `useCart()`
  (`useSyncExternalStore`). It persists to `localStorage` and is SSR-safe via a
  `getServerSnapshot` returning an empty cart (no hydration mismatch).

## Theming

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- `<html suppressHydrationWarning>` so the pre-paint theme script doesn't warn.
- Tokens live in `globals.css`: greyscale neutrals for surfaces; `--primary` blue,
  `--success` green, `--destructive` red for CTAs.
- The toggle flips light/dark; icons swap via the `.dark` CSS class (no JS flash).

## CTA color semantics

| Action              | Variant       | Color |
| ------------------- | ------------- | ----- |
| Add to Cart         | `success`     | Green |
| Proceed to Checkout | `default`     | Blue  |
| Remove from cart    | `destructive` | Red   |

## Performance

- `React.memo` on `ProductCard` and `QuantityStepper`.
- `useCallback` for cart handlers (keeps memoized children stable).
- `useMemo` for the rendered product grid in `ProductFeed`.
- `next/dynamic` (`ssr: false`) code-splits the cart `Sheet` out of the initial bundle.
- `next/image` with `priority` on above-the-fold images and `sizes` for responsive
  loading; everything else lazy-loads.
- Infinite scroll keeps the initial DOM/payload small; skeletons cover load gaps.

## Accessibility

- The cart drawer uses shadcn `Sheet` (Radix Dialog) → focus trap, `Esc` to close,
  labelled dialog, restored focus.
- All icon-only controls have `aria-label`s (cart, theme toggle, quantity ±, remove).
- Visible focus rings via shadcn `focus-visible` styles; everything is keyboard
  reachable (Tab / Shift+Tab) and operable.
- Live regions (`aria-live`) announce quantity changes and the infinite-scroll status.
