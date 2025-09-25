/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type LocaleId = "en-US" | "th-TH"

type HomeCollection = {
  id: number
  name: string
  description: string
  imageAlt: string
}

type HomePerk = {
  id: number
  title: string
  description: string
}

type HomeTestimonial = {
  id: number
  quote: string
  name: string
  role: string
}

type HomeMessages = {
  heroBadge: string
  heroTitle: string
  heroDescription: string
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroSpotlightTitle: string
  heroSpotlightDescription: string
  featuredHeading: string
  featuredDescription: string
  featuredViewAll: string
  featuredItemCta: string
  trendingHeading: string
  trendingDescription: string
  trendingCta: string
  trendingItemCta: string
  trendingCollections: HomeCollection[]
  perks: HomePerk[]
  testimonialsHeading: string
  testimonialsDescription: string
  testimonialsCta: string
  testimonials: HomeTestimonial[]
  socialHeading: string
  socialDescription: string
  socialCta: string
  membershipHeading: string
  membershipDescription: string
  membershipPrimaryCta: string
  membershipSecondaryCta: string
  membershipHighlightsTitle: string
  membershipHighlights: string[]
}

type ShopCategory = {
  id: string
  label: string
  description: string
}

type ShopColorOption = {
  value: string
  label: string
}

type ShopSortOption = {
  value: string
  label: string
}

type ShopHighlight = {
  id: number
  title: string
  description: string
}

type ShopStory = {
  id: number
  title: string
  excerpt: string
  href: string
}

type ShopMessages = {
  heroBadge: string
  heroTitle: string
  heroDescription: string
  heroCallouts: string[]
  heroCardTitle: string
  heroCardDescription: string
  categoryHeading: string
  categories: ShopCategory[]
  colorLabel: string
  colorOptions: ShopColorOption[]
  sortLabel: string
  sortOptions: ShopSortOption[]
  resetLabel: string
  stylesAvailableLabel: string
  stylesDescription: string
  newBadge: string
  viewDetails: string
  ratingSummary: (rating: number, reviews: number) => string
  reserveHeading: string
  reserveDescription: string
  reservePrimaryCta: string
  reserveSecondaryCta: string
  reservePerksTitle: string
  reservePerks: string[]
  serviceHighlightsHeading: string
  serviceHighlights: ShopHighlight[]
  storiesHeading: string
  storiesDescription: string
  storiesCta: string
  storiesReadMore: string
  editorialStories: ShopStory[]
}

type CartHighlight = {
  id: number
  title: string
  description: string
}

type CartRecommendation = {
  id: number
  name: string
  price: number
  href: string
  imageAlt: string
}

type CartMessages = {
  headerBadge: string
  headerTitle: string
  headerDescription: string
  continueShoppingLabel: string
  detailLabels: {
    color: string
    size: string
    quantity: string
  }
  statusCopy: Record<"in-stock" | "low-stock" | "backorder", string>
  leadTimes: Record<number, string>
  moveToSaved: string
  removeItem: string
  fulfillmentHeading: string
  fulfillmentHighlights: CartHighlight[]
  orderSummaryHeading: string
  orderSummary: {
    subtotal: string
    shipping: string
    estimatedTax: string
    savings: string
    total: string
    checkoutCta: string
    checkoutNote: string
  }
  reserveHeading: string
  reserveDescription: string
  reserveCta: string
  reserveLearnMore: string
  recommendationsHeading: string
  recommendationsDescription: string
  recommendationsCollectionsCta: string
  recommendationsCta: string
  recommendations: CartRecommendation[]
}

type LocaleMessages = {
  navbar: {
    regionLabel: string
    selectorAriaLabel: string
  }
  home: HomeMessages
  shop: ShopMessages
  cart: CartMessages
}

type LocaleDefinition = {
  id: LocaleId
  label: string
  language: string
  currency: "USD" | "THB"
  priceRate: number
  adjustAmount?: (value: number) => number
  numberFormat: Intl.NumberFormat
  messages: LocaleMessages
}

type LocaleContextValue = {
  locale: LocaleDefinition
  localeId: LocaleId
  setLocaleId: (id: LocaleId) => void
  options: LocaleDefinition[]
  formatCurrency: (value: number) => string
}

const roundToInteger = (value: number) => Math.round(value)

