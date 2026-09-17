# Dean Enterprise

Marketing site for Dean Enterprise — personalized competitor price-intelligence dashboards for shops. Noir-styled, dark by design.

## Offer, as presented on the site

- **Month one is free.** No credit card, no trial-cancellation games.
- **If you like it**, you register and pay **$50 for your first three months**.
- Personalized dashboard tracking only your close competitors (not a mass scraper), refreshed every 3 hours, plus a weekly PDF report.

## Stack

Next.js + Tailwind, same setup as the Desky Pricing Intelligence project. `next/font/google` loads Bebas Neue for display headlines and Geist for body text.

## Registrations

`src/lib/config.ts` sets `REGISTRATION_EMAIL` (currently `info.deanenterprise@gmail.com`). The register form opens a pre-filled `mailto:` draft to that address — no backend, no credentials needed. Swap for a real form handler (Resend, a CRM webhook, etc.) later if you want submissions to land somewhere more durable than an outbox.

## Commands

```bash
npm run dev
npm run build
npm run start
```
