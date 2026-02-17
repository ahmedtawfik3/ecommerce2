"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      const parsed = stored ? JSON.parse(stored) : [];
      setItems(Array.isArray(parsed) ? parsed.map(String) : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (id: string) => {
    setItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev.map(String) : [];
      if (!safePrev.includes(id)) return [...safePrev, id];
      return safePrev;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev.map(String) : [];
      return safePrev.filter((i) => i !== id);
    });
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
