import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, X, Image as ImageIcon, Tag, Hash, Star, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: string;
  name: string;
  price: number;
  priceStr: string;
  image: string;
  category: string;
  isFeatured: boolean;
  isOutOfStock: boolean;
};

export function AdminInventory() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState<boolean | 'new'>(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to load products");
      return res.json();
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      const isNew = !product.id || isEditing === "new";
      const url = isNew ? `${API_BASE_URL}/products` : `${API_BASE_URL}/products/${product.id}`;
      const method = isNew ? "POST" : "PUT";
      
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error("Failed to save product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditing(false);
      setCurrentProduct({});
      toast({ title: "Inventory Updated", description: "Product details have been saved successfully." });
    },
    onError: (err: any) => toast({ title: "Update Failed", description: err.message, variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product Removed", description: "The item has been deleted from your inventory." });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
  });

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setCurrentProduct({
      isFeatured: false,
      isOutOfStock: false,
    });
    setIsEditing('new');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(currentProduct);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-900">Inventory Registry</h1>
            <p className="mt-2 text-zinc-500 font-medium text-sm">Manage your curated collection of premium gifts.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddNew} 
            className="flex items-center justify-center gap-3 rounded-2xl bg-[#0F0F0F] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-900/10 transition-all hover:bg-zinc-800"
          >
            <Plus className="h-5 w-5" /> Add New Item
          </motion.button>
        </header>

        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 40 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-[2.5rem] border border-zinc-100 bg-white p-10 shadow-2xl shadow-amber-900/5 relative">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <h2 className="mb-10 font-serif text-3xl font-bold text-zinc-900">
                  {isEditing === 'new' ? "Registry: New Item" : "Registry: Edit Item"}
                </h2>

                <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <Tag className="h-3 w-3 text-amber-600" /> Product Name
                      </label>
                      <input required value={currentProduct.name || ""} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-amber-500/50 focus:bg-white" placeholder="Luxury Sobolo Gift Box" />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <LayoutGrid className="h-3 w-3 text-amber-600" /> Category
                      </label>
                      <input required value={currentProduct.category || ""} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-amber-500/50 focus:bg-white" placeholder="Premium Drinks" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          <Hash className="h-3 w-3 text-amber-600" /> Price (Value)
                        </label>
                        <input type="number" required value={currentProduct.price || ""} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-amber-500/50 focus:bg-white" placeholder="250" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          <Hash className="h-3 w-3 text-amber-600" /> Price (Display)
                        </label>
                        <input required value={currentProduct.priceStr || ""} onChange={e => setCurrentProduct({...currentProduct, priceStr: e.target.value})} className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-amber-500/50 focus:bg-white" placeholder="GH₵250.00" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <ImageIcon className="h-3 w-3 text-amber-600" /> Image URL
                      </label>
                      <input required value={currentProduct.image || ""} onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-amber-500/50 focus:bg-white" placeholder="https://..." />
                    </div>
                    
                    <div className="flex flex-col gap-4 py-4 px-6 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg border transition-all",
                          currentProduct.isFeatured ? "bg-amber-600 border-amber-600 text-white" : "border-zinc-200 bg-white"
                        )}>
                          <input type="checkbox" className="hidden" checked={currentProduct.isFeatured || false} onChange={e => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})} />
                          {currentProduct.isFeatured && <Star className="h-3.5 w-3.5 fill-current" />}
                        </div>
                        <span className="text-sm font-bold text-zinc-700 select-none">Mark as Featured Product</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg border transition-all",
                          currentProduct.isOutOfStock ? "bg-red-600 border-red-600 text-white" : "border-zinc-200 bg-white"
                        )}>
                          <input type="checkbox" className="hidden" checked={currentProduct.isOutOfStock || false} onChange={e => setCurrentProduct({...currentProduct, isOutOfStock: e.target.checked})} />
                          {currentProduct.isOutOfStock && <X className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-sm font-bold text-zinc-700 select-none">Mark as Out of Stock</span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button type="submit" disabled={saveMutation.isPending} className="flex-1 rounded-2xl bg-amber-600 py-8 text-base font-bold text-white hover:bg-amber-700 shadow-lg shadow-amber-600/20">
                        {saveMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Package className="h-5 w-5 mr-2" />}
                        Commit to Registry
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Product Portfolio</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Classification</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Valuation</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Availability</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {products?.map((product, idx) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.25rem] border border-zinc-100 shadow-sm transition-transform group-hover:scale-105">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          </div>
                          <span className="font-serif text-lg font-bold text-zinc-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center rounded-lg bg-zinc-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-bold text-zinc-900 text-base">
                        {product.priceStr}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-2">
                          {product.isOutOfStock ? (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-red-600 border border-red-100">Out of Stock</span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-green-600 border border-green-100">In Stock</span>
                          )}
                          {product.isFeatured && (
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100">Featured</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-100 text-zinc-400 transition-all hover:text-amber-600 hover:border-amber-100 hover:shadow-lg hover:shadow-amber-900/5"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm("Permanently remove this item from the registry?")) deleteMutation.mutate(product.id);
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-100 text-zinc-400 transition-all hover:text-red-600 hover:border-red-100 hover:shadow-lg hover:shadow-red-900/5"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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
