export default function SuccessPage() {
  return (
    <div className="card max-w-xl mx-auto text-center space-y-3">
      <h2 className="text-2xl font-semibold">Payment successful</h2>
      <p className="text-white/70">Thanks for your order! A confirmation has been sent by Stripe.</p>
      <a href="/" className="btn-primary">Back to catalog</a>
    </div>
  )
}
