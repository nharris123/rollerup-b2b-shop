'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

type CartItem = { id: string; qty: number };
type CartContextValue = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within <Provider>');
  return ctx;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const api: CartContextValue = useMemo(() => ({
    items,
    add: (id) => setItems(prev => {
      const found = prev.find(p => p.id === id);
      if (found) return prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { id, qty: 1 }];
    }),
    remove: (id) => setItems(prev => prev.filter(p => p.id != id)),
    setQty: (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p)),
    clear: () => setItems([]),
  }), [items]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}
