import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold">Membership hardware for modern car washes</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Curated hardware that pairs perfectly with Roller Up: Stripe handhelds, LPR cameras, and industrial magnetic gates.
        </p>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </section>
    </div>
  )
}
