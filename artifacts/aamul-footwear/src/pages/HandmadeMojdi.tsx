import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

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
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery / Moodboard */}
        <div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-12">The Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Using stock placeholders to simulate a varied gallery */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              {/* traditional shoes Unsplash */}
              <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80" className="w-full h-full object-cover" alt="Mojdi detail" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="aspect-[4/3] md:aspect-auto rounded-2xl overflow-hidden bg-muted"
            >
              {/* leather texture Unsplash */}
              <img src="https://pixabay.com/get/g15a7b18c4b0e7f62f807cca5b4f8d1ab73989992dc66dd07a317b29dc1853430f3d66751a9e446f2d9807c04280103402bf686827d7550fdb3b489ee49fa2743_1280.jpg" className="w-full h-full object-cover" alt="Leather material" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="aspect-square rounded-2xl overflow-hidden bg-muted"
            >
              {/* colorful embroidery Unsplash */}
              <img src="https://pixabay.com/get/g945dafcb2a7fee567631249544a1336f279564b3b23cb18ab424d2d708825f44d391557660538caaede1ddd7ac35996ce0f71feddf2680900a860c83f10f3672_1280.jpg" className="w-full h-full object-cover" alt="Embroidery detail" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 aspect-[21/9] rounded-2xl overflow-hidden bg-muted"
            >
              {/* artisan shoes Unsplash */}
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80" className="w-full h-full object-cover" alt="Finished Mojdi" />
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/">
              <button className="bg-foreground text-background px-8 py-4 rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl hover:shadow-primary/25">
                Shop The Collection
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
