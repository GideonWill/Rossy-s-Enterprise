import { AdminLayout } from "./layout";

export function AdminSettings() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store configurations and payment keys.</p>
      </div>

      <div className="max-w-2xl space-y-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-serif">Payment Integration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Paystack Public Key</label>
              <input 
                type="text" 
                placeholder="pk_test_..." 
                className="mt-1 w-full border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary" 
              />
              <p className="mt-1 text-xs text-muted-foreground">This is used for frontend payment initialization.</p>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Paystack Payment Link</label>
              <input 
                type="text" 
                defaultValue="https://paystack.shop/pay/xwalvml4p0"
                className="mt-1 w-full border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary" 
              />
              <p className="mt-1 text-xs text-muted-foreground">The current active payment link for the store.</p>
            </div>
            <button className="bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              Save Payment Settings
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-serif">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Store Name</label>
              <input 
                type="text" 
                defaultValue="Rossy's Enterprise"
                className="mt-1 w-full border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Number</label>
              <input 
                type="text" 
                defaultValue="233277811521"
                className="mt-1 w-full border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary" 
              />
              <p className="mt-1 text-xs text-muted-foreground">Used for pickup orders and support.</p>
            </div>
            <button className="bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              Save Store Info
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
