"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  SERVICE_OPTIONS,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "../app/lib/contact-validation";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D62828] focus-visible:ring-offset-2";

// Change this when your privacy page exists.
const PRIVACY_HREF = "/datenschutz";

type Status = "idle" | "loading" | "success" | "error";

const fieldBase =
  "mt-1.5 block w-full min-h-12 rounded-lg border bg-white px-4 py-3 text-base text-[#222222] placeholder:text-neutral-500";

function fieldClass(hasError: boolean) {
  return `${fieldBase} ${
    hasError ? "border-[#B71F1F]" : "border-neutral-500"
  } ${focusRing}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-[#B71F1F]">
      <span aria-hidden="true">⚠ </span>
      <span className="sr-only">Fehler: </span>
      {message}
    </p>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  function focusFirstError(errs: ContactErrors) {
    const order: (keyof ContactFields)[] = [
      "name",
      "email",
      "phone",
      "service",
      "message",
    ];
    const first = order.find((key) => errs[key]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return; // prevent duplicate submissions

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const { data, errors: clientErrors } = validateContact(values);
    if (!data) {
      setErrors(clientErrors);
      setStatus("idle");
      focusFirstError(clientErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        formRef.current?.reset();
        setStatus("success");
        return;
      }

      if (response.status === 400) {
        const result = (await response.json().catch(() => null)) as {
          errors?: ContactErrors;
        } | null;
        if (result?.errors) {
          setErrors(result.errors);
          setStatus("idle");
          focusFirstError(result.errors);
          return;
        }
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isLoading}
      className="space-y-5"
    >
      <p className="text-sm text-neutral-600">
        Mit * markierte Felder sind Pflichtfelder.
      </p>

      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-semibold text-[#222222]"
        >
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-semibold text-[#222222]"
        >
          E-Mail-Adresse <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-semibold text-[#222222]"
        >
          Telefonnummer <span className="font-normal text-neutral-600">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={fieldClass(Boolean(errors.phone))}
        />
        <FieldError id="contact-phone-error" message={errors.phone} />
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="block text-sm font-semibold text-[#222222]"
        >
          Gewünschte Leistung <span className="font-normal text-neutral-600">(optional)</span>
        </label>
        <select
          id="contact-service"
          name="service"
          defaultValue=""
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "contact-service-error" : undefined}
          className={fieldClass(Boolean(errors.service))}
        >
          <option value="">Bitte auswählen</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id="contact-service-error" message={errors.service} />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-semibold text-[#222222]"
        >
          Ihre Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={fieldClass(Boolean(errors.message))}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <p className="text-sm leading-relaxed text-neutral-600">
        Ihre Angaben werden zur Bearbeitung Ihrer Anfrage verwendet und per
        E-Mail übermittelt. Weitere Informationen finden Sie in unserer{" "}
        <a
          href={PRIVACY_HREF}
          className={`font-medium text-[#222222] underline underline-offset-2 hover:text-[#D62828] ${focusRing}`}
        >
          Datenschutzerklärung
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#D62828] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#B71F1F] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${focusRing}`}
      >
        {isLoading ? "Wird gesendet …" : "Anfrage senden"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p
            role="status"
            className="rounded-lg border border-neutral-300 bg-white p-4 text-sm font-medium text-[#222222]"
          >
            <span aria-hidden="true">✓ </span>
            Vielen Dank! Ihre Anfrage wurde gesendet.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-[#B71F1F] bg-white p-4 text-sm font-medium text-[#B71F1F]"
          >
            <span aria-hidden="true">⚠ </span>
            Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es
            später erneut oder rufen Sie uns an.
          </p>
        )}
      </div>
    </form>
  );
}