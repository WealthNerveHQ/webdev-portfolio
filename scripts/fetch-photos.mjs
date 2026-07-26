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
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
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

const credits = []

for (const item of WANTED) {
  const outDir = join(ROOT, 'public', item.site)
  mkdirSync(outDir, { recursive: true })
  const outFile = join(outDir, item.file)
  if (existsSync(outFile)) {
    console.log(`skip   ${item.site}/${item.file} (exists)`)
    continue
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(item.q)}&per_page=1&orientation=${item.orientation}`
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
