import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/lib/products';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as { items: { id: string, qty: number }[] };
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

    const line_items = items.map(({ id, qty }) => {
      const p = products.find(pr => pr.id === id);
      if (!p) throw new Error(`Unknown product: ${id}`);
      const price = process.env[p.stripePriceEnv];
      if (!price) throw new Error(`Missing env: ${p.stripePriceEnv}`);
      return { price, quantity: qty };
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${base}/checkout/success`,
      cancel_url: `${base}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'DE'] },
      automatic_tax: { enabled: true },
      metadata: { source: 'rollerup-b2b-shop' },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || 'Checkout error' }, { status: 400 });
  }
}
