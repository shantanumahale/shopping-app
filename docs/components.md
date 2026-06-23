# Components

Grouped by atomic-design layer. Props are TypeScript-typed; see each source file.

## ui/ — shadcn primitives

| Component   | Source                        | Notes                                   |
| ----------- | ----------------------------- | --------------------------------------- |
| `Button`    | `components/ui/button.tsx`    | variants incl. custom `success` (green) |
| `Card`      | `components/ui/card.tsx`      | product + detail surfaces               |
| `Sheet`     | `components/ui/sheet.tsx`     | Radix Dialog — used by the cart drawer  |
| `Badge`     | `components/ui/badge.tsx`     | rating, discount, cart count            |
| `Separator` | `components/ui/separator.tsx` | cart totals divider                     |
| `Skeleton`  | `components/ui/skeleton.tsx`  | infinite-scroll loading state           |

## atoms/

| Component  | Props           | Description                |
| ---------- | --------------- | -------------------------- |
| `Price`    | `value: number` | `$0.00`, tabular numerals  |
| `Rating`   | `value: number` | star Badge (lucide `Star`) |
| `Discount` | `value: number` | `N% off` Badge             |

## molecules/

| Component         | Props                                    | Description                                        |
| ----------------- | ---------------------------------------- | -------------------------------------------------- |
| `ProductCard`     | `product`, `priority?`                   | image + title + price + rating + CTA; `React.memo` |
| `QuantityStepper` | `quantity`, `onIncrement`, `onDecrement` | `− qty +` control; `React.memo`                    |

## widgets/ (client, feature-centric)

| Component         | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `Header`          | Site name, Home, `ThemeToggle`, cart trigger (dynamic `CartDrawer`) |
| `ThemeToggle`     | Light/dark switch (lucide `Sun`/`Moon`) via next-themes             |
| `CartDrawer`      | Right-side `Sheet`: items, total, View cart, Proceed to Checkout    |
| `CartControl`     | "Add to Cart" → `QuantityStepper` once in cart                      |
| `CartItemRow`     | Cart line: image, title, line total, stepper, remove                |
| `CartView`        | `/cart` page contents (list + total + checkout CTA)                 |
| `CheckoutSummary` | `/checkout` order-total summary                                     |
| `ProductFeed`     | Infinite-scroll product grid (SSR seed + `IntersectionObserver`)    |

## store/ & lib/

| Module          | Exports                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| `store/cart.ts` | `useCart()` → `{ items, count, total, quantityOf, add, decrement, remove }` |
| `lib/api.ts`    | `getProducts(limit?, skip?)`, `getProduct(id)`                              |
| `lib/types.ts`  | `Product`, `CartItem`                                                       |

## Iconography (lucide-react / shadcn)

| Icon           | Where used                       |
| -------------- | -------------------------------- |
| `ShoppingCart` | header cart trigger, Add CTA     |
| `Sun` / `Moon` | theme toggle                     |
| `Star`         | product rating                   |
| `Plus`/`Minus` | quantity stepper                 |
| `Trash2`       | remove from cart                 |
| `X`            | sheet close (built into `Sheet`) |
