import { Clock, MapPin, Phone } from '@phosphor-icons/react'

import { Hero07 } from '@/components/ui/hero-07'
import { Reveal } from '@/components/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Bestellen } from './Bestellen'

const TEL = '+4971112345678'
const TEL_LABEL = '0711 123 456 78'
const BASE = import.meta.env.BASE_URL

const karte = [
  {
    name: 'Hausespresso',
    body: 'Brasilien Fazenda Rainha, natural aufbereitet. Schokolade und Haselnuss, wenig Säure. Auch als ganze Bohne zum Mitnehmen.',
    preis: '2,60 €',
    image: `${BASE}roestwerk/espresso.jpg`,
    imageAlt: 'Frisch gemahlener Kaffee im Siebträger',
  },
  { name: 'Flat White', body: 'Doppelter Espresso, samtig aufgeschäumte Milch. Hafer ohne Aufpreis.', preis: '4,20 €' },
  { name: 'Filter des Tages', body: 'Wechselnd, von Hand mit dem V60 aufgegossen. Fragen Sie einfach, was gerade läuft.', preis: '3,80 €' },
  { name: 'Cold Brew', body: '18 Stunden kalt extrahiert, ungesüßt, auf Eis serviert.', preis: '4,00 €' },
  { name: 'Bohnen, 250 g', body: 'Ganze Bohne oder passend zu Ihrer Maschine gemahlen.', preis: '11,50 €' },
]

const bandWords = [
  'Espresso',
  'Handfilter',
  'Cold Brew',
  'Eigene Röstung',
  'Direkthandel',
  'Stuttgart Süd',
]

function Header() {
  return (
    <header className="border-border bg-bark/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="font-display text-bone text-[19px] font-extrabold tracking-[-0.02em]">
          Röstwerk <span className="text-amber">Süd</span>
        </a>
        <nav className="text-bone-dim hidden items-center gap-7 text-sm md:flex">
          <a className="hover:text-bone transition-colors" href="#kaffee">Kaffee</a>
          <a className="hover:text-bone transition-colors" href="#bestellen">Bestellen</a>
          <a className="hover:text-bone transition-colors" href="#fragen">Fragen</a>
          <a className="hover:text-bone transition-colors" href="#besuch">Besuch</a>
        </nav>
        <a
          href={`tel:${TEL}`}
          className="bg-amber text-bark inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform active:translate-y-px"
        >
          <Phone weight="fill" className="size-4" aria-hidden />
          <span className="hidden sm:inline">{TEL_LABEL}</span>
          <span className="sm:hidden">Anrufen</span>
        </a>
      </div>
    </header>
  )
}

