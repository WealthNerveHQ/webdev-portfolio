/**
 * Generates Impressum + Datenschutzerklaerung for each demo site.
 *
 * Every German commercial site needs both (§5 DDG for the Impressum, DSGVO Art. 13
 * for the privacy notice). Most AI-built portfolio sites skip them, so having them
 * correct is part of the pitch. They are plain static HTML: no React needed for
 * two text pages, and they stay readable if the bundle ever fails.
 *
 * Run: node scripts/legal.mjs
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const sites = [
  {
    dir: 'kesselstrom',
    name: 'Kesselstrom Elektrotechnik',
    lang: 'de',
    inhaber: 'Markus Kesselring',
    strasse: 'Stuttgarter Straße 118',
    ort: '70469 Stuttgart-Feuerbach',
    tel: '0711 987 654 00',
    mail: 'buero@kesselstrom.example',
    beruf: 'Elektrotechnikermeister (verliehen in der Bundesrepublik Deutschland)',
    kammer: 'Handwerkskammer Region Stuttgart',
    ustid: 'DE000000000',
    css: {
      bg: '#f1f1ee', fg: '#15171a', soft: '#5c6168', line: '#d9d9d3', accent: '#1b3ce8',
      bgDark: '#101214', fgDark: '#ecece7', softDark: '#9aa0a7', lineDark: '#2b2f34', accentDark: '#6d8bff',
      display: "'Archivo Variable'", body: "'Geist Variable'", radius: '4px',
    },
    fonts: ['@fontsource-variable/archivo', '@fontsource-variable/geist'],
    darkOnly: false,
  },
  {
    dir: 'roestwerk',
    name: 'Röstwerk Süd',
    lang: 'de',
    inhaber: 'Marie Hoffmann',
    strasse: 'Böblinger Straße 44',
    ort: '70199 Stuttgart',
    tel: '0711 123 456 78',
    mail: 'hallo@roestwerk-sued.example',
    beruf: null,
    kammer: 'Industrie- und Handelskammer Region Stuttgart',
    ustid: 'DE000000000',
    css: {
      bg: '#141e18', fg: '#e9e7df', soft: '#a8b0a8', line: '#2c4034', accent: '#e3a445',
      display: "'Bricolage Grotesque Variable'", body: "'Karla Variable'", radius: '12px',
    },
    fonts: ['@fontsource-variable/bricolage-grotesque', '@fontsource-variable/karla'],
    darkOnly: true,
  },
]

const styleFor = (c, darkOnly) => `
*,*::before,*::after{box-sizing:border-box}
:root{
  --bg:${c.bg};--fg:${c.fg};--soft:${c.soft};--line:${c.line};--accent:${c.accent};
  color-scheme:${darkOnly ? 'dark' : 'light dark'};
}
${darkOnly ? '' : `@media (prefers-color-scheme: dark){:root{
  --bg:${c.bgDark};--fg:${c.fgDark};--soft:${c.softDark};--line:${c.lineDark};--accent:${c.accentDark};
}}`}
body{margin:0;background:var(--bg);color:var(--fg);
  font-family:${c.body},ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.65}
.wrap{max-width:44rem;margin:0 auto;padding:clamp(2.5rem,7vw,5rem) 1.5rem}
h1{font-family:${c.display},ui-sans-serif,system-ui,sans-serif;font-weight:800;
  font-size:clamp(1.8rem,4.5vw,2.6rem);letter-spacing:-.03em;line-height:1.05;margin:0 0 2rem;text-wrap:balance}
h2{font-family:${c.display},ui-sans-serif,system-ui,sans-serif;font-weight:700;
  font-size:1.15rem;letter-spacing:-.02em;margin:2.5rem 0 .6rem}
p,li{color:var(--soft);font-size:.95rem;margin:0 0 .9rem}
strong{color:var(--fg);font-weight:600}
a{color:var(--accent);font-weight:600}
ul{padding-left:1.1rem;margin:0 0 .9rem}
.back{display:inline-block;margin-bottom:2.5rem;font-size:.9rem}
.note{border:1px dashed var(--line);border-radius:${c.radius};padding:1rem;margin-bottom:2.5rem}
.note p{margin:0;font-size:.85rem}
footer{border-top:1px solid var(--line);margin-top:3rem;padding-top:1.5rem;font-size:.85rem;color:var(--soft)}
`.trim()

const shell = (site, title, body) => `<!doctype html>
<html lang="${site.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>${title} - ${site.name}</title>
    <script type="module">
${site.fonts.map((f) => `      import '${f}'`).join('\n')}
    </script>
    <style>
${styleFor(site.css, site.darkOnly)}
    </style>
  </head>
  <body>
    <main class="wrap">
      <a class="back" href="./">Zurück zur Startseite</a>
      <h1>${title}</h1>
      <div class="note">
        <p><strong>Demoprojekt.</strong> ${site.name} ist ein erfundener Musterbetrieb.
        Diese Seite ist eine Arbeitsprobe. Alle Angaben unten sind Platzhalter und
        beziehen sich nicht auf ein reales Unternehmen.</p>
      </div>
${body}
      <footer>© 2026 ${site.name}, Stuttgart</footer>
    </main>
  </body>
</html>
`

const impressum = (s) => shell(
  s,
  'Impressum',
  `      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        ${s.name}<br />
        Inhaber: ${s.inhaber}<br />
        ${s.strasse}<br />
        ${s.ort}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: ${s.tel}<br />
        E-Mail: ${s.mail}
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>Gemäß § 27 a Umsatzsteuergesetz: ${s.ustid}</p>
${s.beruf ? `
      <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p>
        Berufsbezeichnung: ${s.beruf}<br />
        Zuständige Kammer: ${s.kammer}<br />
        Es gelten die Handwerksordnung (HwO) sowie die Regelungen der zuständigen Kammer.
        Einsehbar unter <a href="https://www.gesetze-im-internet.de/hwo/">gesetze-im-internet.de</a>.
      </p>` : `
      <h2>Zuständige Kammer</h2>
      <p>${s.kammer}</p>`}

      <h2>Verantwortlich für den Inhalt</h2>
      <p>${s.inhaber}, Anschrift wie oben.</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Für diese fremden Inhalte kann keine Gewähr übernommen werden.
        Verantwortlich ist stets der jeweilige Anbieter der Seite.
      </p>`,
)

const datenschutz = (s) => shell(
  s,
  'Datenschutzerklärung',
  `      <h2>Verantwortlicher</h2>
      <p>
        ${s.name}, ${s.inhaber}<br />
        ${s.strasse}, ${s.ort}<br />
        Telefon: ${s.tel}, E-Mail: ${s.mail}
      </p>

      <h2>Welche Daten diese Website verarbeitet</h2>
      <p>
        Diese Website ist bewusst sparsam gebaut. Sie setzt <strong>keine Cookies</strong>,
        bindet <strong>keine Analyse- oder Tracking-Dienste</strong> ein und lädt
        <strong>keine externen Schriftarten, Karten oder Videos</strong> nach. Es gibt daher
        kein Cookie-Banner, weil es nichts einzuwilligen gibt.
      </p>

      <h2>Schriftarten</h2>
      <p>
        Alle Schriften werden vom eigenen Server ausgeliefert. Es besteht keine Verbindung zu
        Google Fonts. Das ist bewusst so gelöst: das Landgericht München I hat mit Urteil vom
        20.01.2022 (Az. 3 O 17493/20) entschieden, dass die dynamische Einbindung von Google
        Fonts ohne Einwilligung die IP-Adresse der Besucher unzulässig an Google übermittelt.
      </p>

      <h2>Server-Logfiles</h2>
      <p>
        Beim Abruf der Seite erhebt der Hosting-Anbieter automatisch Zugriffsdaten
        (aufgerufene Seite, Zeitpunkt, übertragene Datenmenge, Browsertyp, Betriebssystem,
        Referrer, IP-Adresse). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
        Interesse liegt im technisch fehlerfreien Betrieb der Website. Eine Zusammenführung
        dieser Daten mit anderen Datenquellen findet nicht statt.
      </p>

      <h2>Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur
        Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
        (vorvertragliche Maßnahmen) beziehungsweise lit. f DSGVO. Die Daten werden gelöscht,
        sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen
        Aufbewahrungsfristen entgegenstehen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16)</li>
        <li>Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18)</li>
        <li>Datenübertragbarkeit (Art. 20)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21)</li>
      </ul>
      <p>
        Ausserdem können Sie sich bei einer Aufsichtsbehörde beschweren. Zuständig ist der
        Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
      </p>

      <h2>Hosting</h2>
      <p>
        Diese Seite wird als statische Website bei GitHub Pages (GitHub Inc.) gehostet. Beim
        Abruf werden die oben genannten Zugriffsdaten durch den Anbieter verarbeitet.
      </p>`,
)

for (const site of sites) {
  const dir = join(ROOT, site.dir)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'impressum.html'), impressum(site), 'utf8')
  writeFileSync(join(dir, 'datenschutz.html'), datenschutz(site), 'utf8')
  console.log(`ok ${site.dir}/impressum.html + datenschutz.html`)
}

/**
 * English privacy page for US and UK sites. Short because the sites genuinely do
 * nothing: no cookies, no analytics, no forms. The footer links to it, and a
 * broken link on a page you are about to show a prospect is not acceptable.
 *
 *   node scripts/legal.mjs --privacy <slug>
 */
