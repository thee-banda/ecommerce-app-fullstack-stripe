import { Link } from "react-router-dom"
import { demoProducts, featuredProductIds } from "../data/products"

type Collection = {
  id: number
  name: string
  description: string
  imageAlt: string
}

type Testimonial = {
  id: number
  quote: string
  name: string
  role: string
}

type FeaturedProductCard = {
  id: number
  name: string
  price: string
  imageAlt: string
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const featuredProducts: FeaturedProductCard[] = featuredProductIds
  .map((id) => demoProducts.find((product) => product.id === id))
  .filter((product): product is NonNullable<typeof product> => Boolean(product))
  .map((product) => ({
    id: product.id,
    name: product.name,
    price: currencyFormatter.format(product.price),
    imageAlt: product.imageAlt,
  }))

const trendingCollections: Collection[] = [
  { id: 1, name: "Fall Layers", description: "Warm textures, earthy palettes.", imageAlt: "Model wearing layered fall outfit" },
  { id: 2, name: "Active Essentials", description: "Technical fabrics built to move.", imageAlt: "Flat lay of activewear pieces" },
  { id: 3, name: "Lounge Edit", description: "Soft knits made for slow mornings.", imageAlt: "Cozy loungewear on a sofa" },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The quality rivals luxury brands at a fraction of the cost. My go-to for wardrobe staples.",
    name: "Jamie Lee",
    role: "Verified Customer",
  },
  {
    id: 2,
    quote: "Shipping was quick and the pieces fit perfectly right out of the box.",
    name: "Morgan Smith",
    role: "Loyal Member",
  },
]

const perks = [
  { id: 1, title: "Free shipping", description: "Complimentary shipping on orders over $75." },
  { id: 2, title: "Easy returns", description: "30-day return window with instant store credit." },
  { id: 3, title: "Member rewards", description: "Earn points on every purchase and redeem anytime." },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl space-y-24 px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              New Season Capsule
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Essentials for life on the move.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              Discover tailored layers and premium accessories designed to keep pace with your schedule. Build a wardrobe that works for every moment, from studio sessions to weekend escapes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Shop the collection
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Browse all categories
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-white to-slate-100 p-8 shadow-lg">
            <div className="aspect-square w-full rounded-2xl bg-slate-300/30" aria-hidden />
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>Featured: The Everyday Travel Set</p>
              <p>Crafted with recycled materials and designed for effortless layering.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
              <p className="text-sm text-slate-600">Curated picks that pair with everything in your closet.</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
              View all products
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
                  Quick view
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Collections trending now</h2>
              <p className="text-sm text-slate-300">
                Explore edits crafted by our design team to bring seasonal balance to your rotation.
              </p>
              <Link
                to="/collections/trending"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Explore all edits
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trendingCollections.map((collection) => (
                <article key={collection.id} className="rounded-2xl bg-slate-800 p-5">
                  <div className="aspect-square w-full rounded-xl bg-slate-700" aria-hidden />
                  <h3 className="mt-4 text-base font-medium text-white">{collection.name}</h3>
                  <p className="text-sm text-slate-300">{collection.description}</p>
                  <Link
                    to={`/collections/${collection.id}`}
                    className="mt-4 inline-flex text-sm font-medium text-slate-200 transition hover:text-white"
                  >
                    Shop now
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-6 sm:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <h3 className="text-base font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">Loved by thousands of customers</h2>
            <p className="text-sm text-slate-600">Honest feedback from people who trust us with their everyday wardrobe.</p>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Read all reviews
            </Link>
          </div>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
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
              <h2 className="text-3xl font-semibold tracking-tight">Join the Collective</h2>
              <p className="text-sm text-slate-300">
                Become a member for early access drops, styling sessions, and exclusive pricing. It is the easiest way to stay inspired and shop smarter.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Get started
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
                >
                  See member benefits
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800 p-6">
              <h3 className="text-base font-semibold">Member highlights</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>- Invitations to limited-run capsule drops.</li>
                <li>- Monthly styling tips from our creative team.</li>
                <li>- Priority support and extended return windows.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

