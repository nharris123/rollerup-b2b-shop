import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="hero-animated rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="badge-chip">
            Membership-first POS hardware • Built for car washes
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Hardware that pairs perfectly with Roller Up
          </h1>
          <p className="text-white/75">
            Stripe handhelds for lane checkout, Rekor-ready LPR cameras, and fast-cycle magnetic gates.
          </p>
          <div className="flex gap-3 pt-1">
            <a href="/quote" className="btn-primary">Request a quote</a>
            <a href="#catalog" className="btn-ghost">View catalog</a>
          </div>
        </div>
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </section>

      <section className="trusted card">
        <div className="text-white/60 text-xs uppercase tracking-wide mb-3">Trusted by modern operators</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-80">
          <div className="logo-pill">Express Lane Ops</div>
          <div className="logo-pill">Metro Express</div>
          <div className="logo-pill">Crew Car Wash</div>
          <div className="logo-pill">Mr Wash</div>
        </div>
      </section>

      <section id="catalog" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </section>

      <section className="card">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="quote-mark">“</div>
          <div className="flex-1">
            <p className="text-lg leading-relaxed">
              Roller Up helped us launch memberships faster than any other stack we tried.
              Checkout is instant at the lane and our ops team loves the reliability.
            </p>
            <div className="text-white/60 mt-2 text-sm">— Operations Director, Multi-site Car Wash</div>
          </div>
        </div>
      </section>
    </div>
  )
}
