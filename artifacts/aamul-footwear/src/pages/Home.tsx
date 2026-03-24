import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { fetchAllProducts, filterProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((e) => {
        console.error(e);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = query.trim() ? filterProducts(products, query) : products;

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-foreground">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-artisan.png`}
            alt="Artisan leather workshop"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-6 block">
              Heritage & Craft
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-6 text-balance leading-tight">
              Crafted for the <br /><span className="text-primary italic">Journey.</span>
            </h1>
            <p className="text-secondary/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              We preserve the soulful art of traditional shoemaking. Earthy, beautiful, and made to last a lifetime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Shop Collection
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section id="collection" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Latest Arrivals
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our newest handcrafted pieces, born from raw leather and shaped by artisan hands.
            </p>
          </div>
          <Link
            href="/handmade-mojdi"
            className="group flex items-center gap-2 text-primary font-semibold hover:text-foreground transition-colors"
          >
            Discover Mojdi
            <span className="bg-primary/10 p-2 rounded-full group-hover:bg-muted transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, material, category..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-base shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {query.trim() && !loading && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-sm text-muted-foreground"
              >
                {filtered.length > 0
                  ? `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found for "${query}"`
                  : `No products found for "${query}"`}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <p className="text-destructive font-medium">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchAllProducts()
                  .then(setProducts)
                  .catch(() => setError("Failed to load products."))
                  .finally(() => setLoading(false));
              }}
              className="px-5 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
              >
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Try searching for a different name, category like "mojdi" or "sandal", or material.
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Process Banner */}
      <section className="bg-muted py-24 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/craft-hands.png`}
                alt="Artisan stitching leather"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex flex-col justify-center"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                The Beauty of Slow Craft
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                In a world of fast fashion, we choose the deliberate pace of human hands. Every cut, every stitch, and every finishing touch is performed by artisans who have inherited their skills through generations.
              </p>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We believe footwear should mold to your journey, developing a rich patina that tells your unique story.
              </p>

              <Link
                href="/about"
                className="w-fit border-b-2 border-primary text-foreground font-semibold pb-1 hover:text-primary transition-colors"
              >
                Read Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
