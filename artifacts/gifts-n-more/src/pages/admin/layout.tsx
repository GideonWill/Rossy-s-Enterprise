import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-t-2 border-primary rounded-full"
        />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    setLocation("/login");
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Products", href: "/admin/inventory", icon: <Package className="h-5 w-5" /> },
    { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "Customers", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#0F0F0F] text-zinc-400">
      <div className="flex h-24 items-center px-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-lg shadow-lg shadow-amber-900/20" />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-white">Rossy's</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8860B]">Enterprise</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 pt-4">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-amber-500/10 to-transparent text-white"
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 h-8 w-1 rounded-r-full bg-[#B8860B]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={cn("transition-colors duration-300", isActive ? "text-[#B8860B]" : "group-hover:text-[#B8860B]")}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/5 p-6 bg-black/20 backdrop-blur-md">
        <div className="mb-6 flex items-center gap-4 px-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0F0F0F] text-sm font-bold text-white">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0F0F0F] bg-green-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Administrator</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl px-4 py-6 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive group"
          onClick={() => {
            logout();
            setLocation("/login");
          }}
        >
          <LogOut className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-zinc-100 md:block">
        <div className="fixed inset-y-0 w-72 overflow-hidden shadow-2xl">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-100 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-tight">Rossy's Admin</span>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="text-sm font-medium text-zinc-400">Dashboard</span>
            <ChevronRight className="h-4 w-4 text-zinc-300" />
            <span className="text-sm font-semibold text-zinc-900">
              {navItems.find(item => item.href === location)?.label || "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden h-10 w-px bg-zinc-100 md:block" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Date</span>
              <span className="text-xs font-semibold text-zinc-900">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#FDFCFB] p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
            >
              <SidebarContent />
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
