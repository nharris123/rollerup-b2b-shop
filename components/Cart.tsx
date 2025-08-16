'use client';

import { products, formatUSD } from '@/lib/products';
import { useCart } from './Provider';
import { useState } from 'react';

export default function Cart({ close }: { close?: () => void }) {
  const cart = useCart();
  const [loading, setLoading] = useState(false);

  const items = cart.items
    .map(it => ({ ...it, product: products.find(p => p.id === it.id)! }))
    .filter(Boolean);

  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  async function checkout() {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(it => ({
            id: it.product.id,
            qty: it.qty,
          }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Checkout error');
      window.location.href = data.url;
    } catch (e: any) {
      alert(e.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {items.length === 0 && <div className="text-white/70">Your cart is empty.</div>}
      {items.map(it => (
        <div key={it.id} className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <div className="font-medium">{it.product.name}</div>
            <div className="text-white/60 text-sm">{formatUSD(it.product.price)} × </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" min={1} className="w-20 bg-transparent border border-white/10 rounded px-2 py-1" value={it.qty} onChange={e => cart.setQty(it.id, Number(e.target.value))}/>
            <button className="btn-ghost" onClick={() => cart.remove(it.id)}>Remove</button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-white/70">Subtotal</div>
            <div className="font-semibold">{formatUSD(subtotal)}</div>
          </div>
          <div className="flex gap-3">
            <a href="/quote" className="btn-ghost">Request a quote</a>
            <button className="btn-primary flex-1" onClick={checkout} disabled={loading}>
              {loading ? 'Redirecting…' : 'Checkout with Stripe'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
