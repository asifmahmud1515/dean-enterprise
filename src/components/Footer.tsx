import { COMPANY_NAME } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="font-display text-3xl" style={{ color: "var(--border-strong)" }}>
          DEAN ENTERPRISE
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "var(--ink-muted)" }}>
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}. Personalized competitor price intelligence.
          </span>
          <span>No credit card. No trial gimmicks. Just a dashboard that watches your market.</span>
        </div>
      </div>
    </footer>
  );
}
