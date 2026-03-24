import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";

export interface BagItem {
  product: Product;
  savedAt: string;
}

interface BagContextValue {
  items: BagItem[];
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBag: () => void;
  isInBag: (productId: string) => boolean;
}

const BagContext = createContext<BagContextValue | null>(null);

const STORAGE_KEY = "aamul_bag";

function loadFromStorage(): BagItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>(loadFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev;
      return [{ product, savedAt: new Date().toISOString() }, ...prev];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearBag = useCallback(() => setItems([]), []);

  const isInBag = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  return (
    <BagContext.Provider value={{ items, isOpen, openBag, closeBag, addItem, removeItem, clearBag, isInBag }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside BagProvider");
  return ctx;
}
