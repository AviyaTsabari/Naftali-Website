# Naftali Studio — Implementation Plan

This plan turns `agents.md` into a phased build for the Naftali website: an artist studio and boutique shop for wood, stone, and wood-and-glass work, plus poetry.

**Priority:** a reliable, attractive, and maintainable foundation. Ship working core flows first. Do not implement postponed features in the first phase.

**First working slice:** project structure → frontend and backend run → REST connectivity → pages load → nav works → product and poetry cards render → basic cart works.

### Technology (do not replace without approval)

| Layer | Stack |
| --- | --- |
| Frontend | Angular, TypeScript |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| API | REST, typed models and consistent contracts |

**Secrets:** read `OPEN_ROUTER_API_KEY` only on the backend from `.env`. Never hardcode, log, or expose keys in Angular. Keep `.env` out of Git. Do not call OpenRouter in phase 1.

### Development rules

1. Inspect architecture, dependencies, and conventions before changing code.
2. Preserve working code; avoid premature abstractions and extra dependencies.
3. Implement incrementally and verify each core feature before the next.
4. Use placeholders when real content is missing.
5. Never invent business information, contact details, product descriptions, poems, or prices.
6. Do not implement postponed features.
7. Keep technical docs in English; all visitor-facing UI in Hebrew.

---

## Phase 0 — Inspect

Map the current frontend, backend, database, env, gitignore, and conventions. Plan the smallest path to a running app.

Inspect the existing repo first and adapt structure to what already works. Suggested layout if starting fresh: `frontend/` (pages, shared, services, models) and `backend/` (`api`, `models`, `schemas`, `services`, `database`).

Working method:

1. Inspect the repo.
2. Follow existing conventions.
3. State a short change plan.
4. Make small focused edits.
5. Avoid extra files and dependencies.
6. Run checks and fix errors before moving on.
7. Say what shipped and what is still open.

If something is unclear, take the simplest reversible path and document the assumption. Ask only when missing facts block implementation.

**Principle:** build, test, verify, then expand. Functioning foundation over a fully featured product.

### Findings (completed)

This repository is greenfield. There is no existing application to preserve.

| Area | Current state |
| --- | --- |
| Git | Branch `main` tracking `origin/main`. Only [README.md](../README.md) is tracked (`# Naftali-Website`). Remote: `https://github.com/AviyaTsabari/Naftali-Website.git`. |
| Frontend | None. No `frontend/`, Angular app, `package.json`, or global `ng` CLI. |
| Backend | None. No `backend/`, FastAPI app, or `requirements.txt`. |
| Database | None in-repo. Local `psql` is not installed. Docker is available (`29.9.2`) if PostgreSQL is needed later. |
| Env | Root `.env` exists and is untracked. It defines `OPEN_ROUTER_API_KEY` only. Do not use this key until the later AI phase. |
| Gitignore | Was empty (0 bytes), so `.env` was not ignored. Now ignores `.env` plus Angular/Python build artifacts (`node_modules/`, `dist/`, `.angular/`, `venv/`, `__pycache__/`). |
| Docs | [agents.md](../agents.md) (product instructions), [docs/plan.md](plan.md) (this plan), stub README. |
| Machine | Node `v24.18.0`, npm `11.16.0`, npx available. Python `3.12.10` with pip and `venv`. |

### Assumptions

- Adopt the suggested `frontend/` + `backend/` split. There is no older layout to adapt.
- Scaffold Angular with `npx @angular/cli` (no global `ng`).
- Run FastAPI from a `backend/venv` virtualenv.
- Do not introduce PostgreSQL in Phase 1–2. Configure it in Phase 3 when typed API data needs a store; use Docker if a local server is still missing.
- Do not invent products, poems, contact details, or prices.
- Hebrew RTL belongs in Phase 1, not later.

### Smallest path to a running app (Phase 1)

1. Scaffold `frontend/` as an Angular TypeScript app with `lang="he"` and `dir="rtl"`.
2. Add shared header, nav, footer and four empty routes: Home, Poetry, Shop, Contact.
3. Scaffold `backend/` as FastAPI with a health endpoint.
4. Confirm `ng serve` (or equivalent) and `uvicorn` both start.

No extra features, auth, payments, WhatsApp, or OpenRouter in that step.

---

## Phase 1 — Skeleton

- Angular app with RTL Hebrew shell (header, nav, footer, four routes: Home, Poetry, Shop, Contact).
- FastAPI health (or equivalent) endpoint.
- Confirm both processes start.

Shared chrome: header, nav, footer.

Header: Home, Poetry, Shop, Contact, cart icon with item count (opens cart), Log In (modal preview only — no real auth).

Hebrew and RTL are mandatory from this phase, not a later add-on:

- Hebrew only in the UI: nav, headings, buttons, products, poetry, contact, forms, validation, cart, errors.
- No English UI, no language switcher, no mixed-language visitor text.
- Document `lang="he"` and `dir="rtl"`.
- Use logical CSS (`margin-inline`, `padding-inline`, `inset-inline`).
- RTL-correct nav, forms, icons, and responsive layouts.

Visual identity: boutique shop plus workshop — authenticity, craft, natural materials, elegance, luxury, simplicity, warmth.

