import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, Loader2, ChevronDown, SlidersHorizontal, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { fetchAllProducts, filterProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

const PAGE_SIZE = 8;

const QUICK_TAGS = [
  { label: "All", key: "all" },
  { label: "Handmade", key: "handmade", field: "madeWith", value: "handmade" },
  { label: "Men", key: "men", field: "idealFor", value: "men" },
  { label: "Women", key: "women", field: "idealFor", value: "women" },
  { label: "Loafer", key: "loafer", field: "category", value: "loafer" },
  { label: "Leather", key: "leather", field: "upMaterial", value: "leather" },
  { label: "Traditional", key: "traditional", field: "category", value: "traditional" },
  { label: "Sandals", key: "sandals", field: "category", value: "sandals" },
  { label: "Casual", key: "casual", field: "category", value: "casual" },
  { label: "Sports", key: "sports", field: "category", value: "sports" },
  { label: "Boots", key: "boots", field: "category", value: "boots" },
  { label: "Heels", key: "heels", field: "category", value: "heels" },
  { label: "Formal", key: "formal", field: "category", value: "formal" },
];

const CATEGORIES = [
  "Formal", "Casual", "Sports", "Boots", "Sandals", "Traditional", "Heels", "Slippers",
];

const IDEAL_FOR_OPTIONS = ["Men", "Women", "Kids", "Unisex"];

const PRICE_RANGES = [
  { label: "Any price", min: null, max: null },
  { label: "Under ₹500", min: null, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500+", min: 2500, max: null },
];

const OCCASIONS = ["Casual", "Formal", "Wedding", "Festival", "Party", "Sports", "Ethnic"];

const MATERIALS = ["Leather", "Canvas", "Synthetic", "Fabric", "Rubber", "Suede", "Jute"];

const MADE_WITH_OPTIONS = ["Handmade", "Machine Made", "Hand Stitched", "Hand Embroidered"];

interface Filters {
  category: string;
  idealFor: string;
  priceIdx: number;
  occasion: string;
  upMaterial: string;
  madeWith: string;
}

const DEFAULT_FILTERS: Filters = {
  category: "",
  idealFor: "",
  priceIdx: 0,
  occasion: "",
  upMaterial: "",
  madeWith: "",
};

function applyFilters(products: Product[], filters: Filters, query: string): Product[] {
  let result = query.trim() ? filterProducts(products, query) : products;
  const { category, idealFor, priceIdx, occasion, upMaterial, madeWith } = filters;
  const price = PRICE_RANGES[priceIdx];

  if (category) result = result.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
  if (idealFor) result = result.filter((p) => p.ideal_for?.toLowerCase() === idealFor.toLowerCase());
  if (occasion) result = result.filter((p) => p.occasion?.toLowerCase().includes(occasion.toLowerCase()));
  if (upMaterial) result = result.filter((p) => p.up_material?.toLowerCase().includes(upMaterial.toLowerCase()));
  if (madeWith) result = result.filter((p) => p.made_with?.toLowerCase().includes(madeWith.toLowerCase()));
  if (price.min != null) result = result.filter((p) => p.price != null && p.price >= price.min!);
  if (price.max != null) result = result.filter((p) => p.price != null && p.price <= price.max!);

  return result;
}

function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.category) count++;
  if (filters.idealFor) count++;
  if (filters.priceIdx > 0) count++;
  if (filters.occasion) count++;
  if (filters.upMaterial) count++;
  if (filters.madeWith) count++;
  return count;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((e) => {
        console.error(e);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, filters]);

  const filtered = useMemo(
    () => applyFilters(products, filters, query),
    [products, filters, query]
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const activeFilterCount = countActiveFilters(filters);

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setActiveTag("all");
    setQuery("");
  };

  const handleTagClick = (tag: typeof QUICK_TAGS[number]) => {
    setActiveTag(tag.key);
    if (tag.key === "all") {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const newFilters = { ...DEFAULT_FILTERS };
    if (tag.field === "category") newFilters.category = tag.value ?? "";
    else if (tag.field === "idealFor") newFilters.idealFor = tag.value ?? "";
    else if (tag.field === "upMaterial") newFilters.upMaterial = tag.value ?? "";
    else if (tag.field === "madeWith") newFilters.madeWith = tag.value ?? "";
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero */}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-6 block">Heritage & Craft</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-6 text-balance leading-tight">
              Crafted for the <br /><span className="text-primary italic">Journey.</span>
            </h1>
            <p className="text-secondary/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              We preserve the soulful art of traditional shoemaking. Earthy, beautiful, and made to last a lifetime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Shop Collection <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Store / Collection */}
      <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Heading row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">Latest Arrivals</h2>
            <p className="text-muted-foreground text-lg">Discover our newest handcrafted pieces, born from raw leather and shaped by artisan hands.</p>
          </div>
          <Link href="/handmade-mojdi" className="group flex items-center gap-2 text-primary font-semibold hover:text-foreground transition-colors">
            Discover Mojdi
            <span className="bg-primary/10 p-2 rounded-full group-hover:bg-muted transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Search + Filter button row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, material, category..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-base shadow-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-2 px-5 py-4 rounded-2xl border font-medium text-sm transition-all shadow-sm whitespace-nowrap ${
              activeFilterCount > 0
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground hover:border-primary/40"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary-foreground text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick tags */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag.key}
              onClick={() => handleTagClick(tag)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeTag === tag.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Advanced filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="bg-muted/50 border border-border rounded-2xl p-5 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</label>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setFilter("category", filters.category === c.toLowerCase() ? "" : c.toLowerCase());
                            setActiveTag("all");
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.category === c.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gender / For */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ideal For</label>
                    <div className="flex flex-wrap gap-1.5">
                      {IDEAL_FOR_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFilter("idealFor", filters.idealFor === opt.toLowerCase() ? "" : opt.toLowerCase());
                            setActiveTag("all");
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.idealFor === opt.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Price Range</label>
                    <div className="flex flex-col gap-1.5">
                      {PRICE_RANGES.map((range, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setFilter("priceIdx", idx); setActiveTag("all"); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-left transition-all ${
                            filters.priceIdx === idx
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Occasion</label>
                    <div className="flex flex-wrap gap-1.5">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          onClick={() => {
                            setFilter("occasion", filters.occasion === occ.toLowerCase() ? "" : occ.toLowerCase());
                            setActiveTag("all");
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.occasion === occ.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upper Material */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Material</label>
                    <div className="flex flex-wrap gap-1.5">
                      {MATERIALS.map((mat) => (
                        <button
                          key={mat}
                          onClick={() => {
                            setFilter("upMaterial", filters.upMaterial === mat.toLowerCase() ? "" : mat.toLowerCase());
                            setActiveTag("all");
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.upMaterial === mat.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Made With */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Made With</label>
                    <div className="flex flex-wrap gap-1.5">
                      {MADE_WITH_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFilter("madeWith", filters.madeWith === opt.toLowerCase() ? "" : opt.toLowerCase());
                            setActiveTag("all");
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.madeWith === opt.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Reset */}
                {(activeFilterCount > 0 || query) && (
                  <div className="mt-4 pt-4 border-t border-border flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors font-medium"
                    >
                      <X className="w-3.5 h-3.5" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result summary */}
        <AnimatePresence>
          {(query.trim() || activeFilterCount > 0) && !loading && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mb-5 text-sm text-muted-foreground"
            >
              {filtered.length > 0
                ? `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`
                : "No products match your filters"}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Loading products...</p>
          </div>
        )}

        {/* Error */}
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
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {visible.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>

                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-2 mt-14"
                  >
                    <p className="text-sm text-muted-foreground">Showing {visibleCount} of {filtered.length} products</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Show More <ChevronDown className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
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
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

    </div>
  );
}
