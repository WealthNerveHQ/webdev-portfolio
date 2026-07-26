'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll-entrance for section content. Motivation: it establishes reading order
 * on a long page, so the eye lands on the heading before the supporting detail.
 * Collapses to static under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: Readonly<{ children: ReactNode; delay?: number; className?: string }>) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
