/**
 * Finds local businesses that appear to have NO website.
 *
 * Uses the OpenStreetMap Overpass API: free, no key, no billing, no ToS problem.
 * Google Places would also work but needs a billing account, and scraping Maps
 * directly breaks Google's terms.
 *
 * Two things learned the hard way, both encoded below:
 *  1. Overpass answers 406 Not Acceptable if you send no real User-Agent. Node's
 *     bare `fetch` surfaces that as an unhelpful "fetch failed".
 *  2. A missing `website` tag in OSM means "OSM does not know of a website", NOT
 *     "this business has none". OSM is volunteer-maintained and patchy, so every
 *     candidate goes through a verification pass before it reaches the list.
 *     Contacting someone who already has a site wastes the one good hook we have.
 *
 *   node scripts/prospects.mjs --city Stuttgart
 *   node scripts/prospects.mjs --city Austin --city "San Antonio" --country us
 *   node scripts/prospects.mjs --city Bristol --country uk --limit 40
 *   node scripts/prospects.mjs --selftest
 *
 * Output: prospects/<country>-<city>.md (gitignored, holds real business details).
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENDPOINT = 'https://overpass-api.de/api/interpreter'
const UA = 'webdev-portfolio-prospects/1.0 (montherdigital@gmail.com)'

/** Trades and food businesses: the segments most likely to want a phone to ring. */
const WANTED = `
  nwr["craft"](area.a);
  nwr["shop"~"^(bakery|butcher|florist|hairdresser|beauty|optician|car_repair|bicycle|shoes|tailor|jewelry|furniture|garden_centre)$"](area.a);
  nwr["amenity"~"^(restaurant|cafe|bar|fast_food|driving_school|veterinary)$"](area.a);
  nwr["office"~"^(estate_agent|insurance|tax_advisor|lawyer)$"](area.a);
`

const WEBSITE_TAGS = ['website', 'contact:website', 'url', 'website:menu', 'brand:website']
const SOCIAL_TAGS = ['contact:facebook', 'contact:instagram', 'facebook', 'instagram']
const EMAIL_TAGS = ['email', 'contact:email']

const FREEMAIL = /@(gmail|googlemail|yahoo|hotmail|outlook|live|aol|gmx|web|icloud|me|mail)\./i

/**
 * UK only: PECR treats a freemail address as an individual subscriber, so cold
 * email to it needs consent even when the business uses it commercially.
 * The flag drives legality, so it is computed here rather than eyeballed later.
 */
export function classifyEmail(email) {
  if (!email) return 'none'
  return FREEMAIL.test(email) ? 'freemail' : 'domain'
}

/**
 * Chains and franchises are never prospects: corporate already owns the web
 * presence, and a franchisee cannot buy a site from us anyway. OSM marks most of
 * them with brand tags, which is more reliable than maintaining a name blocklist.
 */
export function isChain(tags) {
  return Boolean(tags.brand || tags['brand:wikidata'] || tags['operator:wikidata'])
}

/** A business is only useful to us if we can reach it and name it. */
export function scoreCandidate(tags) {
  if (!tags.name) return null
  if (WEBSITE_TAGS.some((t) => tags[t])) return null
  if (isChain(tags)) return null

  const phone = tags.phone || tags['contact:phone'] || ''
  const email = EMAIL_TAGS.map((t) => tags[t]).find(Boolean) || ''
  const street = tags['addr:street']
  const housenumber = tags['addr:housenumber']
  const hasSocial = SOCIAL_TAGS.some((t) => tags[t])

  let score = 0
  const why = []
  if (phone) { score += 3; why.push('phone known') }
  if (email) { score += 3; why.push('email known') }
  if (street && housenumber) { score += 2; why.push('full address') }
  if (tags.craft) { score += 2; why.push('trade business') }
  if (tags.opening_hours) { score += 1; why.push('hours maintained') }
  // Social presence but no site is the strongest signal: they clearly want to be
  // found online and have simply never had a site built.
  if (hasSocial) { score += 3; why.push('active on social, no website') }

  return {
    name: tags.name,
    kind: tags.craft || tags.shop || tags.amenity || tags.office || '?',
    phone,
    email,
    emailKind: classifyEmail(email),
    address: street ? `${street} ${housenumber ?? ''}`.trim() : '',
    postcode: tags['addr:postcode'] || '',
    city: tags['addr:city'] || '',
    social: SOCIAL_TAGS.map((t) => tags[t]).find(Boolean) || '',
    score,
    why,
  }
}

