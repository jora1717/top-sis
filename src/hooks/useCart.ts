import { useState, useCallback } from "react";
import type { MenuItem } from "@/data/menu";

export interface CartItem extends MenuItem {
  quantity: number;
  selectedToppings?: string[];
  cartKey: string;
}

function makeCartKey(item: MenuItem, toppings?: string[]): string {
  const base = item.id;
  if (toppings && toppings.length > 0) {
    return `${base}__${[...toppings].sort().join(",")}`;
  }
  return base;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, toppings?: string[]) => {
    const key = makeCartKey(item, toppings);
    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === key);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, selectedToppings: toppings, cartKey: key }];
    });
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.cartKey !== cartKey);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, clearCart, total, count };
}
