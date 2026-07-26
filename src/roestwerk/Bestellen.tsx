import { useId, useState } from 'react'
import { CheckCircle, Package, Truck } from '@phosphor-icons/react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const BASE = import.meta.env.BASE_URL

const abos = [
  { id: 'einmalig', name: 'Einmalig', menge: '250 g', preis: '11,50 €', note: 'Ohne Bindung, einfach zum Probieren.' },
  { id: 'zwei', name: 'Alle zwei Wochen', menge: '250 g', preis: '10,40 €', note: 'Für ein bis zwei Tassen am Tag. Beliebteste Wahl.' },
  { id: 'monat', name: 'Monatlich', menge: '500 g', preis: '19,80 €', note: 'Für Haushalte, die mehr durchziehen.' },
]

const roestungen = ['Hausespresso', 'Filter des Tages', 'Beides abwechselnd']
const mahlgrade = ['Ganze Bohne', 'Siebträger', 'Handfilter', 'French Press']

type Errors = Partial<Record<'name' | 'email', string>>

export function Bestellen() {
  const uid = useId()
  const [abo, setAbo] = useState('zwei')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Errors = {}
    if (!name.trim()) next.name = 'Bitte tragen Sie Ihren Namen ein.'
    // Deliberately loose: the point is to catch typos, not to police valid addresses.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'Diese E-Mail-Adresse sieht nicht vollständig aus.'
    setErrors(next)
    if (Object.keys(next).length) return

    setState('sending')
    window.setTimeout(() => setState('done'), 700)
  }

  return (
    <section id="bestellen" className="border-border bg-bark-2 border-y">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 className="font-display text-bone text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
            Bohnen nach Hause
          </h2>
          <p className="text-bone-dim mt-4 max-w-[52ch] text-base leading-relaxed">
            Wir rösten donnerstags und verschicken freitags. Was Sie bekommen, ist nie älter als
            einen Tag. Ein Abo können Sie jederzeit formlos beenden, es gibt keine Mindestlaufzeit.
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2">
                <Truck weight="duotone" className="text-amber size-5" aria-hidden />
                <span className="font-display text-bone text-[15px] font-semibold">Versand</span>
              </dt>
              <dd className="text-bone-dim mt-1.5 text-sm leading-relaxed">
                3,90 € innerhalb Deutschlands, ab 40 € versandkostenfrei. Abholung im Laden ist
                immer kostenlos.
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2">
                <Package weight="duotone" className="text-amber size-5" aria-hidden />
                <span className="font-display text-bone text-[15px] font-semibold">Verpackung</span>
              </dt>
              <dd className="text-bone-dim mt-1.5 text-sm leading-relaxed">
                Kraftpapier mit Aromaventil, kompostierbar. Röstdatum steht auf jeder Tüte.
              </dd>
            </div>
          </dl>

          <div className="border-border mt-8 aspect-16/9 overflow-hidden rounded-xl border">
            <img
              src={`${BASE}roestwerk/tueten.jpg`}
              alt="Kraftpapier-Verpackung, in der die Bohnen versendet werden"
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-border bg-bark rounded-xl border p-6 sm:p-8">
            {state === 'done' ? (
              <div className="flex min-h-96 flex-col items-start justify-center">
                <CheckCircle weight="duotone" className="text-amber size-10" aria-hidden />
                <h3 className="font-display text-bone mt-4 text-xl font-semibold">
                  Danke, {name.split(' ')[0]}.
                </h3>
                <p className="text-bone-dim mt-2 max-w-[46ch] text-sm leading-relaxed">
                  Ihre Auswahl: {abos.find((a) => a.id === abo)?.name}. Wir melden uns per E-Mail,
                  sobald die nächste Röstung fertig ist.
                </p>
                <p className="text-bone-dim mt-6 max-w-[46ch] border-t border-dashed border-[color:var(--border)] pt-4 text-[13px] leading-relaxed">
                  Hinweis zur Arbeitsprobe: diese Bestellung wird nicht verschickt. In der
                  Live-Version geht sie an die Rösterei.
                </p>
                <Button
                  className="bg-bark-3 text-bone hover:bg-bark-3/80 mt-6 h-11 rounded-full px-5 font-semibold"
                  onClick={() => setState('idle')}
                >
                  Noch eine Bestellung
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <fieldset>
                  <legend className="font-display text-bone text-lg font-semibold">
                    Wie oft möchten Sie Kaffee?
                  </legend>
                  <div className="mt-4 grid gap-2.5">
                    {abos.map((a) => (
                      <label
                        key={a.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                          abo === a.id
                            ? 'border-amber bg-bark-3'
                            : 'border-border hover:border-bone-dim/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="abo"
                          value={a.id}
                          checked={abo === a.id}
                          onChange={() => setAbo(a.id)}
                          className="accent-amber mt-1 size-4 shrink-0"
                        />
                        <span className="flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className="font-display text-bone text-[15px] font-semibold">
                              {a.name}
                            </span>
                            <span className="font-display text-amber text-[15px] font-semibold tabular-nums">
                              {a.preis} <span className="text-bone-dim font-normal">/ {a.menge}</span>
                            </span>
                          </span>
                          <span className="text-bone-dim mt-1 block text-sm leading-relaxed">
                            {a.note}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`${uid}-roestung`} className="text-bone">Röstung</Label>
                    <select
                      id={`${uid}-roestung`}
                      name="roestung"
                      className="border-border bg-bark-2 text-bone focus-visible:border-amber focus-visible:ring-amber/40 h-11 rounded-lg border px-3 text-sm outline-none focus-visible:ring-[3px]"
                    >
                      {roestungen.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`${uid}-mahlgrad`} className="text-bone">Mahlgrad</Label>
                    <select
                      id={`${uid}-mahlgrad`}
                      name="mahlgrad"
                      className="border-border bg-bark-2 text-bone focus-visible:border-amber focus-visible:ring-amber/40 h-11 rounded-lg border px-3 text-sm outline-none focus-visible:ring-[3px]"
                    >
                      {mahlgrade.map((m) => <option key={m}>{m}</option>)}
                    </select>
                    <p className="text-bone-dim text-[13px]">Gemahlen halten die Bohnen kürzer.</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`${uid}-name`} className="text-bone">Name</Label>
                    <Input
                      id={`${uid}-name`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      className="border-border bg-bark-2 text-bone h-11 rounded-lg"
                    />
                    {errors.name && (
                      <p id={`${uid}-name-err`} className="text-[13px] text-[#ff9b8a]">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`${uid}-email`} className="text-bone">E-Mail</Label>
                    <Input
                      id={`${uid}-email`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      className="border-border bg-bark-2 text-bone h-11 rounded-lg"
                    />
                    {errors.email && (
                      <p id={`${uid}-email-err`} className="text-[13px] text-[#ff9b8a]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={state === 'sending'}
                  className="bg-amber text-bark hover:bg-amber/90 mt-7 h-12 w-full rounded-full text-[15px] font-semibold sm:w-auto sm:px-8"
                >
                  {state === 'sending' ? 'Wird gesendet' : 'Bestellung abschicken'}
                </Button>
                <p className="text-bone-dim mt-3 text-[13px]">
                  Arbeitsprobe: es wird nichts verschickt und nichts gespeichert.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
