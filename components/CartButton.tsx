'use client';

import { useState } from 'react';
import { useCart } from './Provider';
import Cart from './Cart';

export default function CartButton() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const count = cart.items.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="relative">
      <button className="btn-ghost" onClick={() => setOpen(true)}>Cart ({count})</button>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--card)] p-6 border-l border-white/10 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button className="btn-ghost" onClick={() => setOpen(false)}>Close</button>
            </div>
            <Cart close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
