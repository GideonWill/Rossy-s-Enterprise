import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { products, heroImage, categories } from "../data";
import { ShoppingBag, ArrowRight, Instagram, Phone, Star, Gift, Truck, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 flex items-center justify-between",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}>
        <div className="text-2xl font-serif tracking-tight font-semibold">
          <Link href="/" className={cn("transition-colors", scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80")}>
            Gifts N More
          </Link>
        </div>
        <div className={cn("hidden md:flex items-center gap-8 text-sm uppercase tracking-wider font-medium", scrolled ? "text-foreground" : "text-white")}>
          <a href="#categories" className="hover:text-primary transition-colors">Categories</a>
          <a href="#featured" className="hover:text-primary transition-colors">Featured</a>
          <a href="#collection" className="hover:text-primary transition-colors">Collection</a>
          <a href="#about" className="hover:text-primary transition-colors">Our Story</a>
        </div>
        <div className={cn("flex items-center gap-4", scrolled ? "text-foreground" : "text-white")}>
          <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span>Contact</span>
          </a>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 hover:text-inherit">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImage} 
            alt="Beautiful gifts display" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-90" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUpVariant}>
              <Badge className="bg-primary text-primary-foreground border-none mb-8 px-4 py-1.5 uppercase tracking-widest text-xs font-semibold">
                A Curated Ghanaian Boutique
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.1] text-balance">
              Merry Gifts Make Joyful Hearts
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light text-balance leading-relaxed">
              Discover beautifully packaged, thoughtful gifts for every occasion. Hand-picked with love in Accra.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-none px-8 py-6 text-base tracking-wide w-full sm:w-auto transition-transform hover:scale-105" asChild>
                <a href="#collection">Shop the Collection</a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-none px-8 py-6 text-base tracking-wide w-full sm:w-auto glass" asChild>
                <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer">Order via WhatsApp</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Value Props */}
      <section className="py-16 md:py-24 bg-card border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border"
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3">Beautifully Packaged</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Every item is wrapped with care, creating a memorable unboxing experience.</p>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3">Curated Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Hand-picked premium items that speak volumes of your affection.</p>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3">Delivery in Accra</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Swift and secure delivery to your loved ones across the city.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section id="categories" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeUpVariant} className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Discover</motion.h2>
            <motion.h3 variants={fadeUpVariant} className="text-4xl md:text-5xl font-serif">Shop by Category</motion.h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Gift Packages", img: products.find(p => p.category === "Gift Packages")?.image },
              { name: "Fashion & Accessories", img: products.find(p => p.category === "Fashion & Accessories")?.image },
              { name: "Home & Fragrance", img: products.find(p => p.category === "Home & Fragrance")?.image },
              { name: "Jewelry", img: products.find(p => p.category === "Jewelry")?.image },
              { name: "Gift Boxes", img: products.find(p => p.category === "Gift Boxes")?.image },
              { name: "Mugs & Tea Sets", img: products.find(p => p.category === "Mugs & Tea Sets")?.image }
            ].map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative aspect-square overflow-hidden cursor-pointer bg-muted"
                onClick={() => {
                  setActiveCategory(cat.name);
                  document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-white text-2xl font-serif font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{cat.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section id="featured" className="py-24 md:py-32 bg-card overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Curated Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Featured Gifts</h3>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="#collection" 
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
        
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience / About Section */}
      <section id="about" className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1 relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-primary/20 -translate-x-4 translate-y-4" />
              <img 
                src={products[2].image} 
                alt="Beautiful gift presentation" 
                className="w-full h-full object-cover relative z-10"
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2 space-y-8"
            >
              <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-6xl font-serif leading-tight">
                The Art of <br/><span className="text-primary italic">Thoughtful</span> Giving
              </motion.h2>
              <motion.p variants={fadeUpVariant} className="text-lg text-background/80 font-light leading-relaxed max-w-xl">
                Walking into Gifts N More Shop is like stepping into a warm embrace. We believe that a gift is more than just an item—it's a medium of connection, a tangible expression of love, appreciation, and joy.
              </motion.p>
              <motion.p variants={fadeUpVariant} className="text-lg text-background/80 font-light leading-relaxed max-w-xl">
                Whether it's a carefully assembled hamper for mum, an elegant timepiece, or a simple scented candle that brings peace to a space, every item on our shelves has been selected with intention.
              </motion.p>
              <motion.div variants={fadeUpVariant}>
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground rounded-none px-8 py-6 uppercase tracking-widest text-xs font-semibold mt-4 transition-all" asChild>
                  <a href="#collection">Explore the Shop</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Special Occasions Banner */}
      <section className="py-20 bg-primary text-primary-foreground text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <Sparkles className="w-8 h-8 mx-auto opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif">Corporate Gifting & Special Occasions</h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Looking for customized hampers or bulk orders for weddings, anniversaries, or corporate events? We create tailored gifting experiences.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-none px-8 py-6 mt-4 text-base font-semibold" asChild>
            <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer">Chat with a Gifting Expert</a>
          </Button>
        </motion.div>
      </section>

      {/* 7. Full Collection */}
      <section id="collection" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Collection</h2>
            <p className="text-muted-foreground text-lg">Browse our full range of premium gifts, accessories, and fragrant delights.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            <button 
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                activeCategory === "All" 
                  ? "bg-foreground text-background" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-foreground text-background" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
              <Button 
                variant="link" 
                className="mt-4 text-primary"
                onClick={() => setActiveCategory("All")}
              >
                View all products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 8. Instagram/Social Teaser */}
      <section className="py-24 bg-card border-t border-border/50 text-center">
        <div className="container mx-auto px-6">
          <Heart className="w-8 h-8 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Share the Joy</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Follow us on Instagram for daily gifting inspiration, behind-the-scenes, and exclusive offers.</p>
          <a href="https://instagram.com/giftsnmoreshopgh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
            <Instagram className="w-5 h-5" /> @giftsnmoreshopgh
          </a>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-foreground text-background py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold">Gifts N More Shop</h3>
              <p className="text-background/60 text-sm leading-relaxed max-w-xs">
                Merry Gifts make Joyful hearts. Curated premium gifting boutique in Accra, Ghana.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#collection" className="text-background/80 hover:text-white transition-colors text-sm">All Products</a></li>
                <li><a href="#categories" className="text-background/80 hover:text-white transition-colors text-sm">Categories</a></li>
                <li><a href="#featured" className="text-background/80 hover:text-white transition-colors text-sm">Featured Gifts</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://instagram.com/giftsnmoreshopgh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-background/80 hover:text-white transition-colors text-sm">
                    <Instagram className="w-4 h-4" /> @giftsnmoreshopgh
                  </a>
                </li>
                <li>
                  <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-background/80 hover:text-white transition-colors text-sm">
                    <Phone className="w-4 h-4" /> Order via WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-background/50">Newsletter</h4>
              <p className="text-background/60 text-sm">Subscribe for updates on new arrivals and special offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/10 border-none rounded-none px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-white placeholder:text-white/40"
                />
                <button className="bg-primary text-primary-foreground px-4 py-3 hover:bg-primary/90 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40">
            <p>&copy; {new Date().getFullYear()} Gifts N More Shop. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.link/s2jlfl" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-3 font-medium">
          Chat with us
        </span>
      </a>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col gap-4 h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isOutOfStock && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
        {!product.isOutOfStock && (
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <Button className="w-full bg-white/95 text-foreground hover:bg-white backdrop-blur-md rounded-none border-none shadow-sm font-semibold uppercase tracking-wider text-xs h-12" asChild>
              <a href="https://wa.link/s2jlfl" target="_blank" rel="noreferrer">
                Order via WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 px-1 flex-grow">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{product.category}</p>
        <h4 className="font-serif text-lg leading-snug line-clamp-2 text-foreground/90">{product.name}</h4>
        <p className="font-medium text-primary mt-auto pt-2">{product.priceStr}</p>
      </div>
    </div>
  );
}
