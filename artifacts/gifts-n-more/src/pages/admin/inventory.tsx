import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, X, Image as ImageIcon, Tag, Hash, Star, LayoutGrid, Package, Upload, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(currentProduct);
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(products?.map(p => p.category) || []))];

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
            className="flex items-center justify-center gap-3 bg-[#D4145A] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-pink-900/10 transition-all hover:bg-pink-700"
          >
            <Plus className="h-5 w-5" /> Add New Item
          </motion.button>
        </header>

        {/* Filters Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#D4145A] transition-colors" />
            <input 
              type="text" 
              placeholder="Search products by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-zinc-100 bg-white px-12 py-5 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 shadow-sm hover:shadow-md"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#D4145A] transition-colors" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none border border-zinc-100 bg-white px-12 py-5 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 shadow-sm hover:shadow-md cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </section>

        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 40 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="border border-zinc-100 bg-white p-10 shadow-2xl shadow-pink-900/5 relative">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center bg-zinc-50 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900"
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
                        <Tag className="h-3 w-3 text-[#D4145A]" /> Product Name
                      </label>
                      <input required value={currentProduct.name || ""} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 focus:bg-white" placeholder="Luxury Sobolo Gift Box" />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <LayoutGrid className="h-3 w-3 text-[#D4145A]" /> Category
                      </label>
                      <input required value={currentProduct.category || ""} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 focus:bg-white" placeholder="Premium Drinks" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          <Hash className="h-3 w-3 text-[#D4145A]" /> Price (Value)
                        </label>
                        <input type="number" required value={currentProduct.price || ""} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 focus:bg-white" placeholder="250" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          <Hash className="h-3 w-3 text-[#D4145A]" /> Price (Display)
                        </label>
                        <input required value={currentProduct.priceStr || ""} onChange={e => setCurrentProduct({...currentProduct, priceStr: e.target.value})} className="w-full border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-sm font-semibold outline-none transition-all focus:border-pink-500/50 focus:bg-white" placeholder="GH₵250.00" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <ImageIcon className="h-3 w-3 text-[#D4145A]" /> Product Image
                      </label>
                      
                      <div className="flex flex-col gap-4">
                        {currentProduct.image ? (
                          <div className="relative group aspect-video w-full overflow-hidden border border-zinc-100 bg-zinc-50">
                            <img src={currentProduct.image} alt="Preview" className="h-full w-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => setCurrentProduct(prev => ({ ...prev, image: '' }))}
                              className="absolute top-2 right-2 bg-white/90 p-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-zinc-200 bg-zinc-50 transition-all hover:bg-zinc-100 hover:border-[#D4145A]/50">
                            <Upload className="mb-2 h-8 w-8 text-zinc-300" />
                            <span className="text-xs font-bold text-zinc-400">Upload Image File</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                        )}
                        
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Or use a remote URL</label>
                          <input 
                            value={currentProduct.image || ""} 
                            onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} 
                            className="w-full border border-zinc-100 bg-zinc-50/50 px-5 py-4 text-xs font-semibold outline-none transition-all focus:border-pink-500/50 focus:bg-white" 
                            placeholder="https://images.unsplash.com/..." 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 py-4 px-6 bg-zinc-50/50 border border-zinc-100">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center border transition-all",
                          currentProduct.isFeatured ? "bg-orange-500 border-orange-500 text-white" : "border-zinc-200 bg-white"
                        )}>
                          <input type="checkbox" className="hidden" checked={currentProduct.isFeatured || false} onChange={e => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})} />
                          {currentProduct.isFeatured && <Star className="h-3.5 w-3.5 fill-current" />}
                        </div>
                        <span className="text-sm font-bold text-zinc-700 select-none">Mark as Featured Product</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center border transition-all",
                          currentProduct.isOutOfStock ? "bg-red-600 border-red-600 text-white" : "border-zinc-200 bg-white"
                        )}>
                          <input type="checkbox" className="hidden" checked={currentProduct.isOutOfStock || false} onChange={e => setCurrentProduct({...currentProduct, isOutOfStock: e.target.checked})} />
                          {currentProduct.isOutOfStock && <X className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-sm font-bold text-zinc-700 select-none">Mark as Out of Stock</span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button type="submit" disabled={saveMutation.isPending} className="flex-1 bg-[#D4145A] py-8 text-base font-bold text-white hover:bg-pink-700 shadow-lg shadow-pink-600/20">
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
            <Loader2 className="h-10 w-10 animate-spin text-[#D4145A]" />
          </div>
        ) : (
          <div className="border border-zinc-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-50 bg-zinc-50/30">
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Product Portfolio</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Classification</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Valuation</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Availability</th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredProducts?.map((product, idx) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-zinc-100 shadow-sm transition-transform group-hover:scale-105">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          </div>
                          <span className="font-serif text-base font-bold text-zinc-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center bg-zinc-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-bold text-zinc-900 text-base">
                        {product.priceStr}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {product.isOutOfStock ? (
                            <span className="inline-flex items-center bg-red-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-red-600 border border-red-100">Out of Stock</span>
                          ) : (
                            <span className="inline-flex items-center bg-green-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-green-600 border border-green-100">In Stock</span>
                          )}
                          {product.isFeatured && (
                            <span className="inline-flex items-center bg-pink-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#D4145A] border border-pink-100">Featured</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="flex h-10 w-10 items-center justify-center bg-white border border-zinc-100 text-zinc-400 transition-all hover:text-pink-600 hover:border-pink-100 hover:shadow-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm("Permanently remove this item from the registry?")) deleteMutation.mutate(product.id);
                            }}
                            className="flex h-10 w-10 items-center justify-center bg-white border border-zinc-100 text-zinc-400 transition-all hover:text-red-600 hover:border-red-100 hover:shadow-lg"
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


