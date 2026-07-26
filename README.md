# webdev-portfolio

Two demo websites for small German businesses, built as work samples.

**Live:** https://wealthnervehq.github.io/webdev-portfolio/

| Site | Business | Aesthetic |
|---|---|---|
| `kesselstrom/` | Kesselstrom Elektrotechnik, an electrical contractor in Stuttgart-Feuerbach | Paper and graphite with a single cobalt accent, Archivo + Geist, auto light/dark |
| `roestwerk/` | Röstwerk Süd, a coffee roastery in Stuttgart-Süd | Forest green with an amber accent, Bricolage Grotesque + Karla, dark locked |

Both businesses are **fictional**. Every page carries a visible demo notice, and the
addresses, phone numbers and prices are placeholders.

## What these demonstrate

- **DSGVO-correct fonts.** All typefaces are self-hosted via Fontsource. Nothing is
  requested from `fonts.googleapis.com`. LG München I (3 O 17493/20, 2022) held that
  embedding Google Fonts from the CDN transmits visitor IPs without consent and awarded
  damages. `scripts/verify.ps1` asserts zero third-party requests.
- **Impressum and Datenschutzerklärung** on both sites, per §5 DDG and DSGVO Art. 13.
- **No cookies, no analytics, no tracking**, so no consent banner is required.
- Real photography, correct German alt text, LCP under 1.2s, CLS 0.

## Stack

Vite 8 multi-page build, React 19, Tailwind v4, shadcn/ui (Radix), Motion, Phosphor icons.
Hero sections come from [21st.dev](https://21st.dev) (`hero-07` and `hero-08` by
felipemenezes098), adapted: the serif headline was swapped for each site's own typeface,
`react-wrap-balancer` replaced with native `text-wrap: balance`, and the hero-08 avatar
row replaced with a credential strip rather than showing invented customer faces.

## Commands

```bash
npm install
npm run dev                    # dev server
npm run build                  # production build to dist/
npm run preview                # serve the build on :4173

node scripts/fetch-photos.mjs  # download photos from Pexels into public/
node scripts/legal.mjs         # regenerate Impressum + Datenschutz
node scripts/preflight.mjs     # anti-slop / design rule gate (runs in CI)
./scripts/verify.ps1           # browser gate: requests, a11y, CWV, mobile overflow
./scripts/shoot.ps1 -Url <u> -Out <p>   # full-page screenshot that triggers scroll reveals
```

`verify.ps1` and `shoot.ps1` need the `agent-browser` CLI (`npm i -g agent-browser`).

## Notes

- The Pexels key is read from the local social-media config and is never committed.
  Downloaded photos live in `public/<site>/`, credits in `PHOTO-CREDITS.md`.
- `scripts/shoot.ps1` scrolls the whole page before capturing. Motion's `whileInView`
  needs elements to genuinely enter the viewport, so a plain full-page screenshot
  captures every revealed section at opacity 0.
