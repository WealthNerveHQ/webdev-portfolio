# What happens after they say yes

Pricing, handover and payment. Companion to `OUTREACH.md` (getting the call) and
`SELLING.md` (strategy). Written 2026-07-27.

---

## 1. Price

### The number for the first three clients: $500

Not because the work is worth $500. Because **your first three sales are not for money,
they are for proof**: a real logo on your portfolio, a testimonial, a referral, and the
experience of hearing the objections out loud.

Why not higher: a barber shop is a low-margin cash business. A three-chair barber is not
signing off $3,000 on a cold call. Why not lower: under about $300 you signal "cheap
offshore template", which is exactly what you are competing against and cannot beat on
price anyway.

| Client | Price | Why |
|---|---|---|
| 1 to 3 | **$500** | Buying proof, not profit. Introductory rate, and say that word: it explains the number and protects your future pricing. |
| 4 to 10 | **$900** | You now have references. Roughly the honest market rate for a real one-pager for a US small business. |
| After | **$1,200 to $1,800** | Only once you can show three live sites and name three happy owners. |

Trades (roofers, electricians, plumbers) carry **roughly double** what a barber or cafe
will pay, because one job is worth thousands to them. Same site, different willingness to
pay. Price by what the client earns, not by what you built.

### Rules for saying the number

- **Never open with price.** Let them look at the site first. The number is an answer, not
  an offer.
- Say it flatly, then **stop talking**. The silence after a price is the client deciding.
  If you fill it, you negotiate against yourself.
- **"That's too expensive"** is not a no, it is a request for a smaller commitment. Answer
  with a split, never a discount: *"I can do two payments of $250, one now, one when it's
  live."* Discounting teaches them the first number was fake.
- **"Let me think about it"** means it is not concrete yet. Answer: *"Sure. Can I put your
  real hours and prices in first, so you're deciding on the finished thing rather than my
  guesses? Takes me twenty minutes."* Then call back in two days. Once.

---

## 2. What they actually receive

Right now the site lives at
`wealthnervehq.github.io/webdev-portfolio/elmexabarber/`. **That is not deliverable.** It
sits on a subpath of your portfolio, under your brand, and it is set to `noindex`.

Handover means four things:

| Thing | What to do | Cost to you |
|---|---|---|
| **Domain** | Register `elmexabarber.com` or similar. Cloudflare Registrar sells at cost. | ~$11/year |
| **Hosting** | Cloudflare Pages or Netlify free tier. Custom domain and HTTPS included. | $0 |
| **The site** | Move to its own repo, drop the `/webdev-portfolio/` base path, remove the `noindex` line. | 20 minutes |
| **Search presence** | Add the domain to their Google Business Profile. This is what they will actually notice, because it makes the website button appear on Maps. | 10 minutes |

**Register the domain in their name, with their email as the contact.** You can pay for it
and bill it back. Never hold a client's domain in your own account as leverage. It poisons
referrals, and one owner telling other Austin barbers you held their domain hostage costs
more than the retainer was ever worth.

### Go-live checklist

1. Get their real hours, real service list, real prices. Fix my guesses.
2. Ask for 5 to 10 photos of the actual shop. Real photos beat stock every time, and asking
   makes them feel ownership of the result.
3. Register the domain, point it at Cloudflare Pages.
4. Remove `<meta name="robots" content="noindex">`.
5. Add the domain to their Google Business Profile.
6. Send the link plus a one-page "how to ask me for changes" note.

---

## 3. One-time or recurring: both

**Build fee is one-time. The care plan is where the business actually is.**

> **$500 one time** for the site, and **$39 a month** if you want me to look after it.
> The monthly is optional and you can stop it any time.

The monthly has to contain real things, or it is a fake charge:

- Domain renewed and paid, hosting kept running
- Up to **30 minutes of changes a month** (hours, prices, photos, a new service)
- Uptime monitoring, so you know it is down before they do
- Backups, and a yearly once-over

### Why this matters more than the build fee

Your cost to serve is about **$1 a month** (domain amortised, hosting free). Everything else
is your time, and 30 minutes of edits is usually 5.

| Clients on $39/mo | Monthly | Yearly |
|---|---|---|
| 5 | $195 | $2,340 |
| 20 | $780 | $9,360 |
| 40 | $1,560 | $18,720 |

Twenty clients is $780 arriving whether or not you sell anything new. **That is the
difference between freelancing and owning something.** One-off builds are a treadmill: you
are only as good as next month's cold calls.

Attach it to every deal, even discounted, even free for the first three months. The point is
that the line exists on the invoice from day one. Adding it later is a new negotiation.

### The promise that makes it ethical, and sells better

Put this in writing:

> Cancel any time. If you do, I transfer the domain to you and hand over the site, free.

It costs nothing, removes the "am I locked in" objection entirely, and is the correct way to
treat someone's business presence.

---

## 4. Getting paid, from Germany

| Method | Good for | Fee | Notes |
|---|---|---|---|
| **Stripe payment link** | Everything, especially recurring | ~2.9% + $0.30 | Best long-term. Handles USD and subscriptions from a German business. Needs your business details. |
| **PayPal invoice** | Your first sale, today | ~3.5% cross-border | Fastest to start, and US small businesses trust it. Higher fee, worth it to remove friction on sale one. |
| **Wise** | One-off larger invoices | low | Poor for subscriptions. |

**For the first client, use a PayPal invoice.** You can set it up this afternoon. Move to
Stripe once you are selling the $39/mo plan, because you do not want to chase a monthly
payment by hand.

### When to take the money

First client: **"Pay when it's live on your domain."**

You are a stranger who cold-called them from another country. Asking $500 upfront is the
single biggest reason a warm call goes cold. Your actual risk is one domain registration,
about $11, and an hour of work. Take that risk. You need the first yes far more than the
protection.

From client four, once you have references: **50% to start, 50% on go-live.**

### The boring but necessary part

You will be earning income in Germany. That means registering a **Gewerbe** at the
Gewerbeamt (roughly €20 to €60), and almost certainly the **Kleinunternehmerregelung**
(§19 UStG) while turnover is small, which spares you charging and filing VAT. Services sold
to US customers are generally outside German VAT anyway, because the place of supply is
where the customer is.

Do this before the money starts arriving, not after. Not tax advice: confirm with a
Steuerberater or the Gewerbeamt.

---

## 5. The one-paragraph version

Five hundred dollars for the first three, then nine hundred. Never say the price before they
have seen the site. Thirty-nine a month on top, optional, cancellable, and it must include
real work. Register their domain in their name. Host free on Cloudflare Pages. Take the
first payment by PayPal invoice after it is live, because your risk is eleven dollars and
their trust is the whole deal.
