import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          <div className="max-w-sm">
            <h3 className="font-display text-3xl font-bold mb-4">Aamul Footwear</h3>
            <p className="text-background/70 leading-relaxed font-sans">
              Handcrafted in the heart of the workshop. We preserve the art of traditional shoemaking, one stitch at a time.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display text-xl font-medium mb-2">Explore</h4>
            <Link href="/" className="text-background/70 hover:text-background transition-colors w-fit">
              All Products
            </Link>
            <Link href="/handmade-mojdi" className="text-background/70 hover:text-background transition-colors w-fit">
              The Mojdi Collection
            </Link>
            <Link href="/about" className="text-background/70 hover:text-background transition-colors w-fit">
              Our Story
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display text-xl font-medium mb-2">Connect</h4>
            <a href="#" className="text-background/70 hover:text-background transition-colors w-fit">
              Instagram
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors w-fit">
              Pinterest
            </a>
            <a href="mailto:hello@aamulfootwear.com" className="text-background/70 hover:text-background transition-colors w-fit mt-2">
              hello@aamulfootwear.com
            </a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Aamul Footwear. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
