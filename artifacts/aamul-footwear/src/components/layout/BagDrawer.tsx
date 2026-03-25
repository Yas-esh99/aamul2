import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, PackageOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useBag } from "@/context/BagContext";

export default function BagDrawer() {
  const { items, isOpen, closeBag, removeItem, clearBag } = useBag();
  const [, navigate] = useLocation();

  const handleNavigate = (id: string) => {
    closeBag();
    navigate(`/product/${id}`);
  };

  const handleContinueShopping = () => {
    navigate("/");
    setTimeout(() => closeBag(), 50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={closeBag}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background shadow-2xl z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">Saved Items</h2>
                {items.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeBag}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <PackageOpen className="w-9 h-9 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-base mb-1">Your bag is empty</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Browse our collection and save your favourite pieces here.
                    </p>
                  </div>
                  <button
                    onClick={handleContinueShopping}
                    className="mt-2 flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
                  >
                    Explore Products <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <ul className="divide-y divide-border">
                  <AnimatePresence initial={false}>
                    {items.map(({ product }) => {
                      const image = product.img_url?.[0] ?? "";
                      return (
                        <motion.li
                          key={product.id}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 p-4 group hover:bg-muted/40 transition-colors"
                        >
                          {/* Thumbnail */}
                          <button
                            onClick={() => handleNavigate(product.id)}
                            className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border/40"
                          >
                            {image ? (
                              <img
                                src={image}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No image
                              </div>
                            )}
                          </button>

                          {/* Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                              {product.brand && (
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
                                  {product.brand}
                                </p>
                              )}
                              <button
                                onClick={() => handleNavigate(product.id)}
                                className="text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors text-left line-clamp-2"
                              >
                                {product.title}
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              {product.price != null && (
                                <span className="text-sm font-bold text-primary">₹{product.price}</span>
                              )}
                              <button
                                onClick={() => removeItem(product.id)}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors ml-auto"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{items.length} item{items.length !== 1 ? "s" : ""} saved</span>
                  <button
                    onClick={clearBag}
                    className="flex items-center gap-1.5 text-destructive hover:underline text-xs font-medium transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                </div>
                <button
                  onClick={handleContinueShopping}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-md text-sm"
                >
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
