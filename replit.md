# Gifts N More Shop

## Overview

Premium e-commerce gift shop website clone of giftsnmoreshopgh.com, built as a single-page React app with elevated UI/UX. No backend — all product data is hardcoded.

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
- `artifacts/gifts-n-more/src/pages/home.tsx` — Full single-page home with 9 sections
- `artifacts/gifts-n-more/src/data.ts` — Product catalog (20 products, 6 categories)
- `artifacts/gifts-n-more/src/index.css` — Theme with warm cream/charcoal/gold palette

## Features

- Hero section with real banner image and parallax
- 6 gift categories: Gift Packages, Fashion & Accessories, Home & Fragrance, Jewelry, Gift Boxes, Mugs & Tea Sets
- 20 real products with actual images from the original site
- Category filtering in collection section
- Scroll-triggered animations (framer-motion)
- Sticky transparent-to-solid navigation
- Floating WhatsApp chat button
- Corporate gifting section
- Newsletter signup
- Instagram social link (@giftsnmoreshopgh)
- Currency in Ghanaian Cedis (GH₵)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
