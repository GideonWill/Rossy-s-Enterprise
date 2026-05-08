import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export function AdminDashboard() {
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load analytics");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-card rounded-xl border border-border"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const formatCurrency = (amount: number) => `GH₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening with your store today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-baseline text-3xl font-bold">
            {formatCurrency(data?.totalRevenue || 0)}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-baseline text-3xl font-bold">
            {data?.totalOrders || 0}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
            <Package className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-baseline text-3xl font-bold">
            {data?.totalProducts || 0}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Registered Users</h3>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-baseline text-3xl font-bold">
            {data?.totalUsers || 0}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
