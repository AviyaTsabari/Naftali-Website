# Naftali Studio — Cursor Project Instructions

## 1. Project Overview

Build a refined website for Naftali, an artist and maker working with wood and stone, who also writes poetry.

Naftali was born and raised in the village of Gidona in the Valley. His work combines the authenticity and warmth of village life with the luxury, elegance, and refinement of the city.

His main products are boutique wood-and-glass creations, including mezuzahs, hanukkiahs, and furniture.

The website should present his work as both an online shop and an intimate artist's studio.

### Main Goal

The priority is to establish a reliable, attractive, and maintainable website foundation.

Start with the core structure and functionality. Verify that everything works correctly before adding advanced features.

The development process should remain simple, incremental, and easy to maintain.

Do not implement all planned features at once.

AI integration, payment processing, advanced authentication, WhatsApp automation, and administrator functionality will be added in later stages.

---

## 2. Development Principles

1. Inspect the existing repository before making changes.
2. Understand the current architecture, dependencies, and conventions.
3. Preserve existing working code whenever possible.
4. Avoid unnecessary complexity and premature abstractions.
5. Implement features incrementally.
6. Verify that each core feature works before proceeding.
7. Keep the code clean, modular, readable, and maintainable.
8. Do not introduce unnecessary dependencies.
9. Use placeholder content where real content is unavailable.
10. Never invent business information, contact details, product descriptions, or prices.
11. Do not implement features that are explicitly postponed.
12. Keep documentation updated.

### Important Development Rule

**Simplicity and functionality come first.**

The first objective is to build a working application, not a fully featured application.

Focus initially on:

- Establishing the project structure.
- Running the frontend and backend successfully.
- Establishing communication between the frontend and backend.
- Verifying that the main pages load correctly.
- Verifying that navigation works.
- Verifying that product and poetry cards render correctly.
- Verifying basic shopping cart functionality.

Only after these elements work reliably should additional features be introduced.

Avoid building complex infrastructure or unnecessary functionality before the basic application has been tested.

---

## 3. Required Technology Stack

The project must use the following technologies.

### Frontend

- Angular
- TypeScript

### Backend

- Python
- FastAPI

### Database

- PostgreSQL

### Communication

- REST API

The Angular frontend communicates with the FastAPI backend through REST endpoints.

Keep the frontend, backend, and database responsibilities clearly separated.

Use typed models and consistent API contracts.

Do not replace these technologies with alternative frameworks or languages without explicit approval.

### Environment Variables

The project root contains a `.env` file.

The following environment variable is available:

`OPEN_ROUTER_API_KEY`

This key will be used for the future AI integration.

Important security requirements:

- Read environment variables on the backend.
- Never hardcode API keys.
- Never expose API keys in Angular or other frontend code.
- Never print API keys in logs.
- Never commit the `.env` file to Git.
- Ensure `.env` is included in `.gitignore`.
- Do not implement OpenRouter integration during the initial development phase.

---

## 4. Website Structure

The website contains four main sections:

1. Home
2. Poetry
3. Shop
4. Contact

All pages share a common header, navigation bar, and footer.

### Shared Header

The header should include:

- Home
- Poetry
- Shop
- Contact
- Shopping cart icon
- Log In button

The shopping cart icon should display the current number of items in the cart.

Clicking the cart icon should open the shopping cart.

The Log In button may open a modal window.

During the initial development phase, login functionality should only be a visual preview.

Do not implement real authentication yet.

---

## 5. Page 1 — Home

The home page is the main landing page.

It should include:

### Hero Section

A visually appealing introduction to Naftali and his work.

Include:

- His background and connection to Gidona.
- His work with wood and stone.
- His boutique wood-and-glass creations.
- His poetry.
- The connection between traditional craftsmanship and contemporary luxury.

### Website Overview

Include clear navigation or visual links to:

- Poetry
- Shop
- Contact

### Featured Content

Display selected products and/or poems using placeholder data.

### Future AI Assistant

Reserve a visual area for a future AI assistant.

The assistant will eventually help visitors:

- Find products according to style or category.
- Find poems according to date or writing style.
- Ask questions about products.
- Prepare or place orders.

For now, display a simple placeholder:

"Studio Assistant — Coming Soon"

Do not integrate an AI service or simulate AI responses at this stage.

---

## 6. Page 2 — Poetry

Create a dedicated poetry page.

### Poetry Cards

Display poems in a responsive card layout.

Each card should include:

- Poem date as its title.
- Optional short excerpt.
- A button or link to read the full poem.

Use mock data until actual poems are provided.

Do not invent poems and present them as Naftali's actual work.

### WhatsApp Newsletter

Include a section allowing visitors to subscribe to receive new poems through WhatsApp.

The intended future functionality:

