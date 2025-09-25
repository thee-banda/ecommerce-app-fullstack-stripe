import { Link } from "react-router-dom"
import { demoProducts, featuredProductIds } from "../data/products"
import { useLocale } from "../context/LocaleContext"

type FeaturedProductCard = {
  id: number
  name: string
  price: string
  imageAlt: string
}

const Home = () => {
  const { formatCurrency, locale } = useLocale()
  const homeMessages = locale.messages.home

  const featuredProducts: FeaturedProductCard[] = featuredProductIds
    .map((id) => demoProducts.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: formatCurrency(product.price),
      imageAlt: product.imageAlt,
    }))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl space-y-24 px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              {homeMessages.heroBadge}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {homeMessages.heroTitle}
            </h1>
            <p className="max-w-xl text-lg text-slate-600">{homeMessages.heroDescription}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {homeMessages.heroPrimaryCta}
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                {homeMessages.heroSecondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-white to-slate-100 p-8 shadow-lg">
            <div className="aspect-square w-full rounded-2xl bg-slate-300/30" aria-hidden />
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>{homeMessages.heroSpotlightTitle}</p>
              <p>{homeMessages.heroSpotlightDescription}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{homeMessages.featuredHeading}</h2>
              <p className="text-sm text-slate-600">{homeMessages.featuredDescription}</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
              {homeMessages.featuredViewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <article key={product.id} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <div className="aspect-square w-full rounded-xl bg-slate-200" aria-hidden />
                <div className="space-y-2">
                  <h3 className="text-base font-medium">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.imageAlt}</p>
                  <p className="text-sm font-semibold text-slate-900">{product.price}</p>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  {homeMessages.featuredItemCta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">{homeMessages.trendingHeading}</h2>
              <p className="text-sm text-slate-300">{homeMessages.trendingDescription}</p>
              <Link
                to="/collections/trending"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                {homeMessages.trendingCta}
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {homeMessages.trendingCollections.map((collection) => (
                <article key={collection.id} className="rounded-2xl bg-slate-800 p-5">
                  <div className="aspect-square w-full rounded-xl bg-slate-700" aria-hidden />
                  <h3 className="mt-4 text-base font-medium text-white">{collection.name}</h3>
                  <p className="text-sm text-slate-300">{collection.description}</p>
                  <Link
                    to={`/collections/${collection.id}`}
                    className="mt-4 inline-flex text-sm font-medium text-slate-200 transition hover:text-white"
                  >
                    {homeMessages.trendingItemCta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-6 sm:grid-cols-3">
            {homeMessages.perks.map((perk) => (
              <div key={perk.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <h3 className="text-base font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">{homeMessages.testimonialsHeading}</h2>
            <p className="text-sm text-slate-600">{homeMessages.testimonialsDescription}</p>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              {homeMessages.testimonialsCta}
            </Link>
          </div>
          <div className="space-y-6">
            {homeMessages.testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <p className="text-base text-slate-700">"{testimonial.quote}"</p>
                <footer className="mt-4 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{testimonial.name}</span> - {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight">{homeMessages.membershipHeading}</h2>
              <p className="text-sm text-slate-300">{homeMessages.membershipDescription}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  {homeMessages.membershipPrimaryCta}
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
                >
                  {homeMessages.membershipSecondaryCta}
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800 p-6">
              <h3 className="text-base font-semibold">{homeMessages.membershipHighlightsTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {homeMessages.membershipHighlights.map((highlight, index) => (
                  <li key={`${highlight}-${index}`}>- {highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
