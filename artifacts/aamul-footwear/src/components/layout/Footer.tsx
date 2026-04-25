import { Link } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import logoUrl from "/logo.png";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

const CATEGORIES = [
  { name: "Formal", items: ["Oxford", "Derby", "Monk Strap", "Loafer", "Dress Boot", "Pump"] },
  { name: "Casual", items: ["Sneakers", "Boat Shoes", "Moccasins", "Canvas Shoes", "Slip-ons"] },
  { name: "Sports", items: ["Everyday", "Running", "Training"] },
  { name: "Boots", items: ["Chelsea", "Chukka", "Combat", "Ankle Boot", "Wellington"] },
  { name: "Sandals", items: ["Flip-Flops", "Slides", "Gladiators", "Sport Sandals", "Mules"] },
  { name: "Traditional", items: ["Kolhapuri", "Peshawari", "Jutti/Mojari", "Paduka"] },
  { name: "Heels", items: ["Stiletto", "Block Heel", "Wedge", "Platform"] },
  { name: "Slippers", items: ["Scuffs", "Mules (Indoor)", "Bootie Slippers"] },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/17xDpaxmJF/", icon: Facebook, hoverColor: "hover:bg-[#1877F2]" },
  { label: "Instagram", href: "https://www.instagram.com/aamul.footwear/", icon: Instagram, hoverColor: "hover:bg-[#E1306C]" },
  { label: "WhatsApp", href: "https://wa.me/919879098493", icon: WhatsAppIcon, hoverColor: "hover:bg-[#25D366]" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aamul-footwear-877110388", icon: Linkedin, hoverColor: "hover:bg-[#0077B5]" },
  { label: "Google Maps", href: "https://maps.app.goo.gl/J2E5NxG6Xaa2Acmz9", icon: GoogleMapsIcon, hoverColor: "hover:bg-[#EA4335]" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border/10">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-background/10 rounded-xl p-1.5">
                <img
                  src={logoUrl}
                  alt="Aamul Footwear logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto invert brightness-200"
                />
              </div>
              <div>
                <p className="font-display text-base font-bold leading-tight">Aamul Footwear</p>
                <p className="text-[10px] text-background/75 tracking-widest uppercase">Since 1990</p>
              </div>
            </div>
            <p className="text-background/85 text-sm leading-relaxed mb-5">
              Serving Anand since 1990 with stylish shoes, handmade wedding mojdis, chappals and many more footwears. <em>Foot Meets Comfort.</em>
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-11 h-11 rounded-full bg-background/15 flex items-center justify-center transition-all duration-200 ${hoverColor} hover:text-white hover:scale-110`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4 text-background">Explore</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-background/85 hover:text-background transition-colors text-sm py-2 inline-block">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/handmade-mojdi" className="text-background/85 hover:text-background transition-colors text-sm py-2 inline-block">
                  Handmade Mojdi ✨
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/85 hover:text-background transition-colors text-sm py-2 inline-block">
                  Our Story
                </Link>
              </li>
            </ul>

            <h3 className="font-display text-base font-semibold mt-7 mb-4 text-background">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:9879098493" className="flex items-start gap-2 text-background/85 hover:text-background transition-colors text-sm py-1">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>9879098493 | 7862967076</span>
                </a>
              </li>
              <li>
                <a href="mailto:aamulfootwear@gmail.com" className="flex items-start gap-2 text-background/85 hover:text-background transition-colors text-sm py-1">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>aamulfootwear@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/J2E5NxG6Xaa2Acmz9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-background/85 hover:text-background transition-colors text-sm py-1"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Shantahari Complex, Bhathiji Mandir, Pioneer School Road, Anand - 388001, Gujarat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold mb-4 text-background">Product Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">
              {CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="text-background text-sm font-semibold mb-2">{cat.name}</p>
                  <ul className="space-y-0.5">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/?category=${encodeURIComponent(item.toLowerCase())}`}
                          className="text-background/80 hover:text-background text-sm transition-colors block py-1.5 leading-tight"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-background/15">
              <p className="text-sm text-background/85 italic">
                ✨ Special: Handmade Wedding Mojdi — crafted on order
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/15 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/75">
          <p>© {new Date().getFullYear()} Aamul Footwear. All rights reserved.</p>
          <p>Opp. Community Hall, Shantahari Complex, Anand-388001, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
