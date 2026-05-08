import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    setLocation("/login");
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Inventory", href: "/admin/inventory", icon: <Package className="h-5 w-5" /> },
    { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="font-serif text-xl font-bold">Admin Panel</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  location === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-border p-4">
          <div className="mb-4 flex items-center gap-3 px-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              logout();
              setLocation("/login");
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-6 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-serif text-lg font-bold">Admin Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-border bg-card flex md:hidden">
          <div className="flex h-16 items-center border-b border-border px-6">
            <span className="font-serif text-xl font-bold">Admin Panel</span>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    location === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={() => {
                logout();
                setLocation("/login");
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}
