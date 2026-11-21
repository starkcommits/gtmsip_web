import { useState, type FormEvent } from "react";
import { Field, Honeypot } from "../Field";
import { CheckCircleIcon, ZapIcon } from "../icons";
import { saveWaitlistEntry, useWaitlistCount } from "../../lib/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\+]?[(]?[0-9]{2,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,6}$/;

interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  organization: string;
  honeypot: string;
}

const INITIAL: FormValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  organization: "",
  honeypot: "",
};

export function WaitlistOnboardingForm({
  onSuccess,
  compact = false,
}: {
  onSuccess?: (spotNumber: number) => void;
  compact?: boolean;
}) {
  const { count, total, remaining } = useWaitlistCount();
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [assignedSpot, setAssignedSpot] = useState<number | null>(null);

  const set =
    (key: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) {
      next.fullName = "Please enter your full name.";
    }
    if (!values.phoneNumber.trim()) {
      next.phoneNumber = "Please enter your phone number.";
    } else if (!PHONE_RE.test(values.phoneNumber.trim())) {
      next.phoneNumber = "Please enter a valid phone number (e.g. +1 555-0123).";
    }
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "That doesn't look like a valid email address.";
    }
    if (!values.organization.trim()) {
      next.organization = "Please enter your organization or brand.";
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (values.honeypot) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    try {
      const { spotNumber } = await saveWaitlistEntry({
        fullName: values.fullName.trim(),
        phoneNumber: values.phoneNumber.trim(),
        email: values.email.trim(),
        organization: values.organization.trim(),
      });
      setAssignedSpot(spotNumber);
      setStatus("success");
      onSuccess?.(spotNumber);
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success" && assignedSpot !== null) {
    return (
      <div
        role="status"
        className="card animate-fadeUp flex flex-col items-center text-center p-6 sm:p-10"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400">
          <CheckCircleIcon size={32} />
        </span>
        
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:bg-brand-400/15 dark:text-brand-300">
          <ZapIcon size={13} />
          Spot #{assignedSpot} of {total} Reserved!
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
          You're on the early-access list!
        </h3>
        
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Welcome aboard, <strong className="text-stone-900 dark:text-white">{values.fullName.trim()}</strong>. 
          Your early-bird <strong className="text-brand-600 dark:text-brand-400">50% lifetime launch offer</strong> is locked in for <strong className="text-stone-900 dark:text-white">{values.organization.trim()}</strong>.
        </p>

        <div className="mt-5 w-full max-w-sm rounded-xl border border-stone-200 bg-stone-50 p-4 text-left text-xs text-stone-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400">
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Waitlist Rank:</span>
            <span className="font-bold text-stone-900 dark:text-white">#{assignedSpot} of {total}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Special Offer:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">50% Lifetime VIP Access</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Updates sent to:</span>
            <span className="font-medium text-stone-900 dark:text-white truncate max-w-[180px]">{values.email.trim()}</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-stone-500 dark:text-stone-400">
          We'll send your invite & onboarding key as soon as the first wave launches.
        </p>
      </div>
    );
  }

  const progressPercent = Math.min(100, Math.round((count / total) * 100));

  return (
    <div className={`card overflow-hidden p-6 sm:p-8 ${compact ? "" : "max-w-xl mx-auto"}`}>
      {/* Special Offer Header */}
      <div className="mb-6 rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-transparent p-4 dark:border-brand-400/25 dark:bg-white/[0.04]">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-700 dark:text-brand-300">
            <ZapIcon size={14} className="text-amber-500" />
            Special Launch Offer
          </span>
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            First 100 Users
          </span>
        </div>
        <p className="mt-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
          Join today to unlock <span className="font-bold text-brand-600 dark:text-brand-400">50% lifetime discount</span>, free custom AI workflow setup & prioritized API access.
        </p>

        {/* Spots tracker counter */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
            <span>Spots claimed:</span>
            <span className="text-brand-600 dark:text-brand-400 font-extrabold font-mono text-sm">
              {count} / {total}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-600 transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <p className="mt-1.5 text-right text-[11px] font-bold text-amber-600 dark:text-amber-400">
            ⚡ Only {remaining} spots remaining
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Join the GTMSip waitlist">
        <Honeypot value={values.honeypot} onChange={set("honeypot")} />
        
        <div className="space-y-4">
          <Field
            label="Full Name"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Sarah Jenkins"
            value={values.fullName}
            onChange={set("fullName")}
            error={errors.fullName}
          />

          <Field
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+1 (555) 012-3456"
            value={values.phoneNumber}
            onChange={set("phoneNumber")}
            error={errors.phoneNumber}
          />

          <Field
            label="Work Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="sarah@bloomstudio.com"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
          />

          <Field
            label="Organization / Company"
            name="organization"
            required
            autoComplete="organization"
            placeholder="Bloom Studio Inc."
            value={values.organization}
            onChange={set("organization")}
            error={errors.organization}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary mt-6 w-full py-3.5 text-base font-bold shadow-[0_12px_28px_-10px_rgba(124,58,237,0.8)]"
        >
          {status === "submitting" ? "Securing your spot…" : "Join the Waitlist & Claim Offer"}
        </button>

        <p className="mt-3 text-center text-[11px] text-stone-500 dark:text-stone-400">
          🔒 No spam. We only notify you when early access opens for your organization.
        </p>
      </form>
    </div>
  );
}
