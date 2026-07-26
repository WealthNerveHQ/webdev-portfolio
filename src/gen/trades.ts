/**
 * Trade scaffolds.
 *
 * Each trade brings its own section order, its own service list and its own
 * photo searches. Two different trades therefore produce structurally different
 * pages before a single word of copy is written, and the kit choice then makes
 * them look unrelated on top of that.
 *
 * `kits` lists the kits that suit the trade. The generator picks the first one
 * not already used by another site in the same trade, so a second roofer never
 * comes out looking like the first.
 */
import type { KitName } from './kits'
import type { SectionName } from './types'

export interface Trade {
  label: string
  kits: KitName[]
  /**
   * Structural variants, not just one order. A different kit alone gives the same
   * skeleton in different paint, which is the recoloured-template result we are
   * trying to avoid. The generator takes the variant no sibling site is using, so
   * the second roofer gets a different hero, a different services treatment and a
   * different section rhythm as well as a different palette.
   */
  variants: SectionName[][]
  /** Pexels queries; the key becomes the photo key used by sections. */
  photos: Record<string, string>
  services: { title: string; body: string; image?: string; price?: string }[]
  usps: { k: string; v: string }[]
  process?: { label: string; body: string }[]
  faq?: { q: string; a: string }[]
  band?: { headline: string; body: string; cta: string }
}

