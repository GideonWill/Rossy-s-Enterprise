import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./layout";
import { API_BASE_URL } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  const [isEditing, setIsEditing] = useState(false);
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
      toast({ title: "Product saved successfully" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
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
      toast({ title: "Product deleted" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" })
  });

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      isFeatured: false,
      isOutOfStock: false,
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(currentProduct);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Manage your products, prices, and stock status.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {isEditing && (
        <div className="mb-8 border border-border bg-card p-6 shadow-sm relative">
          <button onClick={() => setIsEditing(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
          <h2 className="mb-4 font-serif text-xl">{currentProduct.id ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
              <input required value={currentProduct.name || ""} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border p-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
              <input required value={currentProduct.category || ""} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full border p-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Price (Number)</label>
              <input type="number" required value={currentProduct.price || ""} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full border p-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Price String (e.g. GH₵250.00)</label>
              <input required value={currentProduct.priceStr || ""} onChange={e => setCurrentProduct({...currentProduct, priceStr: e.target.value})} className="w-full border p-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Image URL</label>
              <input required value={currentProduct.image || ""} onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} className="w-full border p-2 text-sm" />
            </div>
            <div className="flex items-center gap-4 py-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentProduct.isFeatured || false} onChange={e => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})} />
                Featured Product
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentProduct.isOutOfStock || false} onChange={e => setCurrentProduct({...currentProduct, isOutOfStock: e.target.checked})} />
                Out of Stock
              </label>
            </div>
            <div className="md:col-span-2 mt-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save Product
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover border" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.priceStr}</td>
                  <td className="px-6 py-4">
                    {product.isOutOfStock ? (
                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">Out of Stock</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">In Stock</span>
                    )}
                    {product.isFeatured && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => {
                        if (confirm("Are you sure you want to delete this product?")) deleteMutation.mutate(product.id);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
