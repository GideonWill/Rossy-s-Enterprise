import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, ShieldAlert, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  email: string;
  name: string;
  role: "admin" | "customer";
  createdAt: string;
};

export function AdminUsers() {
  const { token, user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load users");
      return res.json();
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: number, role: string }) => {
      const res = await fetch(`${API_BASE_URL}/users/${id}/role`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role })
      });
      if (!res.ok) throw new Error("Failed to update role");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User role updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage customer accounts and assign admin privileges.</p>
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
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {u.role === "admin" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        <Shield className="h-3 w-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        Customer
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {u.id !== currentUser?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateRoleMutation.mutate({ id: u.id, role: u.role === "admin" ? "customer" : "admin" })}
                        disabled={updateRoleMutation.isPending}
                      >
                        {u.role === "admin" ? (
                          <span className="flex items-center gap-2 text-destructive"><ShieldAlert className="h-4 w-4"/> Revoke Admin</span>
                        ) : (
                          <span className="flex items-center gap-2 text-primary"><Shield className="h-4 w-4"/> Make Admin</span>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
