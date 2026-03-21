import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id: string;
  title: string;
  description: string;
  class: string;
  color: string;
  company: string;
  img_url: string[];
  is_visible: boolean;
  size_ava: string[] | number[];
  rating: number;
  shape: string;
  type: string;
  sole_material: string;
  up_material: string;
  weight: number;
  price?: number;
}

const COLLECTION = "products";

export async function fetchAllProducts(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("is_visible", "==", true)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function fetchProductsByType(
  type: string,
  excludeId?: string,
  limitCount = 3
): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("type", "==", type),
    where("is_visible", "==", true),
    limit(limitCount + (excludeId ? 1 : 0))
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Product))
    .filter((p) => p.id !== excludeId)
    .slice(0, limitCount);
}

export function filterProducts(products: Product[], searchQuery: string): Product[] {
  const q = searchQuery.toLowerCase();
  return products.filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.type?.toLowerCase().includes(q) ||
      p.class?.toLowerCase().includes(q) ||
      p.color?.toLowerCase().includes(q) ||
      p.company?.toLowerCase().includes(q) ||
      p.up_material?.toLowerCase().includes(q) ||
      p.sole_material?.toLowerCase().includes(q) ||
      p.shape?.toLowerCase().includes(q)
  );
}
