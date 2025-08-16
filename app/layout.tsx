import './globals.css'
import Provider from '@/components/Provider'
import CartButton from '@/components/CartButton'
import Image from 'next/image'

export const metadata = {
  title: 'Roller Up B2B Shop',
  description: 'Hardware for membership-first car wash ops',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <header className="border-b border-white/10 bg-[var(--bg-soft)]/60 backdrop-blur">
            <div className="container flex items-center justify-between py-3">
              <a href="/" className="flex items-center gap-3">
                <Image src="/rollerup-logo.svg" alt="Roller Up" width={150} height={28} priority />
                <span className="text-white/60 text-sm hidden sm:inline">B2B Hardware</span>
              </a>
              <nav className="flex items-center gap-3">
                <a className="btn-ghost" href="/quote">Request a quote</a>
                <CartButton />
              </nav>
            </div>
          </header>

          <main className="container py-10">{children}</main>

          <footer className="hr mt-14">
            <div className="container py-6 text-white/65 text-sm flex flex-wrap items-center justify-between gap-2">
              <div>© {new Date().getFullYear()} Roller Up</div>
              <div className="flex gap-4">
                <a className="hover:underline" href="#">Terms</a>
                <a className="hover:underline" href="#">Privacy</a>
              </div>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  )
}
