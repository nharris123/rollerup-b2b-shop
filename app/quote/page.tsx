'use client';

import { useCart } from '@/components/Provider';
import { products, formatUSD } from '@/lib/products';
import { useState } from 'react';

export default function QuotePage() {
  const cart = useCart();
  const items = cart.items.map(it => ({ ...it, product: products.find(p => p.id === it.id)! }));
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: '', contact: '', email: '', phone: '', notes: '' });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items: cart.items })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSent(true);
      cart.clear();
    } catch (e) {
      alert('Error submitting quote');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card max-w-2xl mx-auto text-center space-y-3">
        <h2 className="text-2xl font-semibold">Thanks! 👋</h2>
        <p className="text-white/70">Your quote request has been received. We’ll get back to you promptly.</p>
        <a href="/" className="btn-primary">Back to catalog</a>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Your items</h2>
        {items.length === 0 && <div className="text-white/70">Add products to your cart first.</div>}
        {items.map(it => (
          <div key={it.product.id} className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <div className="font-medium">{it.product.name}</div>
              <div className="text-white/60 text-sm">{formatUSD(it.product.price)} × {it.qty}</div>
            </div>
            <div className="font-semibold">{formatUSD(it.product.price * it.qty)}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Request a quote</h2>
        <div className="grid gap-3">
          <input placeholder="Company" className="bg-transparent border border-white/10 rounded px-3 py-2" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <input placeholder="Contact name" className="bg-transparent border border-white/10 rounded px-3 py-2" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
          <input placeholder="Email" className="bg-transparent border border-white/10 rounded px-3 py-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Phone" className="bg-transparent border border-white/10 rounded px-3 py-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <textarea placeholder="Notes (site counts, volumes, PO terms…)" className="bg-transparent border border-white/10 rounded px-3 py-2 min-h-[120px]" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button className="btn-primary" onClick={submit} disabled={loading || items.length === 0}>
            {loading ? 'Submitting…' : 'Submit request'}
          </button>
        </div>
      </div>
    </div>
  );
}
