<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Agent guide

This is the source of truth for any agent (human or LLM) working in this repo. Read it before writing code. It exists so that a cold-start agent produces code indistinguishable from the existing codebase, and so several agents can work in parallel without colliding.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (Radix, `radix-nova` style) · lucide-react · next-themes · Vitest + Testing Library · Playwright. Data from the DummyJSON REST API. Node 20+ (`.nvmrc`). Package manager: npm. Path alias: `@/*` → `src/*`.

## Golden rules

1. **Write the minimum code that fully solves the task.** No speculative abstraction, no options nobody asked for, no "while I'm here" refactors. Fewer lines is the goal, not more.
2. **No comments unless the logic is genuinely non-obvious.** The existing code is almost comment-free. A comment earns its place only when it explains a *why* the code can't (a workaround, a spec edge case, a non-obvious constraint). Never narrate *what* the code does. See `tests/setup.ts` for the bar: comments only where a mock exists for a subtle reason.
3. **Don't token-maxx.** Don't restate the task back, don't dump whole files you just read, don't explain obvious code. Read only what you need. Keep prose tight. Prefer diffs over reprinting files.
4. **Match the surrounding code.** Copy the idioms already in the target file/layer before inventing your own. Consistency beats personal preference.
5. **Read before you write.** The Next.js APIs here differ from training data (see the block above). When touching routing, data fetching, `Image`, metadata, or server/client boundaries, confirm against `node_modules/next/dist/docs/`.
6. **Verify before claiming done.** Run the relevant checks (below). If something fails or is skipped, say so plainly.

## Architecture

Components compose strictly **upward** — a layer may import from layers below it, never sideways-up:

```
ui (shadcn primitives) → atoms → molecules → widgets → app/ pages
```

| Path | Role | Client/Server |
|------|------|---------------|
| `src/app/**` | Routes. Pages fetch data and stay server components. | Server by default |
| `src/components/ui/**` | shadcn primitives. Add via shadcn CLI; don't hand-write. | — |
| `src/components/atoms/**` | Smallest domain pieces: `Price`, `Rating`, `Discount`. Pure, prop-driven. | Server unless interactive |
| `src/components/molecules/**` | Small compositions: `ProductCard`, `QuantityStepper`. | — |
| `src/components/widgets/**` | Feature-level components wired to the cart/theme/scroll. | Mostly `"use client"` |
| `src/store/cart.ts` | Module-singleton cart via `useSyncExternalStore` + `localStorage`. | Client |
| `src/lib/api.ts` | DummyJSON fetchers. | — |
| `src/lib/types.ts` | `Product`, `CartItem`. All shared types live here. | — |
| `src/lib/utils.ts` | `cn()` only. | — |

**Server-first rule:** add `"use client"` *only* when a component needs interactivity, browser APIs, or the cart/theme store. Pages do the fetching and pass data down. Deeper background: [`docs/architecture.md`](./docs/architecture.md); component catalog: [`docs/components.md`](./docs/components.md).

## Conventions (copy these)

- **Components:** function components, `export default`. Props typed inline for tiny atoms (`{ value }: { value: number }`) or as a local `type Props = {…}` for larger ones. `memo` only where a component re-renders in a list (see `ProductCard`).
- **Types:** shared types go in `src/lib/types.ts`. `CartItem = Product & { quantity: number }` — extend, don't duplicate.
- **Data:** all network calls go through `src/lib/api.ts` and throw on `!res.ok`. Don't `fetch` inline in components.
- **Styling:** Tailwind utilities only; compose conditional classes with `cn()`. Class order is auto-sorted by Prettier — don't fight it.
- **Cart mutations:** go through `useCart()` (`add`/`decrement`/`remove`). The store must always assign a **new array** so `useSyncExternalStore` detects the change — never mutate `items` in place. `EMPTY` is a shared read-only constant; never push into it.
- **Formatting is enforced, not optional:** semicolons, double quotes, trailing commas, 80-col, 2-space. Run `npm run format` — don't format by hand.

## Commands

