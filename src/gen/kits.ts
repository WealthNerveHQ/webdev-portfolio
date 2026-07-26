/**
 * Brand kits.
 *
 * The point of this file is that a generated site should look like *that*
 * business, not like a recoloured template. So a kit is a complete design
 * system - ground, ink, accent, type pairing, radius scale, border weight -
 * not a colour swap. Two businesses in the same trade on different kits should
 * not read as related, and that is checked explicitly in scripts/kit-proof.mjs.
 *
 * Kits are picked to suit the trade and character, never at random.
 *
 * Fonts are declared per kit and emitted per site, so a site downloads only the
 * two families it actually uses. Importing all of them globally would put a
 * dozen woff2 files on every page and wreck LCP.
 *
 * Palette families are drawn from the approved list: no beige+brass premium
 * default, no Fraunces or Instrument Serif, no AI purple.
 */

export type KitName =
  | 'paper-cobalt'
  | 'forest-amber'
  | 'black-tan'
  | 'terracotta-slate'
  | 'olive-brick'
  | 'cold-chrome'

export interface Kit {
  /** Fontsource packages to import in this site's theme.css */
  fonts: string[]
  display: string
  sans: string
  /** Light-mode tokens. */
  light: Record<string, string>
  /** Dark-mode overrides. Omit to lock the site to one theme. */
  dark?: Record<string, string>
  radius: string
  /** Roughly what this kit feels like, so trade matching is a decision, not a vibe. */
  suits: string
}

export const KITS: Record<KitName, Kit> = {
  // Proven on Kesselstrom Elektrotechnik.
  'paper-cobalt': {
    fonts: ['@fontsource-variable/archivo', '@fontsource-variable/geist'],
    display: "'Archivo Variable'",
    sans: "'Geist Variable'",
    radius: '0.25rem',
    suits: 'technical trades, engineering, anything precise and unfussy',
    light: {
      background: '#f1f1ee', foreground: '#15171a', card: '#ffffff',
      primary: '#1b3ce8', 'primary-foreground': '#ffffff',
      muted: '#e6e6e1', 'muted-foreground': '#5c6168', border: '#d9d9d3',
    },
    dark: {
      background: '#101214', foreground: '#ecece7', card: '#191c1f',
      primary: '#6d8bff', 'primary-foreground': '#0d0f11',
      muted: '#22262a', 'muted-foreground': '#9aa0a7', border: '#2b2f34',
    },
  },

  // Proven on Roestwerk Sued. Dark-locked on purpose: the brand is a dark room.
  'forest-amber': {
    fonts: ['@fontsource-variable/bricolage-grotesque', '@fontsource-variable/karla'],
    display: "'Bricolage Grotesque Variable'",
    sans: "'Karla Variable'",
    radius: '0.75rem',
    suits: 'roasteries, bars, butchers, anything warm and craft-led',
    light: {
      background: '#141e18', foreground: '#e9e7df', card: '#1c2a22',
      primary: '#e3a445', 'primary-foreground': '#141e18',
      muted: '#24362c', 'muted-foreground': '#a8b0a8', border: '#2c4034',
    },
  },

  'black-tan': {
    fonts: ['@fontsource-variable/outfit', '@fontsource-variable/manrope'],
    display: "'Outfit Variable'",
    sans: "'Manrope Variable'",
    radius: '0.125rem',
    suits: 'barbers, tattoo studios, gyms, menswear. Sharp and high contrast',
    light: {
      background: '#faf8f5', foreground: '#141210', card: '#ffffff',
      primary: '#8a5a2b', 'primary-foreground': '#ffffff',
      muted: '#eeeae4', 'muted-foreground': '#5d554c', border: '#ddd6cc',
    },
    dark: {
      background: '#100f0e', foreground: '#f2ece4', card: '#1a1815',
      primary: '#d19a5e', 'primary-foreground': '#100f0e',
      muted: '#26221e', 'muted-foreground': '#a29889', border: '#302b25',
    },
  },

  'terracotta-slate': {
    fonts: ['@fontsource-variable/sora', '@fontsource-variable/manrope'],
    display: "'Sora Variable'",
    sans: "'Manrope Variable'",
    radius: '1rem',
    suits: 'landscapers, potters, bakeries, wellness. Warm rust against cool grey',
    light: {
      background: '#f4f4f5', foreground: '#1c2024', card: '#ffffff',
      primary: '#c1502e', 'primary-foreground': '#ffffff',
      muted: '#e6e7e9', 'muted-foreground': '#5b6167', border: '#d6d8db',
    },
    dark: {
      background: '#131619', foreground: '#e9eaec', card: '#1c2024',
      primary: '#e0764f', 'primary-foreground': '#131619',
      muted: '#252a2f', 'muted-foreground': '#9aa1a8', border: '#2e343a',
    },
  },

  'olive-brick': {
    fonts: ['@fontsource-variable/epilogue', '@fontsource-variable/karla'],
    display: "'Epilogue Variable'",
    sans: "'Karla Variable'",
    radius: '0.5rem',
    suits: 'farm shops, garden centres, delis, veterinary. Muted olive plus brick',
    light: {
      background: '#f5f5f0', foreground: '#1e2018', card: '#ffffff',
      primary: '#9c3a24', 'primary-foreground': '#ffffff',
      muted: '#e6e7dd', 'muted-foreground': '#5a5f4e', border: '#d5d7c8',
    },
    dark: {
      background: '#14160f', foreground: '#eceade', card: '#1d2016',
      primary: '#cd6446', 'primary-foreground': '#14160f',
      muted: '#262a1d', 'muted-foreground': '#9aa088', border: '#2f3423',
    },
  },

  'cold-chrome': {
    fonts: ['@fontsource-variable/chivo', '@fontsource-variable/geist'],
    display: "'Chivo Variable'",
    sans: "'Geist Variable'",
    radius: '0rem',
    suits: 'auto repair, machining, IT, security. Silver, smoke, no warmth',
    light: {
      background: '#eeeff1', foreground: '#0f1113', card: '#ffffff',
      primary: '#0f1113', 'primary-foreground': '#ffffff',
      muted: '#dfe1e4', 'muted-foreground': '#565b61', border: '#cdd0d4',
    },
    dark: {
      background: '#0b0c0d', foreground: '#e8eaec', card: '#141618',
      primary: '#e8eaec', 'primary-foreground': '#0b0c0d',
      muted: '#1d2022', 'muted-foreground': '#8f959b', border: '#26292c',
    },
  },
}

