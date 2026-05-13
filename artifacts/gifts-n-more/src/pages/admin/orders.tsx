import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Search, Filter, MoreVertical, ExternalLink, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type OrderItem = {
  productId: string;
  quantity: number;
  priceAtTime: number;
  productName: string;
};

type Order = {
  id: number;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  dateNeeded: string;
  isExpress: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderNotes: string;
  createdAt: string;
  items?: OrderItem[];
};

export function AdminOrders() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load orders");
      return res.json();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Status Updated", description: "Customer has been notified via Email & SMS." });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
  });

  const formatCurrency = (amount: number) => `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-50 text-green-600 border-green-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-orange-50 text-orange-600 border-orange-100';
    }
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toString().includes(searchQuery);
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-900">Order Management</h1>
            <p className="mt-2 text-zinc-500 font-medium text-sm">Fulfill requests and manage customer relations.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 bg-[#0F0F0F] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-zinc-900/10 transition-all hover:scale-105">
               Export Data
             </button>
          </div>
        </header>

        {/* Filters Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#D4145A] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by customer name or order number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-zinc-100 bg-white px-12 py-5 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 shadow-sm hover:shadow-md"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#D4145A] transition-colors" />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none border border-zinc-100 bg-white px-12 py-5 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </section>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#D4145A]" />
          </div>
        ) : (
          <div className="group overflow-hidden border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-50 bg-zinc-50/30">
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Order & Date</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Customer Info</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredOrders?.map((order, idx) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group/row transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-4 py-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-bold text-zinc-900 text-lg">#{order.id}</span>
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <div className="mt-2 text-[#D4145A] font-bold text-sm">
                            {formatCurrency(order.totalAmount)}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-bold text-zinc-900">{order.customerName}</span>
                          <span className="text-xs text-zinc-500 font-medium">{order.customerPhone}</span>
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-bold mt-1">
                             {order.paymentMethod === 'paystack' ? 'ONLINE PAYMENT' : 'CASH ON PICKUP'}
                             <span className="h-1 w-1 bg-zinc-300" />
                             {order.isExpress ? 'EXPRESS' : 'STANDARD'}
                          </div>
                          {order.items && order.items.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2 border-t border-zinc-50 pt-3">
                              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Items Ordered</p>
                              {order.items.map((item, i) => (
                                <a 
                                  key={i}
                                  href={`/cart/${item.productId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-2 text-[11px] font-bold text-[#D4145A] hover:underline"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {item.quantity}x {item.productName || 'Product'}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <span className={cn(
                          "inline-flex items-center border px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                          getStatusStyle(order.status)
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        <div className="flex items-center justify-end gap-4">
                           <select
                            className="appearance-none border border-zinc-100 bg-zinc-50/50 px-4 py-2 text-[11px] font-bold text-zinc-600 outline-none transition-all hover:bg-zinc-100 focus:ring-2 focus:ring-pink-500/20"
                            value={order.status}
                            onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                            disabled={updateStatusMutation.isPending}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button className="flex h-9 w-9 items-center justify-center bg-white border border-zinc-100 text-zinc-400 transition-all hover:text-[#D4145A] hover:border-pink-100 hover:shadow-lg">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {orders?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                           <div className="h-16 w-16 bg-zinc-50 flex items-center justify-center text-zinc-300">
                             <ShoppingCart className="h-8 w-8" />
                           </div>
                           <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">No orders recorded yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>

  );
}


