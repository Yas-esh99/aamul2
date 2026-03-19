import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Aamul Footwear was born from a desire to bring the raw, tactile beauty of handmade leather goods into the modern wardrobe.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5]"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/about-workshop.png`}
              alt="Our Workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-background/20 rounded-3xl m-4 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Workshop</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Located away from the noise of the city, our workshop smells of tanned leather, beeswax, and wood. It is a place where time slows down. We reject the conveyor belt mentality. Here, one artisan crafts a single pair of shoes from start to finish.
              </p>
            </div>
            
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To create footwear that is honest, beautiful, and enduring. We want to reconnect people with the objects they wear, fostering an appreciation for the human energy embedded in every pair.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-2xl border border-border mt-4">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Our Promise</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  100% Genuine Leather
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Ethically Sourced Materials
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Fair Wages for Artisans
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-secondary/30 py-24 border-y border-border">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">Visit or Write to Us</h2>
            <p className="text-lg text-muted-foreground mb-12">
              We love hearing from fellow craft enthusiasts. Whether you want to discuss a custom order or just say hello.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors flex flex-col items-center shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">hello@aamulfootwear.com</p>
                <p className="text-muted-foreground">press@aamulfootwear.com</p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors flex flex-col items-center shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Studio</h3>
                <p className="text-muted-foreground">124 Artisan Lane</p>
                <p className="text-muted-foreground">Craft District, CR 90210</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