const privacyFor = process.argv[process.argv.indexOf('--privacy') + 1]
if (process.argv.includes('--privacy') && privacyFor) {
  const biz = JSON.parse(readFileSync(join(ROOT, 'businesses', `${privacyFor}.json`), 'utf8'))
  const css = {
    bg: '#faf8f5', fg: '#141210', soft: '#5d554c', line: '#ddd6cc', accent: '#8a5a2b',
    bgDark: '#100f0e', fgDark: '#f2ece4', softDark: '#a29889', lineDark: '#302b25', accentDark: '#d19a5e',
    display: "'Outfit Variable'", body: "'Manrope Variable'", radius: '2px',
  }
  const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Privacy - ${biz.name}</title>
    <script type="module">
      import '@fontsource-variable/outfit'
      import '@fontsource-variable/manrope'
    </script>
    <style>
${styleFor(css, false)}
    </style>
  </head>
  <body>
    <main class="wrap">
      <a class="back" href="./">Back to the site</a>
      <h1>Privacy</h1>

      <h2>The short version</h2>
      <p>
        This website sets <strong>no cookies</strong>, runs <strong>no analytics or tracking</strong>,
        and loads <strong>no external fonts, maps or videos</strong>. There is no contact form and
        no newsletter. Nothing you do here is recorded by us.
      </p>

      <h2>Server logs</h2>
      <p>
        The hosting provider records standard access data when a page is requested: the page,
        the time, the amount of data transferred, browser type, operating system, referrer and
        IP address. This is used only to keep the site running and is not combined with anything else.
      </p>

      <h2>Getting in touch</h2>
      <p>
        If you call ${biz.phoneLabel}, we use what you tell us to answer your question and nothing more.
      </p>

      <h2>Contact</h2>
      <p>
        ${biz.name}<br />
        ${biz.address.street}<br />
        ${[biz.address.postcode, biz.address.city].filter(Boolean).join(' ')}<br />
        ${biz.phoneLabel}
      </p>

      <footer>© ${new Date().getFullYear()} ${biz.name}</footer>
    </main>
  </body>
</html>
`
  writeFileSync(join(ROOT, privacyFor, 'privacy.html'), page, 'utf8')
  console.log(`ok ${privacyFor}/privacy.html`)
}
