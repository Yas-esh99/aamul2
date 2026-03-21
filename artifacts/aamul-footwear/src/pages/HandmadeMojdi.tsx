import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Loader2, CheckCircle, Phone, Mail, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { fetchMojdiGallery, type MojdiDoc } from "@/lib/products";

const MOJDI_PARTS = [
  {
    label: "Upper (Kapra)",
    desc: "Hand-embroidered fabric or leather forming the top of the shoe, decorated with Zari and silk thread.",
    position: "top-[14%] left-[8%]",
    dot: "top-[30%] left-[22%]",
  },
  {
    label: "Toe Cap (Nok)",
    desc: "The signature curved, pointed tip — the most iconic feature of the Mojdi silhouette.",
    position: "top-[6%] right-[6%]",
    dot: "top-[22%] right-[28%]",
  },
  {
    label: "Insole (Andar Tali)",
    desc: "Soft vegetable-tanned leather lining that molds to the foot over time for a custom fit.",
    position: "bottom-[30%] left-[4%]",
    dot: "bottom-[40%] left-[30%]",
  },
  {
    label: "Sole (Tala)",
    desc: "Thick double-layered leather sole, hand-stitched with waxed thread for decades of wear.",
    position: "bottom-[10%] right-[6%]",
    dot: "bottom-[20%] right-[32%]",
  },
];

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
  "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=600&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Selecting the Leather",
    desc: "Only the finest camel and buffalo leather is hand-picked — chosen for its grain, durability, and natural breathability.",
  },
  {
    step: "02",
    title: "Cutting by Hand",
    desc: "Each piece is traced and cut entirely by hand using traditional wooden patterns, respecting the leather's natural grain.",
  },
  {
    step: "03",
    title: "Embroidery & Embellishment",
    desc: "Skilled artisans spend 4–8 hours per pair threading intricate Zari (gold thread), mirrors, and silk embroidery.",
  },
  {
    step: "04",
    title: "Hand Stitching",
    desc: "The upper is sewn to the sole using heavy waxed thread — no machines, no shortcuts. Just hands and mastery.",
  },
];

export default function HandmadeMojdi() {
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    fetchMojdiGallery()
      .then((docs: MojdiDoc[]) => {
        const urls = docs.flatMap((d) => d.img_url ?? []).filter(Boolean);
        setGallery(urls.length > 0 ? urls : DUMMY_IMAGES);
      })
      .catch(() => setGallery(DUMMY_IMAGES))
      .finally(() => setGalleryLoading(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ─── BANNER SECTION ─────────────────────────────────── */}
      <section className="min-h-screen pt-20 bg-[#1a1208] relative overflow-hidden flex items-center">
        {/* Warm texture overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c2613a 0%, transparent 60%), radial-gradient(circle at 80% 50%, #8b4513 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 py-16 w-full">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-amber-200/60 hover:text-amber-200 transition-colors mb-12 text-sm gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Process explanation */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#c2613a] text-xs uppercase tracking-widest font-semibold block mb-4">
                Heritage Footwear · Since Generations
              </span>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-amber-50 leading-tight mb-6">
                The Art of the<br />
                <span className="text-[#c2613a] italic">Mojdi</span>
              </h1>
              <p className="text-amber-100/70 text-lg leading-relaxed mb-12 max-w-lg">
                Born in the royal courts of Rajasthan, the Mojdi is more than footwear — it is a living tradition. 
                Every pair is a conversation between the artisan's hands and centuries of craft.
              </p>

              <div className="space-y-6">
                {PROCESS_STEPS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex gap-5 group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full border border-[#c2613a]/40 flex items-center justify-center text-[#c2613a] text-xs font-bold group-hover:bg-[#c2613a] group-hover:text-white transition-all duration-300">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-amber-100 font-semibold mb-1">{s.title}</h3>
                      <p className="text-amber-100/50 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Mojdi anatomy diagram */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Mojdi image */}
                <div className="w-full h-full rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl shadow-black/60">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85"
                    alt="Handmade Mojdi anatomy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/60 via-transparent to-transparent rounded-3xl" />
                </div>

                {/* Part labels */}
                {MOJDI_PARTS.map((part, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                    className={`absolute ${part.position} z-10 max-w-[160px]`}
                  >
                    <div className="bg-black/70 backdrop-blur border border-amber-700/40 rounded-xl p-3 text-left">
                      <p className="text-amber-300 text-xs font-bold mb-0.5">{part.label}</p>
                      <p className="text-amber-100/60 text-[10px] leading-tight hidden sm:block">{part.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Decorative glow */}
                <div className="absolute -inset-4 rounded-[2rem] bg-[#c2613a]/10 blur-2xl -z-10" />
              </div>

              {/* Stat pills */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                {[
                  { label: "Hours per pair", value: "8–12" },
                  { label: "Hand stitches", value: "1,200+" },
                  { label: "Artisan skill", value: "25 yrs" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="bg-amber-900/30 border border-amber-800/40 rounded-full px-5 py-2 text-center"
                  >
                    <p className="text-amber-200 font-bold text-lg leading-none">{stat.value}</p>
                    <p className="text-amber-100/50 text-xs mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT US SECTION ─────────────────────────────── */}
      <section className="py-24 bg-[#fdf6ed]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#c2613a] text-xs uppercase tracking-widest font-semibold block mb-4">
                Custom Orders
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Want a Pair<br />Made for <span className="text-[#c2613a] italic">You?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                We take custom Mojdi orders with your choice of leather, embroidery design, size, and color. 
                Reach out and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Call / WhatsApp", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email Us", value: "hello@aamulfootwear.com" },
                  { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c2613a]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#c2613a]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-900/10 border border-amber-100"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <CheckCircle className="w-14 h-14 text-[#c2613a]" />
                  <h3 className="text-2xl font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thank you for reaching out. We'll contact you within 24 hours to discuss your custom Mojdi.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm text-[#c2613a] underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Ahmed Khan"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c2613a]/30 focus:border-[#c2613a] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c2613a]/30 focus:border-[#c2613a] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c2613a]/30 focus:border-[#c2613a] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Tell us about your Mojdi *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="I'm looking for a pair in camel leather, size 9, with gold Zari embroidery..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c2613a]/30 focus:border-[#c2613a] transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#c2613a] text-white font-semibold py-4 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MOJDI GALLERY SECTION ──────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-[#c2613a] text-xs uppercase tracking-widest font-semibold block mb-3">
              The Collection
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Our Mojdis
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Each pair is unique. Browse our collection of handcrafted Mojdis — or reach out above for a custom pair.
            </p>
          </motion.div>

          {galleryLoading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#c2613a]" />
              <span>Loading collection...</span>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {gallery.map((url, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                  className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={url}
                      alt={`Mojdi ${i + 1}`}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
