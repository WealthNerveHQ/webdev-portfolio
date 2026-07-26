/**
 * Downloads real, subject-relevant photos from Pexels into public/<site>/.
 *
 * Why this exists: site 1 shipped with picsum.photos placeholders, which serve random
 * unrelated images (the coffee roastery hero was a sunset silhouette). Portfolio sites
 * are the product here, so the photography has to actually be of the subject.
 *
 * Key is read from the existing social-media config. It is never printed or committed.
 * Run: node scripts/fetch-photos.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONFIG = 'D:/munth/.claude/social-media/config/settings.json'

const KEY = process.env.PEXELS_API_KEY || JSON.parse(readFileSync(CONFIG, 'utf8')).pexels_api_key
if (!KEY) throw new Error('No Pexels API key found')

/** Each entry: the query Pexels sees, and the file it lands in. */
const WANTED = [
  // Kesselstrom — Elektrotechnik
  { site: 'kesselstrom', file: 'notdienst.jpg', q: 'electrician working electrical panel', w: 1200, orientation: 'landscape' },
  { site: 'kesselstrom', file: 'wallbox.jpg', q: 'electric car charging station home wallbox', w: 1200, orientation: 'landscape' },
  { site: 'kesselstrom', file: 'installation.jpg', q: 'electrician installing wiring wall', w: 1200, orientation: 'landscape' },
  { site: 'kesselstrom', file: 'zaehlerschrank.jpg', q: 'electrical fuse box distribution board', w: 900, orientation: 'portrait' },
  { site: 'kesselstrom', file: 'team.jpg', q: 'electrician portrait tools workshop', w: 900, orientation: 'portrait' },
  // Röstwerk — Kaffeerösterei
  { site: 'roestwerk', file: 'roester.jpg', q: 'coffee roaster machine roasting beans', w: 900, orientation: 'portrait' },
  { site: 'roestwerk', file: 'espresso.jpg', q: 'espresso portafilter extraction cafe', w: 1200, orientation: 'landscape' },
  { site: 'roestwerk', file: 'tresen.jpg', q: 'coffee shop counter interior barista', w: 900, orientation: 'portrait' },
  { site: 'roestwerk', file: 'bohnen.jpg', q: 'roasted coffee beans close up', w: 1200, orientation: 'landscape' },
  { site: 'roestwerk', file: 'tueten.jpg', q: 'coffee bag packaging kraft paper', w: 1200, orientation: 'landscape' },
  { site: 'roestwerk', file: 'farm.jpg', q: 'coffee plantation farm green cherries', w: 1200, orientation: 'landscape' },
  { site: 'roestwerk', file: 'ernte.jpg', q: 'coffee cherries harvest hands farmer', w: 900, orientation: 'landscape' },
  { site: 'roestwerk', file: 'trocknung.jpg', q: 'coffee beans drying raised beds', w: 900, orientation: 'landscape' },
  { site: 'roestwerk', file: 'werkstatt.jpg', q: 'coffee roastery interior roasting machine', w: 1200, orientation: 'landscape' },
]

/**
 * Generated sites pass --site and --trade instead of using the hand-built list
 * above, so their photo queries come from the trade scaffold.
 */
async function wantedFor(site, tradeName) {
  const { TRADES } = await import('../src/gen/trades.ts')
  const trade = TRADES[tradeName]
  if (!trade) throw new Error(`Unknown trade "${tradeName}"`)
  return Object.entries(trade.photos).map(([key, q], i) => ({
    site,
    file: `${key}.jpg`,
    q,
    w: i === 0 ? 1200 : 900,
    orientation: 'landscape',
    // Without this every site in a trade gets the same top result, and two
    // roofing sites sharing identical photography reads as a template even when
    // the palette and layout differ.
    //
    // Uses the sibling index rather than a hash of the slug: a hash over a small
    // page range collides, and the first two roofers duly landed on the same page.
    page: siteIndex(site, tradeName),
  }))
}

/** 1-based position of this site among same-trade siblings, so pages never collide. */
function siteIndex(site, tradeName) {
  const dir = join(ROOT, 'businesses')
  if (!existsSync(dir)) return 1
  const peers = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
    .filter((b) => b.trade === tradeName)
    .map((b) => b.slug)
    .sort()
  const i = peers.indexOf(site)
  return i === -1 ? 1 : i + 1
}

const siteArg = process.argv[process.argv.indexOf('--site') + 1]
const tradeArg = process.argv[process.argv.indexOf('--trade') + 1]
const jobs =
  process.argv.includes('--site') && process.argv.includes('--trade')
    ? await wantedFor(siteArg, tradeArg)
    : WANTED

const credits = []

for (const item of jobs) {
  const outDir = join(ROOT, 'public', item.site)
  mkdirSync(outDir, { recursive: true })
  const outFile = join(outDir, item.file)
  if (existsSync(outFile)) {
    console.log(`skip   ${item.site}/${item.file} (exists)`)
    continue
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(item.q)}&per_page=1&page=${item.page ?? 1}&orientation=${item.orientation}`
  const res = await fetch(url, { headers: { Authorization: KEY } })
  if (!res.ok) throw new Error(`Pexels search failed ${res.status} for "${item.q}"`)
  const data = await res.json()
  const photo = data.photos?.[0]
  if (!photo) {
    console.error(`MISS   no result for "${item.q}"`)
    continue
  }

  // Pexels returns a sized CDN url; ask for the width we actually render.
  const src = `${photo.src.original}?auto=compress&cs=tinysrgb&w=${item.w}`
  const img = await fetch(src)
  if (!img.ok) throw new Error(`Download failed ${img.status} for ${item.file}`)
  writeFileSync(outFile, Buffer.from(await img.arrayBuffer()))

  credits.push({
    file: `${item.site}/${item.file}`,
    photographer: photo.photographer,
    url: photo.url,
    alt: photo.alt,
  })
  console.log(`ok     ${item.site}/${item.file}  <- ${photo.photographer}`)
}

if (credits.length) {
  const path = join(ROOT, 'PHOTO-CREDITS.md')
  const existing = existsSync(path) ? readFileSync(path, 'utf8') : '# Photo credits\n\nAll photos from Pexels (free to use, no attribution required — credited anyway).\n\n'
  const rows = credits
    .map((c) => `- \`${c.file}\` — ${c.photographer}, [Pexels](${c.url})`)
    .join('\n')
  writeFileSync(path, existing + rows + '\n')
  console.log(`\nWrote ${credits.length} credits to PHOTO-CREDITS.md`)
}