async function overpass(query) {
  const url = `${ENDPOINT}?data=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) {
    const hint =
      res.status === 406 ? ' (Overpass rejects requests without a User-Agent)'
        : res.status === 504 ? ' (query too broad or the area name is ambiguous)'
          : ''
    throw new Error(`Overpass ${res.status}${hint}`)
  }
  return res.json()
}

/**
 * Resolve a place name to a single Overpass area id.
 *
 * Matching by name alone is what caused a 504: "Austin" is an administrative
 * boundary in Texas, Minnesota, Arkansas and elsewhere, so the query fanned out
 * across all of them. Nominatim picks one relation, which makes the query small
 * and unambiguous. Nominatim requires a User-Agent and one request per second.
 */
export function areaIdFromOsm(osmType, osmId) {
  if (osmType !== 'relation') return null // only relations become Overpass areas
  return 3600000000 + Number(osmId)
}

async function resolveArea(city, country) {
  const q = new URLSearchParams({
    q: city,
    format: 'json',
    limit: '5',
    countrycodes: country,
    featuretype: 'city',
  })
  const res = await fetch(`https://nominatim.openstreetmap.org/search?${q}`, {
    headers: { 'User-Agent': UA },
  })
  if (!res.ok) throw new Error(`Nominatim ${res.status}`)
  const hits = await res.json()
  const rel = hits.find((h) => h.osm_type === 'relation')
  if (!rel) throw new Error(`No administrative relation found for "${city}" in ${country}`)
  await new Promise((r) => setTimeout(r, 1100)) // Nominatim: 1 req/sec
  return { id: areaIdFromOsm(rel.osm_type, rel.osm_id), label: rel.display_name }
}

/**
 * Verification pass. OSM not knowing a website is weak evidence, so we probe the
 * two domains a small business most likely owns. A hit means "has a site, drop it".
 * Conservative on purpose: a probe failure never promotes a candidate, it only
 * ever removes one.
 */
export function guessDomains(name, tld) {
  const slug = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '')
  if (slug.length < 4) return []
  return [`https://${slug}.${tld}`, `https://www.${slug}.${tld}`]
}

async function hasLiveSite(name, tld) {
  for (const url of guessDomains(name, tld)) {
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 5000)
      const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow' })
      clearTimeout(t)
      if (res.ok) return url
    } catch {
      // DNS failure, timeout, TLS error: treat as no site. Never promotes a candidate.
    }
  }
  return null
}

const TLD = { de: 'de', us: 'com', uk: 'co.uk' }

async function main() {
  const args = process.argv.slice(2)
  const cities = args.reduce((acc, a, i) => (a === '--city' ? [...acc, args[i + 1]] : acc), [])
  if (!cities.length) cities.push('Stuttgart')
  const country = (args[args.indexOf('--country') + 1] || 'de').toLowerCase()
  const limit = Number(args[args.indexOf('--limit') + 1]) || 60
  const tld = TLD[country] || 'com'
  const skipVerify = args.includes('--no-verify')

  for (const city of cities) {
    console.log(`\n=== ${city} (${country}) ===`)
    const area = await resolveArea(city, country)
    console.log(`resolved to ${area.label}`)
    const query = `[out:json][timeout:90];
area(${area.id})->.a;
(${WANTED});
out center tags;`

    const data = await overpass(query)
    const total = data.elements.length
    let rows = data.elements
      .map((e) => scoreCandidate(e.tags || {}))
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit * 2)

    console.log(`${total} businesses, ${rows.length} with no website tag in OSM`)

    if (!skipVerify) {
      console.log('verifying (probing likely domains) ...')
      const kept = []
      for (const r of rows) {
        const live = await hasLiveSite(r.name, tld)
        if (live) console.log(`  drop ${r.name} -> ${live}`)
        else kept.push(r)
      }
      console.log(`${rows.length - kept.length} dropped, ${kept.length} remain`)
      rows = kept
    }

    const top = rows.slice(0, limit)
    const md = [
      `# Candidates with no website - ${city}`,
      '',
      `Generated ${new Date().toISOString().slice(0, 10)} from OpenStreetMap via Overpass.`,
      `${total} businesses queried, ${top.length} listed.`,
      '',
      '> **Every row is still unconfirmed.** A missing OSM website tag only means OSM does',
      '> not know of one, and the domain probe only catches the obvious cases. Check each',
      '> one by hand (search the name, look at the Google listing, check Facebook) before',
      '> contacting anyone.',
      '',
      country === 'uk'
        ? '> **UK, PECR:** cold email is only allowed to corporate subscribers (Ltd, LLP).\n> A `freemail` address needs prior consent. Only email rows marked `domain`.'
        : country === 'de'
          ? '> **Germany, UWG 7:** no cold email, no cold calls. Letter or in person only.'
          : '> **US, CAN-SPAM:** cold email allowed. Must carry a real postal address,\n> ad disclosure, and a working opt-out honoured within 10 business days.',
      '',
      '| # | Business | Type | Address | Phone | Email | Email kind | Score | Why |',
      '|---|---|---|---|---|---|---|---|---|',
      ...top.map((r, i) =>
        `| ${i + 1} | ${r.name} | ${r.kind} | ${[r.address, r.postcode, r.city].filter(Boolean).join(', ')} | ${r.phone} | ${r.email} | ${r.emailKind} | ${r.score} | ${r.why.join(', ')} |`,
      ),
      '',
      '## Next step',
      '',
      '1. Hand-check the top 10.',
      '2. Build a real site for the best 3 before contacting anyone.',
      '3. Reach out with a link to their finished site, using the channel legal for this country.',
    ].join('\n')

    const dir = join(ROOT, 'prospects')
    mkdirSync(dir, { recursive: true })
    const out = join(dir, `${country}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`)
    writeFileSync(out, md, 'utf8')
    console.log(`wrote ${out}`)

    if (cities.length > 1) await new Promise((r) => setTimeout(r, 3000))
  }
}