function Band() {
  const run = [...bandWords, ...bandWords]
  return (
    <div className="border-border bg-bark-2 overflow-hidden border-y py-3.5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {run.slice(0, bandWords.length).map((w) => (
              <li key={w} className="text-bone-dim flex items-center text-sm tracking-wide">
                <span className="px-6">{w}</span>
                <span className="text-amber/50">/</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/* 5 items, 6 cells: the featured drink takes a 2-wide tile with photography,
   the other four close out the grid. */
function Karte() {
  const [feature, ...rest] = karte
  return (
    <section id="kaffee" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-bone max-w-2xl text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
          Unser Kaffee
        </h2>
        <p className="text-bone-dim mt-4 max-w-[58ch] text-base leading-relaxed">
          Zwei Röstungen dauerhaft im Programm, dazu ein wechselnder Filterkaffee. Das Röstdatum
          steht auf jeder Tüte.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          {/* Horizontal so this tile's height stays close to the card beside it.
              Stacked, it towered over the neighbour and stranded the price. */}
          <article className="border-border bg-bark-2 grid h-full overflow-hidden rounded-xl border sm:grid-cols-2">
            <div className="min-h-52 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col p-6 sm:p-7">
              <h3 className="font-display text-bone text-xl font-semibold tracking-[-0.015em]">
                {feature.name}
              </h3>
              <p className="text-bone-dim mt-2 flex-1 text-sm leading-relaxed">{feature.body}</p>
              <span className="font-display text-amber mt-4 text-lg font-semibold tabular-nums">
                {feature.preis}
              </span>
            </div>
          </article>
        </Reveal>

        {rest.map((k, i) => (
          <Reveal key={k.name} delay={0.04 * i}>
            <article className="border-border bg-bark-2 flex h-full flex-col rounded-xl border p-6">
              <h3 className="font-display text-bone text-lg font-semibold tracking-[-0.015em]">
                {k.name}
              </h3>
              <p className="text-bone-dim mt-2 flex-1 text-sm leading-relaxed">{k.body}</p>
              <span className="font-display text-amber mt-4 text-base font-semibold tabular-nums">
                {k.preis}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Image-led, so it reads differently from the text cards in Unser Kaffee. */
function Herkunft() {
  const orte = [
    {
      image: `${BASE}roestwerk/farm.jpg`,
      alt: 'Reifende Kaffeekirschen am Strauch',
      ort: 'Fazenda Rainha, Brasilien',
      text: 'Seit 2019 unser Hausespresso. Wir kaufen direkt bei der Familie Alvarenga, ohne Zwischenhändler.',
    },
    {
      image: `${BASE}roestwerk/ernte.jpg`,
      alt: 'Hände halten frisch gepflückte rote Kaffeekirschen',
      ort: 'Handverlesen',
      text: 'Nur reife Kirschen kommen in den Sack. Das ist teurer als Streifenpflücken und der Grund, warum wenig Säure im Espresso landet.',
    },
    {
      image: `${BASE}roestwerk/trocknung.jpg`,
      alt: 'Kaffeebohnen trocknen auf erhöhten Betten',
      ort: 'Natural aufbereitet',
      text: 'Drei Wochen auf Trockenbetten, täglich gewendet. Daher die Schokoladennote, ohne dass wir irgendetwas zusetzen.',
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-bone max-w-2xl text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
          Woher der Kaffee kommt
        </h2>
        <p className="text-bone-dim mt-4 max-w-[58ch] text-base leading-relaxed">
          Wir kaufen kleine Partien direkt ein. Das heisst weniger Auswahl, dafür wissen wir bei
          jedem Sack, wer ihn geerntet hat.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {orte.map((o, i) => (
          <Reveal key={o.ort} delay={0.05 * i}>
            <figure className="m-0">
              <div className="border-border aspect-4/3 overflow-hidden rounded-xl border">
                <img
                  src={o.image}
                  alt={o.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="font-display text-bone text-lg font-semibold tracking-[-0.015em]">
                  {o.ort}
                </h3>
                <p className="text-bone-dim mt-1.5 text-sm leading-relaxed">{o.text}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Roesterei() {
  const plan = [
    { tag: 'Donnerstag', was: 'Rösttag. Der Laden riecht entsprechend.' },
    { tag: 'Freitag', was: 'Frische Tüten im Regal, Versand geht raus.' },
    { tag: 'Samstag', was: 'Offene Verkostung um 11 Uhr, ohne Anmeldung.' },
  ]

  return (
    <section className="border-border border-y">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="border-border aspect-4/3 overflow-hidden rounded-xl border">
            <img
              src={`${BASE}roestwerk/werkstatt.jpg`}
              alt="Röster kontrolliert die Trommel während des Röstvorgangs"
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-bone text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
            Fünf Kilo auf einmal
          </h2>
          <p className="text-bone-dim mt-4 max-w-[52ch] text-base leading-relaxed">
            Unser Trommelröster fasst fünf Kilo. Das ist wenig, und genau das ist der Punkt: Marie
            steht daneben und hört zu, statt ein Profil abzuspielen. Jede Charge wird protokolliert,
            und wenn eine nicht schmeckt, wird sie nicht verkauft.
          </p>
          <dl className="mt-8 grid gap-px overflow-hidden">
            {plan.map((p) => (
              <div key={p.tag} className="border-border flex flex-wrap gap-x-6 gap-y-1 border-t py-4">
                <dt className="font-display text-bone w-32 shrink-0 text-[15px] font-semibold">
                  {p.tag}
                </dt>
                <dd className="text-bone-dim flex-1 text-sm leading-relaxed">{p.was}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Fragen() {
  const faq = [
    {
      q: 'Wie frisch ist der Kaffee wirklich?',
      a: 'Wir rösten donnerstags und verschicken freitags. Auf jeder Tüte steht das Röstdatum, nicht nur ein Mindesthaltbarkeitsdatum. Espresso schmeckt aus unserer Sicht zwischen dem fünften und dem dreissigsten Tag nach der Röstung am besten.',
    },
    {
      q: 'Ganze Bohne oder gemahlen?',
      a: 'Ganze Bohne, wenn Sie eine Mühle haben. Gemahlener Kaffee verliert innerhalb weniger Tage deutlich an Aroma. Wenn Sie keine Mühle haben, mahlen wir passend zu Ihrer Maschine, sagen Sie uns einfach welche.',
    },
    {
      q: 'Kann ich das Abo pausieren oder kündigen?',
      a: 'Jederzeit, formlos per E-Mail oder Anruf. Es gibt keine Mindestlaufzeit und keine Kündigungsfrist. Wenn Sie in den Urlaub fahren, pausieren wir die Lieferung.',
    },
    {
      q: 'Bekomme ich den Kaffee auch ohne Abo?',
      a: 'Ja. Wählen Sie im Bestellformular "Einmalig". Oder kommen Sie vorbei, im Laden gibt es immer beide Röstungen.',
    },
    {
      q: 'Beliefern Sie Cafés und Büros?',
      a: 'Ja, ab fünf Kilo im Monat mit Staffelpreis. Für Büros stellen wir auf Wunsch eine Mühle dazu. Rufen Sie an, das klären wir in fünf Minuten.',
    },
  ]

  return (
    <section id="fragen" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-bone text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
          Häufige Fragen
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="font-display text-bone text-left text-base font-semibold tracking-[-0.01em]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-bone-dim max-w-[62ch] text-sm leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Zitat() {
  return (
    <section className="border-border bg-bark-2 border-y">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <blockquote>
            <p className="font-display text-bone text-[clamp(1.4rem,3.4vw,2.4rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
              „Guter Kaffee braucht keine Erklärung. Nur keine Eile.”
            </p>
            <footer className="text-bone-dim mt-6 text-[15px]">Marie Hoffmann, Rösterin</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

function Besuch() {
  return (
    <section id="besuch" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-bone max-w-2xl text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
          Vorbeikommen
        </h2>
        <p className="text-bone-dim mt-4 max-w-[58ch] text-base leading-relaxed">
          Drei Minuten vom Erwin-Schoettle-Platz. Frisch geröstete Bohnen gibt es ab Freitagmorgen.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="md:row-span-2">
          <div className="border-border h-full min-h-72 overflow-hidden rounded-xl border">
            <img
              src={`${BASE}roestwerk/tresen.jpg`}
              alt="Barista hinter dem Tresen der Rösterei"
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2">
          <div className="border-border bg-bark-2 h-full rounded-xl border p-6 sm:p-7">
            <Clock weight="duotone" className="text-amber size-6" aria-hidden />
            <h3 className="font-display text-bone mt-3 text-lg font-semibold">Öffnungszeiten</h3>
            <dl className="text-bone-dim mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
              <div className="flex justify-between gap-4 sm:block">
                <dt>Montag bis Freitag</dt>
                <dd className="text-bone tabular-nums">07:30 bis 18:00</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block">
                <dt>Samstag</dt>
                <dd className="text-bone tabular-nums">09:00 bis 17:00</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block">
                <dt>Sonntag</dt>
                <dd className="text-bone">geschlossen</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-border bg-bark-2 h-full rounded-xl border p-6">
            <MapPin weight="duotone" className="text-amber size-6" aria-hidden />
            <h3 className="font-display text-bone mt-3 text-lg font-semibold">Adresse</h3>
            <p className="text-bone-dim mt-3 text-[15px] leading-relaxed">
              Böblinger Straße 44
              <br />
              70199 Stuttgart
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="border-border bg-bark-2 h-full rounded-xl border p-6">
            <Phone weight="duotone" className="text-amber size-6" aria-hidden />
            <h3 className="font-display text-bone mt-3 text-lg font-semibold">Kontakt</h3>
            <p className="mt-3 text-[15px] leading-relaxed">
              <a className="text-amber hover:underline" href={`tel:${TEL}`}>{TEL_LABEL}</a>
              <br />
              <a className="text-amber hover:underline" href="mailto:hallo@roestwerk-sued.example">
                hallo@roestwerk-sued.example
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-border bg-bark-2 border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="border-border mb-8 rounded-xl border border-dashed p-4">
          <p className="text-bone-dim text-[13px] leading-relaxed">
            <strong className="text-bone font-semibold">Demoprojekt.</strong> Röstwerk Süd ist eine
            erfundene Musterrösterei. Diese Seite dient ausschliesslich als Arbeitsprobe. Adresse,
            Telefonnummer und Preise sind nicht echt.
          </p>
        </div>
        <div className="text-bone-dim flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Röstwerk Süd, Stuttgart</p>
          <p className="flex gap-5">
            <a className="hover:text-bone transition-colors" href="impressum.html">Impressum</a>
            <a className="hover:text-bone transition-colors" href="datenschutz.html">Datenschutz</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div id="top" className="bg-background min-h-[100dvh]">
      <Header />
      <main>
        <Hero07
          tagline="Spezialitätenrösterei in Stuttgart-Süd. Wir rösten in kleinen Mengen auf einem 5-Kilo-Trommelröster, zwei Straßen von hier."
          title={
            <>
              Donnerstag grün.
              <br />
              Freitag <span className="text-amber">geröstet.</span>
            </>
          }
          description="Zwei Röstungen dauerhaft im Programm, dazu ein wechselnder Filterkaffee."
          landscapeImage={`${BASE}roestwerk/bohnen.jpg`}
          landscapeAlt="Frisch geröstete Kaffeebohnen aus nächster Nähe"
          animation="subtle"
          primaryCTA={{ ctaEnabled: true, text: 'Bohnen bestellen', link: '#bestellen' }}
          secondaryCTA={{ ctaEnabled: true, text: 'Öffnungszeiten', link: '#besuch', variant: 'outline' }}
        />
        <Band />
        <Karte />
        <Bestellen />
        <Herkunft />
        <Zitat />
        <Roesterei />
        <Fragen />
        <Besuch />
      </main>
      <Footer />
    </div>
  )
}
