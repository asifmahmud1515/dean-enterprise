"use client";

import { useState, type FormEvent } from "react";
import { REGISTRATION_EMAIL } from "@/lib/config";

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const company = String(form.get("company") ?? "");
    const website = String(form.get("website") ?? "");
    const competitors = String(form.get("competitors") ?? "");

    const subject = `New Dean Enterprise registration — ${company || name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Shop / company: ${company}`,
      `Store URL: ${website}`,
      ``,
      `Specific competitors requested (in addition to our 5 hand-picked):`,
      competitors || "(none — go with your 5 picks)",
    ].join("\n");

    const mailto = `mailto:${REGISTRATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border p-8 text-center"
        style={{ borderColor: "var(--border-strong)", background: "var(--surface-1)" }}
      >
        <div className="font-display text-3xl" style={{ color: "var(--gold)" }}>
          Almost there
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "var(--ink-secondary)" }}>
          Your email client should have opened with your details ready to send. Fire it off and
          we&apos;ll have your personalized dashboard live within 48 hours — no card, nothing to
          cancel.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm underline"
          style={{ color: "var(--ink-muted)" }}
        >
          Edit and resend
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border p-6 sm:p-8"
      style={{ borderColor: "var(--border-strong)", background: "var(--surface-1)" }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jordan Hale" required />
        <Field label="Work email" name="email" type="email" placeholder="you@yourshop.com" required />
        <Field label="Shop / company name" name="company" placeholder="Hale & Co." required />
        <Field label="Your store URL" name="website" placeholder="yourshop.com" required />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium tracking-wide uppercase" style={{ color: "var(--ink-muted)" }}>
          Specific competitors to include (optional, one per line)
        </label>
        <p className="mb-2 text-xs" style={{ color: "var(--ink-muted)" }}>
          We hand-pick 5 competitors for you automatically — this is only if you already have
          specific ones in mind.
        </p>
        <textarea
          name="competitors"
          rows={3}
          placeholder={"competitor-one.com\ncompetitor-two.com\ncompetitor-three.com"}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--gold)]"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--ink)" }}
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md py-3 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.01]"
        style={{ background: "var(--gold)", color: "var(--gold-ink)" }}
      >
        Get my personalized dashboard — first month free
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: "var(--ink-muted)" }}>
        No credit card. No trial to remember to cancel. Opens an email to send us your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide uppercase" style={{ color: "var(--ink-muted)" }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--gold)]"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--ink)" }}
      />
    </div>
  );
}
