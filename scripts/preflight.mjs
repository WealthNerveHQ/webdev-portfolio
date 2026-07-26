/**
 * Mechanical half of the taste-skill Pre-Flight Check.
 * Only the boxes a machine can settle honestly; judgement calls stay manual.
 *
 * Two scoping decisions that matter:
 *  - scripts/ is excluded. Auditing the auditor makes every rule match its own
 *    regex and reports failures that are not in the shipped pages.
 *  - Comments are stripped. They explain decisions and never reach the user.
 *
 * Regexes use \u escapes on purpose: literal em-dashes in this file would both
 * trip the rule being tested and break under a re-encode.
 *
 * Run: node scripts/preflight.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = ['node_modules', 'dist', '.git', '_verify', 'scripts']

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (SKIP.includes(e)) continue
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (['.tsx', '.ts', '.html', '.css'].includes(extname(p))) out.push(p)
  }
  return out
}

const cache = new Map()
function src(f) {
  if (!cache.has(f)) {
    cache.set(
      f,
      readFileSync(f, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/^\s*\/\/.*$/gm, ''),
    )
  }
  return cache.get(f)
}

const files = walk(ROOT)
let fails = 0
const rel = (f) => f.replace(ROOT, '')
const check = (label, ok, detail = '') => {
  if (!ok) fails++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? '  -> ' + detail : ''}`)
}
const scan = (re, label) => {
  const hit = files.filter((f) => re.test(src(f)))
  check(label, hit.length === 0, hit.map(rel).join(', '))
}

// Section 9.G: zero em-dashes or en-dashes in anything that ships.
const dashHits = []
for (const f of files) {
  src(f)
    .split('\n')
    .forEach((line, i) => {
      if (/[—–]/.test(line)) dashHits.push(`${rel(f)}:${i + 1}`)
    })
}
check('zero em-dashes / en-dashes', dashHits.length === 0, dashHits.slice(0, 8).join(', '))

// Section 4.7: at most one eyebrow per three sections.
for (const site of ['kesselstrom', 'roestwerk']) {
  const hero = site === 'kesselstrom' ? 'hero-08.tsx' : 'hero-07.tsx'
  const app = src(join(ROOT, 'src', site, 'App.tsx'))
  const both = app + src(join(ROOT, 'src', 'components', 'ui', hero))
  const eyebrows = (both.match(/uppercase[^"'`]*tracking|tracking[^"'`]*uppercase/g) || []).length
  const sections = (app.match(/<section/g) || []).length
  const budget = Math.max(1, Math.ceil(sections / 3))
  check(`${site}: ${eyebrows} eyebrow(s) <= budget ${budget} across ${sections} sections`, eyebrows <= budget)
  const marquees = (app.match(/marquee-track/g) || []).length
  check(`${site}: ${marquees} marquee(s) <= 1`, marquees <= 1)
}

scan(/from ['"]lucide-react/, 'no lucide-react imports')
scan(/Fraunces|Instrument[_ ]Serif|font-serif/, 'no banned serifs and no font-serif')
scan(/picsum\.photos/, 'no picsum placeholders')
scan(/fonts\.(googleapis|gstatic)\.com/, 'no Google Fonts CDN references')
scan(/[Ss]croll to explore|↓ ?[Ss]croll/, 'no scroll cues')
scan(/v\d+\.\d+\.\d+|Build \d{4}/, 'no version stamps')
scan(/\d{1,2}°C/, 'no weather strips')
scan(/\bh-screen\b/, 'no h-screen (use min-h-[100dvh])')
scan(/window\.addEventListener\(['"]scroll/, 'no raw scroll listeners')

// Section 6.B: motion is only allowed where reduced motion is honoured.
const motionFiles = files.filter((f) => /from ['"]motion\/react/.test(src(f)))
const unguarded = motionFiles.filter((f) => !/useReducedMotion/.test(src(f)))
check(
  `all ${motionFiles.length} motion components call useReducedMotion`,
  unguarded.length === 0,
  unguarded.map(rel).join(', '),
)

console.log(`\nMECHANICAL FAILURES: ${fails}`)
process.exit(fails === 0 ? 0 : 1)
