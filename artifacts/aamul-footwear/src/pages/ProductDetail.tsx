import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, ShoppingBag, CheckCircle, Package, MapPin, Ruler } from "lucide-react";
import { products } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <h2 className="text-3xl font-bold text-foreground">Product Not Found</h2>
        <p className="text-muted-foreground">This product doesn't seem to exist.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to bag.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Added to Bag",
      description: `${product.name} (Size ${selectedSize}) has been added to your bag.`,
    });
  };

  const categoryLabel: Record<string, string> = {
    mojdi: "Mojdi",
    sandal: "Sandal",
    loafer: "Loafer",
    boot: "Boot",
  };

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
              {product.isNew && (
                <div className="absolute top-5 left-5 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  New
                </div>
              )}
              <img
                src={product.gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail Row */}
            {product.gallery.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-primary shadow-md"
                        : "border-border/40 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
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
            {/* Category + Name */}
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {categoryLabel[product.category]}
              </span>
              <h1 className="mt-2 text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-3xl font-semibold text-primary">${product.price}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-base">
              {product.longDescription}
            </p>

            {/* Origin & Material badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {product.origin}
              </div>
              <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-full text-sm text-foreground">
                <Package className="w-4 h-4 text-primary" />
                {product.material}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Select Size (UK)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
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

            {/* Add to Bag */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Bag
            </motion.button>

            {/* Features */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                What Makes It Special
              </h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Care Instructions */}
            <div className="bg-muted/40 rounded-2xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                Care Instructions
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.careInstructions}
              </p>
            </div>

            {/* Sole */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
              <span className="font-medium text-foreground">Sole:</span>
              {product.sole}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
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
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                Related Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related, i) => (
                <ProductCard key={related.id} product={related} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
