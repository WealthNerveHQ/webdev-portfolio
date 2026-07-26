/**
 * Assembles a page from a business config.
 *
 * The section order lives in the config, not here, so two businesses in the same
 * trade can be given genuinely different page structures. This file only knows
 * how to map a section name to a component and supply a default heading.
 */
import {
  CallBand,
  Contact,
  Credentials,
  Faq,
  Footer,
  Gallery,
  Header,
  HeroBand,
  HeroSplit,
  PriceList,
  Process,
  Quote,
  ServicesBento,
  ServicesList,
} from './sections'
import type { Business, SectionName } from './types'

const COPY = {
  de: {
    services: 'Was wir machen',
    servicesLead: 'Die Bereiche, in denen wir täglich arbeiten.',
    prices: 'Unser Angebot',
    process: 'So läuft ein Auftrag',
    gallery: 'Arbeiten',
    faq: 'Häufige Fragen',
    contact: 'Kontakt',
    contactLead: 'Rufen Sie an oder schreiben Sie kurz, worum es geht.',
  },
  en: {
    services: 'What we do',
    servicesLead: 'The work we do every day.',
    prices: 'What it costs',
    process: 'How a job runs',
    gallery: 'Recent work',
    faq: 'Common questions',
    contact: 'Get in touch',
    contactLead: 'Call, or send a line about what you need.',
  },
} as const

export default function Site({ b }: { b: Business }) {
  const t = COPY[b.lang]

  const render = (name: SectionName) => {
    switch (name) {
      case 'heroSplit': return <HeroSplit key={name} b={b} />
      case 'heroBand': return <HeroBand key={name} b={b} />
      case 'credentials': return <Credentials key={name} b={b} />
      case 'servicesBento': return <ServicesBento key={name} b={b} title={t.services} lead={t.servicesLead} />
      case 'servicesList': return <ServicesList key={name} b={b} title={t.services} lead={t.servicesLead} />
      case 'priceList': return <PriceList key={name} b={b} title={t.prices} />
      case 'process': return <Process key={name} b={b} title={t.process} />
      case 'callBand': return <CallBand key={name} b={b} />
      case 'quote': return <Quote key={name} b={b} />
      case 'gallery': return <Gallery key={name} b={b} title={t.gallery} />
      case 'faq': return <Faq key={name} b={b} title={t.faq} />
      case 'contact': return <Contact key={name} b={b} title={t.contact} lead={t.contactLead} />
      default: return null
    }
  }

  return (
    <div id="top" className="bg-background min-h-[100dvh]">
      <Header b={b} />
      <main>{b.sections.map(render)}</main>
      <Footer b={b} />
    </div>
  )
}
