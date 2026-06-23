# Testing

The project has four layers of tests.

| Layer           | Tool                             | Location             | What it covers                                           |
| --------------- | -------------------------------- | -------------------- | -------------------------------------------------------- |
| **Unit**        | Vitest + Testing Library + jsdom | `tests/unit/`        | Store logic, API client, atoms, molecules, widgets       |
| **Integration** | Vitest + Testing Library         | `tests/integration/` | Cart flow across components, the drawer, infinite scroll |
| **Contract**    | Vitest + Zod                     | `tests/contract/`    | DummyJSON response shapes the app depends on (live API)  |
| **E2E**         | Playwright (Chromium)            | `tests/e2e/`         | Full user journeys in a real browser against a built app |

## Commands

```bash
npm test                # all Vitest tests (unit + integration + contract)
npm run test:watch      # Vitest in watch mode
npm run test:unit       # unit only
npm run test:integration
npm run test:contract   # hits the live DummyJSON API
npm run test:types      # type-check the test sources (tsconfig.test.json)
npm run test:coverage   # Vitest with coverage
npm run test:e2e        # Playwright (builds + serves the app, then runs)
npm run test:e2e:ui     # Playwright interactive UI
```

First-time E2E setup downloads the browser:

```bash
npx playwright install chromium
```

## How it's wired

- **`vitest.config.ts`** — jsdom environment, `@` alias to `src/`, global setup in
  `tests/setup.ts`; only `tests/{unit,integration,contract}` are included (E2E is
  excluded and owned by Playwright).
- **`tests/setup.ts`** — registers jest-dom matchers and mocks the browser APIs jsdom
  lacks: `next/image`, `matchMedia` (next-themes), a controllable `IntersectionObserver`
  (drives the infinite-scroll test), `ResizeObserver`, and Radix pointer-capture APIs.
- **`tests/utils/`** — `fixtures.ts` (product factories) and `cart.ts` (`resetCart()`,
  which clears the singleton cart store between tests).
- **`playwright.config.ts`** — runs `npm run build && npm run start` as the web server,
  then exercises the app at `http://localhost:3000`.
- **`tsconfig.test.json`** — type-checks tests separately so the production build
  (`tsconfig.json` excludes `tests/`) stays fast and unaffected.

## Notes

- Contract and E2E tests require network access (live DummyJSON API).
- The cart store is a module singleton; unit/integration tests reset it via
  `resetCart()` in `beforeEach`.
