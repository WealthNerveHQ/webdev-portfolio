import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  size?: 'sm' | 'default' | 'lg'
}

/**
 * The hero-08 registry entry references this helper but does not ship it.
 * Kept deliberately thin: it is a Button that renders as a link when given one.
 */
export function Cta({ cta, invert }: Readonly<{ cta: CtaProps; invert?: boolean }>) {
  // h-11 rather than shadcn's default h-9: 44px is the minimum comfortable tap target.
  const className = cn(
    'h-11 px-5 font-semibold',
    invert && 'bg-white text-neutral-950 hover:bg-white/90',
  )

  if (!cta.link) {
    return (
      <Button size={cta.size ?? 'default'} className={className}>
        {cta.text}
      </Button>
    )
  }

  return (
    <Button asChild size={cta.size ?? 'default'} className={className}>
      <a href={cta.link}>{cta.text}</a>
    </Button>
  )
}