const block = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join('\n')

/**
 * Emit a concrete theme.css for one site. Written to disk by new-site.mjs so the
 * bundle carries only this kit's two font families.
 */
export function renderTheme(name: KitName): string {
  const kit = KITS[name]
  return `@import '../../index.css';
@source '../../gen';

/* Kit: ${name} - ${kit.suits}
   Self-hosted fonts. No Google Fonts CDN: LG Muenchen I (3 O 17493/20) held that
   embedding it transmits visitor IPs without consent, a DSGVO breach. Also just
   faster. */
${kit.fonts.map((f) => `@import '${f}';`).join('\n')}

@layer base {
  :root {
    --radius: ${kit.radius};
${block(kit.light)}
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--foreground);
    --secondary: var(--muted);
    --secondary-foreground: var(--foreground);
    --accent: var(--muted);
    --accent-foreground: var(--foreground);
    --input: var(--border);
    --ring: var(--primary);
  }
${
  kit.dark
    ? `
  @media (prefers-color-scheme: dark) {
    :root {
${block(kit.dark)}
      --card-foreground: var(--foreground);
      --popover: var(--card);
      --secondary: var(--muted);
      --accent: var(--muted);
      --input: var(--border);
    }
  }`
    : `
  html { color-scheme: dark; }`
}
}

@theme inline {
  --font-display: ${kit.display}, ui-sans-serif, system-ui, sans-serif;
  --font-sans: ${kit.sans}, ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  body {
    font-family: var(--font-sans);
    font-synthesis-weight: none;
  }
  ::selection {
    background: var(--primary);
    color: var(--primary-foreground);
  }
  :where(section[id]) {
    scroll-margin-top: 5.5rem;
  }
}
`
}
