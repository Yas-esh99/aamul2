import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate network delay, then save to localStorage
    setTimeout(() => {
      const existing: string[] = JSON.parse(
        localStorage.getItem("aamul_subscribers") ?? "[]"
      );
      if (!existing.includes(email.trim().toLowerCase())) {
        existing.push(email.trim().toLowerCase());
        localStorage.setItem("aamul_subscribers", JSON.stringify(existing));
      }
      setLoading(false);
      setSubscribed(true);
      toast({
        title: "You're on the list!",
        description: "We'll keep you posted on new arrivals and exclusive offers.",
      });
    }, 900);
  };

  return (
    <section className="bg-primary/10 border-y border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
              <Mail className="w-6 h-6 text-primary" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
              Be the first to know about new arrivals, handcrafted collections,
              and exclusive offers from Aamul Footwear.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="your@email.com"
                      className={`w-full pl-11 pr-4 py-4 rounded-2xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-base ${
                        error ? "border-destructive focus:ring-destructive/30" : "border-border focus:border-primary"
                      }`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-70 whitespace-nowrap shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">You're subscribed!</p>
                  <p className="text-muted-foreground text-sm">
                    Thank you for joining. We'll be in touch soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inline error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-sm text-destructive text-left"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {!subscribed && (
              <p className="mt-4 text-xs text-muted-foreground">
                No spam, ever. Unsubscribe at any time.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
