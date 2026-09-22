"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "@/data/products";
import type { Product } from "@/data/types";
import { priceProduct, type PriceBreakdown, type Selections } from "./pricing";

const STORAGE_KEY = "afni-bag-v1";

export type CartItem = {
  /** Stable per line, so two differently-customised hampers stay separate. */
  id: string;
  slug: string;
  selections: Selections;
  quantity: number;
};

export type ResolvedItem = CartItem & {
  product: Product;
  price: PriceBreakdown;
};

type CartContextValue = {
  items: CartItem[];
  resolved: ResolvedItem[];
  count: number;
  subtotal: number;
  /** False until localStorage has been read, so SSR and first paint agree. */
  ready: boolean;
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  add: (slug: string, selections: Selections, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Two lines merge only when the product and every chosen option match. */
const sameConfiguration = (a: CartItem, b: Omit<CartItem, "id" | "quantity">) =>
  a.slug === b.slug &&
  JSON.stringify(normalise(a.selections)) ===
    JSON.stringify(normalise(b.selections));

const normalise = (selections: Selections) =>
  Object.keys(selections)
    .sort()
    .map((key) => {
      const value = selections[key];
      return [key, Array.isArray(value) ? [...value].sort() : value];
    });

const isCartItem = (value: unknown): value is CartItem => {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    typeof item.quantity === "number" &&
    typeof item.selections === "object" &&
    item.selections !== null
  );
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect --
     localStorage is an external store with no server equivalent. Reading it
     after mount is what keeps the server render and the first client render
     identical; `ready` gates anything that would otherwise flash. */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Drop anything malformed, or whose product has since left the catalogue.
          setItems(parsed.filter(isCartItem).filter((i) => getProduct(i.slug)));
        }
      }
    } catch {
      // A corrupt bag should never block the site from loading.
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing and full quotas both land here; the bag just won't persist.
    }
  }, [items, ready]);

  // Lock the page behind the drawer without the layout jumping as the bar disappears.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const previous = body.style.overflow;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previous;
      body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const add = useCallback(
    (slug: string, selections: Selections, quantity: number) => {
      setItems((current) => {
        const existing = current.find((item) =>
          sameConfiguration(item, { slug, selections }),
        );

        if (existing) {
          return current.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [...current, { id: newId(), slug, selections, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const resolved = useMemo(
    () =>
      items.flatMap((item) => {
        const product = getProduct(item.slug);
        if (!product) return [];
        return [
          {
            ...item,
            product,
            price: priceProduct(product, item.selections, item.quantity),
          },
        ];
      }),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      resolved,
      count: resolved.reduce((sum, item) => sum + item.price.quantity, 0),
      subtotal: resolved.reduce((sum, item) => sum + item.price.total, 0),
      ready,
      isOpen,
      openBag: () => setIsOpen(true),
      closeBag: () => setIsOpen(false),
      add,
      updateQuantity,
      remove,
      clear,
    }),
    [items, resolved, ready, isOpen, add, updateQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
