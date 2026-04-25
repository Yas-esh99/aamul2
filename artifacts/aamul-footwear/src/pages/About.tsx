import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Users, Calendar, Star } from "lucide-react";

const TEAM = [
  { name: "Atulkumar Hirabhai Makwana", role: "Chairman" },
  { name: "Hirabhai Chaganbhai Makwana", role: "Co-Founder" },
  { name: "Yashesh Atulkumar Makwana", role: "Member" },
];

const BRANDS = ["PU Grip", "Neelam", "Speed"];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">

      {/* Hero Banner */}
      <section className="bg-foreground text-background py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-widest text-background/50 font-semibold block mb-4">Since 1990</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Aamul Footwear
            </h1>
            <p className="text-xl text-background/70 italic mb-6">Foot Meets Comfort</p>
            <p className="text-background/60 max-w-2xl mx-auto leading-relaxed">
              Serving Anand since 1990, Aamul Footwear offers a wide range of stylish and comfortable shoes,
              sandals, slippers, crocs, and handmade mojdi for every occasion. From school and office wear
              to festive and wedding collections, we bring you trusted brands and quality you can feel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-primary/5 border-y border-border py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Calendar, value: "35+", label: "Years in Business" },
            { icon: Star, value: "1000+", label: "Happy Customers" },
            { icon: Users, value: "3", label: "Business Members" },
            { icon: MapPin, value: "Anand", label: "Gujarat, India" },
          ].map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Content */}
      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5]"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about-workshop.webp`}
              alt="Our Workshop"
              className="w-full h-full object-cover"
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
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
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Aamul Footwear was established in 1990 in Anand, Gujarat. For over three decades, we have been
                the go-to destination for quality footwear in the region. From school shoes to festive mojdis,
                we stock something for every member of the family and every occasion.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">What We Offer</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Shoes, sandals, slippers, crocs, and our specialty — handmade wedding mojdis. We carry trusted
                brands including <strong className="text-foreground">{BRANDS.join(", ")}</strong> alongside our
                own handcrafted collections.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-2xl border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Our Promise</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Quality footwear for every budget",
                  "Handmade mojdis crafted on order",
                  "Trusted brands you can rely on",
                  "Serving Anand families since 1990",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-3">The Family</span>
          <h2 className="font-display text-4xl font-bold text-foreground">Meet the Team</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg leading-snug">{member.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/50 py-20 border-y border-border px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Visit or Contact Us</h2>
            <p className="text-muted-foreground text-lg">We'd love to help you find the perfect pair.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Call Us",
                lines: ["9879098493", "7862967076"],
                href: "tel:9879098493",
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["aamulfootwear@gmail.com"],
                href: "mailto:aamulfootwear@gmail.com",
              },
              {
                icon: MapPin,
                title: "Our Shop",
                lines: [
                  "Opp. Community Hall,",
                  "Shantahari Complex, Bhathiji Mandir,",
                  "Pioneer School Road,",
                  "Anand - 388001, Gujarat",
                ],
                href: "https://maps.app.goo.gl/J2E5NxG6Xaa2Acmz9",
              },
            ].map(({ icon: Icon, title, lines, href }) => (
              <motion.a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-3">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-muted-foreground text-sm">{line}</p>
                ))}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
