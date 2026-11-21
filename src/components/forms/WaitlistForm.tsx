import { useState, type FormEvent } from "react";
import { Field, Honeypot } from "../Field";
import { CheckCircleIcon } from "../icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Inline waitlist signup for the COMING SOON "Plan & publish" module.
 * Client-side validation + honeypot + confirmation state.
 */
export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (honeypot) return;
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("That doesn't look like a valid email address.");
      return;
    }
    setError(null);
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 550);
  };

  if (status === "success") {
    return (
      <div className="relative">
        {/* confetti-light particle burst */}
        <span aria-hidden="true" className="pointer-events-none absolute -top-6 left-1/2 z-10 h-0 w-0">
          {Array.from({ length: 18 }, (_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const dist = 46 + ((i * 37) % 50);
            return (
              <span
                key={i}
                className="confetti-bit absolute block h-1.5 w-1.5 rounded-[2px]"
                style={{
                  background: ["#8B5CF6", "#22D3EE", "#34D399", "#FBBF24"][i % 4],
                  ["--cx" as string]: `${Math.cos(angle) * dist}px`,
                  ["--cy" as string]: `${Math.sin(angle) * dist + 30}px`,
                  ["--cr" as string]: `${200 + i * 37}deg`,
                  animationDelay: `${(i % 6) * 0.03}s`,
                } as React.CSSProperties}
              />
            );
          })}
        </span>
        <p
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-brand-300 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800 animate-fadeUp dark:border-brand-400/30 dark:bg-brand-400/10 dark:text-brand-200"
        >
          <CheckCircleIcon size={18} className="shrink-0" />
          You're on the list — we'll email you when Plan &amp; Publish early access opens.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact ? "" : "max-w-xl"}
      aria-label="Plan and Publish waitlist"
    >
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="flex-1">
          <Field
            as="input"
            label="Email address"
            name="waitlistEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(null);
            }}
            error={error ?? undefined}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary h-[46px] shrink-0 self-start sm:self-auto"
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <Honeypot name="bot_field" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      <p className="mt-2.5 text-xs text-stone-500 dark:text-stone-400">
        One email when it ships. Nothing else — see the{" "}
        <a href="/legal/privacy" className="font-semibold underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