function selftest() {
  // Not console.assert: that logs and carries on, so the suite would print "ok"
  // even when a check failed. A gate that cannot fail is worse than no gate.
  let failed = 0
  const ok = (label, cond) => {
    if (!cond) { failed++; console.error(`FAIL  ${label}`) }
    else console.log(`pass  ${label}`)
  }

  ok('a business with a website is excluded',
    scoreCandidate({ name: 'A', craft: 'electrician', website: 'https://a.de' }) === null)
  ok('an unnamed business is excluded',
    scoreCandidate({ craft: 'electrician', phone: '0711' }) === null)
  ok('contact:website counts as having a website',
    scoreCandidate({ name: 'B', craft: 'plumber', 'contact:website': 'https://b.de' }) === null)

  const plain = scoreCandidate({ name: 'C', craft: 'roofer' })
  const rich = scoreCandidate({
    name: 'D', craft: 'roofer', phone: '0711 1', 'addr:street': 'Hauptstr',
    'addr:housenumber': '1', opening_hours: 'Mo-Fr 08:00-17:00', 'contact:instagram': 'x',
  })
  ok('contactable businesses outrank bare ones', rich.score > plain.score)
  ok('social signal is explained', rich.why.includes('active on social, no website'))

  // PECR: this flag decides whether a UK row may legally be emailed.
  ok('gmail is freemail', classifyEmail('bob@gmail.com') === 'freemail')
  ok('company domain is domain', classifyEmail('info@bobsroofing.co.uk') === 'domain')
  ok('no email is none', classifyEmail('') === 'none')
  ok('candidate carries the email classification',
    scoreCandidate({ name: 'E', craft: 'roofer', email: 'e@gmail.com' }).emailKind === 'freemail')

  ok('domain guess', guessDomains('Bob Roofing', 'com')[0] === 'https://bobroofing.com')
  ok('too-short names are not probed', guessDomains('AB', 'com').length === 0)
  ok('umlauts are folded', guessDomains('Müller Bau', 'de')[0] === 'https://mullerbau.de')

  ok('relation becomes an Overpass area id', areaIdFromOsm('relation', 113314) === 3600113314)
  ok('a node is not a usable area', areaIdFromOsm('node', 123) === null)

  ok('branded chains are excluded',
    scoreCandidate({ name: 'Papa Murphy', amenity: 'fast_food', brand: 'Papa Murphy' }) === null)
  ok('wikidata-branded chains are excluded',
    scoreCandidate({ name: 'X', shop: 'bakery', 'brand:wikidata': 'Q123' }) === null)
  ok('an independent shop survives',
    scoreCandidate({ name: 'Donut Crown', amenity: 'fast_food', phone: '1' }) !== null)

  console.log(failed === 0 ? '\nselftest ok' : `\nSELFTEST FAILED: ${failed}`)
  process.exit(failed === 0 ? 0 : 1)
}

if (process.argv.includes('--selftest')) selftest()
else await main()
