import {
  Certificate,
  Lightning,
  PhoneCall,
  Plugs,
  ShieldCheck,
  Timer,
  Wrench,
} from '@phosphor-icons/react'

import { Hero08 } from '@/components/ui/hero-08'
import { Reveal } from '@/components/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const TEL = '+4971198765400'
const TEL_LABEL = '0711 987 654 00'
const BASE = import.meta.env.BASE_URL

const leistungen = [
  {
    title: 'Elektroinstallation',
    body: 'Neubau, Sanierung und Nachrüstung. Von der einzelnen Steckdose bis zur kompletten Wohnungsverkabelung.',
    icon: Plugs,
    image: `${BASE}kesselstrom/installation.jpg`,
    imageAlt: 'Unterputzdosen mit eingezogenen Leitungen in einer Rohbauwand',
  },
  {
    title: 'Zählerschrank und Verteilung',
    body: 'Austausch alter Verteilungen nach aktueller VDE-Norm, inklusive Anmeldung beim Netzbetreiber.',
    icon: Lightning,
  },
  {
    title: 'E-Check nach DIN VDE 0105',
    body: 'Prüfprotokoll für Vermieter, Versicherung und Betriebe. Mängel benennen wir im Klartext.',
    icon: ShieldCheck,
  },
  {
    title: 'Wallbox und Ladetechnik',
    body: 'Auslegung, Installation und Anmeldung. Wir prüfen vorher, ob der Hausanschluss die Leistung trägt.',
    icon: Certificate,
    image: `${BASE}kesselstrom/wallbox.jpg`,
    imageAlt: 'Ladekabel wird an einer Wallbox an der Garagenwand eingesteckt',
  },
  {
    title: 'Störungssuche',
    body: 'FI fliegt raus, Licht flackert, Sicherung hält nicht. Wir messen, statt zu raten.',
    icon: Wrench,
  },
  {
    title: 'Wartung für Hausverwaltungen',
    body: 'Feste Ansprechpartner, planbare Termine und Sammelrechnung pro Objekt.',
    icon: Timer,
  },
]

const ablauf = [
  { label: 'Anrufen', body: 'Sie schildern das Problem. Wir sagen direkt, ob es ein Notfall ist oder Zeit hat.' },
  { label: 'Vor Ort ansehen', body: 'Wir kommen, messen und erklären den Befund ohne Fachchinesisch.' },
  { label: 'Festpreis erhalten', body: 'Schriftlich, aufgeschlüsselt nach Material und Arbeitszeit. Gültig 30 Tage.' },
  { label: 'Ausführen und abnehmen', body: 'Wir bauen ein, prüfen und übergeben das Protokoll. Baustelle bleibt sauber.' },
]

const faq = [
  {
    q: 'Was kostet ein Einsatz im Notdienst?',
    a: 'Die Anfahrt innerhalb Stuttgarts kostet 65 Euro, dazu die Arbeitszeit ab 89 Euro je angefangener Stunde. Nachts, sonntags und an Feiertagen kommt ein Zuschlag von 50 Prozent dazu. Sie erfahren den Satz am Telefon, bevor wir losfahren.',
  },
  {
    q: 'Wie schnell bekomme ich einen regulären Termin?',
    a: 'Für planbare Arbeiten liegen wir aktuell bei sieben bis zehn Werktagen. Kleinere Reparaturen schieben wir meist innerhalb einer Woche dazwischen.',
  },
  {
    q: 'Machen Sie auch kleine Aufträge?',
    a: 'Ja. Eine defekte Steckdose oder ein neuer Deckenauslass ist uns nicht zu klein. Bei Kleinaufträgen berechnen wir eine Mindestpauschale von einer Stunde.',
  },
  {
    q: 'Brauche ich für eine Wallbox eine Genehmigung?',
    a: 'Ladepunkte bis 11 kW müssen beim Netzbetreiber angemeldet werden, ab 12 kW ist eine Genehmigung nötig. Beides übernehmen wir. In einer Eigentümergemeinschaft brauchen Sie zusätzlich einen Beschluss.',
  },
  {
    q: 'Was genau ist ein E-Check?',
    a: 'Eine dokumentierte Prüfung Ihrer festen Elektroinstallation und der angeschlossenen Geräte. Vermieter, Betriebe und viele Versicherer verlangen das Protokoll. Für Wohngebäude empfiehlt sich eine Wiederholung alle vier Jahre.',
  },
  {
    q: 'Arbeiten Sie für Hausverwaltungen?',
    a: 'Ein grosser Teil unserer Aufträge kommt von Verwaltungen im Stuttgarter Norden. Sie bekommen einen festen Ansprechpartner und eine Sammelrechnung je Objekt.',
  },
]

