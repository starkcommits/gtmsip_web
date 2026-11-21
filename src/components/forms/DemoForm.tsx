import { useState, type FormEvent } from "react";
import { Field, Honeypot } from "../Field";
import { CheckCircleIcon } from "../icons";

interface FormValues {
  fullName: string;
  workEmail: string;
  company: string;
  teamSize: string;
  interest: string;
  message: string;
  honeypot: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL: FormValues = {
  fullName: "",
  workEmail: "",
  company: "",
  teamSize: "",
  interest: "",
  message: "",
  honeypot: "",
};

/**
 * Interactive demo booking form with client-side validation,
 * spam honeypot, accessible error messages and a confirmation state.
 */
export function DemoForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set =
    (key: keyof FormValues) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your name.";
    if (!values.workEmail.trim()) {
      next.workEmail = "Please enter your work email.";
    } else if (!EMAIL_RE.test(values.workEmail.trim())) {
      next.workEmail = "That doesn't look like a valid email address.";
    }
    if (!values.company.trim()) next.company = "Please enter your company or brand.";
    if (!values.teamSize) next.teamSize = "Please choose a team size.";
    return next;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (values.honeypot) return; // bot filled the honeypot — drop silently
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`demo-${firstKey}`)?.focus();
      return;
    }
    setStatus("submitting");
    // Front-end only: no data leaves this page in the demo build.
    window.setTimeout(() => setStatus("success"), 650);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="card animate-fadeUp flex flex-col items-start gap-3 p-6 sm:p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300">
          <CheckCircleIcon size={24} />
        </span>
        <h3 className="text-xl font-extrabold">Request received</h3>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Thanks, {values.fullName.trim().split(" ")[0]} — we've logged your
          request to book a GTMSip demo for {values.company.trim()}. We'll reply
          to <strong className="font-bold text-stone-800 dark:text-white">{values.workEmail.trim()}</strong>{" "}
          to confirm a time. (This preview build doesn't send data anywhere.)
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setValues(INITIAL);
            setStatus("idle");
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card p-6 sm:p-8"
      aria-labelledby="demo-form-title"
    >
      <h3 id="demo-form-title" className="text-lg font-extrabold">
        Book a demo
      </h3>
      <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
        Tell us a little about your team — we'll tailor the walkthrough to your
        WhatsApp and Instagram workflows.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          as="input"
          label="Full name"
          name="fullName"
          required
          autoComplete="name"
          placeholder="Aarav Sharma"
          value={values.fullName}
          onChange={set("fullName")}
          error={errors.fullName}
        />
        <Field
          as="input"
          label="Work email"
          name="workEmail"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={values.workEmail}
          onChange={set("workEmail")}
          error={errors.workEmail}
        />
        <Field
          as="input"
          label="Company / brand"
          name="company"
          required
          autoComplete="organization"
          placeholder="Bloom Studio"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
        />
        <Field
          as="select"
          label="Team size"
          name="teamSize"
          required
          value={values.teamSize}
          onChange={set("teamSize")}
          error={errors.teamSize}
        >
          <option value="">Select team size</option>
          <option value="1-5">1–5 people</option>
          <option value="6-20">6–20 people</option>
          <option value="21-50">21–50 people</option>
          <option value="50+">50+ people</option>
        </Field>
        <Field
          as="select"
          label="Most interested in"
          name="interest"
          value={values.interest}
          onChange={set("interest")}
          hint="Optional — helps us prep the right screens."
        >
          <option value="">Choose a focus</option>
          <option value="inbox">WhatsApp CRM & shared inbox</option>
          <option value="comment-to-dm">Instagram comment-to-DM</option>
          <option value="broadcasts">Broadcasts & drip flows</option>
          <option value="payments">Pipelines & Razorpay payments</option>
          <option value="agency">Agency multi-brand workspaces</option>
        </Field>
        <Field
          as="textarea"
          label="Anything we should know?"
          name="message"
          rows={3}
          placeholder="We handle ~400 WhatsApp chats a day across two brands…"
          value={values.message}
          onChange={set("message")}
          hint="Optional."
        />
      </div>

      <Honeypot name="website" value={values.honeypot} onChange={set("honeypot")} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a demo"}
      </button>
      <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
        No spam. We use your details only to arrange the demo — see our{" "}
        <a href="/legal/privacy" className="font-semibold underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
