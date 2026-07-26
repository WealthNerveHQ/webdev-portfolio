'use client'

/**
 * Adapted from "Split Hero With Image Cards" (hero-08) by felipemenezes098 on 21st.dev.
 * https://21st.dev/@felipemenezes098/components/hero-08
 *
 * Changes made for this project:
 *  - `font-serif` headline -> `font-display`, so each site drives its own typeface.
 *  - Dropped react-wrap-balancer in favour of native CSS `text-wrap: balance`.
 *  - Replaced the avatar social-proof row with a credential row. Stock avatar faces
 *    presented as customers of a real trade business would be a fabricated trust signal.
 */

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { cn } from '@/lib/utils'
import { Cta, type CtaProps } from '@/components/ui/hero-08-utils/cta'

export interface Hero08Credential {
  label: string
  icon?: React.ReactNode
}

export interface Hero08Card {
  title: string
  subtitle: string
  image: string
  imageAlt?: string
  width?: number
  height?: number
  priority?: boolean
  invert?: boolean
  cta: CtaProps
}

export interface Hero08Props {
  eyebrow?: string
  title: string
  description: string
  socialProof?: string
  credentials?: Hero08Credential[]
  cards: Hero08Card[]
  animation?: 'none' | 'subtle'
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'pt-10 pb-16 sm:pt-14 sm:pb-20',
    title: 'text-[clamp(2rem,4vw,3.15rem)]',
    description: 'text-base sm:text-lg',
    header: 'gap-10 lg:gap-16',
    content: 'gap-12 sm:gap-16',
    grid: 'gap-5 sm:gap-6',
    card: 'aspect-16/10',
    cardTitle: 'text-2xl sm:text-3xl',
    cardBody: 'p-6 sm:p-8',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-[clamp(1.85rem,4.4vw,3rem)]',
    description: 'text-sm sm:text-base',
    header: 'gap-8 lg:gap-12',
    content: 'gap-10 sm:gap-12',
    grid: 'gap-4 sm:gap-5',
    card: 'aspect-16/11',
    cardTitle: 'text-xl sm:text-2xl',
    cardBody: 'p-5 sm:p-6',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

function FeatureCard({
  card,
  vs,
}: Readonly<{ card: Hero08Card; vs: (typeof variantStyles)[keyof typeof variantStyles] }>) {
  const titleClass = card.invert ? 'text-white' : 'text-foreground'
  const subtitleClass = card.invert ? 'text-white/85' : 'text-muted-foreground'

  return (
    <div
      className={cn(
        'relative isolate w-full overflow-hidden rounded-sm outline outline-black/10',
        vs.card,
      )}
    >
      {card.image && (
        <img
          src={card.image}
          alt={card.imageAlt ?? ''}
          width={card.width}
          height={card.height}
          decoding="async"
          loading={card.priority ? 'eager' : 'lazy'}
          fetchPriority={card.priority ? 'high' : undefined}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      )}

      {card.invert && (
        <div
          aria-hidden
          /* Scrim runs bottom-up because the card text sits at the bottom.
             Guarantees WCAG AA on the white label regardless of the photo. */
          className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/50 to-black/10"
        />
      )}

      <div className={cn('flex h-full flex-col items-start justify-end', vs.cardBody)}>
        {/* h2, not h3: these sit directly under the page h1 with no section
            heading between them, so h3 would skip a level for screen readers. */}
        <h2
          className={cn(
            'font-display font-semibold tracking-tight text-balance',
            vs.cardTitle,
            titleClass,
          )}
        >
          {card.title}
        </h2>
        <p className={cn('mt-1.5 text-sm', subtitleClass)}>{card.subtitle}</p>
        {card.cta?.ctaEnabled && (
          <div className="mt-5">
            <Cta cta={card.cta} invert={card.invert} />
          </div>
        )}
      </div>
    </div>
  )
}

export function Hero08({
  eyebrow,
  title,
  description,
  socialProof,
  credentials,
  cards,
  animation = 'none',
  variant = 'standard',
}: Readonly<Hero08Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  return (
    <section className="bg-background relative isolate w-full overflow-hidden">
      <motion.div
        className={cn(
          'relative z-10 mx-auto flex max-w-6xl flex-col px-6',
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
      >
        <Reveal
          active={animate}
          className={cn('grid grid-cols-1 items-end lg:grid-cols-2', vs.header)}
        >
          <div>
            {eyebrow && (
              <p className="text-primary mb-5 text-sm font-semibold tracking-[0.14em] uppercase">
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                'text-foreground font-display leading-[0.95] font-extrabold tracking-[-0.03em] text-balance',
                vs.title,
              )}
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className={cn('text-muted-foreground max-w-md text-pretty', vs.description)}>
              {description}
            </p>
            {(socialProof || credentials?.length) && (
              <div className="flex flex-col items-start gap-3">
                {socialProof && (
                  <p className="text-foreground text-sm font-semibold">{socialProof}</p>
                )}
                {credentials?.length ? (
                  <ul className="flex flex-wrap gap-x-2 gap-y-2">
                    {credentials.map((c) => (
                      <li
                        key={c.label}
                        className="border-border text-foreground/85 flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                      >
                        {c.icon}
                        {c.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full">
          {cards?.length ? (
            <div className={cn('grid grid-cols-1 md:grid-cols-2', vs.grid)}>
              {cards.map((card) => (
                <FeatureCard key={card.title} card={card} vs={vs} />
              ))}
            </div>
          ) : null}
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero08
