export type Product = {
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

export const demoProducts: Product[] = [
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

export const featuredProductIds = [1, 2, 3, 4]

export type CartSeed = {
  productId: number
  quantity: number
  color: string
  size: string
  leadTime: string
  status: "in-stock" | "low-stock" | "backorder"
}

export const demoCartItems: CartSeed[] = [
  {
    productId: 1,
    quantity: 1,
    color: "Cognac",
    size: "One size",
    leadTime: "Arrives in 3-5 business days",
    status: "in-stock",
  },
  {
    productId: 2,
    quantity: 2,
    color: "Fog",
    size: "M",
    leadTime: "Arrives in 2-4 business days",
    status: "low-stock",
  },
  {
    productId: 3,
    quantity: 1,
    color: "Tan",
    size: "40 mm",
    leadTime: "Ships tomorrow",
    status: "in-stock",
  },
]
