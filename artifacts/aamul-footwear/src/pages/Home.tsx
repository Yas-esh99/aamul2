import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pt-20">
      
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
              Crafted for the <br/><span className="text-primary italic">Journey.</span>
            </h1>
            <p className="text-secondary/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              We preserve the soulful art of traditional shoemaking. Earthy, beautiful, and made to last a lifetime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
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
