import { Link } from "react-router-dom"
import { demoCartItems, demoProducts, type CartSeed } from "../data/products"
import { useLocale } from "../context/LocaleContext"

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

type Recommendation = {
  id: number
  name: string
  price: number
  href: string
  imageAlt: string
}

const statusStyles: Record<CartItem["status"], string> = {
  "in-stock": "text-emerald-600",
  "low-stock": "text-amber-600",
  backorder: "text-slate-500",
}

// Demo data comes from the shared product catalog until the live cart API is connected.
const buildCartItems = (leadTimes: Record<number, string>): CartItem[] =>
  demoCartItems
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
        leadTime: leadTimes[product.id] ?? item.leadTime,
        status: item.status,
      }
    })
    .filter((item): item is CartItem => item !== null)

const Cart = () => {
  const { formatCurrency, locale } = useLocale()
  const cartMessages = locale.messages.cart

  const cartItems = buildCartItems(cartMessages.leadTimes)

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
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{cartMessages.headerBadge}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{cartMessages.headerTitle}</h1>
            <p className="max-w-2xl text-sm text-slate-600">{cartMessages.headerDescription}</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            {cartMessages.continueShoppingLabel}
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
                      <dt className="font-medium text-slate-400">{cartMessages.detailLabels.color}</dt>
                      <dd className="text-slate-600">{item.color}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-400">{cartMessages.detailLabels.size}</dt>
                      <dd className="text-slate-600">{item.size}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-400">{cartMessages.detailLabels.quantity}</dt>
                      <dd className="text-slate-600">{item.quantity}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-4">
                    <span className={statusStyles[item.status]}>{cartMessages.statusCopy[item.status]}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" aria-hidden />
                    <span>{item.leadTime}</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-end justify-between gap-4 sm:w-auto">
                  <p className="text-base font-semibold text-slate-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <button type="button" className="transition hover:text-slate-900">
                      {cartMessages.moveToSaved}
                    </button>
                    <span className="text-slate-300">|</span>
                    <button type="button" className="transition hover:text-red-500">
                      {cartMessages.removeItem}
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
              <h2 className="text-base font-semibold text-slate-900">{cartMessages.fulfillmentHeading}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {cartMessages.fulfillmentHighlights.map((highlight) => (
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
              <h2 className="text-lg font-semibold text-slate-900">{cartMessages.orderSummaryHeading}</h2>
              <dl className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <dt>{cartMessages.orderSummary.subtotal}</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>{cartMessages.orderSummary.shipping}</dt>
                  <dd>{formatCurrency(shippingEstimate)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>{cartMessages.orderSummary.estimatedTax}</dt>
                  <dd>{formatCurrency(taxEstimate)}</dd>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <dt>{cartMessages.orderSummary.savings}</dt>
                  <dd>-{formatCurrency(orderDiscount)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-base font-semibold text-slate-900">{cartMessages.orderSummary.total}</p>
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(orderTotal)}</p>
              </div>
              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {cartMessages.orderSummary.checkoutCta}
              </Link>
              <p className="mt-4 text-xs text-slate-500">{cartMessages.orderSummary.checkoutNote}</p>
            </section>

            <section className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-base font-semibold">{cartMessages.reserveHeading}</h3>
              <p className="mt-2 text-sm text-slate-300">{cartMessages.reserveDescription}</p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
              >
                {cartMessages.reserveCta}
              </button>
            </section>
          </aside>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{cartMessages.recommendationsHeading}</h2>
              <p className="text-sm text-slate-600">{cartMessages.recommendationsDescription}</p>
            </div>
            <Link
              to="/collections"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              {cartMessages.recommendationsCollectionsCta}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cartMessages.recommendations.map((product: Recommendation) => (
              <article
                key={product.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200" aria-hidden />
                <div className="mt-4 space-y-1">
                  <h3 className="text-base font-medium text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.imageAlt}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <Link
                  to={product.href}
                  className="mt-4 inline-flex text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  {cartMessages.recommendationsCta}
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