function Header() {
  return (
    <header className="border-hairline bg-paper/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="font-display text-graphite text-[17px] font-extrabold tracking-[-0.02em]">
          Kesselstrom<span className="text-cobalt">.</span>
        </a>
        <nav className="text-muted-foreground hidden items-center gap-7 text-sm md:flex">
          <a className="hover:text-foreground transition-colors" href="#leistungen">Leistungen</a>
          <a className="hover:text-foreground transition-colors" href="#ablauf">Ablauf</a>
          <a className="hover:text-foreground transition-colors" href="#fragen">Fragen</a>
          <a className="hover:text-foreground transition-colors" href="#kontakt">Kontakt</a>
        </nav>
        <a
          href={`tel:${TEL}`}
          className="bg-cobalt text-primary-foreground inline-flex h-11 shrink-0 items-center gap-2 rounded-sm px-4 text-sm font-semibold transition-transform active:translate-y-px"
        >
          <PhoneCall weight="bold" className="size-4" aria-hidden />
          <span className="hidden sm:inline">{TEL_LABEL}</span>
          <span className="sm:hidden">Anrufen</span>
        </a>
      </div>
    </header>
  )
}

/* Credentials sit here rather than in the hero: a trust strip inside the hero
   overloads it, and the hero should carry the value proposition alone. */
