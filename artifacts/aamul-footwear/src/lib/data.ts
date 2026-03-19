export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery: string[];
  category: "mojdi" | "sandal" | "loafer" | "boot";
  isNew?: boolean;
  material: string;
  sole: string;
  origin: string;
  sizes: number[];
  features: string[];
  careInstructions: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Jodhpur Mojdi",
    description: "Hand-stitched camel leather with subtle gold thread accents. Perfect for festive occasions.",
    longDescription:
      "The Classic Jodhpur Mojdi is our signature piece — a timeless expression of Rajasthani craftsmanship. Each pair is hand-stitched by master artisans using premium camel leather sourced from local tanneries. Delicate gold zari thread is woven into traditional floral motifs that have been passed down through generations. Ideal for weddings, festivals, and any occasion that calls for elegance.",
    price: 85,
    image: "https://images.unsplash.com/photo-1603487742131-4160eca9992f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603487742131-4160eca9992f?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    ],
    category: "mojdi",
    isNew: true,
    material: "Premium Camel Leather",
    sole: "Leather Sole with Rubber Padding",
    origin: "Jodhpur, Rajasthan",
    sizes: [6, 7, 7.5, 8, 8.5, 9, 10, 11],
    features: [
      "Hand-stitched by master artisans",
      "Gold zari thread embroidery",
      "Traditional Rajasthani motifs",
      "Cushioned insole for comfort",
      "Breathable natural leather",
    ],
    careInstructions:
      "Wipe gently with a soft damp cloth. Apply leather conditioner monthly. Store in the provided dust bag away from direct sunlight.",
  },
  {
    id: "p2",
    name: "Earthy Weave Sandal",
    description: "Everyday comfort meets artisan craftsmanship with this woven leather slide.",
    longDescription:
      "The Earthy Weave Sandal is a testament to the beauty of simplicity. Artisans hand-weave strips of vegetable-tanned leather in an intricate basketweave pattern, creating a sandal that is as durable as it is beautiful. The footbed is padded with natural cork that molds to your foot over time, providing personalized comfort. Perfect for everyday wear.",
    price: 65,
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80",
      "https://images.unsplash.com/photo-1603487742131-4160eca9992f?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "sandal",
    material: "Vegetable-Tanned Leather",
    sole: "Natural Cork Footbed with Rubber Outsole",
    origin: "Jaipur, Rajasthan",
    sizes: [5, 6, 7, 8, 9, 10, 11],
    features: [
      "Hand-woven leather basketweave upper",
      "Cork footbed that molds to your foot",
      "Vegetable-tanned, chemical-free leather",
      "Adjustable ankle strap",
      "Slip-resistant rubber outsole",
    ],
    careInstructions:
      "Rinse with cold water if wet. Allow to air dry naturally. Condition leather straps regularly to maintain suppleness.",
  },
  {
    id: "p3",
    name: "Terracotta Suede Loafer",
    description: "Soft, breathable suede in our signature rich terracotta hue. Unlined for natural fit.",
    longDescription:
      "Our Terracotta Suede Loafer is the definition of understated luxury. Crafted from the finest nubuck suede in our signature earthy terracotta tone, this unlined loafer lets the leather breathe naturally against your foot. The hand-turned sole technique gives the shoe its characteristic sleek silhouette. A versatile piece that transitions effortlessly from casual to semi-formal.",
    price: 110,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80",
    ],
    category: "loafer",
    material: "Premium Nubuck Suede",
    sole: "Hand-Turned Leather Sole",
    origin: "Agra, Uttar Pradesh",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    features: [
      "Unlined for natural breathability",
      "Hand-turned sole construction",
      "Premium nubuck suede upper",
      "Signature terracotta colour",
      "Flexible and lightweight",
    ],
    careInstructions:
      "Use a suede brush to remove dirt. Protect with a suede spray before first wear. Avoid contact with water.",
  },
  {
    id: "p4",
    name: "Midnight Indigo Mojdi",
    description: "Deep indigo dyed leather with traditional mirror-work detailing from Rajasthan.",
    longDescription:
      "The Midnight Indigo Mojdi draws its inspiration from the rich textile traditions of Rajasthan. The leather is hand-dyed using natural indigo over multiple sessions to achieve the deep, complex blue that characterises this piece. Tiny hand-set mirror discs — a technique known as sheesha — are arranged in geometric patterns across the vamp, catching the light with every step.",
    price: 95,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1603487742131-4160eca9992f?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "mojdi",
    material: "Natural Indigo-Dyed Goat Leather",
    sole: "Leather Sole",
    origin: "Jaisalmer, Rajasthan",
    sizes: [6, 7, 7.5, 8, 8.5, 9, 10],
    features: [
      "Natural indigo hand-dyed leather",
      "Traditional sheesha mirror-work",
      "Geometric embroidery patterns",
      "Fully hand-crafted uppers",
      "Padded leather insole",
    ],
    careInstructions:
      "Keep away from moisture. Polish with a matching leather cream. Store in the cloth bag provided.",
  },
  {
    id: "p5",
    name: "Nomad Desert Boot",
    description: "Rugged yet refined. Built to last a lifetime and patina beautifully with age.",
    longDescription:
      "The Nomad Desert Boot is built for those who live fully. Constructed using the traditional Goodyear-welt method adapted by our artisans, the boot features a full-grain leather upper that develops a rich patina with age. The ankle height provides support without restriction, and the crepe rubber sole ensures grip on all terrains. This is a boot you will pass down.",
    price: 145,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    ],
    category: "boot",
    material: "Full-Grain Vegetable-Tanned Leather",
    sole: "Natural Crepe Rubber Sole",
    origin: "Kanpur, Uttar Pradesh",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    features: [
      "Full-grain leather that patinas beautifully",
      "Traditional welt construction",
      "Ankle height for support and style",
      "Crepe rubber sole for all-terrain grip",
      "Resoleable for decades of use",
    ],
    careInstructions:
      "Clean with a horsehair brush. Apply a quality wax polish monthly. Re-sole as needed — this boot is built for it.",
  },
  {
    id: "p6",
    name: "Minimalist Leather Mule",
    description: "Clean lines and zero distractions. The purest expression of our leather craft.",
    longDescription:
      "Our Minimalist Leather Mule strips footwear back to its essence — leather, form, and comfort. A single piece of vegetable-tanned leather is molded and stitched to form the upper, with no unnecessary hardware or embellishment. The mule silhouette is easy to slip on and pairs with everything from linen trousers to casual denim. A wardrobe essential crafted to last.",
    price: 75,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    ],
    category: "sandal",
    isNew: true,
    material: "Single-Piece Vegetable-Tanned Leather",
    sole: "Leather Sole with Rubber Heel Cap",
    origin: "Jaipur, Rajasthan",
    sizes: [5, 6, 7, 8, 9, 10],
    features: [
      "One-piece leather upper construction",
      "Zero hardware — pure leather craft",
      "Anatomical footbed for all-day wear",
      "Easy slip-on silhouette",
      "Versatile styling for any occasion",
    ],
    careInstructions:
      "Wipe with a slightly damp cloth. Apply a natural leather balm to maintain suppleness. Air dry after use.",
  },
];
