import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, Loader2, ChevronDown, SlidersHorizontal, ChevronUp } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  fetchAllProducts,
  fetchCategories,
  filterProducts,
  normaliseSubcategories,
  getCategoryLabel,
  type Product,
  type CategoryDoc,
} from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

const PAGE_SIZE = 8;

type QuickTag = { label: string; key: string; field: string | null; value: string | null };

const STATIC_QUICK_TAGS: QuickTag[] = [
  { label: "All", key: "all", field: null, value: null },
  { label: "Handmade", key: "handmade", field: "madeWith", value: "handmade" },
  { label: "Men", key: "man", field: "idealFor", value: "man" },
  { label: "Women", key: "woman", field: "idealFor", value: "woman" },
  { label: "Kids", key: "kid", field: "idealFor", value: "kid" },
  { label: "Leather", key: "leather", field: "upMaterials", value: "leather" },
  { label: "Wedding", key: "wedding", field: "occasions", value: "wedding" },
  { label: "Formal", key: "formal", field: "occasions", value: "formal" },
];

const IDEAL_FOR_OPTIONS: { label: string; value: string }[] = [
  { label: "Men", value: "man" },
  { label: "Women", value: "woman" },
  { label: "Kids", value: "kid" },
  { label: "Unisex", value: "unisex" },
];