const LOCALE_DEFINITIONS: Record<LocaleId, LocaleDefinition> = {
  "en-US": {
    id: "en-US",
    label: "ENG / USD",
    language: "English",
    currency: "USD",
    priceRate: 1,
    numberFormat: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    messages: {
      navbar: {
        regionLabel: "Region & Language",
        selectorAriaLabel: "Change display language and currency",
      },
      home: {
        heroBadge: "New Season Capsule",
        heroTitle: "Essentials for life on the move.",
        heroDescription:
          "Discover tailored layers and premium accessories designed to keep pace with your schedule. Build a wardrobe that works for every moment, from studio sessions to weekend escapes.",
        heroPrimaryCta: "Shop the collection",
        heroSecondaryCta: "Browse all categories",
        heroSpotlightTitle: "Featured: The Everyday Travel Set",
        heroSpotlightDescription: "Crafted with recycled materials and designed for effortless layering.",
        featuredHeading: "Featured products",
        featuredDescription: "Curated picks that pair with everything in your closet.",
        featuredViewAll: "View all products",
        featuredItemCta: "Quick view",
        trendingHeading: "Collections trending now",
        trendingDescription: "Explore edits crafted by our design team to bring seasonal balance to your rotation.",
        trendingCta: "Explore all edits",
        trendingItemCta: "Shop now",
        trendingCollections: [
          {
            id: 1,
            name: "Fall Layers",
            description: "Warm textures, earthy palettes.",
            imageAlt: "Model wearing layered fall outfit",
          },
          {
            id: 2,
            name: "Active Essentials",
            description: "Technical fabrics built to move.",
            imageAlt: "Flat lay of activewear pieces",
          },
          {
            id: 3,
            name: "Lounge Edit",
            description: "Soft knits made for slow mornings.",
            imageAlt: "Cozy loungewear on a sofa",
          },
        ],
        perks: [
          { id: 1, title: "Free shipping", description: "Complimentary shipping on orders over $75." },
          { id: 2, title: "Easy returns", description: "30-day return window with instant store credit." },
          { id: 3, title: "Member rewards", description: "Earn points on every purchase and redeem anytime." },
        ],
        testimonialsHeading: "Loved by thousands of customers",
        testimonialsDescription: "Honest feedback from people who trust us with their everyday wardrobe.",
        testimonialsCta: "Read all reviews",
        testimonials: [
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
        ],
        socialHeading: "Loved by thousands of customers",
        socialDescription: "Honest feedback from people who trust us with their everyday wardrobe.",
        socialCta: "Read all reviews",
        membershipHeading: "Join the Collective",
        membershipDescription:
          "Become a member for early access drops, styling sessions, and exclusive pricing. It is the easiest way to stay inspired and shop smarter.",
        membershipPrimaryCta: "Get started",
        membershipSecondaryCta: "See member benefits",
        membershipHighlightsTitle: "Member highlights",
        membershipHighlights: [
          "Invitations to limited-run capsule drops.",
          "Monthly styling tips from our creative team.",
          "Priority support and extended return windows.",
        ],
      },
      shop: {
        heroBadge: "Fall arrivals",
        heroTitle: "Shop the essentials built to move with you",
        heroDescription:
          "Discover modular layers, refined accessories, and versatile silhouettes designed for long-term wear. Filter by category or color to curate the perfect capsule.",
        heroCallouts: ["New drops every Thursday", "Free exchanges within 30 days"],
        heroCardTitle: "Curated by our design team",
        heroCardDescription: "Every look is built with recycled fibers and traceable manufacturing partners.",
        categoryHeading: "Shop by category",
        categories: [
          { id: "all", label: "All styles", description: "Browse every capsule in one place." },
          { id: "outerwear", label: "Outerwear", description: "Layer-ready trenches, puffers, and vests." },
          { id: "bags", label: "Bags", description: "Carryalls crafted for daily movement." },
          { id: "dresses", label: "Dresses", description: "Easy silhouettes with a refined finish." },
          { id: "essentials", label: "Essentials", description: "Everyday foundations for clean styling." },
          { id: "travel", label: "Travel", description: "Weekender gear built for light packing." },
          { id: "accessories", label: "Accessories", description: "Complete your look with subtle layers." },
          { id: "sweaters", label: "Sweaters", description: "Supersoft knits for transitional weather." },
        ],
        colorLabel: "Color focus",
        colorOptions: [
          { value: "*", label: "All" },
          { value: "Cognac", label: "Cognac" },
          { value: "Black", label: "Black" },
          { value: "Fog", label: "Fog" },
          { value: "Coal", label: "Coal" },
          { value: "Steel", label: "Steel" },
          { value: "Tan", label: "Tan" },
          { value: "Stone", label: "Stone" },
          { value: "Olive", label: "Olive" },
          { value: "Jet", label: "Jet" },
          { value: "Pearl", label: "Pearl" },
          { value: "Umber", label: "Umber" },
          { value: "Charcoal", label: "Charcoal" },
          { value: "Ivory", label: "Ivory" },
          { value: "Sable", label: "Sable" },
          { value: "Midnight", label: "Midnight" },
          { value: "Alpine", label: "Alpine" },
          { value: "Sand", label: "Sand" },
          { value: "Slate", label: "Slate" },
        ],
        sortLabel: "Sort",
        sortOptions: [
          { value: "featured", label: "Featured" },
          { value: "price-low", label: "Price: Low to High" },
          { value: "price-high", label: "Price: High to Low" },
          { value: "newest", label: "Newest arrivals" },
          { value: "rating", label: "Top rated" },
        ],
        resetLabel: "Reset",
        stylesAvailableLabel: "styles available",
        stylesDescription: "Showing capsule picks that keep their shape and color after 50+ wears.",
        newBadge: "New",
        viewDetails: "View details",
        ratingSummary: (rating, reviews) => `${rating.toFixed(1)} rating | ${reviews} reviews`,
        reserveHeading: "Reserve the looks you love",
        reserveDescription:
          "Join ShopSphere Reserve to unlock 24-hour early access on drops, members-only pricing, and complimentary express shipping on every order.",
        reservePrimaryCta: "Become a member",
        reserveSecondaryCta: "Explore collections",
        reservePerksTitle: "Member perks",
        reservePerks: [
          "Early access to weekly capsules",
          "Dedicated stylist hotline",
          "Extended returns and instant credit",
        ],
        serviceHighlightsHeading: "Service highlights",
        serviceHighlights: [
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
        ],
        storiesHeading: "Style stories",
        storiesDescription: "Insights from our team to keep your wardrobe in rotation.",
        storiesCta: "View all stories",
        storiesReadMore: "Read the story",
        editorialStories: [
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
        ],
      },
      cart: {
        headerBadge: "Your bag",
        headerTitle: "Ready to check out?",
        headerDescription:
          "Review the pieces in your cart, adjust quantities, or move items to your saved list. Everything ships carbon-neutral with free exchanges within thirty days.",
        continueShoppingLabel: "Continue shopping",
        detailLabels: {
          color: "Color",
          size: "Size",
          quantity: "Quantity",
        },
        statusCopy: {
          "in-stock": "In stock",
          "low-stock": "Low stock",
          backorder: "Backorder",
        },
        leadTimes: {
          1: "Arrives in 3-5 business days",
          2: "Arrives in 2-4 business days",
          3: "Ships tomorrow",
        },
        moveToSaved: "Move to saved",
        removeItem: "Remove",
        fulfillmentHeading: "Fulfillment perks",
        fulfillmentHighlights: [
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
        ],
        orderSummaryHeading: "Order summary",
        orderSummary: {
          subtotal: "Subtotal",
          shipping: "Shipping",
          estimatedTax: "Estimated tax",
          savings: "Member savings",
          total: "Total",
          checkoutCta: "Proceed to checkout",
          checkoutNote: "You can review delivery options and apply additional promo codes during checkout.",
        },
        reserveHeading: "Unlock complimentary 2-day shipping",
        reserveDescription:
          "Check out with ShopSphere Reserve and get automatic expedited shipping plus priority support on your next order.",
        reserveCta: "Learn more",
        reserveLearnMore: "Learn more",
        recommendationsHeading: "You might also like",
        recommendationsDescription: "Complete the look with pieces curated by our stylists.",
        recommendationsCollectionsCta: "View all collections",
        recommendationsCta: "Add to cart",
        recommendations: [
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
        ],
      },
    },
  },
  "th-TH": {
    id: "th-TH",
    label: "TH / THB",
    language: "Thai",
    currency: "THB",
    priceRate: 35,
    adjustAmount: roundToInteger,
    numberFormat: new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      maximumFractionDigits: 0,
    }),
    messages: {
      navbar: {
        regionLabel: "ภูมิภาคและภาษา",
        selectorAriaLabel: "เปลี่ยนภาษาและสกุลเงินที่แสดง",
      },
      home: {
        heroBadge: "คอลเลกชันฤดูกาลใหม่",
        heroTitle: "ไอเท็มที่จำเป็นสำหรับทุกจังหวะชีวิต",
        heroDescription:
          "ค้นพบเลเยอร์ที่ตัดเย็บอย่างพิถีพิถันและแอ็กเซสซอรี่คุณภาพสูงที่พร้อมไปกับตารางชีวิตของคุณ สร้างลุคที่พร้อมสำหรับทุกช่วงเวลา ตั้งแต่ทำงานจนถึงวันหยุดสบาย ๆ",
        heroPrimaryCta: "เลือกซื้อคอลเลกชัน",
        heroSecondaryCta: "ดูหมวดหมู่ทั้งหมด",
        heroSpotlightTitle: "ไฮไลต์: Everyday Travel Set",
        heroSpotlightDescription: "ผลิตจากวัสดุรีไซเคิล ออกแบบเพื่อการเลเยอร์อย่างสบาย.",
        featuredHeading: "สินค้าที่แนะนำ",
        featuredDescription: "ชิ้นเด่นที่มิกซ์แอนด์แมตช์กับทุกลุคได้ง่าย",
        featuredViewAll: "ดูสินค้าทั้งหมด",
        featuredItemCta: "ดูรายละเอียด",
        trendingHeading: "คอลเลกชันยอดนิยมตอนนี้",
        trendingDescription: "สำรวจชุดที่ทีมออกแบบจัดสรรเพื่อบาลานซ์สไตล์ตามฤดูกาลของคุณ",
        trendingCta: "ชมทุกลุค",
        trendingItemCta: "ช้อปเลย",
        trendingCollections: [
          {
            id: 1,
            name: "เลเยอร์รับใบไม้ร่วง",
            description: "สัมผัสผิวสัมผัสอบอุ่นกับโทนสีเอิร์ธโทน",
            imageAlt: "นางแบบสวมเสื้อผ้าหลายชั้นสำหรับฤดูใบไม้ร่วง",
          },
          {
            id: 2,
            name: "แอกทีฟเอสเซนเชียล",
            description: "นิตแวร์นุ่มสบายสำหรับวันพักผ่อน",
            imageAlt: "ชุดออกกำลังกายจัดวางแบบแฟลตเลย์",
          },
          {
            id: 3,
            name: "ลุคสบายยามเช้า",
            description: "นิตแวร์นุ่มสบายสำหรับวันพักผ่อน",
            imageAlt: "ชุดลำลองเนื้อผ้านุ่มบนโซฟา",
          },
        ],
        perks: [
          { id: 1, title: "จัดส่งฟรี", description: "ส่งฟรีเมื่อสั่งซื้อครบ 2,500 บาท." },
          { id: 2, title: "คืนง่าย", description: "คืนหรือเปลี่ยนสินค้าได้ภายใน 30 วันพร้อมเครดิตร้านทันที." },
          { id: 3, title: "คะแนนสะสมสมาชิก", description: "รับคะแนนทุกครั้งที่ช้อปและแลกรับสิทธิพิเศษได้ทุกเมื่อ." },
        ],
        testimonialsHeading: "ลูกค้าหลายพันคนไว้วางใจ",
        testimonialsDescription: "เสียงตอบรับจริงจากผู้ที่เลือกเราเป็นไอเท็มประจำวัน",
        testimonialsCta: "อ่านรีวิวทั้งหมด",
        testimonials: [
          {
            id: 1,
            quote: "คุณภาพเทียบเท่าแบรนด์หรูในราคาที่จับต้องได้ เป็นร้านที่ฉันเลือกสำหรับไอเท็มพื้นฐานเสมอ.",
            name: "เจมี่ ลี",
            role: "ลูกค้ายืนยันตัวตน",
          },
          {
            id: 2,
            quote: "จัดส่งรวดเร็วและสินค้าพอดีตัวตั้งแต่ครั้งแรกที่ลอง",
            name: "มอร์แกน สมิธ",
            role: "สมาชิกประจำ",
          },
        ],
        socialHeading: "ลูกค้าหลายพันคนไว้วางใจ",
        socialDescription: "เสียงตอบรับจริงจากผู้ที่เลือกเราเป็นไอเท็มประจำวัน",
        socialCta: "อ่านรีวิวทั้งหมด",
        membershipHeading: "เข้าร่วม Collective",
        membershipDescription:
          "รับสิทธิ์เข้าถึงสินค้าล่วงหน้า เซสชันสไตลิ่ง และราคาพิเศษสำหรับสมาชิก ช่วยให้คุณอัปเดตแรงบันดาลใจได้ง่ายขึ้น",
        membershipPrimaryCta: "เริ่มต้น",
        membershipSecondaryCta: "ดูสิทธิประโยชน์สมาชิก",
        membershipHighlightsTitle: "ไฮไลต์สำหรับสมาชิก",
        membershipHighlights: [
          "เชิญร่วมคอลเลกชันลิมิเต็ดก่อนใคร",
          "เคล็ดลับการมิกซ์แอนด์แมตช์รายเดือนจากทีมดีไซน์",
          "การดูแลแบบเร่งด่วนและระยะเวลาคืนสินค้าที่นานขึ้น",
        ],
      },
      shop: {
        heroBadge: "คอลเลกชันฤดูใบไม้ร่วง",
        heroTitle: "ช้อปไอเท็มที่เคลื่อนไหวไปกับคุณ",
        heroDescription:
          "ค้นหาชิ้นสำคัญที่ปรับแต่งได้ง่าย แอ็กเซสซอรี่ที่พิถีพิถัน และซิลูเอตที่ใส่ได้นาน เลือกกรองตามหมวดหมู่หรือสีเพื่อสร้างแคปซูลของคุณเอง",
        heroCallouts: ["สินค้าใหม่ทุกวันพฤหัสบดี", "เปลี่ยน/คืนได้ฟรีภายใน 30 วัน"],
        heroCardTitle: "คัดสรรโดยทีมออกแบบ",
        heroCardDescription: "ทุกลุคผลิตด้วยเส้นใยรีไซเคิลและโรงงานที่ตรวจสอบได้",
        categoryHeading: "เลือกตามหมวดหมู่",
        categories: [
          { id: "all", label: "ทั้งหมด", description: "ชมทุกคอลเลกชันได้ในที่เดียว." },
          { id: "outerwear", label: "เสื้อคลุม", description: "เทรนช์ โค้ต และเสื้อกั๊กสำหรับเลเยอร์." },
          { id: "bags", label: "กระเป๋า", description: "กระเป๋าที่ออกแบบเพื่อการใช้งานทุกวัน." },
          { id: "dresses", label: "เดรส", description: "ซิลูเอตโปร่งสบายที่คงความเรียบหรู." },
          { id: "essentials", label: "ไอเท็มพื้นฐาน", description: "ชิ้นหลักสำหรับมิกซ์แอนด์แมตช์ทุกวัน." },
          { id: "travel", label: "การเดินทาง", description: "กระเป๋าและอุปกรณ์สำหรับทริปน้ำหนักเบา." },
          { id: "accessories", label: "เครื่องประดับ", description: "เติมเต็มลุคด้วยรายละเอียดเลเยอร์ที่พอดี." },
          { id: "sweaters", label: "สเวตเตอร์", description: "นิตแวร์นุ่มสบายสำหรับอากาศเปลี่ยนฤดู." },
        ],
        colorLabel: "โทนสี",
        colorOptions: [
          { value: "*", label: "ทั้งหมด" },
          { value: "Cognac", label: "Cognac" },
          { value: "Black", label: "ดำ" },
          { value: "Fog", label: "เทาหมอก" },
          { value: "Coal", label: "ถ่าน" },
          { value: "Steel", label: "สตีล" },
          { value: "Tan", label: "น้ำตาลอ่อน" },
          { value: "Stone", label: "สโตน" },
          { value: "Olive", label: "เขียวออลีฟ" },
          { value: "Jet", label: "เจ็ท" },
          { value: "Pearl", label: "มุก" },
          { value: "Umber", label: "อัมเบอร์" },
          { value: "Charcoal", label: "ชาร์โคล" },
          { value: "Ivory", label: "ไอวอรี่" },
          { value: "Sable", label: "เซเบิล" },
          { value: "Midnight", label: "มิดไนต์" },
          { value: "Alpine", label: "อัลไพน์" },
          { value: "Sand", label: "ทราย" },
          { value: "Slate", label: "สเลต" },
        ],
        sortLabel: "จัดเรียง",
        sortOptions: [
          { value: "featured", label: "แนะนำ" },
          { value: "price-low", label: "ราคาต่ำไปสูง" },
          { value: "price-high", label: "ราคาสูงไปต่ำ" },
          { value: "newest", label: "สินค้าเข้าใหม่" },
          { value: "rating", label: "เรตติ้งสูงสุด" },
        ],
        resetLabel: "รีเซ็ต",
        stylesAvailableLabel: "สไตล์พร้อมจำหน่าย",
        stylesDescription: "คัดเฉพาะไอเท็มที่ยังคงรูปทรงและสีสันหลังสวมใส่มากกว่า 50 ครั้ง.",
        newBadge: "ใหม่",
        viewDetails: "ดูรายละเอียด",
        ratingSummary: (rating, reviews) => `????? ${rating.toFixed(1)} | ????? ${reviews}`,
        reserveHeading: "จองลุคที่คุณชอบ",
        reserveDescription:
          "เข้าร่วม ShopSphere Reserve เพื่อเข้าถึงสินค้าใหม่ก่อนใคร รับส่วนลดพิเศษ และจัดส่งด่วนฟรีทุกออเดอร์.",
        reservePrimaryCta: "สมัครสมาชิก",
        reserveSecondaryCta: "ดูคอลเลกชัน",
        reservePerksTitle: "สิทธิพิเศษสมาชิก",
        reservePerks: [
          "เข้าถึงคอลเลกชันรายสัปดาห์ก่อนใคร",
          "ที่ปรึกษาสไตล์ส่วนตัว",
          "ขยายเวลาคืนสินค้าและเครดิตทันที",
        ],
        serviceHighlightsHeading: "บริการพิเศษ",
        serviceHighlights: [
          {
            id: 1,
            title: "ปรับแก้ไซซ์ฟรี",
            description: "เข้าร้าน Studio เพื่อปรับแต่งโค้ตและเดรสให้พอดีตัว",
          },
          {
            id: 2,
            title: "จัดส่งรวดเร็วแบบรักษ์โลก",
            description: "ทุกคำสั่งซื้อบรรจุในวัสดุรีไซเคิลพร้อมหมายเลขติดตาม",
          },
          {
            id: 3,
            title: "ปรึกษาสไตล์ 30 นาที",
            description: "จองเซสชันออนไลน์เพื่อใช้ประโยชน์สูงสุดจากแต่ละคอลเลกชัน",
          },
        ],
        storiesHeading: "สตอรี่สไตล์",
        storiesDescription: "อินไซต์จากทีมงานเพื่อให้ตู้เสื้อผ้าหมุนเวียนได้เสมอ",
        storiesCta: "ดูบทความทั้งหมด",
        storiesReadMore: "อ่านต่อ",
        editorialStories: [
          {
            id: 1,
            title: "สร้างแคปซูลสำหรับกระเป๋าถือขึ้นเครื่อง",
            excerpt: "ทีมดีไซน์แชร์ 4 ลุคที่ใช้กระเป๋าใบเดียว",
            href: "/editorial/carry-on-capsule",
          },
          {
            id: 2,
            title: "ชูจุดเด่นผ้าแคชเมียร์รีไซเคิล",
            excerpt: "ทำความรู้จักนิตแวร์ใหม่จากโรงทอขนาดเล็กในอิตาลี",
            href: "/editorial/cashmere-blend",
          },
        ],
      },
      cart: {
        headerBadge: "ตะกร้าของคุณ",
        headerTitle: "พร้อมชำระเงินหรือยัง?",
        headerDescription:
          "ตรวจสอบสินค้า ปรับจำนวน หรือบันทึกรายการที่อยากเก็บไว้ ทุกออเดอร์จัดส่งแบบคาร์บอนนิวทรัลและเปลี่ยนไซซ์ได้ฟรีภายใน 30 วัน.",
        continueShoppingLabel: "เลือกซื้อสินค้าต่อ",
        detailLabels: {
          color: "สี",
          size: "ไซซ์",
          quantity: "จำนวน",
        },
        statusCopy: {
          "in-stock": "พร้อมส่ง",
          "low-stock": "ใกล้หมด",
          backorder: "สั่งจองล่วงหน้า",
        },
        leadTimes: {
          1: "จัดส่งภายใน 3-5 วันทำการ",
          2: "จัดส่งภายใน 2-4 วันทำการ",
          3: "จัดส่งพรุ่งนี้",
        },
        moveToSaved: "ย้ายไปบันทึกไว้",
        removeItem: "ลบออก",
        fulfillmentHeading: "สิทธิพิเศษการจัดส่ง",
        fulfillmentHighlights: [
          {
            id: 1,
            title: "จัดส่งคาร์บอนนิวทรัล",
            description: "ทุกคำสั่งซื้อชดเชยคาร์บอนและใช้บรรจุภัณฑ์รีไซเคิล",
          },
          {
            id: 2,
            title: "รับสินค้าวันเดียว",
            description: "สั่งก่อน 14:00 น. และรับที่สาขา Studio ได้ภายใน 3 ชั่วโมง",
          },
          {
            id: 3,
            title: "รับประกันไซซ์ 30 วัน",
            description: "ลองที่บ้านและเปลี่ยนไซซ์ได้ฟรีภายในสามสิบวัน",
          },
        ],
        orderSummaryHeading: "สรุปคำสั่งซื้อ",
        orderSummary: {
          subtotal: "ยอดรวมสินค้า",
          shipping: "ค่าจัดส่ง",
          estimatedTax: "ภาษีประมาณการ",
          savings: "ส่วนลดสมาชิก",
          total: "ยอดชำระ",
          checkoutCta: "ดำเนินการชำระเงิน",
          checkoutNote: "สามารถเลือกวิธีจัดส่งและใส่โค้ดส่วนลดเพิ่มได้ในขั้นตอนชำระเงิน",
        },
        reserveHeading: "รับจัดส่งด่วนฟรี 2 วัน",
        reserveDescription:
          "ชำระเงินด้วย ShopSphere Reserve เพื่อรับการจัดส่งแบบด่วนอัตโนมัติและการดูแลลำดับพิเศษสำหรับออเดอร์ถัดไป",
        reserveCta: "ดูรายละเอียด",
        reserveLearnMore: "ดูรายละเอียด",
        recommendationsHeading: "อาจถูกใจคุณ",
        recommendationsDescription: "เติมเต็มลุคด้วยไอเท็มที่สไตลิสต์คัดมาให้",
        recommendationsCollectionsCta: "ดูคอลเลกชันทั้งหมด",
        recommendationsCta: "เพิ่มลงตะกร้า",
        recommendations: [
          {
            id: 1,
            name: "กระเป๋าใส่การ์ด",
            price: 68,
            href: "/shop",
            imageAlt: "กระเป๋าใส่การ์ดหนังวางบนพื้นหินอ่อน",
          },
          {
            id: 2,
            name: "เข็มขัด Heritage",
            price: 54,
            href: "/shop",
            imageAlt: "เข็มขัดหนังสีน้ำตาลกับหัวเข็มขัดสีเงิน",
          },
          {
            id: 3,
            name: "กระเป๋าอเนกประสงค์",
            price: 42,
            href: "/shop",
            imageAlt: "กระเป๋าเครื่องสำอางผ้าแคนวาส",
          },
        ],
      },
    },
  },
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [localeId, setLocaleId] = useState<LocaleId>("en-US")

  const locale = LOCALE_DEFINITIONS[localeId]

  const value = useMemo<LocaleContextValue>(() => {
    const formatCurrency = (value: number) => {
      const converted = value * locale.priceRate
      const adjusted = locale.adjustAmount ? locale.adjustAmount(converted) : converted
      return locale.numberFormat.format(adjusted)
    }

    return {
      locale,
      localeId,
      setLocaleId,
      options: Object.values(LOCALE_DEFINITIONS),
      formatCurrency,
    }
  }, [locale, localeId])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
