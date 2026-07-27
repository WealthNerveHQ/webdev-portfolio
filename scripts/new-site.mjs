/**
 * Scaffolds a complete site for one business.
 *
 *   node scripts/new-site.mjs --slug apex-roofing --trade roofer \
 *     --name "Apex Roofing" --city "Austin" --phone "+15125550142" --demo
 *
 * Produces:
 *   businesses/<slug>.json     the only file you edit afterwards
 *   src/sites/<slug>/theme.css kit tokens plus that kit's two fonts, nothing else
 *   src/sites/<slug>/main.tsx  entry
 *   <slug>/index.html          Vite entry, auto-registered in vite.config.ts
 *   public/<slug>/*.jpg        photos pulled per trade
 *
 * Kit selection is deliberate, not random: it takes the first kit suited to the
 * trade that no existing site of that trade is already using, so a second roofer
 * never comes out looking like the first.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
const flag = (name) => process.argv.includes(`--${name}`)

/**
 * Pick an option this trade offers that no sibling site already uses.
 * Applied to both the kit and the structural variant, because a different
 * palette on an identical skeleton is still a recoloured template.
 */
export function pickUnused(options, used) {
  const free = options.findIndex((o) => !used.includes(JSON.stringify(o)))
  return free === -1 ? options[0] : options[free]
}

/**
 * Human-readable phone label. The raw E.164 number is right for the tel: href but
 * wrong on the page: nobody writes their number as +15125550142.
 */
export function formatPhone(raw, country) {
  const d = String(raw).replace(/[^\d]/g, '')
  if (country === 'us' && d.length === 11 && d.startsWith('1')) {
    return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
  }
  if (country === 'uk' && d.length === 12 && d.startsWith('44')) {
    return `0${d.slice(2, 6)} ${d.slice(6)}`
  }
  if (country === 'de' && d.startsWith('49')) {
    return `0${d.slice(2, 5)} ${d.slice(5)}`
  }
  return raw
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  // Node 24 strips types on import, so the TS definitions are read directly.
  // No JSON sidecar to drift out of sync with them.
  const { TRADES } = await import('../src/gen/trades.ts')
  const { renderTheme, KITS } = await import('../src/gen/kits.ts')

  const tradeName = arg('trade')
  const trade = TRADES[tradeName]
  if (!trade) {
    console.error(`Unknown trade "${tradeName}". Known: ${Object.keys(TRADES).join(', ')}`)
    process.exit(1)
  }

  const name = arg('name') || 'Example Business'
  const slug = arg('slug') || slugify(name)
  const city = arg('city') || 'Austin'
  const country = arg('country') || 'us'
  const lang = arg('lang') || (country === 'de' ? 'de' : 'en')
  const phone = arg('phone') || '+15125550000'
  const demo = flag('demo')

  // What are the other sites in this trade already using?
  const bizDir = join(ROOT, 'businesses')
  mkdirSync(bizDir, { recursive: true })
  const siblings = readdirSync(bizDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(bizDir, f), 'utf8')))
    .filter((b) => b.trade === tradeName && b.slug !== slug)
  const usedKits = siblings.map((b) => JSON.stringify(b.kit))
  const usedVariants = siblings.map((b) => JSON.stringify(b.sections))

  const kit = arg('kit') || pickUnused(trade.kits, usedKits)
  const sections = pickUnused(trade.variants, usedVariants)

  const photos = Object.fromEntries(
    Object.keys(trade.photos).map((k) => [k, `/webdev-portfolio/${slug}/${k}.jpg`]),
  )

  const business = {
    slug,
    name,
    trade: tradeName,
    lang,
    country,
    kit,
    sections,
    eyebrow: `${trade.label} in ${city}`,
    headline: `${trade.label} in ${city}, done properly.`,
    subline: 'Replace this line with what this business actually promises. Twenty words maximum.',
    phone,
    phoneLabel: formatPhone(phone, country),
    address: { street: '1 Example Street', city },
    hours: [
      { day: 'Mon to Fri', time: '8:00 to 17:00' },
      { day: 'Sat', time: '9:00 to 13:00' },
      { day: 'Sun', time: 'closed' },
    ],
    services: trade.services,
    usps: trade.usps,
    process: trade.process ?? null,
    faq: trade.faq ?? null,
    quote: null,
    cta: {
      primary: { label: lang === 'de' ? 'Anrufen' : 'Call now', href: `tel:${phone}` },
      secondary: { label: lang === 'de' ? 'Kontakt' : 'Get a quote', href: '#kontakt' },
    },
    band: trade.band ?? null,
    photos,
    demo,
    meta: {
      title: `${name} - ${trade.label} in ${city}`,
      description: `${trade.label} in ${city}. ${trade.services.slice(0, 3).map((s) => s.title).join(', ')}.`,
    },
  }

  writeFileSync(join(bizDir, `${slug}.json`), JSON.stringify(business, null, 2) + '\n', 'utf8')

  if (!KITS[kit]) {
    console.error(`Kit "${kit}" is not defined. Known: ${Object.keys(KITS).join(', ')}`)
    process.exit(1)
  }

  const siteDir = join(ROOT, 'src/sites', slug)
  mkdirSync(siteDir, { recursive: true })

  // theme.css is emitted rather than imported so the bundle carries only this
  // kit's two font families instead of all twelve.
  writeFileSync(join(siteDir, 'theme.css'), renderTheme(kit), 'utf8')

  writeFileSync(
    join(siteDir, 'main.tsx'),
    `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme.css'
import Site from '@/gen/Site'
import business from '../../../businesses/${slug}.json'
import type { Business } from '@/gen/types'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Site b={business as Business} />
  </StrictMode>,
)
`,
    'utf8',
  )

  const htmlDir = join(ROOT, slug)
  mkdirSync(htmlDir, { recursive: true })
  writeFileSync(
    join(htmlDir, 'index.html'),
    `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- noindex until the business has actually agreed to buy it. A spec site
         carrying a real company's name should not compete with, or be mistaken
         for, their own presence in search. Remove this line on handover. -->
    <meta name="robots" content="noindex" />
    <title>${business.meta.title}</title>
    <meta name="description" content="${business.meta.description}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/sites/${slug}/main.tsx"></script>
  </body>
</html>
`,
    'utf8',
  )

  // Register the entry so `npm run build` picks it up.
  const cfgPath = join(ROOT, 'vite.config.ts')
  let cfg = readFileSync(cfgPath, 'utf8')
  const key = slug.replace(/-(.)/g, (_, c) => c.toUpperCase())
  if (!cfg.includes(`'${slug}/index.html'`)) {
    cfg = cfg.replace(
      /(\n\s*\},\n\s*\},\n\s*\},\n\}\))/,
      `\n        ${key}: path.resolve(__dirname, '${slug}/index.html'),$1`,
    )
    writeFileSync(cfgPath, cfg, 'utf8')
  }

  const differs = siblings.length ? `  (differs from the other ${tradeName} site${siblings.length > 1 ? 's' : ''})` : ''
  console.log(`\nScaffolded ${slug}`)
  console.log(`  kit        ${kit}${arg('kit') ? '' : differs}`)
  console.log(`  sections   ${sections.join(' -> ')}${differs}`)
  console.log(`  edit       businesses/${slug}.json`)
  console.log(`  photos     node scripts/fetch-photos.mjs --site ${slug} --trade ${tradeName}`)
}

