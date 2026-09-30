"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { CartItem } from "../data/products";

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toast: { msg: string; visible: boolean };
  showToast: (msg: string) => void;
  hideToast: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      return [...prev, item];
    });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg: `${item.product.name} added to your cart.`, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  };

  const updateQty = (id: string, qty: number) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  };

  const hideToast = () => setToast((t) => ({ ...t, visible: false }));

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
