import { Layout, type ShopProps } from "./home";
import { Sparkles, PlayCircle, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SoboloPage(props: ShopProps) {
  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <section className="relative flex min-h-[45dvh] items-center overflow-hidden bg-foreground pt-28 text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
          <Sparkles className="mx-auto mb-6 h-10 w-10 text-primary opacity-90" />
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">Sobolo Making</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Watch our special preparations and discover the rich, refreshing taste of our homemade Sobolo (Bissap). Quality ingredients, crafted with love.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 flex items-center justify-between border-b border-border pb-6">
            <h2 className="font-serif text-3xl md:text-4xl">Videos & Gallery</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <PlayCircle className="h-4 w-4" /> Videos
              </span>
              <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <ImageIcon className="h-4 w-4" /> Photos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder items for the user's media uploads */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative aspect-video overflow-hidden rounded border border-border bg-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <PlayCircle className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs">Video Placeholder</span>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 transition-colors group-hover:border-primary/20" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group relative aspect-video overflow-hidden rounded border border-border bg-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs">Photo Placeholder</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group relative aspect-video overflow-hidden rounded border border-border bg-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs">Photo Placeholder</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
            <p>Upload your Sobolo making videos and pictures here.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