function selftest() {
  let failed = 0
  const ok = (l, c) => { if (!c) { failed++; console.error(`FAIL  ${l}`) } else console.log(`pass  ${l}`) }

  ok('slugify handles spaces and case', slugify('Apex Roofing Co') === 'apex-roofing-co')
  ok('slugify strips accents', slugify('Müller Bau') === 'muller-bau')
  ok('slugify trims separators', slugify('  --Apex--  ') === 'apex')

  // The whole promise of the generator: a second site in a trade must not reuse
  // the first one's kit OR its structure, or every client site looks the same.
  const q = (v) => JSON.stringify(v)
  ok('picks an unused kit', pickUnused(['a', 'b', 'c'], [q('a')]) === 'b')
  ok('picks the second unused kit', pickUnused(['a', 'b', 'c'], [q('a'), q('b')]) === 'c')
  ok('falls back when all are used', pickUnused(['a', 'b'], [q('a'), q('b')]) === 'a')
  ok('first site gets the primary kit', pickUnused(['a', 'b'], []) === 'a')

  const variants = [['heroSplit', 'faq'], ['heroBand', 'gallery']]
  ok('a second site gets a different structure',
    q(pickUnused(variants, [q(variants[0])])) === q(variants[1]))

  ok('US phone is formatted', formatPhone('+15125550142', 'us') === '(512) 555-0142')
  ok('UK phone is formatted', formatPhone('+441174960123', 'uk') === '01174 960123')
  ok('unknown formats pass through', formatPhone('12345', 'us') === '12345')

  console.log(failed === 0 ? '\nselftest ok' : `\nSELFTEST FAILED: ${failed}`)
  process.exit(failed === 0 ? 0 : 1)
}

if (process.argv.includes('--selftest')) selftest()
else await main()
