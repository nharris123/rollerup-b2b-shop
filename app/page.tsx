import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="hero-gradient rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-xs text-white/80">
            <span>Membership-first POS hardware</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>Built for car washes</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Hardware that pairs perfectly with Roller Up
          </h1>
          <p className="text-white/70">
            Stripe handhelds for lane checkout, Rekor-ready LPR cameras, and fast-cycle magnetic gates.
          </p>
          <div className="flex gap-3 pt-1">
            <a href="/quote" className="btn-primary">Request a quote</a>
            <a href="#catalog" className="btn-ghost">View catalog</a>
          </div>
        </div>
      </section>

      <section id="catalog" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </section>
    </div>
  )
}
