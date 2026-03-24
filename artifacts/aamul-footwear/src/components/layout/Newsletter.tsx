import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, ArrowRight, User, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!email.trim()) newErrors.email = "Please enter your email address.";
    else if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const emailKey = email.trim().toLowerCase();
      await setDoc(
        doc(collection(db, "users"), emailKey),
        {
          name: name.trim(),
          email: emailKey,
          is_subscribe: true,
          subscribed_at: new Date().toISOString(),
        },
        { merge: true }
      );
      setSubscribed(true);
    } catch (err) {
      console.error("Failed to save subscriber:", err);
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
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
                  className="flex flex-col gap-3"
                >
                  {/* Name field */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your name"
                      className={`w-full pl-11 pr-4 py-4 rounded-2xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-base ${
                        errors.name ? "border-destructive focus:ring-destructive/30" : "border-border focus:border-primary"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive text-left pl-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email + button row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-4 top-[1.1rem] w-4 h-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="your@email.com"
                        className={`w-full pl-11 pr-4 py-4 rounded-2xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-base ${
                          errors.email ? "border-destructive focus:ring-destructive/30" : "border-border focus:border-primary"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive text-left pl-1">{errors.email}</p>
                      )}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-70 whitespace-nowrap shadow-lg self-start sm:self-auto"
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
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <p className="text-xl font-bold text-foreground mb-1">
                      Welcome, {name}!
                    </p>
                    <p className="text-muted-foreground">
                      You're subscribed. We'll keep you in the loop on new arrivals & exclusive offers.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {email}
                  </motion.div>
                </motion.div>
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