export const TRADES: Record<string, Trade> = {
  roofer: {
    label: 'Roofing',
    kits: ['cold-chrome', 'black-tan', 'paper-cobalt'],
    variants: [
      ['heroSplit', 'credentials', 'servicesBento', 'callBand', 'process', 'quote', 'faq', 'contact'],
      ['heroBand', 'servicesList', 'callBand', 'gallery', 'quote', 'process', 'faq', 'contact'],
      ['heroSplit', 'servicesList', 'process', 'callBand', 'credentials', 'faq', 'gallery', 'contact'],
    ],
    photos: {
      repair: 'roofer working on roof shingles',
      inspection: 'roof inspection ladder house',
      gutter: 'rain gutter installation house',
      crew: 'construction worker portrait hard hat',
    },
    services: [
      { title: 'Roof repair', body: 'Leaks, storm damage and missing shingles, usually fixed in a single visit.', image: 'repair' },
      { title: 'Full replacement', body: 'Tear-off and re-roof with a written warranty on both labour and materials.', image: 'inspection' },
      { title: 'Gutters', body: 'Cleaning, repair and replacement, including guards that actually keep leaves out.', image: 'gutter' },
      { title: 'Free inspection', body: 'We photograph the whole roof and show you what we found, not just a quote.' },
      { title: 'Insurance claims', body: 'We document storm damage properly so the claim goes through the first time.' },
      { title: 'Emergency tarping', body: 'Same-day cover to stop water getting in while the repair is scheduled.' },
    ],
    usps: [
      { k: 'In business', v: 'since 2004' },
      { k: 'Licensed and insured', v: 'fully' },
      { k: 'Roofs completed', v: 'over 1,800' },
      { k: 'Free estimates', v: 'always' },
    ],
    process: [
      { label: 'Call us', body: 'Tell us what you are seeing. We will say straight away if it is urgent.' },
      { label: 'Free inspection', body: 'We go up, photograph everything, and show you the damage ourselves.' },
      { label: 'Fixed quote', body: 'Written, itemised for labour and materials, and it does not move.' },
      { label: 'Work and cleanup', body: 'We finish, we walk it with you, and we take every nail off your driveway.' },
    ],
    faq: [
      { q: 'How fast can you come out?', a: 'For active leaks, usually the same day. For scheduled work we are typically booking one to two weeks out, and we will tell you honestly which one you are.' },
      { q: 'Do you handle the insurance paperwork?', a: 'Yes. We document the damage with dated photographs and write the scope in the format adjusters expect, which is usually what decides whether a claim is approved.' },
      { q: 'What does a repair cost?', a: 'Small repairs typically run a few hundred dollars. A full replacement depends on square footage, pitch and material, and we quote it in writing after the inspection, never over the phone.' },
      { q: 'How long does a roof take?', a: 'Most homes are a one to two day job once materials are on site. Weather is the only thing that reliably moves the date.' },
    ],
    band: {
      headline: 'Water coming in? We can tarp it today.',
      body: 'Emergency cover stops the damage spreading while we schedule the repair. Call and we will tell you the price before we drive out.',
      cta: 'Call now',
    },
  },

  barber: {
    label: 'Barber shop',
    kits: ['black-tan', 'cold-chrome', 'terracotta-slate'],
    variants: [
      ['heroBand', 'priceList', 'gallery', 'quote', 'faq', 'contact'],
      ['heroSplit', 'credentials', 'priceList', 'quote', 'gallery', 'faq', 'contact'],
    ],
    photos: {
      cut: 'barber cutting hair client chair',
      shop: 'barber shop interior chairs mirrors',
      shave: 'straight razor shave barber',
      tools: 'barber tools clippers scissors',
    },
    services: [
      { title: 'Haircut', body: 'Consultation, cut, and a finish you can actually repeat at home.', image: 'cut', price: '$35' },
      { title: 'Skin fade', body: 'Clipper work taken down to the skin, blended properly, no lines left behind.', price: '$40' },
      { title: 'Beard trim', body: 'Shaped with a razor line, hot towel, and oil worked through.', price: '$25' },
      { title: 'Hot towel shave', body: 'Traditional straight razor, two passes, forty minutes in the chair.', price: '$45' },
      { title: 'Cut and beard', body: 'Both together, which is what most of our regulars book.', price: '$55' },
    ],
    usps: [
      { k: 'Open', v: 'six days' },
      { k: 'Walk-ins', v: 'welcome' },
      { k: 'Barbers', v: 'four chairs' },
      { k: 'Booking', v: 'by phone' },
    ],
    faq: [
      { q: 'Do I need an appointment?', a: 'No. Walk in and we will fit you in, though mornings midweek are the quietest. If you want a specific barber, call ahead.' },
      { q: 'How long does a cut take?', a: 'About thirty minutes for a cut, closer to an hour if you are having a shave as well.' },
      { q: 'Do you cut children hair?', a: 'Yes, and we are patient about it. Under tens are a reduced price.' },
    ],
  },

  cafe: {
    label: 'Cafe',
    kits: ['forest-amber', 'terracotta-slate', 'olive-brick'],
    variants: [
      ['heroBand', 'priceList', 'quote', 'gallery', 'faq', 'contact'],
      ['heroSplit', 'credentials', 'priceList', 'gallery', 'quote', 'faq', 'contact'],
      ['heroBand', 'servicesList', 'gallery', 'quote', 'priceList', 'contact'],
    ],
    photos: {
      counter: 'coffee shop counter interior barista',
      espresso: 'espresso portafilter extraction cafe',
      pastry: 'bakery pastries croissant display',
      beans: 'roasted coffee beans close up',
    },
    services: [
      { title: 'Espresso', body: 'Our house blend, pulled short. Chocolate and hazelnut, low acidity.', image: 'espresso', price: '$3.20' },
      { title: 'Flat white', body: 'Double shot, properly textured milk. Oat at no extra charge.', price: '$4.50' },
      { title: 'Filter of the day', body: 'Changes weekly, brewed by hand. Ask what is on.', price: '$4.00' },
      { title: 'Cold brew', body: 'Eighteen hours, unsweetened, served over ice.', price: '$4.50' },
      { title: 'Beans, 12 oz', body: 'Whole bean or ground to suit your machine. Roast date on every bag.', price: '$18.00' },
    ],
    usps: [
      { k: 'Open', v: 'from 7am' },
      { k: 'Roasted', v: 'weekly' },
      { k: 'Seats', v: 'thirty inside' },
      { k: 'Wifi', v: 'free' },
    ],
    faq: [
      { q: 'Do you have oat milk?', a: 'Yes, and we do not charge extra for it. We also keep soy and lactose-free.' },
      { q: 'Can I work from here?', a: 'Yes. Free wifi, plenty of sockets along the back wall, and we do not time anyone out.' },
      { q: 'Do you sell beans to take home?', a: 'We do, whole bean or ground to your machine. The roast date is on every bag.' },
    ],
  },

  electrician: {
    label: 'Electrician',
    kits: ['paper-cobalt', 'cold-chrome', 'black-tan'],
    variants: [
      ['heroSplit', 'credentials', 'servicesBento', 'callBand', 'process', 'quote', 'faq', 'contact'],
      ['heroBand', 'servicesList', 'callBand', 'credentials', 'quote', 'gallery', 'faq', 'contact'],
      ['heroSplit', 'servicesList', 'process', 'callBand', 'gallery', 'faq', 'contact'],
    ],
    photos: {
      panel: 'electrician working electrical panel',
      wiring: 'electrician installing wiring wall',
      ev: 'electric car charging station home',
      breaker: 'electrical fuse box distribution board',
    },
    services: [
      { title: 'Rewiring and installation', body: 'New builds, renovations and additions, from a single outlet to a whole house.', image: 'wiring' },
      { title: 'Panel upgrades', body: 'Replacing old or undersized panels to current code, permit included.', image: 'panel' },
      { title: 'EV charger installs', body: 'We check the service can carry the load before quoting, not after.', image: 'ev' },
      { title: 'Fault finding', body: 'Breakers tripping, lights flickering, outlets dead. We measure instead of guessing.' },
      { title: 'Safety inspections', body: 'Written report for landlords, insurers and buyers, in plain language.' },
      { title: 'Landlord contracts', body: 'One point of contact, scheduled visits, one invoice per property.' },
    ],
    usps: [
      { k: 'Licensed', v: 'and bonded' },
      { k: 'In business', v: 'since 1998' },
      { k: 'Jobs completed', v: 'over 2,400' },
      { k: 'Emergency line', v: 'until 10pm' },
    ],
    process: [
      { label: 'Call us', body: 'Describe the problem. We will tell you if it is an emergency or if it can wait.' },
      { label: 'On-site look', body: 'We come out, test properly, and explain what we found without the jargon.' },
      { label: 'Fixed price', body: 'Written and itemised, valid for thirty days.' },
      { label: 'Install and sign off', body: 'We fit it, test it, hand over the certificate, and leave it clean.' },
    ],
    faq: [
      { q: 'What does a call-out cost?', a: 'Call-out within the city is a flat fee, plus labour by the hour. Nights and weekends carry a surcharge. You get the number on the phone before we drive out.' },
      { q: 'How soon can you come?', a: 'Emergencies same day. Scheduled work is usually seven to ten working days, and small repairs we tend to squeeze in sooner.' },
      { q: 'Do you pull permits?', a: 'Yes, for anything that needs one. Panel work and EV chargers almost always do, and we handle the inspection.' },
      { q: 'Do you take small jobs?', a: 'Yes. A dead outlet or a new light fitting is not too small. There is a one-hour minimum charge.' },
    ],
    band: {
      headline: 'No power? We can be out today.',
      body: 'Emergency line runs until 10pm across the city. We quote the rate on the phone, not on the invoice.',
      cta: 'Call now',
    },
  },
}

export const TRADE_NAMES = Object.keys(TRADES)
