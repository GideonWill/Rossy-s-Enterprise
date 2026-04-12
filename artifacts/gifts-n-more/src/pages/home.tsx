import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { products, heroImage, categories } from "../data";
import type { Product } from "../data";
import corporateGiftsImage from "@assets/image_1776005308789.png";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Gift,
  Heart,
  Instagram,
  MapPin,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption =
  | "Recommended"
  | "Newest"
  | "Price (low to high)"
  | "Price (high to low)"
  | "Name A-Z"
  | "Name Z-A";

export type PaymentMethod = "paystack" | "pickup";

export type CartItem = {
  product: Product;
  quantity: number;
};

type ShopProps = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  checkoutNotice: string;
  setCheckoutNotice: (notice: string) => void;
  shopCategory: (category: string) => void;
  searchProducts: (query: string) => void;
};

type ProductCartPageProps = ShopProps & {
  product?: Product;
};

const sortOptions: SortOption[] = [
  "Recommended",
  "Newest",
  "Price (low to high)",
  "Price (high to low)",
  "Name A-Z",
  "Name Z-A",
];

const spotlightCategories = [
  "Gifts For Her",
  "Gifts For Him",
  "Mothers Day / Gifts For Mum",
  "Father's Day/ Gifts For Dad",
  "Graduation / Congratulation Packages",
  "Valentine’s Day",
  "Gift Boxes",
  "Packaging Accessories",
];

