import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import {
  CategoriesPage,
  CheckoutPage,
  CollectionPage,
  FeaturedPage,
  HomePage,
  ProductCartPage,
  type CartItem,
  type PaymentMethod,
  type SortOption,
} from "@/pages/home";
import { products } from "@/data";
import type { Product } from "@/data";

const queryClient = new QueryClient();

function Routes() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paystack");
  const [checkoutNotice, setCheckoutNotice] = useState("");

  const cartCount = cartItems.length;

  const addToCart = (product: Product, quantity = 1) => {
    if (product.isOutOfStock) return;
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, { product, quantity }];
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

  const clearCart = () => setCartItems([]);

  const shopCategory = (category: string) => {
    setActiveCategory(category);
    setLocation("/collection");
  };

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    setLocation("/collection");
  };

  const sharedProps = {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    paymentMethod,
    setPaymentMethod,
    checkoutNotice,
    setCheckoutNotice,
    shopCategory,
    searchProducts,
  };

  return (
    <Switch>
      <Route path="/">
        <HomePage {...sharedProps} />
      </Route>
      <Route path="/categories">
        <CategoriesPage {...sharedProps} />
      </Route>
      <Route path="/featured">
        <FeaturedPage {...sharedProps} />
      </Route>
      <Route path="/collection">
        <CollectionPage {...sharedProps} />
      </Route>
      <Route path="/checkout">
        <CheckoutPage {...sharedProps} />
      </Route>
      <Route path="/cart/:productId">
        {(params) => <ProductCartPage {...sharedProps} product={products.find((product) => product.id === params.productId)} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Routes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