Palette: warm ivory/parchment, deep walnut, charcoal, stone gray, muted bronze/brass.

Typography: clear hierarchy for headings, product names, descriptions, prices, nav.

Layout: whitespace, consistent spacing, elegant cards, subtle borders/shadows, restrained motion, large images when available.

Avoid generic ecommerce templates, loud color, clutter, and heavy animation.

---

## Phase 2 — Pages with mock data

Login remains a visual preview only. The AI assistant and WhatsApp newsletter stay as “Coming Soon” UI; do not collect phone numbers, call an AI service, or simulate AI responses.

### Home

- Hero: Gidona background; wood and stone; boutique wood-and-glass work; poetry; craft and contemporary luxury.
- Links to Poetry, Shop, Contact.
- Featured products and/or poems from placeholder data.
- Reserved assistant area with Hebrew equivalent of “Studio Assistant — Coming Soon”. No AI calls or fake answers.

### Poetry

- Responsive cards: date as title, optional excerpt, link to full poem.
- Mock data only; do not invent poems as Naftali’s work.
- WhatsApp newsletter: non-functional “Coming Soon” preview.

### Shop

Categories:

1. Mezuzahs
2. Hanukkiahs
3. Boutique furniture

Each category has its own page or view.

Product card: image, name, price, add-to-cart. Example name: `דגם תמר`.

Images: reusable branded placeholder/logo when missing. No unrelated stock photos.

Do not invent product descriptions or prices. If temporary prices are needed, clearly mark them as mock data.

### Contact

Phone and email placeholders until real details exist. Then make them clickable. Do not invent contact info.

---

## Phase 3 — Cart and API contract

Typed models:

- **Product:** `id`, `name`, `category`, `price`, `currency`, `image`, `description`, `available`.
- **Poem:** `id`, `date`, `title`, `body`. Card title is the date.
- **Cart item:** `productId`, `productName`, `price`. Use stable IDs. Do not assume a currency until Naftali confirms it.

REST: typed contracts for products and poems even if served as mock or simple endpoints. Frontend consumes backend. Requests and responses follow consistent structures. Errors are handled properly.

Cart:

- Adding products.
- Displaying cart items and quantities.
- Updating quantities.
- Removing products.
- Displaying the subtotal.
- Updating the cart icon count.
- Persist cart contents locally when practical.
- A user can add a maximum of 1 of each item to the cart.
- “Checkout Coming Soon”; no payment fields; do not request payment details or imply that an order has been completed.
- Keep the shop structured so payment can be added later without rebuilding it.

PostgreSQL is configured with environment variables for the initial application needs. Database credentials are never hardcoded.

---

## Phase 4 — Verify foundation

The initial foundation is complete when:

- The project starts successfully.
- Angular and FastAPI run correctly and talk to each other over REST.
- PostgreSQL is configured appropriately for the initial application needs.
- All four main website sections are accessible.
- Navigation works on desktop and mobile.
- The design is consistent with the intended artistic identity.
- Poetry cards render from mock data.
- Shop categories render correctly.
- Product cards display placeholder images when actual images are unavailable.
- Products can be added to the shopping cart.
- Cart contents can be viewed and modified.
- Checkout is clearly marked as unavailable.
- Contact information placeholders are displayed.
- Login is a visual preview only.
- No real credentials or payment information are collected.
- AI, WhatsApp, and administrator functionality remain unimplemented.

Verification checklist:

**Frontend:** Angular application starts successfully; all main pages load; navigation works; responsive RTL layout works; product cards render correctly; poetry cards render correctly; missing product images display the placeholder; shopping cart interactions work.

**Backend:** FastAPI starts successfully; API endpoints respond correctly; API validation works; error responses are handled properly.

**Database (when introduced):** PostgreSQL connection works; database configuration uses environment variables; database credentials are never hardcoded.

**REST:** Angular can communicate with FastAPI; API requests and responses follow consistent structures; errors are handled properly.

**General:** no broken routes; no unnecessary console errors; no exposed credentials; no broken responsive layouts; keyboard navigation works; forms have appropriate labels; buttons have clear functionality.

Fix broken routes, console noise, RTL/responsive issues, labels, and keyboard access before any later feature.

---

## Later — Out of scope

Do not implement these during the initial foundation:

- Auth and roles (customer vs administrator). Customer sign up, login, logout, saved carts, purchases, and order history. Secure administrator login. Backend-only security; no fake admin password; no frontend-only auth. When implemented, authentication and permissions must be handled securely on the backend.
- Database-backed products, poems, customers, shopping carts, orders, and product categories.
- Administrator dashboard: add/edit/delete products and poems, manage categories, upload product images, view and manage customer orders.
- Payments: checkout, payment gateway integration, order confirmation, order history.
- WhatsApp: newsletter subscriptions, automatic notifications when new poems are published, unsubscribe functionality. Future implementation must include explicit user consent, clear subscription terms, WhatsApp integration, and an unsubscribe mechanism.
- OpenRouter AI on the backend: search products; search poems; find poems by date or writing style; find products by design or style; answer questions about products; help prepare an order. Never expose the API key to the frontend. Any AI-assisted order creation must require explicit user confirmation and use the same validated order flow as the regular shop.
