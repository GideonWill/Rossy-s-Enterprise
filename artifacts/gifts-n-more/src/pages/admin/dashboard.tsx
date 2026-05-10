import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export function AdminDashboard() {
  const { token } = useAuth();
  const [, setLocation] = useLocation();

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

  const formatCurrency = (amount: number) => `GH₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(data?.totalRevenue || 0),
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-[#D4145A] to-[#FBB03B]",
      trend: "+12.5%",
      isPositive: true
    },
    {
      label: "Total Orders",
      value: (data?.totalOrders || 0).toString(),
      icon: <ShoppingCart className="h-6 w-6" />,
      color: "from-pink-600 to-pink-800",
      trend: "+5.2%",
      isPositive: true
    },
    {
      label: "Active Products",
      value: (data?.totalProducts || 0).toString(),
      icon: <Package className="h-6 w-6" />,
      color: "from-orange-500 to-orange-700",
      trend: "Stable",
      isPositive: true
    },
    {
      label: "Total Customers",
      value: (data?.totalUsers || 0).toString(),
      icon: <Users className="h-6 w-6" />,
      color: "from-zinc-800 to-[#0F0F0F]",
      trend: "+2.4%",
      isPositive: true
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-12">
          <div className="h-12 w-64 animate-pulse bg-zinc-100" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 animate-pulse bg-zinc-50 border border-zinc-100" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-12">
        <header>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-4xl font-bold tracking-tight text-zinc-900"
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-zinc-500 font-medium"
          >
            A high-level view of your business performance today.
          </motion.p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden border border-zinc-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/5"
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  "flex h-14 w-14 items-center justify-center bg-gradient-to-br text-white shadow-lg",
                  stat.color
                )}>
                  {stat.icon}
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                  stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                  {stat.value}
                </h3>
              </div>

              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-pink-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl" />
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 border border-zinc-100 bg-white p-10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-pink-50 text-[#D4145A]">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-zinc-900">Sales Performance</h3>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Revenue growth over time</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-pink-50 text-[10px] font-bold text-[#D4145A] border border-pink-100 uppercase tracking-widest">Monthly Revenue</span>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.monthlySales || []} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 700 }}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8f8f8' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-zinc-900 p-4 border border-zinc-800 shadow-2xl">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{payload[0].payload.month}</p>
                            <p className="text-sm font-bold text-white">{formatCurrency(Number(payload[0].value))}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="#D4145A" 
                    barSize={40}
                  >
                    {data?.monthlySales?.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === (data?.monthlySales?.length - 1) ? '#D4145A' : '#f4f4f5'} 
                        className="transition-all duration-300 hover:fill-[#D4145A]"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-zinc-100 bg-[#0F0F0F] p-10 shadow-sm text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold mb-2">Quick Actions</h3>
              <p className="text-zinc-500 text-sm mb-8 font-medium">Manage your store efficiently.</p>
              
              <div className="space-y-4">
                {[
                  { label: "Update Inventory", desc: "Modify product details", icon: <Package className="h-4 w-4" />, href: "/admin/inventory" },
                  { label: "Review Orders", desc: "Check pending deliveries", icon: <ShoppingCart className="h-4 w-4" />, href: "/admin/orders" },
                  { label: "Customer List", desc: "Manage client database", icon: <Users className="h-4 w-4" />, href: "/admin/users" },
                ].map((action) => (
                  <button 
                    key={action.label}
                    onClick={() => setLocation(action.href)}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 text-left group"
                  >
                    <div className="h-10 w-10 flex items-center justify-center bg-pink-500/10 text-[#D4145A] group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{action.label}</p>
                      <p className="text-[10px] text-zinc-500 font-medium">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-pink-500/10 blur-[100px]" />
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}


