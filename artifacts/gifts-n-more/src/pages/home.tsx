import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { products, heroImage, categories } from "../data";
import type { Product } from "../data";
import {
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
import { motion } from "framer-motion";

type SortOption =
  | "Recommended"
  | "Newest"
  | "Price (low to high)"
  | "Price (high to low)"
  | "Name A-Z"
  | "Name Z-A";

type PaymentMethod = "paystack" | "pickup";

type CartItem = {
  product: Product;
  quantity: number;
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Recommended");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paystack");
  const [checkoutNotice, setCheckoutNotice] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredProducts = useMemo(() => products.filter((product) => product.isFeatured), []);

  const filteredProducts = useMemo(() => {
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
  }, [activeCategory, searchQuery, sortBy]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const serviceFee = cartItems.length > 0 && paymentMethod === "paystack" ? Math.round(subtotal * 0.015) : 0;
  const estimatedTotal = subtotal + serviceFee;

  const addToCart = (product: Product) => {
    if (product.isOutOfStock) return;
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setCheckoutNotice(`${product.name} added to cart.`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product.id !== productId)
        : current.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.product.id !== productId));
  };

  const goToCollectionWithCategory = (category: string) => {
    setActiveCategory(category);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckoutAction = () => {
    if (cartItems.length === 0) {
      setCheckoutNotice("Add at least one available product before checkout.");
      return;
    }
    if (paymentMethod === "paystack") {
      setCheckoutNotice("Paystack checkout option is ready for connection. Add your Paystack keys next to process real online payments.");
      return;
    }
    setCheckoutNotice("Pickup order prepared. Customer can pay when they arrive at the pickup location.");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <nav
        className={cn(
          "fixed top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-500 ease-in-out md:px-12",
          scrolled ? "bg-background/95 py-4 shadow-sm backdrop-blur-md" : "bg-transparent py-6",
        )}
      >
        <div className="text-2xl font-semibold tracking-tight font-serif">
          <Link href="/" className={cn("transition-colors", scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80")} data-testid="link-home">
            Gifts N More
          </Link>
        </div>
        <div className={cn("hidden items-center gap-8 text-sm font-medium uppercase tracking-wider md:flex", scrolled ? "text-foreground" : "text-white")}>
          <a href="#categories" className="transition-colors hover:text-primary" data-testid="link-categories">Categories</a>
          <a href="#featured" className="transition-colors hover:text-primary" data-testid="link-featured">Featured</a>
          <a href="#collection" className="transition-colors hover:text-primary" data-testid="link-collection">Collection</a>
          <a href="#checkout" className="transition-colors hover:text-primary" data-testid="link-checkout">Checkout</a>
        </div>
        <div className={cn("flex items-center gap-3", scrolled ? "text-foreground" : "text-white")}>
          {searchOpen && (
            <div className="hidden items-center border border-current/20 bg-white/90 px-3 py-2 text-foreground shadow-sm md:flex">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search packages"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                data-testid="input-search-desktop"
              />
              <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="ml-2" data-testid="button-close-search">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <button
            onClick={() => setSearchOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-primary"
            aria-label="Search products"
            data-testid="button-open-search"
          >
            <Search className="h-5 w-5" />
          </button>
          <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-primary md:flex" data-testid="link-contact">
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </a>
          <button onClick={goToCheckout} className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-primary" aria-label="Open cart" data-testid="button-cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground" data-testid="text-cart-count">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="fixed left-4 right-4 top-20 z-40 border border-border bg-background p-3 shadow-xl md:hidden">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search packages"
              className="flex-1 bg-transparent text-sm outline-none"
              data-testid="input-search-mobile"
            />
            <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} data-testid="button-close-mobile-search">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <section className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImage}
            alt="Beautiful gifts display"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-90" />
        </div>

        <div className="relative z-10 mx-auto mt-20 max-w-4xl px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUpVariant}>
              <Badge className="mb-8 border-none bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                A Curated Ghanaian Boutique
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="mb-6 text-balance text-5xl leading-[1.1] text-white font-serif md:text-7xl lg:text-8xl">
              Merry Gifts Make Joyful Hearts
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="mx-auto mb-10 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/90 md:text-xl">
              Discover beautifully packaged, thoughtful gifts for every occasion. Hand-picked with love in Accra.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full rounded-none bg-white px-8 py-6 text-base tracking-wide text-foreground transition-transform hover:scale-105 hover:bg-white/90 sm:w-auto" asChild>
                <a href="#collection" data-testid="link-shop-collection">Shop the Collection</a>
              </Button>
              <Button size="lg" variant="outline" className="w-full rounded-none border-white/30 px-8 py-6 text-base tracking-wide text-white hover:bg-white/10 sm:w-auto" asChild>
                <a href="#checkout" data-testid="link-start-checkout">Checkout Process</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="relative h-12 w-px overflow-hidden bg-white/20">
            <motion.div animate={{ y: [0, 48] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute left-0 top-0 h-1/2 w-full bg-white" />
          </div>
        </motion.div>
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

      <section id="categories" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mx-auto mb-16 max-w-3xl text-center">
            <motion.h2 variants={fadeUpVariant} className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Discover</motion.h2>
            <motion.h3 variants={fadeUpVariant} className="text-4xl font-serif md:text-5xl">Shop by Occasion</motion.h3>
            <motion.p variants={fadeUpVariant} className="mt-5 text-muted-foreground">Explore the most requested gifting moments, then use the full collection filters for every available category.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {spotlightCategories.map((category, index) => {
              const product = products.find((item) => item.category === category) ?? products[index % products.length];
              return (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="group relative aspect-[4/5] overflow-hidden bg-muted text-left"
                  onClick={() => goToCollectionWithCategory(category)}
                  data-testid={`button-category-${category}`}
                >
                  <img src={product.image} alt={category} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/85" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Category</p>
                    <h4 className="text-2xl font-medium tracking-wide text-white font-serif">{category}</h4>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="featured" className="overflow-hidden border-t border-border/50 bg-card py-24 md:py-32">
        <div className="container mx-auto mb-16 flex flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Curated Selection</h2>
            <h3 className="text-4xl font-serif md:text-5xl">Featured Gifts</h3>
          </motion.div>
          <motion.a initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} href="#collection" className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary" data-testid="link-view-all">
            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-foreground py-24 text-background md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative order-2 mx-auto aspect-[4/5] w-full max-w-md lg:order-1 lg:mx-0">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-primary/20" />
              <img src={products[2].image} alt="Beautiful gift presentation" className="relative z-10 h-full w-full object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-1 space-y-8 lg:order-2">
              <motion.h2 variants={fadeUpVariant} className="text-4xl leading-tight font-serif md:text-6xl">
                The Art of <br /><span className="italic text-primary">Thoughtful</span> Giving
              </motion.h2>
              <motion.p variants={fadeUpVariant} className="max-w-xl text-lg font-light leading-relaxed text-background/80">
                Walking into Gifts N More Shop is like stepping into a warm embrace. We believe that a gift is more than just an item; it is a medium of connection, appreciation, and joy.
              </motion.p>
              <motion.div variants={fadeUpVariant}>
                <Button size="lg" variant="outline" className="mt-4 rounded-none border-background/30 px-8 py-6 text-xs font-semibold uppercase tracking-widest text-background transition-all hover:bg-background hover:text-foreground" asChild>
                  <a href="#collection" data-testid="link-explore-shop">Explore the Shop</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-center text-primary-foreground">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl space-y-6">
          <Sparkles className="mx-auto h-8 w-8 opacity-80" />
          <h2 className="text-3xl font-serif md:text-5xl">Corporate Gifting & Special Occasions</h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-primary-foreground/90 md:text-xl">
            Looking for customized hampers or bulk orders for weddings, anniversaries, graduations, or corporate events? We create tailored gifting experiences.
          </p>
          <Button size="lg" className="mt-4 rounded-none bg-white px-8 py-6 text-base font-semibold text-primary hover:bg-white/90" asChild>
            <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" data-testid="link-gifting-expert">Chat with a Gifting Expert</a>
          </Button>
        </motion.div>
      </section>

      <section id="collection" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-serif md:text-5xl">Our Collection</h2>
            <p className="text-lg text-muted-foreground">Browse premium gifts, packages, accessories, packaging, and thoughtful occasion picks.</p>
          </div>

          <div className="mb-8 grid gap-4 border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_260px] md:p-5">
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-3" data-testid="label-search-products">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for packages, hampers, gift boxes, cards"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                data-testid="input-search-collection"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} data-testid="button-clear-search">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-3 text-sm" data-testid="label-sort-products">
              <span className="whitespace-nowrap text-muted-foreground">Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="w-full bg-transparent font-medium outline-none" data-testid="select-sort-products">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-14 max-h-44 overflow-y-auto border-y border-border py-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <CategoryChip label="All" active={activeCategory === "All"} onClick={() => setActiveCategory("All")} />
              {categories.map((category) => (
                <CategoryChip key={category} label={category} active={activeCategory === category} onClick={() => setActiveCategory(category)} />
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-between gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
            <p data-testid="text-results-count">Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}</p>
            {(activeCategory !== "All" || searchQuery) && (
              <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="font-semibold text-primary" data-testid="button-reset-filters">
                Clear filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No products found for this search or category.</p>
              <Button variant="link" className="mt-4 text-primary" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} data-testid="button-view-all-products">
                View all products
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="checkout" className="border-y border-border bg-card py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Checkout Process</p>
              <h2 className="text-4xl font-serif md:text-5xl">Complete Your Gift Order</h2>
              <p className="mt-5 text-muted-foreground">Review your cart, choose Paystack online payment or pickup payment, and prepare the order details.</p>
            </div>
            <Badge className="w-fit border-none bg-foreground px-4 py-2 text-background" data-testid="text-checkout-total-items">
              {cartCount} item{cartCount === 1 ? "" : "s"} in cart
            </Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border border-border bg-background p-5 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-serif">Shopping Cart</h3>
                {cartItems.length > 0 && <button onClick={() => setCartItems([])} className="text-sm font-medium text-muted-foreground hover:text-primary" data-testid="button-clear-cart">Clear cart</button>}
              </div>

              {cartItems.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-border p-8 text-center">
                  <ShoppingBag className="mb-4 h-10 w-10 text-primary" />
                  <p className="mb-2 text-lg font-medium">Your cart is empty</p>
                  <p className="mb-6 max-w-sm text-sm text-muted-foreground">Hover over available products and click Add to Cart to begin checkout.</p>
                  <Button className="rounded-none" asChild>
                    <a href="#collection" data-testid="link-empty-cart-shop">Browse products</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-[88px_1fr] gap-4 border border-border p-3 md:grid-cols-[96px_1fr_auto]" data-testid={`cart-item-${item.product.id}`}>
                      <img src={item.product.image} alt={item.product.name} className="h-24 w-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{item.product.category}</p>
                        <h4 className="mt-1 font-serif text-lg leading-snug">{item.product.name}</h4>
                        <p className="mt-2 font-semibold text-primary">{item.product.priceStr}</p>
                        <div className="mt-4 flex items-center gap-2 md:hidden">
                          <QuantityControls quantity={item.quantity} onChange={(quantity) => updateQuantity(item.product.id, quantity)} />
                          <button onClick={() => removeFromCart(item.product.id)} className="ml-2 text-muted-foreground hover:text-primary" aria-label="Remove item" data-testid={`button-remove-mobile-${item.product.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="hidden items-end justify-between gap-5 md:flex md:flex-col">
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-primary" aria-label="Remove item" data-testid={`button-remove-${item.product.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <QuantityControls quantity={item.quantity} onChange={(quantity) => updateQuantity(item.product.id, quantity)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border border-border bg-background p-5 md:p-8">
                <h3 className="mb-6 text-2xl font-serif">Order Details</h3>
                <div className="grid gap-3">
                  <input placeholder="Full name" className="border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" data-testid="input-checkout-name" />
                  <input placeholder="Phone number" className="border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" data-testid="input-checkout-phone" />
                  <input placeholder="Email address" className="border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" data-testid="input-checkout-email" />
                  <textarea placeholder="Delivery address or pickup notes" rows={4} className="resize-none border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" data-testid="textarea-checkout-notes" />
                </div>
              </div>

              <div className="border border-border bg-background p-5 md:p-8">
                <h3 className="mb-5 text-2xl font-serif">Payment Option</h3>
                <div className="grid gap-3">
                  <PaymentOption
                    active={paymentMethod === "paystack"}
                    icon={<CreditCard className="h-5 w-5" />}
                    title="Pay online with Paystack"
                    text="Secure card, bank, or mobile money payment once Paystack keys are connected."
                    onClick={() => setPaymentMethod("paystack")}
                  />
                  <PaymentOption
                    active={paymentMethod === "pickup"}
                    icon={<MapPin className="h-5 w-5" />}
                    title="Pickup and pay at location"
                    text="Reserve items now, then pay when you arrive at the pickup location."
                    onClick={() => setPaymentMethod("pickup")}
                  />
                </div>
              </div>

              <div className="border border-border bg-foreground p-5 text-background md:p-8">
                <h3 className="mb-6 flex items-center gap-3 text-2xl font-serif"><PackageCheck className="h-6 w-6 text-primary" /> Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                  <SummaryRow label="Online payment service estimate" value={formatCurrency(serviceFee)} />
                  <div className="my-4 h-px bg-white/10" />
                  <SummaryRow label="Estimated total" value={formatCurrency(estimatedTotal)} strong />
                </div>
                <Button onClick={handleCheckoutAction} className="mt-7 w-full rounded-none bg-primary py-6 text-primary-foreground hover:bg-primary/90" data-testid="button-complete-checkout">
                  {paymentMethod === "paystack" ? "Continue to Paystack" : "Confirm Pickup Order"}
                </Button>
                {checkoutNotice && <p className="mt-4 text-sm leading-relaxed text-background/70" data-testid="text-checkout-notice">{checkoutNotice}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card py-24 text-center">
        <div className="container mx-auto px-6">
          <Heart className="mx-auto mb-6 h-8 w-8 text-primary" />
          <h2 className="mb-4 text-3xl font-serif md:text-4xl">Share the Joy</h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">Follow us on Instagram for daily gifting inspiration, behind-the-scenes, and exclusive offers.</p>
          <a href="https://instagram.com/giftsnmoreshopgh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary" data-testid="link-instagram">
            <Instagram className="h-5 w-5" /> @giftsnmoreshopgh
          </a>
        </div>
      </section>

      <footer className="bg-foreground py-16 text-background md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-serif">Gifts N More Shop</h3>
              <p className="max-w-xs text-sm leading-relaxed text-background/60">Merry Gifts make Joyful hearts. Curated premium gifting boutique in Accra, Ghana.</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#collection" className="text-sm text-background/80 transition-colors hover:text-white">All Products</a></li>
                <li><a href="#categories" className="text-sm text-background/80 transition-colors hover:text-white">Categories</a></li>
                <li><a href="#checkout" className="text-sm text-background/80 transition-colors hover:text-white">Checkout</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Connect</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/giftsnmoreshopgh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-background/80 transition-colors hover:text-white"><Instagram className="h-4 w-4" /> @giftsnmoreshopgh</a></li>
                <li><a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-background/80 transition-colors hover:text-white"><Phone className="h-4 w-4" /> Order via WhatsApp</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Newsletter</h4>
              <p className="text-sm text-background/60">Subscribe for updates on new arrivals and special offers.</p>
              <div className="flex">
                <input type="email" placeholder="Email address" className="w-full border-none bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary" data-testid="input-newsletter" />
                <button className="bg-primary px-4 py-3 text-primary-foreground transition-colors hover:bg-primary/90" data-testid="button-newsletter"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-background/40 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Gifts N More Shop. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="group fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-transform duration-300 hover:scale-110" aria-label="Chat on WhatsApp" data-testid="link-floating-whatsapp">
        <Phone className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium opacity-0 transition-all duration-500 ease-in-out group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">Chat with us</span>
      </a>
    </div>
  );
}

function ValueCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <motion.div variants={fadeUpVariant} className="flex flex-col items-center p-4">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="mb-3 text-lg font-semibold font-serif">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </motion.div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
        active ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
      )}
      data-testid={`button-filter-${label}`}
    >
      {label}
    </button>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) {
  return (
    <div className="group flex h-full flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <Button
            onClick={() => onAddToCart(product)}
            disabled={product.isOutOfStock}
            className={cn(
              "h-12 w-full rounded-none border-none bg-white/95 text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-md hover:bg-white",
              product.isOutOfStock && "cursor-not-allowed opacity-70",
            )}
            data-testid={`button-add-cart-${product.id}`}
          >
            {product.isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
        {product.isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            <span className="bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest text-background">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col gap-2 px-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <h4 className="line-clamp-2 text-lg leading-snug text-foreground/90 font-serif">{product.name}</h4>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="font-medium text-primary">{product.priceStr}</p>
          {!product.isOutOfStock && (
            <button onClick={() => onAddToCart(product)} className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105" aria-label={`Add ${product.name} to cart`} data-testid={`button-quick-add-${product.id}`}>
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuantityControls({ quantity, onChange }: { quantity: number; onChange: (quantity: number) => void }) {
  return (
    <div className="flex items-center border border-border" data-testid="controls-quantity">
      <button onClick={() => onChange(quantity - 1)} className="flex h-9 w-9 items-center justify-center hover:bg-muted" data-testid="button-decrease-quantity">
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex h-9 w-10 items-center justify-center border-x border-border text-sm font-semibold" data-testid="text-quantity">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="flex h-9 w-9 items-center justify-center hover:bg-muted" data-testid="button-increase-quantity">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function PaymentOption({ active, icon, title, text, onClick }: { active: boolean; icon: ReactNode; title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex gap-4 border p-4 text-left transition-all", active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60")} data-testid={`button-payment-${title}`}>
      <span className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{icon}</span>
      <span>
        <span className="mb-1 flex items-center gap-2 font-semibold">{title} {active && <CheckCircle2 className="h-4 w-4 text-primary" />}</span>
        <span className="block text-sm leading-relaxed text-muted-foreground">{text}</span>
      </span>
    </button>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between gap-4", strong && "text-lg font-semibold")}>
      <span className="text-background/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
