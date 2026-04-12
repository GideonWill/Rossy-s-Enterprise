# Gifts N More Shop

## Overview

Premium e-commerce gift shop website clone of giftsnmoreshopgh.com, built as a multi-page React app with elevated UI/UX. Product data is hardcoded for the current iteration while checkout/payment flow is being shaped.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4
- **Routing**: wouter
- **Animations**: framer-motion
- **Fonts**: DM Sans (body), Playfair Display (headings)
- **UI Components**: shadcn/ui (Radix-based)

## Structure

- `artifacts/gifts-n-more/` — Main gift shop website (react-vite, preview at `/`)
- `artifacts/gifts-n-more/src/App.tsx` — App-level routing and shared cart/search/filter state
- `artifacts/gifts-n-more/src/pages/home.tsx` — Home, categories, featured, collection, product cart, and checkout page components
- `artifacts/gifts-n-more/src/data.ts` — Product catalog and expanded category list
- `artifacts/gifts-n-more/src/index.css` — Theme with warm cream/charcoal/gold palette

## Routes

- `/` — Homepage with automatic hero carousel
- `/categories` — Full category page
- `/featured` — Featured products page
- `/collection` — Searchable/sortable/filterable product collection
- `/cart/:productId` — Dedicated product add-to-cart page for a selected item
- `/checkout` — Cart review, order details, and payment method selection

## Features

- Sleek automatic carousel hero section using the uploaded corporate gifts image plus product/shop imagery
- Separate pages for each primary navigation link instead of one long page
- 32 available shop categories including Gifts For Her, Gifts For Him, Jewelery, holiday categories, cards, packaging, and gift boxes
- 20 real products with actual images from the original site
- Category filtering in collection section
- Search for packages/products/categories from the top nav and collection page
- Sort by Recommended, Newest, Price low to high, Price high to low, Name A-Z, and Name Z-A
- Product cards link to dedicated `/cart/:productId` pages
- Add to Cart button revealed on product hover plus quick-add button on product cards
- Dedicated product cart page with professional quantity selector and item details
- Cart badge counts unique products, not quantity units; repeated quantities stay under the same product line
- Checkout page with polished cart summary, quantity controls, item removal, customer detail fields, Paystack option, and pickup/pay-at-location option
- Scroll-triggered animations (framer-motion)
- Sticky transparent-to-solid navigation
- Floating WhatsApp chat button
- Corporate gifting section
- Instagram social link (@giftsnmoreshopgh)
- Currency in Ghanaian Cedis (GH₵)

## Notes

- Paystack is currently represented as a checkout option in the UI. Real Paystack payment processing still requires connecting Paystack keys and adding server-side payment initialization/verification.
- Uploaded image is imported via `@assets/image_1776005308789.png`, not referenced through `attached_assets` URLs.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
