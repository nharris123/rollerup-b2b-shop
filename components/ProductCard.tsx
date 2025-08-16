'use client';

import { Product, formatUSD } from '@/lib/products';
import { useCart } from './Provider';

export default function ProductCard({ p }: { p: Product }) {
  const cart = useCart();
  return (
    <div className="card group hover:-translate-y-0.5">
      <div className="overflow-hidden rounded-lg border border-white/10">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-56 md:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-xl font-semibold">{p.name}</h3>
        <p className="text-white/70 text-sm">{p.short}</p>
        <div className="text-lg font-bold">{formatUSD(p.price)}</div>
      </div>
      <ul className="mt-2 list-disc list-inside text-white/70 space-y-1">
        {p.description.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
      <div className="flex gap-3 pt-4">
        <button className="btn-primary" onClick={() => cart.add(p.id)}>Add to cart</button>
        <a className="btn-ghost" href="/quote">Request a quote</a>
      </div>
    </div>
  );
}
