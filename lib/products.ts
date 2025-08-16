export type Product = {
  id: string;
  name: string;
  price: number; // display price in USD
  short: string;
  description: string[];
  image: string; // /images/*.png
  stripePriceEnv: string; // env var containing Stripe Price ID
};

export const products: Product[] = [
  {
    id: "stripe-reader",
    name: "Stripe S700 Handheld Reader",
    price: 59900, // $599.00
    short: "Android handheld with Stripe Terminal for mobile checkout.",
    description: [
      '5.5" touchscreen, Wi-Fi + LTE options',
      "Integrated EMV contact/contactless + magstripe",
      "Ideal for lane sales and membership signups"
    ],
    image: "/images/stripe-reader.png",
    stripePriceEnv: "NEXT_PUBLIC_PRICE_ID_STRIPE_READER",
  },
  {
    id: "lpr-camera",
    name: "Axis LPR Camera (Rekor-Ready)",
    price: 149900, // $1,499.00
    short: "Outdoor LPR camera tuned for car wash lanes.",
    description: [
      "Optimized for plate reads in all weather",
      "PoE, IR illumination, Rekor compatible",
      "Use at entry lanes and tunnel confirmation"
    ],
    image: "/images/lpr-camera.png",
    stripePriceEnv: "NEXT_PUBLIC_PRICE_ID_LPR_CAMERA",
  },
  {
    id: "magnetic-gate",
    name: "Industrial Magnetic Barrier Gate",
    price: 289900, // $2,899.00
    short: "Fast-cycle barrier for access control.",
    description: [
      "24VDC with controller, 10M cycles",
      "Integrates with LPR and RFID readers",
      "Left/Right configurable, 10–14 ft arm"
    ],
    image: "/images/magnetic-gate.png",
    stripePriceEnv: "NEXT_PUBLIC_PRICE_ID_MAGNETIC_GATE",
  },
];

export function formatUSD(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}
