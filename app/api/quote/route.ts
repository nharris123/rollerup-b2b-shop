import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { form, items } = await req.json() as { form: any, items: { id: string, qty: number }[] };
    const resolved = items.map(it => {
      const p = products.find(pr => pr.id === it.id);
      return p ? { id: p.id, name: p.name, qty: it.qty } : null;
    }).filter(Boolean);

    const payload = {
      ts: new Date().toISOString(),
      form,
      items: resolved,
    };

    // Save as a line-delimited JSON file in /tmp (ephemeral in many hosts)
    const line = JSON.stringify(payload) + "\n";
    const fs = await import('node:fs/promises');
    try {
      await fs.appendFile('/tmp/quotes.jsonl', line, 'utf8');
    } catch {
      await fs.writeFile('/tmp/quotes.jsonl', line, 'utf8');
    }

    console.log('QUOTE REQUEST', payload);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || 'Quote error' }, { status: 400 });
  }
}
