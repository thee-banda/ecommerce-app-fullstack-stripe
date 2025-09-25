import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { demoProducts } from "../data/products"
import { useLocale } from "../context/LocaleContext"

const Shop = () => {
  const { formatCurrency, locale } = useLocale()
  const shopMessages = locale.messages.shop

  const defaultCategoryId = shopMessages.categories[0]?.id ?? "all"
  const defaultColorValue = shopMessages.colorOptions[0]?.value ?? "*"
  const defaultSortValue = shopMessages.sortOptions[0]?.value ?? "featured"

  const [activeCategory, setActiveCategory] = useState<string>(defaultCategoryId)
  const [selectedColor, setSelectedColor] = useState<string>(defaultColorValue)
  const [sortBy, setSortBy] = useState<string>(defaultSortValue)

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" ? true : product.category === activeCategory
      const matchesColor = selectedColor === "*" ? true : product.colors.includes(selectedColor)
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

  const activeCategoryMeta =
    shopMessages.categories.find((category) => category.id === activeCategory) ?? shopMessages.categories[0]

  const handleResetFilters = () => {
    setActiveCategory(defaultCategoryId)
    setSelectedColor(defaultColorValue)
    setSortBy(defaultSortValue)
  }

  const transformColorNames = (colors: string[]) => {
    return colors
      .map((color) => shopMessages.colorOptions.find((option) => option.value === color)?.label ?? color)
      .join(", ")
  }

  return (
    <div className="bg-slate-50 pb-24 pt-12">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,_1.3fr)_minmax(0,_1fr)] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              {shopMessages.heroBadge}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {shopMessages.heroTitle}
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">{shopMessages.heroDescription}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              {shopMessages.heroCallouts.map((callout, index) => (
                <div
                  key={`${callout}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/60"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  <span>{callout}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
            <div className="aspect-video w-full rounded-2xl bg-slate-200" aria-hidden />
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="font-medium text-slate-900">{shopMessages.heroCardTitle}</p>
              <p>{shopMessages.heroCardDescription}</p>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-slate-900">{shopMessages.categoryHeading}</h2>
              <p className="text-sm text-slate-500">{activeCategoryMeta.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {shopMessages.categories.map((category) => (
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
              <p className="text-sm font-semibold text-slate-900">{shopMessages.colorLabel}</p>
              {shopMessages.colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedColor === color.value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {color.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="text-slate-500" htmlFor="sort">
                {shopMessages.sortLabel}
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                {shopMessages.sortOptions.map((option) => (
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
                {shopMessages.resetLabel}
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">
              {sortedProducts.length} {shopMessages.stylesAvailableLabel}
            </h2>
            <p className="text-sm text-slate-500">{shopMessages.stylesDescription}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const categoryLabel =
                shopMessages.categories.find((category) => category.id === product.category)?.label ?? product.category
              const localizedColors = transformColorNames(product.colors)

              return (
                <article key={product.id} className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div>
                    <div className="relative">
                      <div className="aspect-square w-full rounded-xl bg-slate-200" aria-hidden />
                      {product.isNew && (
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                          {shopMessages.newBadge}
                        </span>
                      )}
                    </div>
                    <div className="mt-5 space-y-2">
                      <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-500">{product.description}</p>
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        <span>{categoryLabel}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                        <span>{localizedColors}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</p>
                      <p className="text-xs text-slate-500">
                        {shopMessages.ratingSummary(product.rating, product.reviews)}
                      </p>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                      {shopMessages.viewDetails}
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-10 text-white shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight">{shopMessages.reserveHeading}</h2>
              <p className="text-sm text-slate-300">{shopMessages.reserveDescription}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  {shopMessages.reservePrimaryCta}
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
                >
                  {shopMessages.reserveSecondaryCta}
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6">
              <h3 className="text-base font-semibold">{shopMessages.reservePerksTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {shopMessages.reservePerks.map((perk, index) => (
                  <li key={`${perk}-${index}`}>- {perk}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">{shopMessages.serviceHighlightsHeading}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {shopMessages.serviceHighlights.map((highlight) => (
              <div key={highlight.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                <h3 className="text-base font-semibold text-slate-900">{highlight.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{shopMessages.storiesHeading}</h2>
              <p className="text-sm text-slate-500">{shopMessages.storiesDescription}</p>
            </div>
            <Link to="/editorial" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
              {shopMessages.storiesCta}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {shopMessages.editorialStories.map((story) => (
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
                  {shopMessages.storiesReadMore}
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
