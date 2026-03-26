"use client";

import { useState } from "react";
import { buildFallbackMailto, getEmptyContactFormValues, validateContactSubmission } from "@/lib/contact";
import { siteContent } from "@/content/site-content";

type SubmissionState = {
  kind: "idle" | "success" | "error";
  message: string;
  fallbackMailto?: string;
};

type ContactFieldErrors = ReturnType<typeof validateContactSubmission>["fieldErrors"];

const defaultSubmissionState: SubmissionState = {
  kind: "idle",
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/20";

export function ContactForm() {
  const [values, setValues] = useState(() => ({
    ...getEmptyContactFormValues(),
    startedAt: Date.now().toString(),
  }));
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>(defaultSubmissionState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof typeof values>(field: K, value: (typeof values)[K]) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (field in fieldErrors) {
      setFieldErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateContactSubmission(values);

    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setSubmissionState({
        kind: "error",
        message: "Please review the highlighted fields and try again.",
        fallbackMailto: buildFallbackMailto(siteContent.contact.email, values),
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setSubmissionState(defaultSubmissionState);

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("company", values.company);
    formData.set("message", values.message);
    formData.set("website", values.website);
    formData.set("startedAt", values.startedAt);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        fieldErrors?: ContactFieldErrors;
        fallbackMailto?: string;
      };

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setSubmissionState({
          kind: "error",
          message: result.message,
          fallbackMailto:
            result.fallbackMailto ??
            buildFallbackMailto(siteContent.contact.email, values),
        });
        return;
      }

      setSubmissionState({
        kind: "success",
        message: result.message,
      });
      setValues({
        ...getEmptyContactFormValues(),
        startedAt: Date.now().toString(),
      });
    } catch {
      setSubmissionState({
        kind: "error",
        message:
          "The request did not complete. Please try again or use email instead.",
        fallbackMailto: buildFallbackMailto(siteContent.contact.email, values),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6 sm:p-7">
      <div className="mb-6">
        <p className="section-label eyebrow-line">Lead Capture</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">
          Share the context before the call
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Useful for architecture questions, scoped implementation work, or a technical decision that needs a fast second opinion.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="hidden"
          name="website"
          tabIndex={-1}
          type="text"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
        <input name="startedAt" type="hidden" value={values.startedAt} readOnly />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
            <input
              required
              autoComplete="name"
              className={inputClassName}
              maxLength={80}
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
            {fieldErrors.name ? (
              <span className="mt-2 block text-sm text-rose-300">{fieldErrors.name}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
            <input
              required
              autoComplete="email"
              className={inputClassName}
              maxLength={160}
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
            {fieldErrors.email ? (
              <span className="mt-2 block text-sm text-rose-300">{fieldErrors.email}</span>
            ) : null}
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">
            Company or team
          </span>
          <input
            autoComplete="organization"
            className={inputClassName}
            maxLength={120}
            name="company"
            type="text"
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">
            What do you need help with?
          </span>
          <textarea
            required
            className={`${inputClassName} min-h-36 resize-y`}
            maxLength={2400}
            minLength={20}
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-400">
            <span>Enough detail to understand the decision, blocker, or build.</span>
            <span>{values.message.length}/2400</span>
          </div>
          {fieldErrors.message ? (
            <span className="mt-2 block text-sm text-rose-300">{fieldErrors.message}</span>
          ) : null}
        </label>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-400">
            Replies usually go out within one business day. If the form fails, email is the fallback.
          </p>
          <button
            className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </button>
        </div>
      </form>

      {submissionState.kind !== "idle" ? (
        <div
          aria-live="polite"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            submissionState.kind === "success"
              ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
              : "border-amber-400/25 bg-amber-400/10 text-amber-50"
          }`}
        >
          <p>{submissionState.message}</p>
          {submissionState.kind === "error" ? (
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition hover:border-sky-300/50 hover:bg-white/[0.08]"
                href={submissionState.fallbackMailto}
              >
                Use email instead
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition hover:border-sky-300/50 hover:bg-white/[0.08]"
                href={siteContent.bookingUrl}
                rel="noreferrer"
                target="_blank"
              >
                Book the consultation
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
