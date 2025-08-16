'use client';

import { Product, formatUSD } from '@/lib/products';
import { useCart } from './Provider';

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-white/10 border border-white/10">{children}</span>;
}

export default function ProductCard({ p }: { p: Product }) {
  const cart = useCart();
  const badges = {
    'stripe-reader': ['Wi-Fi/LTE', 'EMV', 'Mobile checkout'],
    'lpr-camera': ['Rekor-ready', 'PoE', 'All-weather'],
    'magnetic-gate': ['Fast-cycle', '10M+ cycles', 'Access control'],
  } as Record<string, string[]>;

  return (
    <div className="card group hover:-translate-y-0.5">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-56 md:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-xl font-semibold">{p.name}</h3>
        <p className="text-white/70 text-sm">{p.short}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {badges[p.id]?.map((b) => <Badge key={b}>{b}</Badge>)}
        </div>
        <div className="text-lg font-bold mt-2">{formatUSD(p.price)}</div>
      </div>
      <div className="flex gap-3 pt-4">
        <button className="btn-primary" onClick={() => cart.add(p.id)}>Add to cart</button>
        <a className="btn-ghost" href="/quote">Request a quote</a>
      </div>
    </div>
  );
}
