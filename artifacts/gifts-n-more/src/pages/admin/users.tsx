import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, ShieldAlert, User as UserIcon, Calendar, Mail, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
      toast({ title: "Privileges Updated", description: "The user's access role has been successfully modified." });
    },
    onError: (err: any) => toast({ title: "Update Failed", description: err.message, variant: "destructive" })
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-10">
        <header>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-900">User Directory</h1>
          <p className="mt-2 text-zinc-500 font-medium text-sm">Oversee accounts and manage administrative privileges.</p>
        </header>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-zinc-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-50 bg-zinc-50/30">
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Identity</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact Details</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Membership</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Access Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {users?.map((u, idx) => (
                    <motion.tr 
                      key={u.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {u.name.charAt(0)}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-zinc-900">{u.name}</span>
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">ID: #{u.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-zinc-500 font-medium">
                          <Mail className="h-3.5 w-3.5 text-zinc-300" />
                          {u.email}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-zinc-400 font-bold text-[11px]">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100">
                            <Shield className="h-3 w-3" /> Administrator
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border border-zinc-100">
                            <UserIcon className="h-3 w-3" /> Client
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        {u.id !== currentUser?.id ? (
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => updateRoleMutation.mutate({ id: u.id, role: u.role === "admin" ? "customer" : "admin" })}
                              disabled={updateRoleMutation.isPending}
                              className={cn(
                                "rounded-xl border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                                u.role === "admin" 
                                  ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                                  : "bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800"
                              )}
                            >
                              {u.role === "admin" ? "Revoke Access" : "Grant Access"}
                            </button>
                            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-zinc-100 text-zinc-400 transition-all hover:bg-zinc-50">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 italic">Self (Protected)</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
