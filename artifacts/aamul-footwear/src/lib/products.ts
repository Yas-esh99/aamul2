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
  brand: string;
  category: string;
  color: string;
  img_url: string[];
  is_visible: boolean;
  size_ava: string[] | number[];
  rating: number;
  type: string;
  sole_material: string;
  up_material: string;
  weight: number;
  price: number;
  fastening_and_back?: string;
  toe_shape?: string;
  occasion?: string;
  ideal_for?: string;
  heel?: number;
  made_with?: string;
  country_of_origin?: string;
}

export interface MojdiDoc {
  id: string;
  img_url: string[];
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

export async function fetchProductsByCategory(
  category: string,
  excludeId?: string,
  limitCount = 3
): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("category", "==", category),
    where("is_visible", "==", true),
    limit(limitCount + (excludeId ? 1 : 0))
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Product))
    .filter((p) => p.id !== excludeId)
    .slice(0, limitCount);
}

export async function fetchMojdiGallery(): Promise<MojdiDoc[]> {
  const snap = await getDocs(collection(db, "mojdi"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MojdiDoc));
}

export function filterProducts(products: Product[], searchQuery: string): Product[] {
  const q = searchQuery.toLowerCase();
  return products.filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.type?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.color?.toLowerCase().includes(q) ||
      p.up_material?.toLowerCase().includes(q) ||
      p.sole_material?.toLowerCase().includes(q) ||
      p.toe_shape?.toLowerCase().includes(q) ||
      p.occasion?.toLowerCase().includes(q) ||
      p.ideal_for?.toLowerCase().includes(q) ||
      p.made_with?.toLowerCase().includes(q)
  );
}