- A visitor subscribes.
- When Naftali publishes a new poem, subscribers automatically receive a WhatsApp message.

For the initial phase, display a non-functional preview with a "Coming Soon" message.

Do not collect phone numbers until the actual subscription mechanism is implemented.

Future implementation must include:

- Explicit user consent.
- Clear subscription terms.
- WhatsApp integration.
- An unsubscribe mechanism.

---

## 7. Page 3 — Shop

Create a shop landing page with three main categories:

1. Mezuzahs
2. Hanukkiahs
3. Boutique Furniture

Each category should have its own page or category view.

### Product Cards

Each product card should contain:

- Product image.
- Product name.
- Product price.
- Add-to-cart (+) button.

Example product name:

"דגם תמר"

### Product Images

At this stage, actual product images are unavailable.

Use a consistent branded placeholder image or logo whenever a product image is missing.

The placeholder should be implemented as a reusable component so that actual product images can easily replace it later.

Do not use unrelated stock photography.

### Shopping Cart

The shopping cart should support:

- Adding products.
- Displaying cart items.
- Displaying quantities.
- Updating quantities.
- Removing products.
- Displaying the subtotal.
- Updating the cart icon count.

Persist cart contents locally when practical.

A user can add a maximum of 1 of each item to the cart.

### Purchasing

Purchasing is currently disabled.

The cart should clearly communicate:

"Checkout Coming Soon"

Do not request payment details or imply that an order has been completed.

Structure the application so that payment functionality can be added in the future without rebuilding the shop.

---

## 8. Page 4 — Contact

Create a simple and elegant contact page.

Include:

- Phone number.
- Email address.

Use placeholders until actual contact information is provided.

Once the real details are available:

- Make the phone number clickable.
- Make the email address clickable.

Do not invent contact information.

---

## 9. Login and User Roles — Future Functionality

The website will eventually support two different user roles.

### Customer

Future customer functionality:

- Sign up using email and password.
- Log in and log out.
- Maintain a personal shopping cart.
- Save cart contents between sessions and devices.
- Complete purchases.
- View order history.

### Administrator — Naftali

Future administrator functionality:

- Secure administrator login.
- Add products.
- Edit products.
- Delete products.
- Add poems.
- Edit poems.
- Delete poems.
- Manage product categories.
- Upload product images.
- View customer orders.
- Manage orders.

### Initial Development Restriction

Do not implement real authentication or role management yet.

Do not create a fake administrator password or rely on frontend-only security.

When implemented, authentication and permissions must be handled securely on the backend.

---

## 10. Visual Design and User Experience

The website should combine the appearance of a high-end boutique shop with the atmosphere of an artist's workshop.

The visual identity should communicate:

- Authenticity.
- Craftsmanship.
- Natural materials.
- Elegance.
- Luxury.
- Simplicity.
- Warmth.

### Design Direction

Use visual inspiration from:

- Natural wood.
- Stone.
- Glass.
- Handmade objects.
- Traditional craftsmanship.
- Contemporary boutique design.

### Suggested Color Palette

- Warm ivory and parchment.
- Deep walnut brown.
- Charcoal.
- Natural stone gray.
- Muted bronze or brass accents.

### Typography

Use elegant, readable typography.

Maintain a clear hierarchy between:

- Main headings.
- Section headings.
- Product names.
- Descriptions.
- Prices.
- Navigation elements.

### Layout

Use:

- Generous whitespace.
- Clean layouts.
- Consistent spacing.
- Elegant product cards.
- Subtle borders and shadows.
- Restrained animations.
- Large product images when available.

Avoid:

- Generic ecommerce templates.
- Excessive animations.
- Bright and distracting colors.
- Cluttered layouts.
- Unnecessary visual effects.

The overall feeling should be an authentic artisan studio with a refined luxury shopping experience.

---



## 11. Language and RTL — Hebrew Only

**The entire website must be built in Hebrew only.**

Hebrew is the exclusive language of the website, including:

- Navigation menu.

- Page titles and headings.

- Buttons and labels.

- Product names and descriptions.

- Poetry pages.

- Contact page.

- Forms and validation messages.

- Login and registration interfaces.

- Shopping cart.

- Error messages and notifications.

- All other user-facing content.

### Right-to-Left (RTL)

The entire application must use Right-to-Left (RTL) layout.

Requirements:

- Set the HTML document language to `he`.

- Set the document direction to `rtl`.

- Ensure all pages and components follow RTL direction.

- Navigation menus must flow from right to left.

- Text alignment must be appropriate for Hebrew.

- Forms and input fields must support RTL.

- Icons and directional elements must be positioned correctly.

- Use logical CSS properties such as `margin-inline`, `padding-inline`, and `inset-inline`.

- Ensure responsive layouts work correctly in RTL.

### Important Rules

- Do not create an English version of the website.

