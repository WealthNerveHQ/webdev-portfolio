# How to actually sell these

Companion to `LISTINGS.md`, which holds the paste-ready marketplace copy. This file is
the strategy behind it. Written 2026-07-26.

---

## 1. The honest problem with what we have

Two beautiful demo sites for **businesses that do not exist**.

Every prospective client asks the same question: *"who have you built this for?"* Right now
the answer is "nobody yet." Fictional demos prove you can build. They do not prove anyone
trusted you with money, and trust is what a Handwerksmeister is buying.

**This is the single biggest gap, and it is fixable in about two weeks.** Everything below
is ordered around closing it.

---

## 2. The channel you were told you cannot use, and the one you actually cannot

This matters, because the plan so far assumed all direct outreach was illegal. It is not.

| Channel | Legal in Germany? | Source |
|---|---|---|
| **Walking in and talking to the owner** | **Yes.** §7 UWG covers telephone and electronic advertising. A face-to-face conversation is not that. | - |
| **Addressed postal letter (Briefwerbung)** | **Yes, generally permitted without prior consent, B2B and B2C.** You must stop if the recipient objects, and respect "keine Werbung" stickers. | [IHK Region Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/wettbewerbsrecht/richtig-werben/was-ist-erlaubt-684868), [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/werbung-per-telefon-fax-und-e-mail-5224338) |
| **Referrals from existing clients** | **Yes.** The client initiates. | - |
| **Marketplace (Fiverr, freelance.de)** | **Yes.** The client initiates. | - |
| ~~Cold email~~ | **No.** §7 Abs. 2 Nr. 2 UWG requires prior express consent, B2B included. | IHK, as above |
| ~~Cold calling~~ | **No** to consumers; to businesses only with presumed consent, which you will not have. | IHK, as above |

**So: you have three legal direct channels and you are using none of them.** A printed
letter to fifty Stuttgart Handwerksbetriebe is legal, cheap (about €0.85 each), and gets
read far more often than email. Walking into a shop you are already a customer of is
legal, free, and converts better than anything on this list.

*Not legal advice. The IHK pages above are the primary source; confirm with a lawyer
before running a large mailing, and honour every objection immediately.*

---

## 3. Fiverr is where you get reviews, not where you get paid

A new Fiverr seller has no reviews, and Fiverr's search buries gigs with no sales history.
Expect weeks before the first order, and expect it to be cheap. That is not a reason to
skip it, it is a reason to understand what it is for: **the first 3 to 5 jobs buy you
social proof, not profit.** Fiverr also takes 20%.

The money is in direct local clients, where the same work sells for several times the
Fiverr price and nobody takes a cut.

### Pricing, roughly, for the German market

Market ranges, not guarantees. Adjust once you have closed three deals and know your speed.

| Work | Fiverr | Direct local client |
|---|---|---|
| One-pager, client supplies text | €140 | €800 to €1,400 |
| 4 to 6 pages, you write the German copy | €320 to €640 | €1,500 to €2,800 |
| Handwerk site with photos, forms, legal pages | - | €2,000 to €3,500 |
| Fixing an existing site (DSGVO, speed, mobile) | €90 | €400 to €900 |

**Charge a 50% deposit before you start.** Every freelancer learns this the expensive way.

---

## 4. The part that turns this into a business: recurring revenue

One-off builds are a treadmill. You are only as good as next month's new client.

Add a **Pflegepaket** to every single deal:

> **€39 im Monat:** Updates, Backups, kleine Textänderungen (bis 30 Minuten im Monat),
> Erreichbarkeitskontrolle, jährlicher DSGVO-Check.

Twenty clients on €39 is **€780 every month before you build anything new**. That is the
difference between freelancing and owning something. Sell it as insurance, not as a
feature: the site stays online, legal, and current without them thinking about it.

Hosting genuinely costs you nothing at this scale (GitHub Pages, Netlify free tier), so
the margin is close to your time.

---

## 5. The wedge: sell the legal problem, not the website

"I build websites" competes with ten thousand people and every AI site builder.

**"Ihre Website verstösst gerade gegen die DSGVO, und das kann teuer werden"** is a
different conversation, and it is one you can prove in thirty seconds on your phone.

Enormous numbers of German small-business sites still load Google Fonts from the CDN.
LG München I (Az. 3 O 17493/20, 20.01.2022) awarded damages for exactly that. Add the
sites with no Impressum or a copy-pasted Datenschutzerklärung that does not match what
the site actually does, and you have a real, checkable, urgent problem.

Both portfolio sites already demonstrate the fix. That is the pitch.

### The strongest inbound idea: a free DSGVO check on your own site

Add a page where a business owner types their URL and gets a plain-German report:
Google Fonts loading from Google, missing Impressum, missing or generic Datenschutz,
mobile speed. Free, instant, no signup.

That makes **them** contact **you**, which sidesteps §7 UWG entirely, and every person who
runs it has self-identified as someone with a problem you fix. It is the single highest
leverage thing you could build next, and you already have the checking logic in
`scripts/verify.ps1`.

---

## 6. What to do, in order

### Week 1: turn fictional into real
Get **three real businesses live**. Not strangers. People where a conversation already
exists: your barber, your mechanic, the Späti you buy from, the gym, a relative's
business, a friend of the family. Walk in. Do not email.

> "Ich baue Websites. Ihre ist gerade [nicht auf dem Handy lesbar / gar nicht da /
> rechtlich angreifbar]. Ich mache Ihnen eine, kostenlos. Wenn sie Ihnen gefällt,
> zahlen Sie was sie Ihnen wert ist, und empfehlen Sie mich weiter. Wenn nicht,
> kostet es Sie nichts."

Almost nobody says no to that. You are trading three sites for the thing you cannot buy:
real names, real logos, real testimonials, real before-and-after screenshots.

### Week 2: list, and stay listed
Publish the Fiverr gig and the freelance.de profile from `LISTINGS.md`. Free, passive,
occasionally lucky. Do not expect it to carry you.

### Week 3: replace the demos
Swap the fictional case studies on the portfolio index for the three real ones. Keep
Kesselstrom and Röstwerk further down as "Konzeptarbeiten". Now the page answers the
trust question before it is asked.

### Week 4: charge, and ask
Raise to €900 to €1,500. Ask each of the three happy clients for **two names** each. A
referral closes at maybe one in three; a cold contact closes at one in fifty. Send fifty
letters to Stuttgart Handwerksbetriebe in the same week, since that is legal and cheap.

### Every deal, from the first one
Attach the €39 Pflegepaket. Even at a discount. Even free for the first three months.
Get them used to the line item.

---

## 7. What "profit" realistically looks like

Not a promise. A shape, so you can tell whether it is working.

| Month | Plausible if it goes well | Signal it is not working |
|---|---|---|
| 1 | €0 to €300. Three free builds, first reviews. | Nobody says yes to a free site. The offer or the approach is wrong, not the market. |
| 2 | €800 to €2,000. First one or two paid jobs from referrals. | Three real clients produced zero referrals and zero enquiries. |
| 3 | €1,500 to €4,000, plus €100 to €300 recurring. | Still no inbound with a real portfolio live. |

**The review date is 2026-08-25.** If by then there are no real clients and no enquiries,
method 01 is dead for us and gets written up as such, exactly like the other nine.

---

## 8. Log

Fill this in weekly. Empty rows after a month are the answer.

| Week | Walk-ins | Letters sent | Fiverr views | Enquiries | Quotes | Closed | € |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
