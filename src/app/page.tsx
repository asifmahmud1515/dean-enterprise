import { RegisterForm } from "@/components/RegisterForm";

const DIFFERENTIATORS = [
  {
    title: "Personalized, not planetary",
    body: "We don't scrape millions of stores and dump noise on you. Your dashboard watches only the handful of competitors your customers actually compare you to.",
  },
  {
    title: "Live every 3 hours",
    body: "Prices are re-checked around the clock. When a competitor moves, it shows up on your dashboard the same day — not next week.",
  },
  {
    title: "A weekly PDF, not a chore",
    body: "Every week, a short PDF lands in your inbox: what changed, who moved, and what it means for your pricing — built for a five-minute read.",
  },
  {
    title: "Built for you, not templated",
    body: "Your dashboard is set up around your specific catalog and your specific competitors — not a generic industry template.",
  },
  {
    title: "5 competitors, hand-picked for you",
    body: "Every dashboard ships with 5 competitors our team hand-picks for your shop, automatically — no research required on your end. Know specific rivals you want tracked too? Add them any time.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Register — no card",
    body: "Tell us who you are and where to find you. Takes two minutes, costs nothing.",
  },
  {
    n: "02",
    title: "We hand-pick 5 competitors",
    body: "Our team automatically selects 5 close competitors for your shop — no research required. Want specific rivals tracked instead or as well? Just tell us.",
  },
  {
    n: "03",
    title: "Your dashboard goes live",
    body: "Within 48 hours you get a personalized dashboard covering all 5 (plus any you named), refreshing every 3 hours.",
  },
  {
    n: "04",
    title: "Decide after 30 days",
    body: "Like it? Register properly for $50, covering your first three months. Don't? Walk away — nothing was ever charged.",
  },
];

const FAQS = [
  {
    q: "No credit card, really?",
    a: "Really. We build your first month's dashboard before you've paid us a cent. If it's not useful, you owe us nothing and we don't ask again.",
  },
  {
    q: "What happens after the free month?",
    a: "If you like what you see, you register and pay $50 — covering your first three months. If not, your dashboard simply stops. No downgrade calls, no cancellation forms.",
  },
  {
    q: "How is this different from a generic price-tracking tool?",
    a: "Most tools scrape thousands of sites and hand you a firehose. We build one dashboard around the handful of competitors that actually matter to your shop, so every alert is relevant.",
  },
  {
    q: "How do you decide which competitors to track?",
    a: "Your dashboard comes with 5 competitors our team hand-picks for you automatically based on your shop and industry — you don't have to do anything. Have specific rivals in mind? Tell us at registration or any time after, and we'll add or swap them in.",
  },
  {
    q: "How often does it update?",
    a: "Every 3 hours, around the clock. Combined with a weekly PDF summary so you're never stuck reading a live feed to stay informed.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="blinds relative overflow-hidden border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide uppercase"
            style={{ borderColor: "var(--border-strong)", color: "var(--ink-secondary)" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "var(--red)" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "var(--red)" }} />
            </span>
            Competitive price intelligence
          </div>

          <h1 className="font-display max-w-3xl text-6xl leading-[0.95] sm:text-7xl" style={{ color: "var(--ink)" }}>
            Your competitor changed a price.
            <br />
            <span style={{ color: "var(--gold)" }}>You should know by tonight.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--ink-secondary)" }}>
            Dean Enterprise builds a personalized pricing dashboard that watches your closest
            competitors — not the whole internet — and tells you the moment something changes.
            We hand-pick 5 competitors for you automatically, and you can always add your own.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#register"
              className="rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gold)", color: "var(--gold-ink)" }}
            >
              Register for your free month
            </a>
            <a href="#how-it-works" className="text-sm underline" style={{ color: "var(--ink-secondary)" }}>
              See how it works →
            </a>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["3 hrs", "refresh cycle"],
              ["5", "competitors, hand-picked"],
              ["$0", "to start"],
              ["1 / wk", "PDF report"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-3xl" style={{ color: "var(--ink)" }}>
                  {value}
                </div>
                <div className="text-xs" style={{ color: "var(--ink-muted)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
            Not another scraper-of-everything.
          </h2>
          <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--ink-secondary)" }}>
            Generic tools track the market. We track <em>your</em> market — 5 competitors we
            hand-pick for your shop automatically, plus any you want to add yourself.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
              >
                <div className="h-px w-8" style={{ background: "var(--gold)" }} />
                <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
            How it works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="font-display text-5xl" style={{ color: "var(--border-strong)" }}>
                  {s.n}
                </div>
                <h3 className="mt-2 text-base font-semibold" style={{ color: "var(--ink)" }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
            One honest offer.
          </h2>
          <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--ink-secondary)" }}>
            No tiers to compare, no annual-plan discount games. Just try it, and pay only if it
            earns its place in your week.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div
              className="rounded-xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
            >
              <div className="text-xs tracking-wide uppercase" style={{ color: "var(--ink-muted)" }}>
                Month one
              </div>
              <div className="font-display mt-1 text-5xl" style={{ color: "var(--ink)" }}>
                Free
              </div>
              <ul className="mt-5 space-y-2.5 text-sm" style={{ color: "var(--ink-secondary)" }}>
                <li>— 5 competitors hand-picked for you, automatically</li>
                <li>— Add your own competitors any time, no extra cost</li>
                <li>— Price checks every 3 hours</li>
                <li>— One weekly PDF report</li>
                <li>— No credit card on file, ever</li>
              </ul>
            </div>

            <div
              className="relative rounded-xl border-2 p-7"
              style={{ borderColor: "var(--gold)", background: "var(--surface-1)" }}
            >
              <div
                className="absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                style={{ background: "var(--gold)", color: "var(--gold-ink)" }}
              >
                If you like it
              </div>
              <div className="text-xs tracking-wide uppercase" style={{ color: "var(--ink-muted)" }}>
                Months two through four
              </div>
              <div className="font-display mt-1 text-5xl" style={{ color: "var(--gold)" }}>
                $50
                <span className="ml-2 text-base font-sans normal-case" style={{ color: "var(--ink-secondary)" }}>
                  for 3 months
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm" style={{ color: "var(--ink-secondary)" }}>
                <li>— Everything from month one, uninterrupted</li>
                <li>— You register only once you&apos;ve decided it&apos;s worth it</li>
                <li>— Cancel any time — nothing auto-renews without you</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
            Questions worth answering upfront
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-base font-semibold" style={{ color: "var(--ink)" }}>
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
              Find your personalized dashboard.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "var(--ink-secondary)" }}>
              First month free. No credit card. We hand-pick 5 competitors for you automatically —
              tell us about any specific ones below if you&apos;ve got them, or leave it blank.
            </p>
          </div>
          <div className="mt-10">
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
