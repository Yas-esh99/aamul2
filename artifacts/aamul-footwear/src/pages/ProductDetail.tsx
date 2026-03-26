import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, ShoppingBag, Check, Loader2, Star,
  Ruler, Package, MapPin, Tag, Heart, Zap, Navigation, Share2
} from "lucide-react";
import { fetchProductById, fetchProductsByCategory, type Product } from "@/lib/products";
import { useBag } from "@/context/BagContext";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailProps {
  id: string;
}

function readable(val?: string) {
  if (!val) return "";
  return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const [, navigate] = useLocation();
  const { addItem, isInBag } = useBag();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  const handleShare = async () => {
    if (!product) return;
    const url = window.location.href;
    const shareData = {
      title: product.title,
      text: product.description,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 2000);
      } catch (_) {}
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedSize(null);
    setActiveImage(0);

    fetchProductById(id)
      .then(async (p) => {
        if (!p) { setError("Product not found."); return; }
        setProduct(p);
        if (p.category) {
          const rel = await fetchProductsByCategory(p.category, p.id, 3);
          setRelated(rel);
        }
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const saved = product ? isInBag(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <h2 className="text-3xl font-bold">{error === "Product not found." ? "Product Not Found" : "Something went wrong"}</h2>
        <p className="text-muted-foreground">{error}</p>
        <button onClick={() => navigate("/")} className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90">
          Back to Products
        </button>
      </div>
    );
  }

  const images = product.img_url?.length ? product.img_url : [];

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: readable(product.category) },
    { label: "Type", value: readable(product.type) },
    { label: "Ideal For", value: readable(product.ideal_for) },
    { label: "Occasion", value: readable(product.occasion) },
    { label: "Color", value: readable(product.color) },
    { label: "Upper Material", value: product.up_material },
    { label: "Sole Material", value: product.sole_material },
    { label: "Toe Shape", value: readable(product.toe_shape) },
    { label: "Fastening", value: readable(product.fastening_and_back) },
    { label: "Heel Height", value: product.heel != null ? `${product.heel} cm` : undefined },
    { label: "Made With", value: readable(product.made_with) },
    { label: "Origin", value: readable(product.country_of_origin) },
    { label: "Weight", value: product.weight != null ? `${product.weight}g` : undefined },
  ].filter((s) => s.value);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-2">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? "border-primary shadow-md" : "border-border/40 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Brand + badges */}
            <div className="flex flex-wrap items-center gap-2">
              {product.brand && (
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {product.brand}
                </span>
              )}
              {product.made_with && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {readable(product.made_with)}
                </span>
              )}
              {product.ideal_for && (
                <span className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full capitalize">
                  {readable(product.ideal_for)}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-foreground leading-tight">{product.title}</h1>
              {product.category && (
                <p className="mt-1 text-sm text-muted-foreground capitalize">{readable(product.category)}</p>
              )}
            </div>

            {/* Price + Rating */}
            <div className="flex items-center gap-4">
              {product.price != null && (
                <p className="text-3xl font-bold text-primary">₹{product.price}</p>
              )}
              {product.rating != null && (
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{product.rating}/5</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quick-info chips */}
            <div className="flex flex-wrap gap-2">
              {product.occasion && (
                <div className="flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full text-sm">
                  <Heart className="w-3.5 h-3.5 text-primary" />
                  <span className="capitalize">{readable(product.occasion)}</span>
                </div>
              )}
              {product.fastening_and_back && (
                <div className="flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full text-sm">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="capitalize">{readable(product.fastening_and_back)}</span>
                </div>
              )}
              {product.toe_shape && (
                <div className="flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full text-sm">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span className="capitalize">{readable(product.toe_shape)} toe</span>
                </div>
              )}
              {product.country_of_origin && (
                <div className="flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="capitalize">{readable(product.country_of_origin)}</span>
                </div>
              )}
              {product.up_material && (
                <div className="flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full text-sm">
                  <Package className="w-3.5 h-3.5 text-primary" />
                  <span className="capitalize">{product.up_material}</span>
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.size_ava?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Select Size (UK)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.size_ava.map((size) => (
                    <button
                      key={String(size)}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 h-12 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                          : "border-border text-foreground hover:border-primary/60 hover:bg-muted"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={saved}
              className={`w-full flex items-center justify-center gap-3 font-semibold py-4 rounded-2xl text-base transition-all shadow-lg ${
                saved
                  ? "bg-primary/20 text-primary cursor-default"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Saved to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Save to Bag
                </>
              )}
            </motion.button>

            {/* Visit Store */}
            <a
              href="https://maps.app.goo.gl/J2E5NxG6Xaa2Acmz9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 font-semibold py-4 rounded-2xl text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Navigation className="w-5 h-5" />
              Visit Our Store
            </a>

            {/* Share */}
            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium border transition-all ${
                shareState === "copied"
                  ? "bg-green-500/10 border-green-500/40 text-green-600"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {shareState === "copied" ? (
                <>
                  <Check className="w-4 h-4" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share this Product
                </>
              )}
            </motion.button>

            {/* Full Specs */}
            {specs.length > 0 && (
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Full Specifications</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {specs.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground capitalize">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="border-t border-border pt-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                You May Also Like
              </span>
              <h2 className="mt-2 text-2xl font-bold">Related Products</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <ProductCard key={rel.id} product={rel} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
