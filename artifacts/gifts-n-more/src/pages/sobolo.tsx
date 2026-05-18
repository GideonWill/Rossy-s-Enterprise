import { Layout, type ShopProps } from "./home";
import { PlayCircle, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import soboloHero from "@assets/sobolo hero image.jpg";
import soboloVideo from "@assets/Rossys Sobolo.mp4";

function SoboloVideoCard() {
  const thumbRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-play thumbnail on scroll into view
  useEffect(() => {
    const video = thumbRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Open lightbox and start playing modal video
  const openLightbox = () => {
    setLightboxOpen(true);
  };

  // Close lightbox and pause modal video
  const closeLightbox = () => {
    setLightboxOpen(false);
    if (modalRef.current) {
      modalRef.current.pause();
    }
  };

  // Play modal video once it's mounted
  useEffect(() => {
    if (lightboxOpen && modalRef.current) {
      modalRef.current.play().catch(() => {});
    }
  }, [lightboxOpen]);

  // Escape key closes lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Thumbnail card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative aspect-video cursor-pointer overflow-hidden rounded-md border border-border/80 bg-black shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
        onClick={openLightbox}
      >
        <video
          ref={thumbRef}
          src={soboloVideo}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          loop
          playsInline
        />
        {/* Label */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground rounded-full">
            For your Church Events
          </span>
        </div>
      </motion.div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <span className="text-xs font-semibold uppercase tracking-widest">Close</span>
                <X className="h-5 w-5" />
              </button>

              <video
                ref={modalRef}
                src={soboloVideo}
                className="w-full rounded shadow-2xl"
                controls
                autoPlay
                loop
                playsInline
              />

              <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
                Press <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-white/60">Esc</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SoboloPage(props: ShopProps) {
  return (
    <Layout cartCount={props.cartCount} searchProducts={props.searchProducts}>
      <section className="relative flex min-h-[60dvh] items-center overflow-hidden bg-foreground pt-28 text-white">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster={soboloHero}
        >
          <source src={soboloVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />

        <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">Sobolo Making</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              Watch our special preparations and discover the rich, refreshing taste of our homemade Sobolo (Bissap). Quality ingredients, crafted with love.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 flex items-center justify-between border-b border-border pb-6">
            <h2 className="font-serif text-3xl md:text-4xl">Videos &amp; Gallery</h2>
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
            {/* Sobolo video — scroll-triggered autoplay + click to pause/resume */}
            <SoboloVideoCard />

            {/* Photo placeholders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="group relative aspect-video overflow-hidden rounded-md border border-border/80 bg-card shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="text-xs font-medium uppercase tracking-widest">Photo Placeholder</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="group relative aspect-video overflow-hidden rounded-md border border-border/80 bg-card shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="mb-3 h-10 w-10 opacity-50" />
                <span className="text-xs font-medium uppercase tracking-widest">Photo Placeholder</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </Layout>
  );
}