function Credentials() {
  const items = [
    { k: 'Meisterbetrieb', v: 'seit 1998' },
    { k: 'Innung', v: 'Elektro Stuttgart' },
    { k: 'Abgeschlossene Aufträge', v: 'über 2.400' },
    { k: 'Notdienst', v: 'täglich bis 22 Uhr' },
  ]
  return (
    <section aria-label="Qualifikationen" className="border-hairline border-y">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4">
        {items.map((i, idx) => (
          <div
            key={i.k}
            className={`border-hairline py-6 md:py-7 ${idx % 2 === 1 ? 'border-l pl-5' : ''} ${idx < 2 ? 'border-b md:border-b-0' : ''} ${idx === 2 ? 'md:border-l md:pl-5' : ''} ${idx === 3 ? 'md:pl-5' : ''}`}
          >
            <p className="text-muted-foreground text-[13px]">{i.k}</p>
            <p className="font-display text-foreground mt-1 text-lg font-bold tracking-[-0.02em]">{i.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Bento: 6 services, exactly 6 cells. Two carry photography so the grid is not
   six identical text boxes; the other four are compact and text-led. */
function Leistungen() {
  const [featureA, ...rest] = leistungen
  const featureB = rest.find((l) => l.image)!
  const plain = rest.filter((l) => !l.image)

  return (
    <section id="leistungen" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-foreground max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
          Was wir machen
        </h2>
        <p className="text-muted-foreground mt-4 max-w-[58ch] text-base">
          Sechs Bereiche, in denen wir täglich arbeiten. Alles andere sagen wir Ihnen ehrlich ab.
        </p>
      </Reveal>

      {/* 6 services, 6 tiles, no empty cells: the lead tile occupies a 2x2 block,
          the right column stacks two, and the remaining three close the bottom row. */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2 md:row-span-2">
          <article className="border-hairline bg-card relative flex h-full flex-col overflow-hidden rounded-sm border">
            <div className="min-h-56 w-full flex-1 overflow-hidden">
              <img
                src={featureA.image}
                alt={featureA.imageAlt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <featureA.icon weight="duotone" className="text-cobalt size-6" aria-hidden />
              <h3 className="font-display text-foreground mt-3 text-xl font-bold tracking-[-0.02em]">
                {featureA.title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-[52ch] text-sm leading-relaxed">{featureA.body}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="border-hairline bg-card relative isolate flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-sm border p-6">
            <img
              src={featureB.image}
              alt={featureB.imageAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 size-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/88 via-black/55 to-black/15" />
            <featureB.icon weight="duotone" className="size-6 text-white" aria-hidden />
            <h3 className="font-display mt-3 text-xl font-bold tracking-[-0.02em] text-white">
              {featureB.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{featureB.body}</p>
          </article>
        </Reveal>

        {plain.map((l, i) => (
          <Reveal key={l.title} delay={0.04 * i}>
            <article className="border-hairline bg-card h-full rounded-sm border p-6">
              <l.icon weight="duotone" className="text-cobalt size-6" aria-hidden />
              <h3 className="font-display text-foreground mt-3 text-lg font-bold tracking-[-0.02em]">
                {l.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{l.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Notdienst() {
  return (
    <section className="bg-cobalt text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
            Kein Strom? Wir fahren noch heute raus.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base text-white/85">
            Notdienst täglich von 6 bis 22 Uhr im Stadtgebiet Stuttgart. In der Regel sind wir
            innerhalb einer Stunde bei Ihnen. Den Preis nennen wir am Telefon, nicht erst auf der Rechnung.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-sm bg-white px-8 text-base font-semibold text-neutral-950 hover:bg-white/90 sm:w-auto"
          >
            <a href={`tel:${TEL}`}>
              <PhoneCall weight="bold" className="size-5" aria-hidden />
              Notdienst anrufen
            </a>
          </Button>
          <p className="mt-3 text-sm text-white/75">{TEL_LABEL}</p>
        </div>
      </div>
    </section>
  )
}

function Ablauf() {
  return (
    <section id="ablauf" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-foreground max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
          So läuft ein Auftrag
        </h2>
      </Reveal>
      <ol className="border-hairline mt-12 grid gap-px border md:grid-cols-4">
        {ablauf.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i}>
            <li className="border-hairline bg-card h-full border-b p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
              <h3 className="font-display text-foreground text-lg font-bold tracking-[-0.02em]">
                {s.label}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Stimme() {
  return (
    <section className="border-hairline border-y">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_320px] lg:items-center">
        <Reveal>
          <blockquote>
            <p className="font-display text-foreground text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-balance">
              „Unser Zählerschrank war vierzig Jahre alt. Termin am Dienstag, Freitag lief alles.
              Der Preis war exakt der, der im Angebot stand.”
            </p>
            <footer className="text-muted-foreground mt-6 text-sm">
              Andrea Wetzel, Hausverwaltung Wetzel &amp; Sohn, Stuttgart-Feuerbach
            </footer>
          </blockquote>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="aspect-3/4 overflow-hidden rounded-sm lg:justify-self-end">
            <img
              src={`${BASE}kesselstrom/zaehlerschrank.jpg`}
              alt="Reihe von Leitungsschutzschaltern in einer neuen Unterverteilung"
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Fragen() {
  return (
    <section id="fragen" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-foreground text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
          Häufige Fragen
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="font-display text-left text-base font-semibold tracking-[-0.01em]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground max-w-[62ch] text-sm leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Kontakt() {
  return (
    <section id="kontakt" className="border-hairline border-t">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-foreground text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
            Werkstatt in Feuerbach
          </h2>
          <p className="text-muted-foreground mt-4 max-w-[52ch] text-base">
            Rufen Sie an oder schreiben Sie kurz, worum es geht. Für ein Angebot brauchen wir
            meist nur ein Foto der Verteilung.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground text-[13px]">Adresse</dt>
              <dd className="text-foreground mt-1 text-[15px]">
                Stuttgarter Straße 118
                <br />
                70469 Stuttgart-Feuerbach
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[13px]">Bürozeiten</dt>
              <dd className="text-foreground mt-1 text-[15px]">
                Mo bis Do 7:30 bis 16:30
                <br />
                Fr 7:30 bis 13:00
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[13px]">Telefon</dt>
              <dd className="mt-1 text-[15px]">
                <a className="text-cobalt font-semibold hover:underline" href={`tel:${TEL}`}>
                  {TEL_LABEL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[13px]">E-Mail</dt>
              <dd className="mt-1 text-[15px]">
                <a className="text-cobalt font-semibold hover:underline" href="mailto:buero@kesselstrom.example">
                  buero@kesselstrom.example
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="aspect-4/5 overflow-hidden rounded-sm">
            <img
              src={`${BASE}kesselstrom/team.jpg`}
              alt="Elektriker misst mit einem Multimeter an einer Klemmleiste"
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-hairline bg-card border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="border-hairline mb-8 rounded-sm border border-dashed p-4">
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            <strong className="text-foreground font-semibold">Demoprojekt.</strong> Kesselstrom
            Elektrotechnik ist ein erfundener Musterbetrieb. Diese Seite dient ausschliesslich als
            Arbeitsprobe. Adresse, Telefonnummer und Preise sind nicht echt.
          </p>
        </div>
        <div className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Kesselstrom Elektrotechnik, Stuttgart</p>
          <p className="flex gap-5">
            <a className="hover:text-foreground transition-colors" href="impressum.html">Impressum</a>
            <a className="hover:text-foreground transition-colors" href="datenschutz.html">Datenschutz</a>
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
        <Hero08
          eyebrow="Elektromeisterbetrieb in Stuttgart-Feuerbach"
          title="Elektrik, die beim ersten Mal sitzt."
          description="Installation, E-Check und Wallboxen für Privathaushalte und Hausverwaltungen in Stuttgart."
          animation="subtle"
          cards={[
            {
              title: '24-Stunden-Notdienst',
              subtitle: 'In der Regel in 60 Minuten vor Ort',
              image: `${BASE}kesselstrom/notdienst.jpg`,
              imageAlt: 'Elektriker arbeitet an einer geöffneten Schaltschrankverteilung',
              priority: true,
              invert: true,
              cta: { ctaEnabled: true, text: 'Notdienst anrufen', link: `tel:${TEL}`, size: 'default' },
            },
            {
              title: 'Wallbox zum Festpreis',
              subtitle: 'Ab 890 Euro inklusive Anmeldung',
              image: `${BASE}kesselstrom/wallbox.jpg`,
              imageAlt: 'Ladekabel wird an einer Wallbox an der Garagenwand eingesteckt',
              priority: true,
              invert: true,
              cta: { ctaEnabled: true, text: 'Angebot anfordern', link: '#kontakt', size: 'default' },
            },
          ]}
        />
        <Credentials />
        <Leistungen />
        <Notdienst />
        <Ablauf />
        <Stimme />
        <Fragen />
        <Kontakt />
      </main>
      <Footer />
    </div>
  )
}
