export default function CancelPage() {
  return (
    <div className="card max-w-xl mx-auto text-center space-y-3">
      <h2 className="text-2xl font-semibold">Checkout canceled</h2>
      <p className="text-white/70">No charge was made. You can continue shopping below.</p>
      <a href="/" className="btn-primary">Back to catalog</a>
    </div>
  )
}
