import { Layout, type ShopProps } from "./home";
import { PackageCheck, PlayCircle, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import corporateGiftsImage from "@assets/image_1776005308789.png";

export default function PackagingPage(props: ShopProps) {
  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <section className="relative flex min-h-[50dvh] items-center overflow-hidden bg-foreground pt-28 text-white">
        <img src={corporateGiftsImage} alt="Packaging Portfolio" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PackageCheck className="mx-auto mb-6 h-10 w-10 text-primary opacity-90" />
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">Packaging Portfolio</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Discover our premium packaging solutions. From elegant gift boxes to custom wrapping, we ensure your gifts make a lasting impression.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 flex items-center justify-between border-b border-border pb-6">
            <h2 className="font-serif text-3xl md:text-4xl">Packaging Gallery & Videos</h2>
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
            {/* Placeholder items for packaging videos and photos */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <PlayCircle className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Hamper Packaging Process</span>
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Custom Gift Box Design</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <PlayCircle className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Ribbon Bow Tying Tutorial</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Luxury Wrapping Styles</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <PlayCircle className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Corporate Bulk Packaging</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="group relative aspect-[4/5] overflow-hidden bg-card border border-border/80 rounded-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="font-medium uppercase tracking-widest text-xs text-center px-4">Eco-friendly Materials</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-20 border border-dashed border-border bg-card p-16 text-center">
            <h3 className="font-serif text-2xl mb-4">Your Packaging Story</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              This space is ready for your premium packaging videos and high-quality photography. Show your clients the care and detail that goes into every Rossy's Enterprise package.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
