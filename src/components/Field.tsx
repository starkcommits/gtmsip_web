import { useId, type ReactNode } from "react";
import { AlertIcon } from "./icons";

interface FieldBase {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  autoComplete?: string;
  type?: string;
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Accessible form field: label, hint, error message wired via
 * aria-describedby + aria-invalid. Works for input, textarea and select.
 */
export function Field({
  as = "input",
  label,
  name,
  error,
  hint,
  required,
  placeholder,
  value,
  onChange,
  onBlur,
  autoComplete,
  type = "text",
  disabled,
  children,
  rows = 4,
}: FieldBase & {
  as?: "input" | "textarea" | "select";
  rows?: number;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    name,
    value,
    required,
    disabled,
    onChange,
    onBlur,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    className: `field-input ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15 dark:border-red-400/60" : ""}`,
  };

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {as === "textarea" ? (
        <textarea {...shared} rows={rows} />
      ) : as === "select" ? (
        <select {...shared} className={`${shared.className} appearance-none`}>
          {children}
        </select>
      ) : (
        <input {...shared} type={type} />
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-stone-500 dark:text-stone-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          <AlertIcon size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/**
 * Honeypot field — visually hidden, hidden from keyboards and
 * assistive tech. A filled value indicates a bot submission.
 */
export function Honeypot({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
    >
      <label htmlFor={`hp-${name}`}>Do not fill this in</label>
      <input
        id={`hp-${name}`}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
