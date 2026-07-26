/**
 * Section library for generated sites.
 *
 * Every section is driven entirely by the business config, and a page picks which
 * sections it wants and in what order. Combined with the kit system, that is what
 * keeps two businesses in the same trade from producing the same page.
 *
 * Patterns here are lifted from the two hand-built sites (Kesselstrom and
 * Roestwerk), which were verified in a real browser. Those two are deliberately
 * left untouched: they are finished, deployed portfolio pieces, and refactoring
 * them into this library would risk working output for no user-visible gain.
 */
import type { ReactNode } from 'react'
import {
  CaretRight,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  Wrench,
} from '@phosphor-icons/react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Business } from './types'

const WRAP = 'mx-auto max-w-6xl px-6'
const PAD = 'py-20 sm:py-28'
const H2 =
  'font-display text-foreground text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance'

function SectionHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <Reveal>
      <h2 className={`${H2} max-w-2xl`}>{title}</h2>
      {lead && (
        <p className="text-muted-foreground mt-4 max-w-[58ch] text-base leading-relaxed">{lead}</p>
      )}
    </Reveal>
  )
}

export function Header({ b }: { b: Business }) {
  const nav = b.sections.includes('servicesBento') || b.sections.includes('servicesList')
  return (
    <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-6`}>
        <a href="#top" className="font-display text-foreground text-[17px] font-extrabold tracking-[-0.02em]">
          {b.shortName ?? b.name}
        </a>
        <nav className="text-muted-foreground hidden items-center gap-7 text-sm md:flex">
          {nav && <a className="hover:text-foreground transition-colors" href="#leistungen">{b.lang === 'de' ? 'Leistungen' : 'Services'}</a>}
          {b.faq?.length ? <a className="hover:text-foreground transition-colors" href="#faq">{b.lang === 'de' ? 'Fragen' : 'FAQ'}</a> : null}
          <a className="hover:text-foreground transition-colors" href="#kontakt">{b.lang === 'de' ? 'Kontakt' : 'Contact'}</a>
        </nav>
        <a
          href={`tel:${b.phone}`}
          className="bg-primary text-primary-foreground inline-flex h-11 shrink-0 items-center gap-2 rounded-[var(--radius)] px-4 text-sm font-semibold transition-transform active:translate-y-px"
        >
          <Phone weight="fill" className="size-4" aria-hidden />
          <span className="hidden sm:inline">{b.phoneLabel}</span>
          <span className="sm:hidden">{b.lang === 'de' ? 'Anrufen' : 'Call'}</span>
        </a>
      </div>
    </header>
  )
}

/** Headline left, supporting copy right, two image cards below. */
export function HeroSplit({ b }: { b: Business }) {
  const cards = b.services.filter((s) => s.image).slice(0, 2)
  return (
    <section className="bg-background relative isolate w-full overflow-hidden">
      <div className={`${WRAP} flex flex-col gap-12 pt-10 pb-16 sm:gap-16 sm:pt-14 sm:pb-20`}>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {b.eyebrow && (
              <p className="text-primary mb-5 text-sm font-semibold tracking-[0.14em] uppercase">
                {b.eyebrow}
              </p>
            )}
            <h1 className="text-foreground font-display text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-extrabold tracking-[-0.03em] text-balance">
              {b.headline}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md text-base text-pretty sm:text-lg">
            {b.subline}
          </p>
        </div>

        {cards.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6">
            {cards.map((s, i) => (
              <div
                key={s.title}
                className="relative isolate aspect-16/10 w-full overflow-hidden rounded-[var(--radius)] outline outline-black/10"
              >
                <img
                  src={b.photos[s.image!]}
                  alt={s.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 -z-10 size-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/50 to-black/10"
                />
                <div className="flex h-full flex-col items-start justify-end p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-white/85">{s.body}</p>
                  <Button
                    asChild
                    className="mt-5 h-11 rounded-[var(--radius)] bg-white px-5 font-semibold text-neutral-950 hover:bg-white/90"
                  >
                    <a href={i === 0 ? b.cta.primary.href : (b.cta.secondary?.href ?? '#kontakt')}>
                      {i === 0 ? b.cta.primary.label : (b.cta.secondary?.label ?? b.cta.primary.label)}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/** Full-bleed image band, then an asymmetric tagline / headline split. */
export function HeroBand({ b }: { b: Business }) {
  const lead = Object.values(b.photos)[0]
  return (
    <section className="bg-background relative isolate w-full overflow-hidden">
      <div className="relative w-full overflow-hidden mask-b-from-85% mask-b-to-100%">
        <img
          src={lead}
          alt={b.name}
          decoding="async"
          fetchPriority="high"
          className="aspect-2/1 max-h-[46vh] w-full object-cover object-center sm:aspect-9/4"
        />
      </div>
      <div className={`${WRAP} grid grid-cols-1 gap-10 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:grid-cols-12`}>
        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-pretty lg:col-span-4 sm:text-base">
          {b.eyebrow}
        </p>
        <div className="flex flex-col items-start gap-6 lg:col-span-7 lg:col-start-6">
          <h1 className="text-foreground font-display text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
            {b.headline}
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-pretty">{b.subline}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-[var(--radius)] px-6 font-semibold">
              <a href={b.cta.primary.href}>{b.cta.primary.label}</a>
            </Button>
            {b.cta.secondary && (
              <Button asChild variant="outline" className="h-11 rounded-[var(--radius)] px-6 font-semibold">
                <a href={b.cta.secondary.href}>{b.cta.secondary.label}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Credentials({ b }: { b: Business }) {
  return (
    <section aria-label={b.lang === 'de' ? 'Qualifikationen' : 'Credentials'} className="border-border border-y">
      <div className={`${WRAP} grid grid-cols-2 md:grid-cols-4`}>
        {b.usps.map((u, i) => (
          <div
            key={u.k}
            className={`border-border py-6 md:py-7 ${i % 2 === 1 ? 'border-l pl-5' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i >= 2 ? 'md:border-l md:pl-5' : ''}`}
          >
            <p className="text-muted-foreground text-[13px]">{u.k}</p>
            <p className="font-display text-foreground mt-1 text-lg font-bold tracking-[-0.02em]">{u.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Lead tile spans a 2x2 block, so the grid has rhythm and no empty cells. */
export function ServicesBento({ b, title, lead }: { b: Business; title: string; lead?: string }) {
  const withImg = b.services.filter((s) => s.image)
  const feature = withImg[0] ?? b.services[0]
  const rest = b.services.filter((s) => s !== feature)
  const second = rest.find((s) => s.image)
  const plain = rest.filter((s) => s !== second)

  return (
    <section id="leistungen" className={`${WRAP} ${PAD}`}>
      <SectionHead title={title} lead={lead} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2 md:row-span-2">
          <article className="border-border bg-card relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border">
            {feature.image && (
              <div className="min-h-56 w-full flex-1 overflow-hidden">
                <img src={b.photos[feature.image]} alt={feature.title} loading="lazy" decoding="async" className="size-full object-cover" />
              </div>
            )}
            <div className="p-6 sm:p-8">
              <Wrench weight="duotone" className="text-primary size-6" aria-hidden />
              <h3 className="font-display text-foreground mt-3 text-xl font-bold tracking-[-0.02em]">{feature.title}</h3>
              <p className="text-muted-foreground mt-2 max-w-[52ch] text-sm leading-relaxed">{feature.body}</p>
            </div>
          </article>
        </Reveal>

        {second && (
          <Reveal delay={0.05}>
            <article className="border-border bg-card relative isolate flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-[var(--radius)] border p-6">
              <img src={b.photos[second.image!]} alt={second.title} loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/88 via-black/55 to-black/15" />
              <h3 className="font-display mt-3 text-xl font-bold tracking-[-0.02em] text-white">{second.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{second.body}</p>
            </article>
          </Reveal>
        )}

        {plain.map((s, i) => (
          <Reveal key={s.title} delay={0.04 * i}>
            <article className="border-border bg-card h-full rounded-[var(--radius)] border p-6">
              <h3 className="font-display text-foreground text-lg font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Bordered rows. Reads nothing like the bento, which is the point. */
export function ServicesList({ b, title, lead }: { b: Business; title: string; lead?: string }) {
  return (
    <section id="leistungen" className={`${WRAP} ${PAD}`}>
      <SectionHead title={title} lead={lead} />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <ul className="border-border border-t">
          {b.services.map((s, i) => (
            <Reveal key={s.title} delay={0.03 * i}>
              <li className="border-border grid gap-x-8 gap-y-2 border-b py-6 sm:grid-cols-[minmax(0,14rem)_1fr]">
                <h3 className="font-display text-foreground text-lg font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="text-muted-foreground max-w-[60ch] text-sm leading-relaxed">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PriceList({ b, title, lead }: { b: Business; title: string; lead?: string }) {
  const feature = b.services.find((s) => s.image)
  const rest = b.services.filter((s) => s !== feature)
  return (
    <section id="leistungen" className={`${WRAP} ${PAD}`}>
      <SectionHead title={title} lead={lead} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {feature && (
          <Reveal className="md:col-span-2">
            <article className="border-border bg-card grid h-full overflow-hidden rounded-[var(--radius)] border sm:grid-cols-2">
              <div className="min-h-52 overflow-hidden">
                <img src={b.photos[feature.image!]} alt={feature.title} loading="lazy" decoding="async" className="size-full object-cover" />
              </div>
              <div className="flex flex-col p-6 sm:p-7">
                <h3 className="font-display text-foreground text-xl font-semibold tracking-[-0.015em]">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{feature.body}</p>
                {feature.price && (
                  <span className="font-display text-primary mt-4 text-lg font-semibold tabular-nums">{feature.price}</span>
                )}
              </div>
            </article>
          </Reveal>
        )}
        {rest.map((s, i) => (
          <Reveal key={s.title} delay={0.04 * i}>
            <article className="border-border bg-card flex h-full flex-col rounded-[var(--radius)] border p-6">
              <h3 className="font-display text-foreground text-lg font-semibold tracking-[-0.015em]">{s.title}</h3>
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{s.body}</p>
              {s.price && (
                <span className="font-display text-primary mt-4 text-base font-semibold tabular-nums">{s.price}</span>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Verb-labelled steps. No "Stage 1 / Stage 2": the step content is the label. */
export function Process({ b, title }: { b: Business; title: string }) {
  if (!b.process?.length) return null
  return (
    <section className={`${WRAP} ${PAD}`}>
      <SectionHead title={title} />
      <ol className="border-border mt-12 grid gap-px border md:grid-cols-4">
        {b.process.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i}>
            <li className="border-border bg-card h-full border-b p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
              <h3 className="font-display text-foreground text-lg font-bold tracking-[-0.02em]">{s.label}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/** The one saturated moment on the page. */
export function CallBand({ b }: { b: Business }) {
  if (!b.band) return null
  return (
    <section className="bg-primary text-primary-foreground">
      <div className={`${WRAP} grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center`}>
        <div>
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
            {b.band.headline}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base opacity-85">{b.band.body}</p>
        </div>
        <div className="lg:justify-self-end">
          <Button
            asChild
            className="h-14 w-full rounded-[var(--radius)] bg-white px-8 text-base font-semibold text-neutral-950 hover:bg-white/90 sm:w-auto"
          >
            <a href={`tel:${b.phone}`}>
              <Phone weight="fill" className="size-5" aria-hidden />
              {b.band.cta}
            </a>
          </Button>
          <p className="mt-3 text-sm opacity-75">{b.phoneLabel}</p>
        </div>
      </div>
    </section>
  )
}

export function Quote({ b }: { b: Business }) {
  if (!b.quote) return null
  return (
    <section className="border-border bg-card border-y">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <blockquote>
            <p className="font-display text-foreground text-[clamp(1.35rem,3.2vw,2.2rem)] leading-[1.22] font-semibold tracking-[-0.02em] text-balance">
              {b.quote.text}
            </p>
            <footer className="text-muted-foreground mt-6 text-[15px]">{b.quote.author}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

export function Gallery({ b, title, lead }: { b: Business; title: string; lead?: string }) {
  const shots = Object.entries(b.photos).slice(-3)
  return (
    <section className={`${WRAP} ${PAD}`}>
      <SectionHead title={title} lead={lead} />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {shots.map(([k, src], i) => (
          <Reveal key={k} delay={0.05 * i}>
            <div className="border-border aspect-4/3 overflow-hidden rounded-[var(--radius)] border">
              <img src={src} alt={`${b.name}, ${k}`} loading="lazy" decoding="async" className="size-full object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Faq({ b, title }: { b: Business; title: string }) {
  if (!b.faq?.length) return null
  return (
    <section id="faq" className={`mx-auto max-w-3xl px-6 ${PAD}`}>
      <SectionHead title={title} />
      <Reveal delay={0.06}>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {b.faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="font-display text-left text-base font-semibold tracking-[-0.01em]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground max-w-[62ch] text-sm leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

export function Contact({ b, title, lead }: { b: Business; title: string; lead?: string }) {
  const de = b.lang === 'de'
  const shot = Object.values(b.photos).at(-1)
  return (
    <section id="kontakt" className="border-border border-t">
      <div className={`${WRAP} grid gap-12 ${PAD} lg:grid-cols-2`}>
        <Reveal>
          <h2 className={H2}>{title}</h2>
          {lead && <p className="text-muted-foreground mt-4 max-w-[52ch] text-base">{lead}</p>}
          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground flex items-center gap-2 text-[13px]">
                <MapPin weight="duotone" className="text-primary size-4" aria-hidden />
                {de ? 'Adresse' : 'Address'}
              </dt>
              <dd className="text-foreground mt-1 text-[15px]">
                {b.address.street}
                <br />
                {[b.address.postcode, b.address.city].filter(Boolean).join(' ')}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground flex items-center gap-2 text-[13px]">
                <Clock weight="duotone" className="text-primary size-4" aria-hidden />
                {de ? 'Öffnungszeiten' : 'Opening hours'}
              </dt>
              <dd className="text-foreground mt-1 space-y-0.5 text-[15px]">
                {b.hours.map((h) => (
                  <div key={h.day}>
                    {h.day} <span className="tabular-nums">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground flex items-center gap-2 text-[13px]">
                <Phone weight="duotone" className="text-primary size-4" aria-hidden />
                {de ? 'Telefon' : 'Phone'}
              </dt>
              <dd className="mt-1 text-[15px]">
                <a className="text-primary font-semibold hover:underline" href={`tel:${b.phone}`}>
                  {b.phoneLabel}
                </a>
              </dd>
            </div>
            {b.email && (
              <div>
                <dt className="text-muted-foreground flex items-center gap-2 text-[13px]">
                  <EnvelopeSimple weight="duotone" className="text-primary size-4" aria-hidden />
                  E-Mail
                </dt>
                <dd className="mt-1 text-[15px]">
                  <a className="text-primary font-semibold hover:underline" href={`mailto:${b.email}`}>
                    {b.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
        {shot && (
          <Reveal delay={0.08}>
            <div className="border-border aspect-4/5 overflow-hidden rounded-[var(--radius)] border">
              <img src={shot} alt={b.name} loading="lazy" decoding="async" className="size-full object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export function Footer({ b }: { b: Business }) {
  const de = b.lang === 'de'
  return (
    <footer className="border-border bg-card border-t">
      <div className={`${WRAP} py-10`}>
        {b.demo && (
          <div className="border-border mb-8 rounded-[var(--radius)] border border-dashed p-4">
            <p className="text-muted-foreground text-[13px] leading-relaxed">
              <strong className="text-foreground font-semibold">{de ? 'Demoprojekt.' : 'Demo project.'}</strong>{' '}
              {de
                ? `${b.name} ist ein erfundener Musterbetrieb. Diese Seite dient als Arbeitsprobe. Adresse, Telefonnummer und Preise sind nicht echt.`
                : `${b.name} is an invented sample business. This page is a work sample. The address, phone number and prices are not real.`}
            </p>
          </div>
        )}
        <div className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {b.name}, {b.address.city}</p>
          {b.country === 'de' ? (
            <p className="flex gap-5">
              <a className="hover:text-foreground transition-colors" href="impressum.html">Impressum</a>
              <a className="hover:text-foreground transition-colors" href="datenschutz.html">Datenschutz</a>
            </p>
          ) : (
            <p>
              <a className="hover:text-foreground transition-colors" href="privacy.html">Privacy</a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

export const ICONS = { CaretRight, CheckCircle, Wrench }
export type SectionProps = { b: Business; title: string; lead?: string; children?: ReactNode }
