"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface WishlistContextType {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext =
  createContext<WishlistContextType | undefined>(undefined);

const STORAGE_WISHLIST = "shopmart_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_WISHLIST);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(items));
  }, [items]);

  const addItem = (id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
