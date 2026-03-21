import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { fetchAllProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

const processSteps = [
  {
    title: "Sourcing Leather",
    desc: "We begin by selecting premium, ethically sourced camel and buffalo leather, prized for its durability and natural breathability."
  },
  {
    title: "Hand Cutting",
    desc: "Patterns are traced and cut entirely by hand, honoring the natural grain and ensuring minimal waste in our workshop."
  },
  {
    title: "Intricate Embroidery",
    desc: "Artisans spend hours embellishing the uppers with traditional Zari (gold thread) and vivid silk threads."
  },
  {
    title: "The Final Stitch",
    desc: "The upper is hand-stitched to the thick leather sole using heavy waxed thread, ensuring it lasts for years."
  }
];

export default function HandmadeMojdi() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
      .then((all) => {
        const mojdi = all.filter((p) =>
          p.type?.toLowerCase().includes("mojdi") ||
          p.class?.toLowerCase().includes("mojdi")
        );
        setProducts(mojdi);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
            The Handmade <span className="text-primary italic">Mojdi</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A celebration of traditional Indian craftsmanship. Each pair of our Mojdis carries the soul of the artisan who made them.
          </p>
        </motion.div>

        {/* Hero Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative w-full aspect-[21/9] min-h-[400px] rounded-3xl overflow-hidden mb-24 shadow-2xl shadow-primary/10"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/mojdi-hero.png`}
            alt="Beautiful handmade Mojdi"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* The Process Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">How It's Made</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 text-8xl font-display font-black text-muted/50 transition-transform group-hover:-translate-y-4 group-hover:translate-x-2">
                  {idx + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground mb-4 font-display">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Collection — Live from Firestore */}
        <div>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">
                Our Work
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground">The Collection</h2>
            </div>
            <Link href="/">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                View All Products →
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span>Loading collection...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No Mojdi products found yet.</p>
              <p className="text-sm mt-2">Add products with type "mojdi" in Firestore to see them here.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/">
              <button className="bg-foreground text-background px-8 py-4 rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl hover:shadow-primary/25">
                Shop The Full Collection
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
