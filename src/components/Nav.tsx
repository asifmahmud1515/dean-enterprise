import Link from "next/link";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 78%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none" style={{ color: "var(--ink)" }}>
            DEAN
          </span>
          <span className="font-display text-2xl leading-none" style={{ color: "var(--gold)" }}>
            ENTERPRISE
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: "var(--ink-secondary)" }}>
          <a href="#how-it-works" className="hover:text-[var(--ink)]">
            How it works
          </a>
          <a href="#pricing" className="hover:text-[var(--ink)]">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[var(--ink)]">
            FAQ
          </a>
        </nav>
        <a
          href="#register"
          className="rounded-md px-4 py-2 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02]"
          style={{ background: "var(--gold)", color: "var(--gold-ink)" }}
        >
          Register free
        </a>
      </div>
    </header>
  );
}
