import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: 'default' | 'link' | 'outline' | 'secondary' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
}

/** The hero-07 registry entry references this helper but does not ship it. */
export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  const isLink = cta.variant === 'link'
  const className = cn('font-semibold', !isLink && 'h-11 px-6')

  if (!cta.link) {
    return (
      <Button variant={cta.variant ?? 'default'} size={cta.size ?? 'default'} className={className}>
        {cta.text}
      </Button>
    )
  }

  return (
    <Button asChild variant={cta.variant ?? 'default'} size={cta.size ?? 'default'} className={className}>
      <a href={cta.link}>{cta.text}</a>
    </Button>
  )
}
