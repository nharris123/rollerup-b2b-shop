# Roller Up B2B Shop

A minimal, modern B2B e‑commerce starter for Roller Up. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. 
Includes:
- Product catalog (Stripe readers, LPR cameras, magnetic gates)
- Cart + Stripe Checkout (server API route)
- B2B-friendly **Request a Quote** flow (stores submissions server-side and logs to console; easy to add email later)
- Clean, responsive UI

## Quickstart

1. **Install** (Node 18+ recommended):
   ```bash
   npm install
   ```

2. **Configure env**:
   - Copy `.env.example` to `.env.local` and fill in values.
   - Create three Prices in Stripe, one for each product, and paste the **Price IDs**.
   - Set `NEXT_PUBLIC_BASE_URL` to where the app runs (e.g. `http://localhost:3000`).

3. **Run**:
   ```bash
   npm run dev
   ```

4. **Test Checkout**:
   - Add items to cart → Checkout → Stripe test card `4242 4242 4242 4242` any future date, any CVC/ZIP.

## B2B Features & Ideas
- **Request a Quote** page collects cart + company/contact info and saves to `/tmp/quotes.jsonl` (and logs). 
- Replace storage with your email or CRM:
  - Send email via SendGrid / SES inside `app/api/quote/route.ts`
  - Push to HubSpot / Salesforce
- Add **PO/Invoice** checkout by creating a "Pay by Invoice" option that triggers your billing workflow instead of Stripe Checkout.
- Set **tiered pricing** or **volume breaks** in `lib/products.ts` and reflect in cart calculations.

## Project Structure
```
app/
  api/
    checkout/route.ts        # Creates Stripe Checkout session
    quote/route.ts           # Saves quote requests
  checkout/cancel/page.tsx
  checkout/success/page.tsx
  layout.tsx
  page.tsx                   # Catalog + cart
components/
  Cart.tsx
  CartButton.tsx
  ProductCard.tsx
  Provider.tsx
lib/
  products.ts
public/
  images/...                 # simple SVG placeholders
styles/
  globals.css
tailwind.config.ts
postcss.config.js
tsconfig.json
```

## Deploy
- Vercel recommended. Add env vars in Vercel. Set `NEXT_PUBLIC_BASE_URL` to the production URL.
- Ensure the API routes run on Node.js runtime (default on Vercel).

## Notes
- This starter uses simple in-memory cart on the client.
- Prices shown are **display** prices. Stripe is the source of truth at checkout.
- Replace placeholder product specs in `lib/products.ts` with your SKUs and specs.
