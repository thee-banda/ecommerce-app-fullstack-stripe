import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  colors: string[]
  isNew: boolean
  rating: number
  reviews: number
  imageAlt: string
  releaseDate: string
}

type Category = {
  id: string
  label: string
  description: string
}

type ServiceHighlight = {
  id: number
  title: string
  description: string
}

type EditorialStory = {
  id: number
  title: string
  excerpt: string
  href: string
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Everyday Leather Tote",
    description: "Structured carryall handcrafted from eco-tanned Italian leather.",
    price: 220,
    category: "bags",
    colors: ["Cognac", "Black"],
    isNew: false,
    rating: 4.8,
    reviews: 164,
    imageAlt: "Brown leather tote bag on a white backdrop",
    releaseDate: "2024-07-01",
  },
  {
    id: 2,
    name: "CloudSoft Hoodie",
    description: "Plush fleece hoodie with brushed interior and minimalist seams.",
    price: 96,
    category: "sweaters",
    colors: ["Fog", "Coal"],
    isNew: false,
    rating: 4.7,
    reviews: 287,
    imageAlt: "Neutral hoodie folded on a table",
    releaseDate: "2024-08-18",
  },
  {
    id: 3,
    name: "Minimalist Watch",
    description: "Brushed steel case with vegetable-tanned leather strap.",
    price: 185,
    category: "accessories",
    colors: ["Steel", "Tan"],
    isNew: false,
    rating: 4.9,
    reviews: 92,
    imageAlt: "Stainless watch with tan strap resting on marble",
    releaseDate: "2024-06-12",
  },
  {
    id: 4,
    name: "Meridian Trench Coat",
    description: "Water-resistant cotton blend trench with detachable belt.",
    price: 298,
    category: "outerwear",
    colors: ["Stone", "Olive"],
    isNew: true,
    rating: 4.6,
    reviews: 58,
    imageAlt: "Lightweight trench coat hung on hook",
    releaseDate: "2024-09-10",
  },
  {
    id: 5,
    name: "Sculpt Knit Midi Dress",
    description: "Contour-knit silhouette with subtle rib texture and stretch.",
    price: 168,
    category: "dresses",
    colors: ["Jet", "Pearl"],
    isNew: true,
    rating: 4.5,
    reviews: 74,
    imageAlt: "Black knit dress displayed on mannequin",
    releaseDate: "2024-09-04",
  },
  {
    id: 6,
    name: "Weekender Duffle",
    description: "Carry-on compliant duffle with padded laptop sleeve and pockets.",
    price: 240,
    category: "travel",
    colors: ["Umber", "Charcoal"],
    isNew: false,
    rating: 4.8,
    reviews: 133,
    imageAlt: "Canvas duffle bag leaning against chair",
    releaseDate: "2024-05-28",
  },
  {
    id: 7,
    name: "Studio Ribbed Tank",
    description: "Second-skin ribbed tank in breathable modal blend.",
    price: 42,
    category: "essentials",
    colors: ["Ivory", "Sable"],
    isNew: false,
    rating: 4.4,
    reviews: 211,
    imageAlt: "Ribbed tank tops stacked together",
    releaseDate: "2024-07-21",
  },
  {
    id: 8,
    name: "Peak Puffer Vest",
    description: "Lightweight recycled fill vest designed for layering.",
    price: 156,
    category: "outerwear",
    colors: ["Midnight", "Alpine"],
    isNew: false,
    rating: 4.6,
    reviews: 118,
    imageAlt: "Puffer vest draped over chair",
    releaseDate: "2024-08-02",
  },
  {
    id: 9,
    name: "Voyage Crossbody",
    description: "Hands-free crossbody with adjustable strap and hidden pocket.",
    price: 128,
    category: "bags",
    colors: ["Sand", "Slate"],
    isNew: true,
    rating: 4.7,
    reviews: 96,
    imageAlt: "Minimal crossbody bag photographed on stool",
    releaseDate: "2024-09-15",
  },
]

const categories: Category[] = [
  { id: "all", label: "All styles", description: "Browse every capsule in one place." },
  { id: "outerwear", label: "Outerwear", description: "Layer-ready trenches, puffers, and vests." },
  { id: "bags", label: "Bags", description: "Carryalls crafted for daily movement." },
  { id: "dresses", label: "Dresses", description: "Easy silhouettes with a refined finish." },
  { id: "essentials", label: "Essentials", description: "Everyday foundations for clean styling." },
  { id: "travel", label: "Travel", description: "Weekender gear built for light packing." },
  { id: "accessories", label: "Accessories", description: "Complete your look with subtle layers." },
  { id: "sweaters", label: "Sweaters", description: "Supersoft knits for transitional weather." },
]

