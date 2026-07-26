# Outreach

Companion to `SELLING.md` (strategy) and `LISTINGS.md` (marketplace copy).
Written 2026-07-26.

---

## The finding that decides the channel

Running the prospect finder against Austin produced 15 usable businesses with no
website. **All 15 had a phone number. None had an email address.**

That is not a gap in the tool, it is structural: a business with no website usually has
no company email either. Their address lives on a Google listing or a Facebook page,
neither of which is freely queryable at scale.

**So the channel is the phone.** Which is exactly what both reels actually do, under all
the talk of AI builders. Cold email stays in the plan only for the minority of prospects
where an address is genuinely published.

---

## What is legal where

Recipient location decides. Living in Germany changes nothing about which law applies.

| | Cold call | Cold email |
|---|---|---|
| **US** | Manual dialling to a business line is broadly fine. **No federal B2B exemption for cell phones**, and autodialed or prerecorded calls to a cell need prior express written consent. **Never use an autodialer or an AI voice.** | Legal under CAN-SPAM. Needs honest headers and subject, ad disclosure, a valid physical postal address, and opt-out honoured within 10 business days. Up to **$53,088 per non-compliant email**. |
| **UK** | Legal, but you must screen against **CTPS** first and must not withhold caller ID. ICO fines reach £500,000. | Legal to **Ltd companies and LLPs only**. Sole traders need consent, and a gmail-type address needs consent even when used for business. |
| **Germany** | **No.** Needs *mutmaßliche Einwilligung* you will not have. | **No.** §7 Abs. 2 Nr. 2 UWG, prior consent required, B2B included. |

**Avoid the strict mini-TCPA states** while you are learning: Florida, Washington,
Oklahoma, Maryland, New Jersey. They apply by the recipient's area code, not yours, and
they allow private lawsuits. Texas, Colorado, Ohio, Georgia, Arizona and Tennessee are
easier places to start.

Not legal advice. Confirm before running volume.

---

## The pitch

The one real insight in both reels: **you are not sending a portfolio, you are sending
them their own finished website.**

That changes the conversation from "would you like to buy something" to "this exists,
do you want it." It is also why you do not need US demo sites: the demo *is* their site.

Build it first. Then call.

---

## Call script

Read it once, then stop reading it. Sounding scripted is what kills these calls.

> "Hi, is this the owner? My name is Monther, I build websites for roofing companies.
> I'm not selling you anything on this call. I noticed you don't have a website, so I
> already built one for your business and put it online. It's at
> apexroofing-demo.com. Do you have thirty seconds to look at it while we talk?"

Then stop. Let them look.

Common responses and what to say:

- **"How much?"** > "Nine hundred dollars, one time, and it's yours. Hosting is free at
  this size. If you want me to keep it updated that's thirty-nine a month, but that's
  optional and you can say no."
- **"I don't need a website, I get everything from word of mouth."** > "That's fair, and
  I'm not going to argue with what's working. The only thing a site changes is the people
  who look you up before they call. It's already built, so have a look and if it's not
  useful, no hard feelings."
- **"Who is this? How did you get my number?"** > "It's on your Google listing. If you'd
  rather I didn't call again just say so and I'll take you off my list, that's not a
  problem." **Then actually do it.**
- **"Send me something."** > Get the email. That is a warm lead and CAN-SPAM is trivially
  satisfied when they asked.

**Rules:** call between 9am and 4pm their time, never before 8 or after 8. Never twice in
one day. Two attempts total, then stop. Log every "do not call" immediately and honour it
forever. One person's complaint costs more than ten sales are worth.

---

## Email, for the minority who publish an address

Only where the address is genuinely public, and never to a German recipient.

**Subject:** `Website for [Business Name]`

> Hi [Name],
>
> I build websites for [trade] businesses. I noticed [Business] doesn't have one, so I
> built you a working site and put it online:
>
> [link]
>
> It's finished, not a mockup. Real photos, your services, your hours, and it loads in
> under two seconds on a phone. If you want it, it's $900 one time and it's yours. If you
> don't, ignore this and I won't email again.
>
> Monther [Surname]
> [Full street address, city, postcode, country]
>
> This is an advertisement. Reply STOP or click here to never hear from me again: [link]

Every element in that footer is required by CAN-SPAM. The ad disclosure, the physical
address and the working opt-out are not optional garnish.

**[UNCLEAR] Whether a German postal address satisfies CAN-SPAM.** The FTC wording is
US-centric: a street address, a USPS-registered PO box, or a CMRA private mailbox. I could
find no source confirming or denying a foreign address. **Resolve this before the first US
send.** A US virtual mailbox costs roughly $10 to $20 a month and removes the question.

### Deliverability is what actually kills cold email

Legality is the easy part. Sending from a fresh domain at volume lands you in spam and
burns the domain permanently.

1. Buy a **separate** sending domain. Never send cold from the domain your real business
   or portfolio uses.
2. Set up SPF, DKIM and DMARC before the first send.
3. Warm it for **two to four weeks**: a handful of emails a day, rising slowly.
4. Cap at 30 to 50 a day per mailbox afterwards.
5. Plain text. No tracking pixels, no link shorteners, no images.
6. Keep a suppression list and check it before every send.

---

## Suppression list

Anyone who asks to be left alone goes here immediately, by phone or email, and never comes
off. Legally required in the US within 10 business days, but honour it the same day.

| Date | Business | Channel | How they asked |
|---|---|---|---|
| | | | |

---

## Log

| Week | Sites built | Calls | Reached owner | Interested | Sold | $ |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |

**Review 2026-08-25.** No sales and no interest after four weeks of real calling means the
method is dead for us and gets written up like the other nine.