- Do not add a language switcher.

- Do not mix English and Hebrew in the user interface.

- Internal code, variable names, API endpoints, and technical documentation may remain in English.

- All visible text presented to website visitors must be in Hebrew.

**Hebrew-only and RTL support are mandatory requirements from the beginning of development, not features to be added later.**



---

## 12. Future Features — Not for Initial Development

The following capabilities are planned for future development.

Do not implement them during the initial foundation phase.

### Authentication

- Customer registration.
- Customer login.
- Administrator login.
- Role-based permissions.

### Database Management

- Products.
- Poems.
- Customers.
- Shopping carts.
- Orders.
- Product categories.

### Administrator Dashboard

- Product management.
- Poetry management.
- Image uploads.
- Order management.

### Payments

- Checkout.
- Payment gateway integration.
- Order confirmation.
- Order history.

### WhatsApp

- Newsletter subscriptions.
- Automatic notifications when new poems are published.
- Unsubscribe functionality.

### AI Assistant

The future AI assistant should be able to:

- Search products.
- Search poems.
- Find poems by date.
- Find poems by writing style.
- Find products by design or style.
- Answer questions about products.
- Help prepare an order.

The AI integration will use OpenRouter through the backend.

Never expose the API key to the frontend.

Any AI-assisted order creation must require explicit user confirmation and use the same validated order flow as the regular shop.

---

## 13. Suggested Project Structure

Adapt the structure to the existing repository and Angular/FastAPI conventions.

A suggested structure:

```text

project/

│

├── frontend/

│   ├── src/

│   │   ├── app/

│   │   │   ├── core/

│   │   │   ├── shared/

│   │   │   ├── components/

│   │   │   ├── pages/

│   │   │   │   ├── home/

│   │   │   │   ├── poetry/

│   │   │   │   ├── shop/

│   │   │   │   └── contact/

│   │   │   ├── services/

│   │   │   └── models/

│   │   └── assets/

│   │

│   └── package.json

│

├── backend/

│   ├── app/

│   │   ├── [main.py](http://main.py)

│   │   ├── api/

│   │   ├── models/

│   │   ├── schemas/

│   │   ├── services/

│   │   └── database/

│   │

│   └── requirements.txt

│

├── .env

├── .gitignore

└── [README.md](http://README.md)

```

This is a suggested structure, not a requirement to reorganize an existing working project unnecessarily.

Keep frontend and backend responsibilities separate.

---

## 14. Data Models

Use typed models for the main entities.

### Product

Suggested fields:

- id
- name
- category
- price
- currency
- image
- description
- available

### Poem

Suggested fields:

- id
- date
- title
- body

The poem date should be displayed as the poem card title.

### Cart Item

Suggested fields:

- productId
- productName
- price

Use stable IDs rather than array indexes.

Do not assume a currency until Naftali confirms it.

If temporary prices are needed, clearly mark them as mock data.

---

## 15. Testing and Verification

Before adding more functionality, verify that the existing implementation works.

### Frontend

- Angular application starts successfully.
- All main pages load.
- Navigation works.
- Responsive layout works.
- Product cards render correctly.
- Poetry cards render correctly.
- Missing product images display the placeholder.
- Shopping cart interactions work.

### Backend

- FastAPI starts successfully.
- API endpoints respond correctly.
- API validation works.
- Error responses are handled properly.

### Database

- PostgreSQL connection works when database functionality is introduced.
- Database configuration uses environment variables.
- Database credentials are never hardcoded.

### REST API

- Angular can communicate with FastAPI.
- API requests and responses follow consistent structures.
- Errors are handled properly.

### General

- No broken routes.
- No unnecessary console errors.
- No exposed credentials.
- No broken responsive layouts.
- Keyboard navigation works.
- Forms have appropriate labels.
- Buttons have clear functionality.

---

## 16. Definition of Done — Initial Foundation

The initial foundation is considered complete when:

- The project starts successfully.
- Angular and FastAPI run correctly.
- The frontend can communicate with the backend.
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
- No real credentials or payment information are collected.
- AI, WhatsApp, and administrator functionality remain unimplemented.

---

## 17. Instructions for Cursor

When working on this project:

1. First inspect the existing project structure.
2. Identify the existing technologies and conventions.
3. Explain briefly what needs to be changed.
4. Make small, focused changes.
5. Avoid unnecessary files and dependencies.
6. Run relevant checks after implementation.
7. Fix errors before moving forward.
8. Explain what was implemented and what still remains.

If something is unclear, choose the simplest reversible approach and document the assumption.

Ask questions only when missing information prevents implementation.

### Final Development Principle

**Keep the development process simple and focused.**

The priority is to establish a working foundation and verify that the core functionality works correctly.

Do not rush into advanced features.

Do not overengineer.

Build, test, verify, and only then expand.