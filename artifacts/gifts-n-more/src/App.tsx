import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import {
  CategoriesPage,
  CheckoutPage,
  CollectionPage,
  HomePage,
  ProductCartPage,
  type CartItem,
  type PaymentMethod,
  type SortOption,
} from "@/pages/home";
import SoboloPage from "@/pages/sobolo";
import PackagingPage from "@/pages/packaging";
import { LoginPage, RegisterPage } from "@/pages/auth";
import { AdminDashboard } from "@/pages/admin/dashboard";
import { AdminInventory } from "@/pages/admin/inventory";
import { AdminOrders } from "@/pages/admin/orders";
import { AdminUsers } from "@/pages/admin/users";
import type { Product } from "@/data";
import { fetchProducts } from "@/api";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function Routes({ products }: { products: Product[] }) {
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
    setLocation("/collection#collection-results");
  };

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    setLocation("/collection#collection-results");
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
    products,
  };

  return (
    <Switch>
      <Route path="/">
        <HomePage {...sharedProps} />
      </Route>
      <Route path="/categories">
        <CategoriesPage {...sharedProps} />
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
      <Route path="/sobolo">
        <SoboloPage {...sharedProps} />
      </Route>
      <Route path="/packaging">
        <PackagingPage {...sharedProps} />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/admin">
        <AdminDashboard />
      </Route>
      <Route path="/admin/inventory">
        <AdminInventory />
      </Route>
      <Route path="/admin/orders">
        <AdminOrders />
      </Route>
      <Route path="/admin/users">
        <AdminUsers />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function Main() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (error) {
    console.error("Failed to load products", error);
  }

  // Pass empty array while loading so the UI renders immediately
  return <Routes products={products || []} />;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    // Check for hash in URL (e.g., #product-details)
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Main />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
