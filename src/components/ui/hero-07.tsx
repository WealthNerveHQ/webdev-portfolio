'use client'

/**
 * Adapted from "Editorial Image Hero" (hero-07) by felipemenezes098 on 21st.dev.
 * https://21st.dev/@felipemenezes098/components/hero-07
 *
 * Changes made for this project:
 *  - `font-serif` headline -> `font-display`, so the site drives its own typeface.
 *  - Dropped react-wrap-balancer in favour of native CSS `text-wrap: balance`.
 *  - Capped the media band height. At full 9/4 the image eats the viewport and
 *    pushes the headline and CTAs below the fold.
 *  - Entrance runs on mount rather than whileInView: this is the top of the page,
 *    so there is no scroll event to wait for.
 */

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { cn } from '@/lib/utils'
import { Cta, type CtaProps } from '@/components/ui/hero-07-utils/cta'

export interface Hero07Props {
  tagline: string
  title: React.ReactNode
  description: string
  landscapeImage: string
  landscapeAlt?: string
  animation?: 'none' | 'subtle'
  primaryCTA?: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    copy: 'pb-20 pt-10 sm:pb-24 sm:pt-12',
    tagline: 'text-sm sm:text-base',
    title: 'text-[clamp(2.1rem,4.4vw,3.4rem)]',
    description: 'text-sm sm:text-base',
    header: 'gap-6 sm:gap-7',
    grid: 'gap-10',
    media: 'max-h-[46vh]',
  },
  compact: {
    copy: 'pb-14 pt-8 sm:pb-16 sm:pt-10',
    tagline: 'text-sm',
    title: 'text-[clamp(1.85rem,3.6vw,2.75rem)]',
    description: 'text-sm',
    header: 'gap-4 sm:gap-5',
    grid: 'gap-8',
    media: 'max-h-[38vh]',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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

export function Hero07({
  tagline,
  title,
  description,
  landscapeImage,
  landscapeAlt = '',
  animation = 'none',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
}: Readonly<Hero07Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  return (
    <motion.section
      className="bg-background relative isolate w-full overflow-hidden"
      variants={animate ? container : undefined}
      initial={animate ? 'hidden' : false}
      animate={animate ? 'visible' : undefined}
    >
      <Reveal active={animate} variants={mediaItem} className="w-full">
        <div className="relative w-full overflow-hidden mask-b-from-85% mask-b-to-100%">
          <img
            src={landscapeImage}
            alt={landscapeAlt}
            decoding="async"
            fetchPriority="high"
            className={cn(
              'aspect-2/1 w-full object-cover object-center sm:aspect-9/4',
              vs.media,
            )}
          />
        </div>
      </Reveal>

      <div
        className={cn(
          'relative z-10 mx-auto grid max-w-6xl grid-cols-1 px-6 lg:grid-cols-12',
          vs.copy,
          vs.grid,
        )}
      >
        <Reveal active={animate} className="flex lg:col-span-4 lg:col-start-1 lg:items-start">
          <p className={cn('text-muted-foreground max-w-xs leading-relaxed text-pretty', vs.tagline)}>
            {tagline}
          </p>
        </Reveal>

        <Reveal
          active={animate}
          className={cn('flex flex-col items-start lg:col-span-7 lg:col-start-6', vs.header)}
        >
          <h1
            className={cn(
              'text-foreground font-display leading-[1.02] font-extrabold tracking-[-0.03em] text-balance',
              vs.title,
            )}
          >
            {title}
          </h1>
          <p className={cn('text-muted-foreground max-w-xl leading-relaxed text-pretty', vs.description)}>
            {description}
          </p>
          {(primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
              {secondaryCTA?.ctaEnabled && (
                <Cta cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }} />
              )}
            </div>
          )}
        </Reveal>
      </div>
    </motion.section>
  )
}

export default Hero07
