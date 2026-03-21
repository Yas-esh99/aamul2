import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery: string[];
  category: string;
  isNew?: boolean;
  material: string;
  sole: string;
  origin: string;
  sizes: number[];
  features: string[];
  careInstructions: string;
}

const COLLECTION = "products";

export async function fetchAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function fetchProductsByCategory(
  category: string,
  excludeId?: string,
  limitCount = 3
): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("category", "==", category),
    limit(limitCount + (excludeId ? 1 : 0))
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Product))
    .filter((p) => p.id !== excludeId)
    .slice(0, limitCount);
}

export function filterProducts(products: Product[], query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.material?.toLowerCase().includes(q) ||
      p.origin?.toLowerCase().includes(q)
  );
}
