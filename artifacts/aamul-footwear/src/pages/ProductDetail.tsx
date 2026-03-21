import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, ShoppingBag, CheckCircle, Package,
  Ruler, Loader2, Star, Palette, Building2, Weight
} from "lucide-react";
import { fetchProductById, fetchProductsByType, type Product } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedSize(null);
    setActiveImage(0);

    fetchProductById(id)
      .then(async (p) => {
        if (!p) { setError("Product not found."); return; }
        setProduct(p);
        if (p.type) {
          const rel = await fetchProductsByType(p.type, p.id, 3);
          setRelated(rel);
        }
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", description: "Choose your size before adding to bag.", variant: "destructive" });
      return;
    }
    toast({ title: "Added to Bag", description: `${product?.title} (Size ${selectedSize}) has been added to your bag.` });
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
        <h2 className="text-3xl font-bold text-foreground">
          {error === "Product not found." ? "Product Not Found" : "Something went wrong"}
        </h2>
        <p className="text-muted-foreground">{error ?? "An unexpected error occurred."}</p>
        <button onClick={() => navigate("/")} className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
          Back to Products
        </button>
      </div>
    );
  }

  const images = product.img_url?.length ? product.img_url : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Image Gallery */}
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
                  className="w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  No image available
                </div>
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
                    <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Type + Title */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {product.type && (
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {product.type}
                  </span>
                )}
                {product.class && (
                  <span className="text-xs text-muted-foreground">· {product.class}</span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-foreground leading-tight">{product.title}</h1>
              {product.company && (
                <p className="mt-1 text-sm text-muted-foreground font-medium">{product.company}</p>
              )}
              {product.price != null && (
                <p className="mt-3 text-3xl font-semibold text-primary">${product.price}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating != null && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}/5</span>
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>

            {/* Attribute badges */}
            <div className="flex flex-wrap gap-3">
              {product.color && (
                <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                  <Palette className="w-4 h-4 text-primary" />
                  {product.color}
                </div>
              )}
              {product.up_material && (
                <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                  <Package className="w-4 h-4 text-primary" />
                  {product.up_material}
                </div>
              )}
              {product.shape && (
                <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                  <Building2 className="w-4 h-4 text-primary" />
                  {product.shape}
                </div>
              )}
              {product.weight != null && (
                <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                  <Weight className="w-4 h-4 text-primary" />
                  {product.weight}g
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.size_ava?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Select Size
                  </span>
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
              className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Bag
            </motion.button>

            {/* Specs */}
            <div className="border-t border-border pt-6 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Specifications
              </h3>
              {[
                { label: "Type", value: product.type },
                { label: "Class", value: product.class },
                { label: "Upper Material", value: product.up_material },
                { label: "Sole Material", value: product.sole_material },
                { label: "Shape", value: product.shape },
                { label: "Color", value: product.color },
                { label: "Weight", value: product.weight != null ? `${product.weight}g` : null },
              ]
                .filter((s) => s.value)
                .map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{label}:</span> {value}
                    </span>
                  </div>
                ))}
            </div>
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
              <h2 className="mt-2 text-2xl font-bold text-foreground">Related Products</h2>
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
