import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Check } from "lucide-react";
import { useLocation } from "wouter";
import type { Product } from "@/lib/products";
import { useBag } from "@/context/BagContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

function badge(text?: string) {
  if (!text) return null;
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [, navigate] = useLocation();
  const { addItem, isInBag } = useBag();
  const saved = isInBag(product.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!saved) addItem(product);
  };

  const mainImage = product.img_url?.[0] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 cursor-pointer transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}

        {/* Badges row */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.category && (
            <span className="bg-background/85 backdrop-blur text-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize">
              {badge(product.category)}
            </span>
          )}
          {product.made_with && (
            <span className="bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize">
              {badge(product.made_with)}
            </span>
          )}
        </div>

        {/* Hover save-to-bag */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleSave}
            className={`w-full backdrop-blur font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg ${
              saved
                ? "bg-primary text-primary-foreground cursor-default"
                : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Save to Bag
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand */}
        {product.brand && (
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">
            {product.brand}
          </p>
        )}

        {/* Title + Price */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-display text-base font-bold text-foreground leading-snug">
            {product.title}
          </h3>
          {product.price != null && (
            <span className="font-semibold text-primary whitespace-nowrap text-sm">
              ₹{product.price}
            </span>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {product.rating != null && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-xs font-medium text-foreground">{product.rating}</span>
              </div>
            )}
            {product.ideal_for && (
              <span className="text-xs text-muted-foreground capitalize">
                · {product.ideal_for}
              </span>
            )}
          </div>
          {product.occasion && (
            <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full capitalize">
              {badge(product.occasion)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
