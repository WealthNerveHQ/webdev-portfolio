import type { KitName } from './kits'

/** Sections a generated page can be assembled from, in any order. */
export type SectionName =
  | 'heroSplit'
  | 'heroBand'
  | 'credentials'
  | 'servicesBento'
  | 'servicesList'
  | 'priceList'
  | 'process'
  | 'callBand'
  | 'quote'
  | 'gallery'
  | 'faq'
  | 'contact'

export interface Service {
  title: string
  body: string
  /** Key into `photos`. Only some services carry an image, by design. */
  image?: string
  price?: string
}

export interface Business {
  slug: string
  name: string
  /** Shown in the header. Falls back to `name`. */
  shortName?: string
  trade: string
  lang: 'en' | 'de'
  country: 'us' | 'uk' | 'de'
  kit: KitName
  /** Section order. This, plus the kit, is what stops two sites looking alike. */
  sections: SectionName[]

  eyebrow?: string
  headline: string
  subline: string

  phone: string
  phoneLabel: string
  email?: string
  address: { street: string; city: string; postcode?: string }
  hours: { day: string; time: string }[]

  services: Service[]
  /** Credential strip: short label plus value. */
  usps: { k: string; v: string }[]
  process?: { label: string; body: string }[]
  faq?: { q: string; a: string }[]
  quote?: { text: string; author: string }

  cta: {
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
  /** Emergency or headline offer band. */
  band?: { headline: string; body: string; cta: string }

  /** name -> public path, produced by fetch-photos.mjs */
  photos: Record<string, string>

  /** Real business the site was built for, or an invented demo. */
  demo: boolean
  meta: { title: string; description: string }
}
