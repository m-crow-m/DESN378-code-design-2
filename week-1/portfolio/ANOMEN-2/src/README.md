# ANOMEN - Brutalist Storefront

A high-end brutalist e-commerce website featuring portfolio showcase and Shopify-powered store.

## Design System

- **Typography**: Helvetica Neue (headings), Georgia (body)
- **Colors**: Pure black and white only
- **Layout**: Editorial asymmetric grids with generous spacing
- **Hover Effects**: Black outer glow on images, red navigation states

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

## Shopify Integration

The store connects to Shopify via Storefront API:
- Store domain: `anomen-2.myshopify.com`
- Products, cart, and checkout are fully integrated

## Deploy to Netlify

1. Upload this project folder to GitHub
2. Connect GitHub repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify:
   - `VITE_SHOPIFY_STORE_DOMAIN=anomen-2.myshopify.com`
   - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=6f9587abfe036bb79929b2614c91ff74`

   Replace these demo credentials with your own Shopify store domain and Storefront API access token to enable production checkout links.

   > **Tip:** if you prefer to bake your live credentials directly into the build (for example while experimenting locally), you can edit `DEMO_STORE_DOMAIN` and `DEMO_STOREFRONT_ACCESS_TOKEN` inside `src/lib/shopify.ts`. Updating those defaults now counts as a “custom” configuration so the cart no longer displays the demo warning when you do.

## Project Structure

```
├── App.tsx                    # Main app with routing
├── components/
│   ├── HomePage.tsx           # Portfolio landing page
│   ├── StorePageShopify.tsx   # Shopify product grid
│   ├── ProductDetailPage.tsx  # Product detail with variants
│   ├── CartDrawer.tsx         # Shopping cart drawer
│   └── Navigation.tsx         # Site navigation
├── contexts/
│   └── CartContext.tsx        # Cart state management
├── lib/
│   └── shopify.ts             # Shopify API integration
└── styles/
    └── globals.css            # Typography tokens
```

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```