const heroSlides = [
  {
    title: "Customised Corporate Gifts",
    text: "Premium branded sets, staff appreciation packages, client hampers, and event-ready gift experiences.",
    label: "Corporate gifting now available",
    image: corporateGiftsImage,
    align: "left",
  },
  {
    title: "Merry Gifts Make Joyful Hearts",
    text: "Discover beautifully packaged, thoughtful gifts for every occasion. Hand-picked with love in Accra.",
    label: "A curated Ghanaian boutique",
    image: heroImage,
    align: "center",
  },
  {
    title: "Shop Beautiful Packages Fast",
    text: "Find gifts for her, him, mum, dad, birthdays, anniversaries, graduations, and corporate moments.",
    label: "Ready-to-delight collections",
    image: products[2].image,
    align: "right",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const formatCurrency = (amount: number) => `GH₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function getFilteredProducts(activeCategory: string, searchQuery: string, sortBy: SortOption) {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "Newest") return products.indexOf(b) - products.indexOf(a);
    if (sortBy === "Price (low to high)") return a.price - b.price;
    if (sortBy === "Price (high to low)") return b.price - a.price;
    if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
    if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    if (a.isOutOfStock !== b.isOutOfStock) return a.isOutOfStock ? 1 : -1;
    return products.indexOf(a) - products.indexOf(b);
  });
}

function subtotalOf(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function Layout({ children, cartCount, searchProducts }: { children: ReactNode; cartCount: number; searchProducts: (query: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const runSearch = () => {
    if (!navSearch.trim()) return;
    searchProducts(navSearch.trim());
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <nav
        className={cn(
          "fixed top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-500 ease-in-out md:px-12",
          scrolled ? "bg-background/95 py-4 shadow-sm backdrop-blur-md" : "bg-black/15 py-6 backdrop-blur-[2px]",
        )}
      >
        <Link href="/" className={cn("font-serif text-2xl font-semibold tracking-tight transition-colors", scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80")} data-testid="link-home">
          Gifts N More
        </Link>
        <div className={cn("hidden items-center gap-8 text-sm font-medium uppercase tracking-wider md:flex", scrolled ? "text-foreground" : "text-white")}>
          <Link href="/categories" className="transition-colors hover:text-primary" data-testid="link-categories">Categories</Link>
          <Link href="/featured" className="transition-colors hover:text-primary" data-testid="link-featured">Featured</Link>
          <Link href="/collection" className="transition-colors hover:text-primary" data-testid="link-collection">Collection</Link>
          <Link href="/checkout" className="transition-colors hover:text-primary" data-testid="link-checkout">Checkout</Link>
        </div>
        <div className={cn("flex items-center gap-3", scrolled ? "text-foreground" : "text-white")}>
          {searchOpen && (
            <div className="hidden items-center border border-current/20 bg-white/95 px-3 py-2 text-foreground shadow-sm md:flex">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <input
                value={navSearch}
                onChange={(event) => setNavSearch(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && runSearch()}
                placeholder="Search packages"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                data-testid="input-search-desktop"
              />
              <button onClick={() => { setNavSearch(""); setSearchOpen(false); }} className="ml-2" data-testid="button-close-search">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <button onClick={() => setSearchOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-primary" aria-label="Search products" data-testid="button-open-search">
            <Search className="h-5 w-5" />
          </button>
          <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-primary md:flex" data-testid="link-contact">
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </a>
          <Link href="/checkout" className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-primary" aria-label="Open cart" data-testid="button-cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground" data-testid="text-cart-count">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="fixed left-4 right-4 top-20 z-40 border border-border bg-background p-3 shadow-xl md:hidden">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={navSearch}
              onChange={(event) => setNavSearch(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && runSearch()}
              placeholder="Search packages"
              className="flex-1 bg-transparent text-sm outline-none"
              data-testid="input-search-mobile"
            />
            <button onClick={runSearch} className="text-xs font-bold uppercase tracking-widest text-primary" data-testid="button-run-mobile-search">Go</button>
            <button onClick={() => { setNavSearch(""); setSearchOpen(false); }} data-testid="button-close-mobile-search">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {children}
      <Footer />
      <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110" aria-label="Chat on WhatsApp" data-testid="link-whatsapp-floating">
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

export function HomePage(props: ShopProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const featuredProducts = useMemo(() => products.filter((product) => product.isFeatured).slice(0, 4), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-foreground">
        <AnimatePresence mode="wait">
          <motion.div key={slide.title} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeOut" }} className="absolute inset-0 h-full w-full">
            <img src={slide.image} alt={slide.title} className={cn("h-full w-full object-cover", slide.align === "left" ? "object-center" : slide.align === "right" ? "object-right" : "object-center")} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-28 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div key={`${slide.title}-copy`} initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl text-white">
            <motion.div variants={fadeUpVariant}>
              <Badge className="mb-7 border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                {slide.label}
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="mb-6 text-balance font-serif text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
              {slide.title}
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="mb-10 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/90 md:text-xl">
              {slide.text}
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-none bg-white px-8 py-6 text-base tracking-wide text-foreground transition-transform hover:scale-105 hover:bg-white/90" asChild>
                <Link href="/collection" data-testid="link-shop-collection">Shop the Collection</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-white/40 px-8 py-6 text-base tracking-wide text-white hover:bg-white/10" asChild>
                <Link href="/categories" data-testid="link-view-categories">Explore Categories</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9 }} className="hidden justify-self-end border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md lg:block">
            <div className="bg-background p-5 text-foreground">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">Today’s gift pick</p>
              <img src={featuredProducts[0].image} alt={featuredProducts[0].name} className="mb-5 aspect-square w-72 object-cover" />
              <h3 className="font-serif text-2xl">{featuredProducts[0].name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{featuredProducts[0].priceStr}</p>
              <Button className="mt-5 w-full rounded-none" asChild>
                <Link href={`/cart/${featuredProducts[0].id}`}>Add to cart page</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {heroSlides.map((item, index) => (
            <button key={item.title} onClick={() => setActiveSlide(index)} className={cn("h-1.5 rounded-full transition-all", activeSlide === index ? "w-12 bg-white" : "w-5 bg-white/35")} aria-label={`Show ${item.title}`} />
          ))}
        </div>
      </section>

      <section className="border-b border-border/50 bg-card py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 gap-12 divide-y divide-border text-center md:grid-cols-3 md:divide-x md:divide-y-0">
            <ValueCard icon={<Gift className="h-6 w-6" />} title="Beautifully Packaged" text="Every item is wrapped with care, creating a memorable unboxing experience." />
            <ValueCard icon={<Star className="h-6 w-6" />} title="Curated Quality" text="Hand-picked premium items that speak volumes of your affection." />
            <ValueCard icon={<Truck className="h-6 w-6" />} title="Delivery in Accra" text="Swift and secure delivery to your loved ones across the city." />
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="Discover" title="Shop by Occasion" text="Every category now opens into its own shopping flow instead of hiding inside one long page." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {spotlightCategories.map((category, index) => {
              const product = products.find((item) => item.category === category) ?? products[index % products.length];
              return <CategoryTile key={category} category={category} product={product} onClick={() => props.shopCategory(category)} index={index} />;
            })}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" className="rounded-none px-8 py-6" asChild>
              <Link href="/categories">View all 32 categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-border/50 bg-card py-24 md:py-32">
        <div className="container mx-auto mb-16 flex flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-12">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Curated Selection</h2>
            <h3 className="font-serif text-4xl md:text-5xl">Featured Gifts</h3>
          </div>
          <Link href="/featured" className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary" data-testid="link-view-featured">
            View Featured <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} addToCart={props.addToCart} />
      </section>

      <CorporateBanner />
    </Layout>
  );
}

export function CategoriesPage(props: ShopProps) {
  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <PageHero title="Gift Categories" text="Browse by occasion, recipient, gift type, packaging, cards, and celebration moments." image={products[10].image} />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const product = products.find((item) => item.category === category) ?? products[index % products.length];
              return <CategoryTile key={category} category={category} product={product} onClick={() => props.shopCategory(category)} index={index} compact />;
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function FeaturedPage(props: ShopProps) {
  const featuredProducts = products.filter((product) => product.isFeatured);
  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <PageHero title="Featured Gifts" text="A polished selection of best-looking, ready-to-order gifts for quick decisions." image={products[2].image} />
      <section className="py-20 md:py-28">
        <ProductGrid products={featuredProducts} addToCart={props.addToCart} />
      </section>
    </Layout>
  );
}

export function CollectionPage(props: ShopProps) {
  const filteredProducts = useMemo(() => getFilteredProducts(props.activeCategory, props.searchQuery, props.sortBy), [props.activeCategory, props.searchQuery, props.sortBy]);

  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <PageHero title="Shop Collection" text="Search, sort, filter, and open any item to its own professional cart page." image={products[8].image} />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-8 grid gap-4 border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_260px] md:p-5">
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-3" data-testid="label-search-products">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={props.searchQuery}
                onChange={(event) => props.setSearchQuery(event.target.value)}
                placeholder="Search for packages, hampers, gift boxes, cards"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                data-testid="input-search-collection"
              />
              {props.searchQuery && (
                <button onClick={() => props.setSearchQuery("")} data-testid="button-clear-search">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-3 text-sm" data-testid="label-sort-products">
              <span className="whitespace-nowrap text-muted-foreground">Sort by</span>
              <select value={props.sortBy} onChange={(event) => props.setSortBy(event.target.value as SortOption)} className="w-full bg-transparent font-medium outline-none" data-testid="select-sort-products">
                {sortOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          </div>

          <div className="mb-14 max-h-44 overflow-y-auto border-y border-border py-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <CategoryChip label="All" active={props.activeCategory === "All"} onClick={() => props.setActiveCategory("All")} />
              {categories.map((category) => <CategoryChip key={category} label={category} active={props.activeCategory === category} onClick={() => props.setActiveCategory(category)} />)}
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-between gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
            <p data-testid="text-results-count">Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}</p>
            {(props.activeCategory !== "All" || props.searchQuery) && (
              <button onClick={() => { props.setActiveCategory("All"); props.setSearchQuery(""); }} className="font-semibold text-primary" data-testid="button-reset-filters">
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.03 }}>
                  <ProductCard product={product} onAddToCart={props.addToCart} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-card p-12 text-center">
              <h3 className="font-serif text-2xl">No gifts found</h3>
              <p className="mt-2 text-muted-foreground">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export function ProductCartPage(props: ProductCartPageProps) {
  const [quantity, setQuantity] = useState(1);

  if (!props.product) {
    return (
      <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
        <PageHero title="Item not found" text="This product may no longer be available." image={heroImage} />
        <section className="py-20 text-center">
          <Button className="rounded-none" asChild><Link href="/collection">Back to collection</Link></Button>
        </section>
      </Layout>
    );
  }

  const product = props.product;
  const existing = props.cartItems.find((item) => item.product.id === product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    props.addToCart(product, quantity);
  };

  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <section className="bg-card pt-32 md:pt-36">
        <div className="container mx-auto px-6 pb-16 md:px-12">
          <Link href="/collection" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to collection
          </Link>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="bg-background p-4 shadow-sm">
              <img src={product.image} alt={product.name} className="aspect-[5/4] w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="border border-border bg-background p-6 shadow-xl md:p-10">
              <Badge className="mb-5 rounded-none bg-primary text-primary-foreground">{product.category}</Badge>
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-4 text-2xl font-semibold text-primary">{product.priceStr}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Confirm the quantity for this item, then add it to your cart. Repeated quantities stay under this same product line and will not inflate the cart badge.
              </p>

              <div className="mt-8 border-y border-border py-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
                  {existing && <span className="text-sm text-muted-foreground">Already in cart: {existing.quantity}</span>}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-12 w-12 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary" data-testid="button-decrease-item-quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex h-12 min-w-20 items-center justify-center border border-border bg-card text-lg font-semibold" data-testid="text-item-quantity">{quantity}</div>
                  <button onClick={() => setQuantity((value) => value + 1)} className="flex h-12 w-12 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary" data-testid="button-increase-item-quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button disabled={product.isOutOfStock} onClick={handleAdd} className="rounded-none py-6 text-base" data-testid="button-add-item-page">
                  {product.isOutOfStock ? "Out of stock" : "Add to Cart"}
                </Button>
                <Button variant="outline" className="rounded-none py-6 text-base" asChild>
                  <Link href="/checkout">View Cart & Checkout</Link>
                </Button>
              </div>
              {props.checkoutNotice && <p className="mt-4 border border-primary/20 bg-primary/5 p-3 text-sm text-primary" data-testid="text-item-notice">{props.checkoutNotice}</p>}
            </motion.div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeader eyebrow="Related" title="You May Also Like" text="More gift ideas from the same category." />
            <ProductGrid products={related} addToCart={props.addToCart} />
          </div>
        </section>
      )}
    </Layout>
  );
}

export function CheckoutPage(props: ShopProps) {
  const subtotal = subtotalOf(props.cartItems);
  const serviceFee = props.cartItems.length > 0 && props.paymentMethod === "paystack" ? Math.round(subtotal * 0.015) : 0;
  const estimatedTotal = subtotal + serviceFee;

  const handleCheckoutAction = () => {
    if (props.cartItems.length === 0) {
      props.setCheckoutNotice("Add at least one available product before checkout.");
      return;
    }
    if (props.paymentMethod === "paystack") {
      props.setCheckoutNotice("Paystack checkout option is ready for connection. Add Paystack keys next to process real online payments.");
      return;
    }
    props.setCheckoutNotice("Pickup order prepared. Customer can pay when they arrive at the pickup location.");
  };

  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <PageHero title="Cart & Checkout" text="Review selected products, update quantities, and choose Paystack online payment or pickup payment." image={products[16].image} />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border border-border bg-card p-5 shadow-sm md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl">Your Cart</h2>
                  <p className="text-sm text-muted-foreground">Cart badge counts unique products; quantities are managed inside each product line.</p>
                </div>
                {props.cartItems.length > 0 && (
                  <button onClick={props.clearCart} className="text-sm font-semibold uppercase tracking-widest text-destructive" data-testid="button-clear-cart">Clear</button>
                )}
              </div>

              {props.cartItems.length === 0 ? (
                <div className="border border-dashed border-border bg-background p-10 text-center">
                  <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="font-serif text-2xl">Your cart is empty</h3>
                  <p className="mt-2 text-muted-foreground">Open a product and add it to your cart.</p>
                  <Button className="mt-6 rounded-none" asChild><Link href="/collection">Shop collection</Link></Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {props.cartItems.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-[88px_1fr] gap-4 border border-border bg-background p-4 md:grid-cols-[112px_1fr_auto] md:items-center" data-testid={`cart-item-${item.product.id}`}>
                      <Link href={`/cart/${item.product.id}`}><img src={item.product.image} alt={item.product.name} className="aspect-square w-full object-cover" /></Link>
                      <div>
                        <Link href={`/cart/${item.product.id}`} className="font-serif text-xl transition-colors hover:text-primary">{item.product.name}</Link>
                        <p className="mt-1 text-sm text-muted-foreground">{item.product.category}</p>
                        <p className="mt-2 font-semibold text-primary">{item.product.priceStr}</p>
                        <div className="mt-4 flex w-fit items-center border border-border">
                          <button onClick={() => props.updateQuantity(item.product.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center hover:text-primary" data-testid={`button-decrease-${item.product.id}`}><Minus className="h-3.5 w-3.5" /></button>
                          <span className="flex h-9 min-w-10 items-center justify-center border-x border-border text-sm font-semibold" data-testid={`text-quantity-${item.product.id}`}>{item.quantity}</span>
                          <button onClick={() => props.updateQuantity(item.product.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center hover:text-primary" data-testid={`button-increase-${item.product.id}`}><Plus className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-between border-t border-border pt-4 md:col-span-1 md:block md:border-0 md:pt-0 md:text-right">
                        <p className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                        <button onClick={() => props.removeFromCart(item.product.id)} className="mt-0 text-muted-foreground transition-colors hover:text-destructive md:mt-4" aria-label={`Remove ${item.product.name}`} data-testid={`button-remove-${item.product.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border border-border bg-card p-5 shadow-sm md:p-8">
                <h2 className="mb-6 font-serif text-3xl">Order Details</h2>
                <div className="grid gap-4">
                  <CheckoutInput label="Full name" placeholder="Your name" />
                  <CheckoutInput label="Phone number" placeholder="+233..." />
                  <CheckoutInput label="Email" placeholder="you@example.com" />
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Order notes</span>
                    <textarea className="min-h-24 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary" placeholder="Delivery details, preferred wrapping, message card..." data-testid="textarea-order-notes" />
                  </label>
                </div>
              </div>

              <div className="border border-border bg-card p-5 shadow-sm md:p-8">
                <h2 className="mb-5 font-serif text-3xl">Payment</h2>
                <div className="grid gap-3">
                  <PaymentOption active={props.paymentMethod === "paystack"} icon={<CreditCard className="h-5 w-5" />} title="Pay online with Paystack" text="Card, mobile money, and online payment option. Requires live Paystack connection." onClick={() => props.setPaymentMethod("paystack")} />
                  <PaymentOption active={props.paymentMethod === "pickup"} icon={<MapPin className="h-5 w-5" />} title="Pickup / pay at location" text="Reserve your order and complete payment when you pick up." onClick={() => props.setPaymentMethod("pickup")} />
                </div>
              </div>

              <div className="border border-border bg-foreground p-5 text-background shadow-sm md:p-8">
                <h2 className="mb-5 font-serif text-3xl">Summary</h2>
                <SummaryLine label="Unique items" value={`${props.cartItems.length}`} />
                <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryLine label="Estimated service fee" value={formatCurrency(serviceFee)} />
                <div className="my-5 border-t border-background/20" />
                <SummaryLine label="Estimated total" value={formatCurrency(estimatedTotal)} strong />
                <Button onClick={handleCheckoutAction} className="mt-6 w-full rounded-none bg-primary py-6 text-base text-primary-foreground hover:bg-primary/90" data-testid="button-confirm-checkout">
                  {props.paymentMethod === "paystack" ? "Continue to Paystack" : "Confirm Pickup Order"}
                </Button>
                {props.checkoutNotice && <p className="mt-4 border border-background/15 bg-background/10 p-3 text-sm text-background/90" data-testid="text-checkout-notice">{props.checkoutNotice}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PageHero({ title, text, image }: { title: string; text: string; image: string }) {
  return (
    <section className="relative flex min-h-[58dvh] items-center overflow-hidden bg-foreground pt-28 text-white">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <Badge className="mb-6 rounded-none bg-primary text-primary-foreground">Gifts N More Shop</Badge>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{text}</p>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mx-auto mb-16 max-w-3xl text-center">
      <motion.h2 variants={fadeUpVariant} className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</motion.h2>
      <motion.h3 variants={fadeUpVariant} className="font-serif text-4xl md:text-5xl">{title}</motion.h3>
      <motion.p variants={fadeUpVariant} className="mt-5 text-muted-foreground">{text}</motion.p>
    </motion.div>
  );
}

function ProductGrid({ products: gridProducts, addToCart }: { products: Product[]; addToCart: (product: Product, quantity?: number) => void }) {
  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {gridProducts.map((product, index) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, quantity?: number) => void }) {
  return (
    <div className="group relative flex h-full flex-col" data-testid={`card-product-${product.id}`}>
      <Link href={`/cart/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground/90 p-4 text-background transition-transform duration-300 group-hover:translate-y-0">
          <span className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest">
            Open item cart <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        {product.isOutOfStock && <div className="absolute left-4 top-4 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Out of stock</div>}
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{product.category}</p>
        <Link href={`/cart/${product.id}`} className="font-serif text-xl leading-snug transition-colors hover:text-primary">{product.name}</Link>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-semibold">{product.priceStr}</p>
          <button disabled={product.isOutOfStock} onClick={() => onAddToCart(product, 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Quick add ${product.name}`} data-testid={`button-quick-add-${product.id}`}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryTile({ category, product, onClick, index, compact = false }: { category: string; product: Product; onClick: () => void; index: number; compact?: boolean }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.035 }}
      className={cn("group relative overflow-hidden bg-muted text-left", compact ? "aspect-[5/4]" : "aspect-[4/5]")}
      onClick={onClick}
      data-testid={`button-category-${category}`}
    >
      <img src={product.image} alt={category} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/85" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Category</p>
        <h4 className={cn("font-serif font-medium tracking-wide text-white", compact ? "text-xl" : "text-2xl")}>{category}</h4>
      </div>
    </motion.button>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary hover:text-primary")} data-testid={`button-filter-${label}`}>
      {label}
    </button>
  );
}

function ValueCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <motion.div variants={fadeUpVariant} className="px-6 pt-12 first:pt-0 md:pt-0">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="mb-3 font-serif text-2xl">{title}</h3>
      <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p>
    </motion.div>
  );
}

function CorporateBanner() {
  return (
    <section className="bg-primary px-6 py-20 text-center text-primary-foreground">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl space-y-6">
        <Sparkles className="mx-auto h-8 w-8 opacity-80" />
        <h2 className="font-serif text-3xl md:text-5xl">Corporate Gifting & Special Occasions</h2>
        <p className="mx-auto max-w-2xl text-lg font-light text-primary-foreground/90 md:text-xl">
          Looking for customized hampers or bulk orders for weddings, anniversaries, graduations, or corporate events? We create tailored gifting experiences.
        </p>
        <Button size="lg" className="mt-4 rounded-none bg-white px-8 py-6 text-base font-semibold text-primary hover:bg-white/90" asChild>
          <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" data-testid="link-gifting-expert">Chat with a Gifting Expert</a>
        </Button>
      </motion.div>
    </section>
  );
}

function PaymentOption({ active, icon, title, text, onClick }: { active: boolean; icon: ReactNode; title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex gap-4 border p-4 text-left transition-all", active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary")} data-testid={`button-payment-${title}`}>
      <span className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{icon}</span>
      <span>
        <span className="flex items-center gap-2 font-semibold">{title}{active && <CheckCircle2 className="h-4 w-4 text-primary" />}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{text}</span>
      </span>
    </button>
  );
}

function CheckoutInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary" placeholder={placeholder} data-testid={`input-${label.toLowerCase().replace(/\s+/g, "-")}`} />
    </label>
  );
}

function SummaryLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("mb-3 flex items-center justify-between gap-4", strong ? "text-xl font-semibold" : "text-sm text-background/75")}>
      <span>{label}</span>
      <span className="font-semibold text-background">{value}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <h3 className="mb-4 font-serif text-3xl">Gifts N More</h3>
          <p className="max-w-md text-muted-foreground">Premium Ghanaian gifting boutique for personal moments, corporate gifting, packaging, cards, hampers, and special occasions.</p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest">Shop</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link href="/categories" className="block hover:text-primary">Categories</Link>
            <Link href="/featured" className="block hover:text-primary">Featured</Link>
            <Link href="/collection" className="block hover:text-primary">Collection</Link>
            <Link href="/checkout" className="block hover:text-primary">Checkout</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest">Connect</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> WhatsApp</a>
            <a href="https://www.instagram.com/giftsnmoreshopgh" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /> @giftsnmoreshopgh</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomePage;
