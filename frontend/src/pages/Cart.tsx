import { Link } from "react-router-dom"
import { demoCartItems, demoProducts, type CartSeed } from "../data/products"

type CartItem = {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  color: string
  size: string
  leadTime: string
  status: CartSeed["status"]
}

type FulfillmentHighlight = {
  id: number
  title: string
  description: string
}

type Recommendation = {
  id: number
  name: string
  price: number
  href: string
  imageAlt: string
}

// Demo data comes from the shared product catalog until the live cart API is connected.
const cartItems: CartItem[] = demoCartItems
  .map((item) => {
    const product = demoProducts.find((product) => product.id === item.productId)

    if (!product) {
      return null
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      leadTime: item.leadTime,
      status: item.status,
    }
  })
  .filter((item): item is CartItem => item !== null)

const fulfillmentHighlights: FulfillmentHighlight[] = [
  {
    id: 1,
    title: "Carbon-neutral delivery",
    description: "Every order ships with certified carbon offsets and recyclable packaging.",
  },
  {
    id: 2,
    title: "Same-day pick up",
    description: "Order by 2pm and pick up at select Studio locations in under 3 hours.",
  },
  {
    id: 3,
    title: "30-day fit guarantee",
    description: "Try it at home and swap sizes within thirty days at no extra cost.",
  },
]

const recommendedProducts: Recommendation[] = [
  {
    id: 1,
    name: "Structured Card Wallet",
    price: 68,
    href: "/shop",
    imageAlt: "Brown leather card wallet on a marble surface",
  },
  {
    id: 2,
    name: "Heritage Belt",
    price: 54,
    href: "/shop",
    imageAlt: "Tan leather belt with brushed hardware",
  },
  {
    id: 3,
    name: "Travel Pouch",
    price: 42,
    href: "/shop",
    imageAlt: "Canvas toiletry pouch with zipper detail",
  },
]

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const statusCopy: Record<CartItem["status"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  backorder: "Backorder",
}

const statusStyles: Record<CartItem["status"], string> = {
  "in-stock": "text-emerald-600",
  "low-stock": "text-amber-600",
  backorder: "text-slate-500",
}

const Cart = () => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingEstimate = 12
  const taxEstimate = 48
  const orderDiscount = 30
  const orderTotal = subtotal + shippingEstimate + taxEstimate - orderDiscount

  return (
    <div className="bg-slate-50 pb-24 pt-10">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Your bag</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Ready to check out?</h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Review the pieces in your cart, adjust quantities, or move items to your saved list.
              Everything ships carbon-neutral with free exchanges within thirty days.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Continue shopping
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,_2.2fr)_minmax(0,_1fr)]">
          <section className="space-y-6">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 sm:flex-row sm:items-start"
              >
                <div className="aspect-square w-full max-w-[120px] flex-shrink-0 rounded-xl bg-slate-200" aria-hidden />
                <div className="flex flex-1 flex-col gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                  <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <div>
                      <dt className="font-medium text-slate-400">Color</dt>
                      <dd className="text-slate-600">{item.color}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-400">Size</dt>
                      <dd className="text-slate-600">{item.size}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-400">Quantity</dt>
                      <dd className="text-slate-600">{item.quantity}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-4">
                    <span className={statusStyles[item.status]}>{statusCopy[item.status]}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" aria-hidden />
                    <span>{item.leadTime}</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-end justify-between gap-4 sm:w-auto">
                  <p className="text-base font-semibold text-slate-900">
                    {currencyFormatter.format(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <button type="button" className="transition hover:text-slate-900">
                      Move to saved
                    </button>
                    <span className="text-slate-300">|</span>
                    <button type="button" className="transition hover:text-red-500">
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
              <h2 className="text-base font-semibold text-slate-900">Fulfillment perks</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {fulfillmentHighlights.map((highlight) => (
                  <div key={highlight.id} className="space-y-1">
                    <h3 className="text-sm font-medium text-slate-700">{highlight.title}</h3>
                    <p className="text-sm text-slate-500">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
              <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd>{currencyFormatter.format(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd>{currencyFormatter.format(shippingEstimate)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Estimated tax</dt>
                  <dd>{currencyFormatter.format(taxEstimate)}</dd>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <dt>Member savings</dt>
                  <dd>-{currencyFormatter.format(orderDiscount)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-base font-semibold text-slate-900">Total</p>
                <p className="text-lg font-semibold text-slate-900">{currencyFormatter.format(orderTotal)}</p>
              </div>
              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Proceed to checkout
              </Link>
              <p className="mt-4 text-xs text-slate-500">
                You can review delivery options and apply additional promo codes during checkout.
              </p>
            </section>

            <section className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-base font-semibold">Unlock complimentary 2-day shipping</h3>
              <p className="mt-2 text-sm text-slate-300">
                Check out with ShopSphere Reserve and get automatic expedited shipping plus priority support on your next order.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
              >
                Learn more
              </button>
            </section>
          </aside>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">You might also like</h2>
              <p className="text-sm text-slate-600">Complete the look with pieces curated by our stylists.</p>
            </div>
            <Link
              to="/collections"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              View all collections
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200" aria-hidden />
                <div className="mt-4 space-y-1">
                  <h3 className="text-base font-medium text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.imageAlt}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {currencyFormatter.format(product.price)}
                  </p>
                </div>
                <Link
                  to={product.href}
                  className="mt-4 inline-flex text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Add to cart
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Cart

