import { type FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import '../index.css'

export type NavLinkItem = {
  label: string
  href: string
}

type NavbarProps = {
  brandName?: string
  brandHref?: string
  navLinks?: NavLinkItem[]
  cartItemCount?: number
  isAuthenticated?: boolean
  userName?: string
  onSearchSubmit?: (query: string) => void
  onLogout?: () => void
}

const defaultLinks: NavLinkItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Deals", href: "/deals" },
  { label: "Contact", href: "/contact" },
]

export const Navbar = ({
  brandName = "ShopSphere",
  brandHref = "/",
  navLinks = defaultLinks,
  cartItemCount = 0,
  isAuthenticated = false,
  userName,
  onSearchSubmit,
  onLogout,
}: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = searchValue.trim()
    if (trimmed.length > 0) {
      onSearchSubmit?.(trimmed)
    }
  }

  const displayedCartCount = cartItemCount > 99 ? "99+" : cartItemCount.toString()

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to={brandHref} className="text-xl font-semibold tracking-tight text-slate-900">
            {brandName}
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex md:w-80 md:max-w-md"
          role="search"
        >
          <label htmlFor="navbar-search" className="sr-only">
            Search products
          </label>
          <input
            id="navbar-search"
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search for products"
            className="w-full rounded-l-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="rounded-r-md border border-l-0 border-slate-200 bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="View cart"
          >
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                {displayedCartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="hidden sm:flex sm:items-center sm:gap-3">
              <span className="text-sm text-slate-600">Hi, {userName ?? "there"}</span>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="hidden rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="inline-flex items-center rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <div className="space-y-1 border-t border-slate-200 px-4 pb-4 pt-4">
            <form onSubmit={handleSearchSubmit} className="flex" role="search">
              <label htmlFor="navbar-search-mobile" className="sr-only">
                Search products
              </label>
              <input
                id="navbar-search-mobile"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search for products"
                className="w-full rounded-l-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              <button
                type="submit"
                className="rounded-r-md border border-l-0 border-slate-200 bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Go
              </button>
            </form>

            <div className="flex flex-col space-y-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={`mobile-${label}`}
                  to={href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onLogout?.()
                }}
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="mt-2 inline-flex w-full justify-center rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}