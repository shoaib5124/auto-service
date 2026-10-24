export const SERVICE_OPTIONS = [
  "Ölwechsel",
  "Inspektion",
  "Zündkerzen & Zündspulen",
  "Bremsenservice",
  "Federn & Lenker",
  "Bremsflüssigkeitswechsel",
  "Kühlmittelwechsel",
  "Klimaservice & Klimawartung",
  "Sonstiges",
] as const;

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s/]{5,30}$/;

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: unknown): {
  data: ContactFields | null;
  errors: ContactErrors;
} {
  const raw =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const data: ContactFields = {
    name: toTrimmedString(raw.name),
    email: toTrimmedString(raw.email),
    phone: toTrimmedString(raw.phone),
    service: toTrimmedString(raw.service),
    message: toTrimmedString(raw.message),
  };

  const errors: ContactErrors = {};

  if (!data.name) {
    errors.name = "Bitte geben Sie Ihren Namen ein.";
  } else if (data.name.length > 100) {
    errors.name = "Der Name darf höchstens 100 Zeichen lang sein.";
  }

  if (!data.email) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
  } else if (data.email.length > 254 || !EMAIL_RE.test(data.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (data.phone && !PHONE_RE.test(data.phone)) {
    errors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
  }

  if (
    data.service &&
    !(SERVICE_OPTIONS as readonly string[]).includes(data.service)
  ) {
    errors.service = "Bitte wählen Sie eine Leistung aus der Liste.";
  }

  if (!data.message) {
    errors.message = "Bitte schreiben Sie uns eine Nachricht.";
  } else if (data.message.length < 10) {
    errors.message = "Bitte schreiben Sie mindestens 10 Zeichen.";
  } else if (data.message.length > 2000) {
    errors.message = "Die Nachricht darf höchstens 2000 Zeichen lang sein.";
  }

  return Object.keys(errors).length > 0
    ? { data: null, errors }
    : { data, errors };
}