const colorOptions = [
  "All",
  "Cognac",
  "Black",
  "Fog",
  "Coal",
  "Steel",
  "Tan",
  "Stone",
  "Olive",
  "Jet",
  "Pearl",
  "Umber",
  "Charcoal",
  "Ivory",
  "Sable",
  "Midnight",
  "Alpine",
  "Sand",
  "Slate",
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest arrivals" },
  { value: "rating", label: "Top rated" },
]

const serviceHighlights: ServiceHighlight[] = [
  {
    id: 1,
    title: "Complimentary alterations",
    description: "Visit any Studio to tailor outerwear and dresses to your perfect fit.",
  },
  {
    id: 2,
    title: "Express carbon-neutral delivery",
    description: "All orders ship in recyclable packaging with tracked updates to your inbox.",
  },
  {
    id: 3,
    title: "Personal styling sessions",
    description: "Book a 30-minute virtual styling consult to maximize each capsule purchase.",
  },
]

const editorialStories: EditorialStory[] = [
  {
    id: 1,
    title: "How to build a carry-on capsule",
    excerpt: "Our design team shares four looks that style the same weekender kit.",
    href: "/editorial/carry-on-capsule",
  },
  {
    id: 2,
    title: "Fabric spotlight: Recycled cashmere blend",
    excerpt: "Meet the upgraded knit story sourced from small-batch mills in Italy.",
    href: "/editorial/cashmere-blend",
  },
]

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedColor, setSelectedColor] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("featured")

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" ? true : product.category === activeCategory
      const matchesColor = selectedColor === "All" ? true : product.colors.includes(selectedColor)
      return matchesCategory && matchesColor
    })
  }, [activeCategory, selectedColor])

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "newest":
        return products.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      case "rating":
        return products.sort((a, b) => b.rating - a.rating)
      default:
        return products
    }
  }, [filteredProducts, sortBy])

  const activeCategoryMeta = categories.find((category) => category.id === activeCategory) ?? categories[0]

  const handleResetFilters = () => {
    setActiveCategory("all")
    setSelectedColor("All")
    setSortBy("featured")
  }

  return (
    <div className="bg-slate-50 pb-24 pt-12">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,_1.3fr)_minmax(0,_1fr)] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Fall arrivals
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Shop the essentials built to move with you
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Discover modular layers, refined accessories, and versatile silhouettes designed for long-term wear. Filter by category or color to curate the perfect capsule.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <span>New drops every Thursday</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/60">
                <span className="h-2 w-2 rounded-full bg-slate-900" aria-hidden />
                <span>Free exchanges within 30 days</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
            <div className="aspect-video w-full rounded-2xl bg-slate-200" aria-hidden />
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Curated by our design team</p>
              <p>Every look is built with recycled fibers and traceable manufacturing partners.</p>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-slate-900">Shop by category</h2>
              <p className="text-sm text-slate-500">{activeCategoryMeta.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-slate-900">Color focus</p>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedColor === color
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="text-slate-500" htmlFor="sort">
                Sort
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">{sortedProducts.length} styles available</h2>
            <p className="text-sm text-slate-500">
              Showing capsule picks that keep their shape and color after 50+ wears.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <article key={product.id} className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <div>
                  <div className="relative">
                    <div className="aspect-square w-full rounded-xl bg-slate-200" aria-hidden />
                    {product.isNew && (
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-5 space-y-2">
                    <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.description}</p>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <span>{product.category}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                      <span>{product.colors.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{currencyFormatter.format(product.price)}</p>
                    <p className="text-xs text-slate-500">
                      {product.rating.toFixed(1)} rating | {product.reviews} reviews
                    </p>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-10 text-white shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight">Reserve the looks you love</h2>
              <p className="text-sm text-slate-300">
                Join ShopSphere Reserve to unlock 24-hour early access on drops, members-only pricing, and complimentary express shipping on every order.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Become a member
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
                >
                  Explore collections
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6">
              <h3 className="text-base font-semibold">Member perks</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li>- Early access to weekly capsules</li>
                <li>- Dedicated stylist hotline</li>
                <li>- Extended returns and instant credit</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {serviceHighlights.map((highlight) => (
            <div key={highlight.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
              <h3 className="text-base font-semibold text-slate-900">{highlight.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{highlight.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Style stories</h2>
              <p className="text-sm text-slate-500">Insights from our team to keep your wardrobe in rotation.</p>
            </div>
            <Link to="/editorial" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
              View all stories
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {editorialStories.map((story) => (
              <article key={story.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <div className="aspect-video w-full rounded-xl bg-slate-200" aria-hidden />
                <div className="mt-4 space-y-2">
                  <h3 className="text-base font-semibold text-slate-900">{story.title}</h3>
                  <p className="text-sm text-slate-500">{story.excerpt}</p>
                </div>
                <Link
                  to={story.href}
                  className="mt-4 inline-flex text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Read the story
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Shop
