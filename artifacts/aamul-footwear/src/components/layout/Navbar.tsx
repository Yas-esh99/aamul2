import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "/logo.png";

const navLinks = [
  { href: "/", label: "Products" },
  { href: "/handmade-mojdi", label: "Handmade Mojdi" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    toast({ title: "Cart is empty", description: "Add some beautiful handcrafted shoes first!" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-2" : "bg-background/95 backdrop-blur py-3 border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src={logoUrl}
              alt="Aamul Footwear"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-display text-base font-bold text-foreground leading-tight tracking-wide">
                Aamul Footwear
              </p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase leading-none">
                Foot Meets Comfort
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative py-1 ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCartClick}
              className="p-2 text-foreground hover:text-primary transition-colors relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden text-foreground"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-background border-b border-border shadow-2xl p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="Aamul Footwear" className="h-9 w-auto" />
                <span className="font-display text-lg font-bold">Aamul Footwear</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground hover:text-primary bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium p-4 rounded-xl transition-colors ${
                    location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
