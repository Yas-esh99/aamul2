import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Loader2, CheckCircle, Phone, Mail, MessageSquare, ImagePlus } from "lucide-react";
import { Link } from "wouter";
import { fetchMojdiGallery, type MojdiDoc } from "@/lib/products";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Precision Material Cutting",
    desc: "The process begins with the careful selection and shaping of high-quality materials. We cut the primary fabrics, durable canvas, and our signature special soft foam into precise patterns. This foundation ensures that the final product is as comfortable as it is beautiful.",
    imageKey: "step_1",
  },
  {
    step: "02",
    title: "The Thermal Bond (Hot Press)",
    desc: "To ensure longevity, the upper cloth is fused with a sturdy canvas backing using a hot press technique. Once the structure is reinforced, it is bonded to the soft foam layer, creating a cushioned upper that retains its shape over time.",
    imageKey: "step_2",
  },
  {
    step: "03",
    title: "Lasting and Shaping (The Farmo)",
    desc: "Using a traditional wooden shoe last, known as a Farmo, we begin the assembly. The inner sole is temporarily secured to the Farmo, and the prepared upper material is meticulously folded and lasted over it. This stage is crucial, as it defines the final silhouette and fit of the Mojdi.",
    imageKey: "step_3",
  },
  {
    step: "04",
    title: "Sole Integration and Curing",
    desc: "In the final stage, the heavy-duty outer sole is expertly bonded to the lasted upper. The Mojdi is then left to \"cure,\" allowing the adhesive to dry completely and create a permanent, flexible bond. Once removed from the Farmo, the Mojdi is polished and ready to wear.",
    imageKey: "step_4",
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

      {/* ─── HERO BANNER ─────────────────────────────────────── */}
      <section className="pt-16 bg-[#1a1208] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c2613a 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8b4513 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 w-full">
          <Link href="/" className="inline-flex items-center text-amber-200/60 hover:text-amber-200 transition-colors mb-12 text-sm gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[#c2613a] text-xs uppercase tracking-widest font-semibold block mb-4">
              Heritage Footwear · Since Generations
            </span>
            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-amber-50 leading-tight mb-6">
              Handmade<br />
              <span className="text-[#c2613a] italic">Mojdi</span>
            </h1>
            <p className="text-amber-100/70 text-lg leading-relaxed max-w-2xl">
              Born in the royal courts of Rajasthan, the Mojdi is more than footwear — it is a living tradition.
              Every pair is a conversation between the artisan's hands and centuries of craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── GENERAL DESCRIPTION ─────────────────────────────── */}
      <section className="py-20 bg-[#fdf6ed]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#c2613a] text-xs uppercase tracking-widest font-semibold block mb-4">
              The Art of the Craft
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Our Making Process
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The creation of a Mojdi is a labor of love, requiring precision at every stage to ensure
              the perfect balance of flexibility and strength.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAKING PROCESS STEPS ─────────────────────────────── */}
      <section className="py-4 pb-24 bg-[#fdf6ed]">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {PROCESS_STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Image slot */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-dashed border-[#c2613a]/30 bg-[#c2613a]/5 flex flex-col items-center justify-center gap-3 group">
                  <div className="w-14 h-14 rounded-full bg-[#c2613a]/10 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-[#c2613a]/50" />
                  </div>
                  <p className="text-[#c2613a]/50 text-sm font-medium">Step {step.step} image</p>
                  <p className="text-[#c2613a]/35 text-xs">Add image here</p>
                  {/* Step number watermark */}
                  <span className="absolute bottom-4 right-5 font-display text-7xl font-bold text-[#c2613a]/8 select-none leading-none">
                    {step.step}
                  </span>
                </div>

                {/* Text content */}
                <div className={isEven ? "" : "lg:order-1"}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#c2613a] flex items-center justify-center text-[#c2613a] text-sm font-bold shrink-0">
                      {step.step}
                    </div>
                    <div className="h-px flex-1 bg-[#c2613a]/20" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── MOJDI GALLERY ───────────────────────────────────── */}
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
              Each pair is unique. Browse our collection of handcrafted Mojdis — or reach out below for a custom pair.
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

      {/* ─── CUSTOM ORDER / CONTACT ──────────────────────────── */}
      <section className="py-24 bg-[#fdf6ed]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

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

    </div>
  );
}
