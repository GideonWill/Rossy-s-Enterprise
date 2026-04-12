# Gifts N More Shop

## Overview

Premium e-commerce gift shop website clone of giftsnmoreshopgh.com, built as a single-page React app with elevated UI/UX. Product data is hardcoded for the current iteration while checkout/payment flow is being shaped.

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
- `artifacts/gifts-n-more/src/pages/home.tsx` — Full single-page home with product browsing, cart, and checkout flow
- `artifacts/gifts-n-more/src/data.ts` — Product catalog and expanded category list
- `artifacts/gifts-n-more/src/index.css` — Theme with warm cream/charcoal/gold palette

## Features

- Hero section with real banner image and parallax
- 32 available shop categories including Gifts For Her, Gifts For Him, Jewelery, holiday categories, cards, packaging, and gift boxes
- 20 real products with actual images from the original site
- Category filtering in collection section
- Search for packages/products/categories from the top nav and collection area
- Sort by Recommended, Newest, Price low to high, Price high to low, Name A-Z, and Name Z-A
- Add to Cart button revealed on product hover plus quick-add button on product cards
- Cart summary with quantity controls and item removal
- Checkout section with customer detail fields
- Payment options for Paystack online payment and pickup/pay-at-location
- Scroll-triggered animations (framer-motion)
- Sticky transparent-to-solid navigation
- Floating WhatsApp chat button
- Corporate gifting section
- Newsletter signup
- Instagram social link (@giftsnmoreshopgh)
- Currency in Ghanaian Cedis (GH₵)

## Notes

- Paystack is currently represented as a checkout option in the UI. Real Paystack payment processing still requires connecting Paystack keys and adding server-side payment initialization/verification.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