```bash
npm run dev            # dev server (Turbopack)
npm run lint           # eslint
npm run format         # prettier (also sorts tailwind classes)
npm test               # vitest: unit + integration + contract
npm run test:unit      # fast unit-only loop
npm run test:types     # tsc against tests
npm run test:e2e       # playwright (Chromium, builds first — slow)
```

**Verification loop for any change:** `npm run lint && npm test && npm run test:types`. Touched routing/pages/UX? Also run the relevant `test:e2e` spec or `npm run dev` and check. `contract` and `e2e` tests hit the live API/build and need network — skip only when offline, and say you skipped them.

## Testing

Four layers live in `tests/`: `unit/`, `integration/`, `contract/` (live DummyJSON), `e2e/` (Playwright). Reuse the helpers — don't reinvent:

- `tests/utils/fixtures.ts` — `makeProduct(overrides)`, `makeProducts(count)`, `mockProduct`.
- `tests/utils/cart.ts` — `resetCart()`; call it in `beforeEach` for any test that touches the cart (the store is a module singleton).
- `tests/setup.ts` — global mocks (`next/image`, `matchMedia`, `IntersectionObserver`, Radix pointer shims). Trigger scroll in tests via `IntersectionObserverMock.instances`.

New component → add a unit test next to its peers. New user-facing flow → add/extend an integration test. Full details: [`docs/testing.md`](./docs/testing.md).

## Working a single task (feature / bug)

1. **Locate.** Find the layer it belongs to (table above) and read the target file + its nearest sibling for the pattern.
2. **For a bug:** reproduce with a failing test first, then fix, then confirm the test passes. Don't fix by reading alone.
3. **Implement** the smallest change that satisfies the requirement, in the correct layer.
4. **Test** at the matching layer; add/extend, don't duplicate.
5. **Verify** with the loop above.
6. **Report** concisely: what changed, what you ran, anything skipped.

## Breaking down an epic

When a task is large, decompose it into subtasks that can be executed — ideally by separate agents — **independently and in parallel**. A good subtask:

- **Owns disjoint files.** Two subtasks running at once must not edit the same file. Split along the architecture layers, which are already designed for this (a new atom, the molecule that uses it, and the widget that wires it are three subtasks with clean seams).
- **Has an explicit contract.** State the exact function/component signature and types *up front* so a downstream subtask can code against it before the upstream one is merged. Put shared types in `src/lib/types.ts` first, as its own subtask, so everything else can import them.
- **Is independently verifiable.** Each subtask ships with its own test(s) and passes the verification loop on its own.
- **Is small.** If a subtask can't be described in a sentence and its diff won't fit in a glance, split it again.

**Recommended decomposition order** for a feature spanning layers:

1. **Contracts** — add/extend types in `src/lib/types.ts` and any `lib/api.ts` signatures. Everything downstream imports from here.
2. **Data layer** — `lib/api.ts` fetchers and `store/` changes. Independent once types exist.
3. **Presentation, bottom-up** — atoms → molecules → widgets. Each layer is a parallelizable subtask once the layer below has a defined interface (code against the signature; a stub is fine until it lands).
4. **Wiring** — the page/route that composes the widgets.
5. **Tests + docs** — per-layer tests can be written alongside each subtask; e2e for the whole flow last.

Write the plan as a checklist of these subtasks with their file ownership and contracts stated, so any agent can pick one up cold and finish it without waiting on a conversation.

### Multi-agent contract

When several agents work concurrently:

- **Declare file ownership per subtask; do not touch files another subtask owns.** If two subtasks genuinely need the same file, that file is a *seam* — make it its own upfront subtask (usually types/contracts) that lands before the others start.
- **Depend on interfaces, not implementations.** Import the agreed type/signature and build against it even if the other side is still a stub.
- **Leave the tree green.** Every subtask lands with lint + its tests passing so the next agent starts from a working state.
- **No cross-cutting reformatting.** Don't reformat, rename, or "tidy" files outside your subtask — it creates conflicts and hides the real diff.

## Definition of done

- Solves the stated task and nothing more.
- Lives in the right layer; follows the conventions above.
- No stray comments; no dead code; no unused imports.
- Tests added/updated at the matching layer; `npm run lint && npm test && npm run test:types` green.
- Report states what ran and what (if anything) was skipped and why.
