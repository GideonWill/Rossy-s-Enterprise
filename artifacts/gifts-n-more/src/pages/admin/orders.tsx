import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
};

export function AdminOrders() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({ title: "Status updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
  });

  const formatCurrency = (amount: number) => `GH₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground mt-1">View incoming orders and update their fulfillment status.</p>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID / Date</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium">#{order.id}</div>
                    <div className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                    <div className="mt-2 font-semibold text-primary">{formatCurrency(order.totalAmount)}</div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs mt-1 text-muted-foreground">{order.customerPhone}</div>
                    <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 align-top max-w-[250px]">
                    <div className="text-sm">
                      <span className="font-semibold block mb-1">Date Needed:</span> 
                      {order.dateNeeded}
                      {order.isExpress && <span className="ml-2 inline-flex items-center rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">EXPRESS</span>}
                    </div>
                    <div className="text-sm mt-2">
                      <span className="font-semibold">Payment: </span> 
                      {order.paymentMethod === 'paystack' ? 'Online' : 'Pickup'}
                    </div>
                    {order.orderNotes && (
                      <div className="mt-2 text-xs italic text-muted-foreground bg-muted p-2 rounded">
                        "{order.orderNotes}"
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top">
                    <select
                      className="border border-border bg-background px-3 py-1.5 text-sm outline-none w-full max-w-[150px]"
                      value={order.status}
                      onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                      disabled={updateStatusMutation.isPending}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
