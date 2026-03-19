import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your bag.`,
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 cursor-pointer transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            New
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-background/90 backdrop-blur text-foreground font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-display text-xl font-bold text-foreground leading-tight">
            {product.name}
          </h3>
          <span className="font-medium text-primary whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mt-1 flex-grow">
          {product.description}
        </p>
        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