const PRICE_RANGES = [
  { label: "Any price", min: null, max: null },
  { label: "Under ₹500", min: null, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500+", min: 2500, max: null },
];

const OCCASIONS: { label: string; value: string }[] = [
  { label: "Wedding", value: "wedding" },
  { label: "Casual", value: "casual" },
  { label: "Formal", value: "formal" },
  { label: "Festival", value: "festival" },
  { label: "Party", value: "party" },
  { label: "Sports", value: "sports" },
  { label: "Ethnic", value: "ethnic" },
];

const MATERIALS: { label: string; value: string }[] = [
  { label: "Leather", value: "leather" },
  { label: "Canvas", value: "canvas" },
  { label: "Synthetic", value: "synthetic" },
  { label: "Fabric", value: "fabric" },
  { label: "Rubber", value: "rubber" },
  { label: "Suede", value: "suede" },
  { label: "Jute", value: "jute" },
];

const MADE_WITH_OPTIONS: { label: string; value: string }[] = [
  { label: "Handmade", value: "handmade" },
  { label: "Machine Made", value: "machine made" },
  { label: "Hand Stitched", value: "hand stitched" },
  { label: "Hand Embroidered", value: "hand embroidered" },
];

const COLORS: { label: string; value: string }[] = [
  { label: "Tan", value: "tan" },
  { label: "Black", value: "black" },
  { label: "Brown", value: "brown" },
  { label: "White", value: "white" },
  { label: "Beige", value: "beige" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
];

interface Filters {
  categories: string[];
  idealFor: string[];
  priceIdx: number;
  occasions: string[];
  upMaterials: string[];
  madeWith: string[];
  colors: string[];
}

const DEFAULT_FILTERS: Filters = {
  categories: [],
  idealFor: [],
  priceIdx: 0,
  occasions: [],
  upMaterials: [],
  madeWith: [],
  colors: [],
};

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function applyFilters(
  products: Product[],
  filters: Filters,
  query: string,
  categoriesData: CategoryDoc[]
): Product[] {
  let result = query.trim() ? filterProducts(products, query) : products;
  const { categories, idealFor, priceIdx, occasions, upMaterials, madeWith, colors } = filters;
  const price = PRICE_RANGES[priceIdx];

  if (categories.length > 0) {
    // Expand each selected main category to also include its subcategory values
    const validValues = new Set<string>(categories.map((c) => c.toLowerCase()));
    for (const catValue of categories) {
      const catDoc = categoriesData.find(
        (c) => (c.value ?? c.id).toLowerCase() === catValue.toLowerCase()
      );
      if (catDoc) {
        for (const sub of normaliseSubcategories(catDoc)) {
          validValues.add(sub.value.toLowerCase());
        }
      }
    }
    result = result.filter((p) => p.category && validValues.has(p.category.toLowerCase()));
  }
  if (idealFor.length > 0)
    result = result.filter((p) => p.ideal_for && idealFor.includes(p.ideal_for.toLowerCase()));
  if (occasions.length > 0)
    result = result.filter((p) => p.occasion && occasions.some((o) => p.occasion!.toLowerCase().includes(o)));
  if (upMaterials.length > 0)
    result = result.filter((p) => p.up_material && upMaterials.some((m) => p.up_material!.toLowerCase().includes(m)));
  if (madeWith.length > 0)
    result = result.filter((p) => p.made_with && madeWith.some((mw) => p.made_with!.toLowerCase().includes(mw)));
  if (colors.length > 0)
    result = result.filter((p) => p.color && colors.includes(p.color.toLowerCase()));
  if (price.min != null) result = result.filter((p) => p.price != null && p.price >= price.min!);
  if (price.max != null) result = result.filter((p) => p.price != null && p.price <= price.max!);

  return result;
}

function countActiveFilters(filters: Filters): number {
  return (
    filters.categories.length +
    filters.idealFor.length +
    (filters.priceIdx > 0 ? 1 : 0) +
    filters.occasions.length +
    filters.upMaterials.length +
    filters.madeWith.length +
    filters.colors.length
  );
}

function filtersEqual(a: Filters, b: Filters): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function Home() {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<CategoryDoc[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchAllProducts(),
      fetchCategories(),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategoriesData(cats);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        setCategoriesLoading(false);
      });
  }, []);

  // Apply ?category= and ?sub= URL params as filters when navigating from footer
  useEffect(() => {
    const apply = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      const sub = params.get("sub");
      if (cat) {
        setFilters({ ...DEFAULT_FILTERS, categories: [cat] });
        setQuery(sub ?? "");
        setTimeout(() => {
          document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };

    apply(); // handles cross-page navigation (location changed)
    window.addEventListener("aamul:navigate", apply); // handles same-page footer clicks
    return () => window.removeEventListener("aamul:navigate", apply);
  }, [location]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, filters]);

  const filtered = useMemo(
    () => applyFilters(products, filters, query, categoriesData),
    [products, filters, query, categoriesData]
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const activeFilterCount = countActiveFilters(filters);
  const isDefault = filtersEqual(filters, DEFAULT_FILTERS) && !query.trim();

  // Normalised list of { label, value } for the filter panel
  const dynamicCategories = useMemo(
    () => categoriesData.map((c) => ({ label: getCategoryLabel(c), value: c.value ?? c.id })),
    [categoriesData]
  );

  // Category quick-tags built from Firestore, merged with static tags
  const quickTags = useMemo<QuickTag[]>(
    () => [
      ...STATIC_QUICK_TAGS,
      ...categoriesData.map((c) => ({
        label: getCategoryLabel(c),
        key: `cat-${c.value ?? c.id}`,
        field: "category",
        value: c.value ?? c.id,
      })),
    ],
    [categoriesData]
  );

  const toggleFilter = <K extends keyof Omit<Filters, "priceIdx">>(key: K, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: toggleInArray(prev[key] as string[], value),
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  };

  const handleTagClick = (tag: QuickTag) => {
    if (tag.key === "all") {
      resetFilters();
      return;
    }
    if (!tag.field || !tag.value) return;

    const fieldMap: Record<string, keyof Omit<Filters, "priceIdx">> = {
      category: "categories",
      idealFor: "idealFor",
      occasions: "occasions",
      upMaterials: "upMaterials",
      madeWith: "madeWith",
      colors: "colors",
    };
    const filterKey = fieldMap[tag.field];
    if (!filterKey) return;
    toggleFilter(filterKey, tag.value);
  };

  const isTagActive = (tag: QuickTag): boolean => {
    if (tag.key === "all") return isDefault;
    if (!tag.field || !tag.value) return false;
    const fieldMap: Record<string, keyof Omit<Filters, "priceIdx">> = {
      category: "categories",
      idealFor: "idealFor",
      occasions: "occasions",
      upMaterials: "upMaterials",
      madeWith: "madeWith",
      colors: "colors",
    };
    const filterKey = fieldMap[tag.field];
    if (!filterKey) return false;
    return (filters[filterKey] as string[]).includes(tag.value);
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

        {/* Quick tags — multi-select (static + dynamic categories) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {quickTags.map((tag) => {
            const active = isTagActive(tag);
            return (
              <button
                key={tag.key}
                onClick={() => handleTagClick(tag)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                  {/* Category — dynamic from Firestore */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</label>
                    {categoriesLoading ? (
                      <div className="flex flex-wrap gap-1.5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="h-7 w-16 rounded-xl bg-muted animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {dynamicCategories.map((c) => (
                          <button
                            key={c.value}
                            onClick={() => toggleFilter("categories", c.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                              filters.categories.includes(c.value)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background border-border text-foreground hover:border-primary/40"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ideal For */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ideal For</label>
                    <div className="flex flex-wrap gap-1.5">
                      {IDEAL_FOR_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { toggleFilter("idealFor", opt.value); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.idealFor.includes(opt.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {opt.label}
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
                          onClick={() => setFilters((prev) => ({ ...prev, priceIdx: idx }))}
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
                          key={occ.value}
                          onClick={() => { toggleFilter("occasions", occ.value); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.occasions.includes(occ.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {occ.label}
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
                          key={mat.value}
                          onClick={() => { toggleFilter("upMaterials", mat.value); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.upMaterials.includes(mat.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {mat.label}
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
                          key={opt.value}
                          onClick={() => { toggleFilter("madeWith", opt.value); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.madeWith.includes(opt.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Color</label>
                    <div className="flex flex-wrap gap-1.5">
                      {COLORS.map((col) => (
                        <button
                          key={col.value}
                          onClick={() => { toggleFilter("colors", col.value); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            filters.colors.includes(col.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {col.label}
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
