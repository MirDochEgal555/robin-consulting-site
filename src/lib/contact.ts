export const contactFieldLimits = {
  name: 80,
  email: 160,
  company: 120,
  message: 2400,
  website: 120,
} as const;

export const contactMinMessageLength = 20;
export const contactMinSubmitDurationMs = 3_000;

export type ContactFieldName = "name" | "email" | "company" | "message";

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
  startedAt: string;
};

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ValidatedContactSubmission = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactValidationResult = {
  ok: boolean;
  fieldErrors: ContactFieldErrors;
  isLikelySpam: boolean;
  values: ContactFormValues;
  submission?: ValidatedContactSubmission;
};

function readFormValue(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n/g, "\n").trim();
}

function normalizeMessage(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getEmptyContactFormValues(): ContactFormValues {
  return {
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
    startedAt: "",
  };
}

export function validateContactSubmission(
  input: Partial<Record<keyof ContactFormValues, FormDataEntryValue | string | null | undefined>>,
): ContactValidationResult {
  const values: ContactFormValues = {
    name: readFormValue(input.name).slice(0, contactFieldLimits.name),
    email: normalizeEmail(readFormValue(input.email)).slice(0, contactFieldLimits.email),
    company: readFormValue(input.company).slice(0, contactFieldLimits.company),
    message: normalizeMessage(readFormValue(input.message)).slice(0, contactFieldLimits.message),
    website: readFormValue(input.website).slice(0, contactFieldLimits.website),
    startedAt: readFormValue(input.startedAt),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!values.name) {
    fieldErrors.name = "Please enter your name.";
  }

  if (!values.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    fieldErrors.email = "Please use a valid email address.";
  }

  if (!values.message) {
    fieldErrors.message = "Please describe what you need help with.";
  } else if (values.message.length < contactMinMessageLength) {
    fieldErrors.message = `Please add a bit more detail (${contactMinMessageLength}+ characters).`;
  }

  const startedAtMs = Number(values.startedAt);
  const submittedTooFast =
    !Number.isFinite(startedAtMs) ||
    startedAtMs <= 0 ||
    Date.now() - startedAtMs < contactMinSubmitDurationMs;

  const isLikelySpam = Boolean(values.website) || submittedTooFast;

  return {
    ok: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    isLikelySpam,
    values,
    submission:
      Object.keys(fieldErrors).length === 0
        ? {
            name: values.name,
            email: values.email,
            company: values.company,
            message: values.message,
          }
        : undefined,
  };
}

export function buildFallbackMailto(email: string, values: Partial<ContactFormValues>) {
  const trimmedName = readFormValue(values.name);
  const trimmedCompany = readFormValue(values.company);
  const trimmedEmail = normalizeEmail(readFormValue(values.email));
  const trimmedMessage = normalizeMessage(readFormValue(values.message));

  const subjectDetail = trimmedName || trimmedCompany || "website inquiry";
  const subject = `Consulting inquiry from ${subjectDetail}`;
  const body = [
    trimmedName ? `Name: ${trimmedName}` : "",
    trimmedCompany ? `Company: ${trimmedCompany}` : "",
    trimmedEmail ? `Email: ${trimmedEmail}` : "",
    "",
    trimmedMessage || "Please share a short summary of the project or decision.",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
