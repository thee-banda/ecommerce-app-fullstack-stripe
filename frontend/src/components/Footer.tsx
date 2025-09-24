import { type FormEvent, useState } from "react"
import { Link } from "react-router-dom"

export type FooterLink = {
  label: string
  href: string
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

type FooterProps = {
  columns?: FooterColumn[]
  brandName?: string
  description?: string
  socials?: FooterLink[]
  copyrightYear?: number
  onNewsletterSubmit?: (email: string) => void
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping & Delivery", href: "/help/shipping" },
      { label: "Returns & Exchanges", href: "/help/returns" },
      { label: "Track Your Order", href: "/orders/track" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
]

const defaultSocials: FooterLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
]

export const Footer = ({
  columns = defaultColumns,
  brandName = "ShopSphere",
  description = "Premium essentials for your modern lifestyle.",
  socials = defaultSocials,
  copyrightYear = new Date().getFullYear(),
  onNewsletterSubmit,
}: FooterProps) => {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (trimmedEmail.length === 0) {
      return
    }
    onNewsletterSubmit?.(trimmedEmail)
    setEmail("")
  }

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
            {brandName}
          </Link>
          <p className="max-w-md text-sm text-slate-400">{description}</p>
          <div>
            <p className="text-sm font-medium text-white">Stay in the loop</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-3 flex max-w-sm" noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-400"
                required
              />
              <button
                type="submit"
                className="rounded-r-md border border-l-0 border-slate-700 bg-white px-4 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright {copyrightYear} {brandName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {socials.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}