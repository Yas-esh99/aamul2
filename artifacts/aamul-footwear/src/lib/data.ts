export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "mojdi" | "sandal" | "loafer" | "boot";
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Jodhpur Mojdi",
    description: "Hand-stitched camel leather with subtle gold thread accents. Perfect for festive occasions.",
    price: 85,
    // leather shoes Unsplash
    image: "https://images.unsplash.com/photo-1603487742131-4160eca9992f?w=800&q=80",
    category: "mojdi",
    isNew: true
  },
  {
    id: "p2",
    name: "Earthy Weave Sandal",
    description: "Everyday comfort meets artisan craftsmanship with this woven leather slide.",
    price: 65,
    // leather sandals Unsplash
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80",
    category: "sandal"
  },
  {
    id: "p3",
    name: "Terracotta Suede Loafer",
    description: "Soft, breathable suede in our signature rich terracotta hue. Unlined for natural fit.",
    price: 110,
    // suede loafers Unsplash
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    category: "loafer"
  },
  {
    id: "p4",
    name: "Midnight Indigo Mojdi",
    description: "Deep indigo dyed leather with traditional mirror-work detailing from Rajasthan.",
    price: 95,
    // dark leather shoes Unsplash
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    category: "mojdi"
  },
  {
    id: "p5",
    name: "Nomad Desert Boot",
    description: "Rugged yet refined. Built to last a lifetime and patina beautifully with age.",
    price: 145,
    // leather boots Unsplash
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    category: "boot"
  },
  {
    id: "p6",
    name: "Minimalist Leather Mule",
    description: "Clean lines and zero distractions. The purest expression of our leather craft.",
    price: 75,
    // minimal leather shoes Unsplash
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    category: "sandal",
    isNew: true
  }
];
