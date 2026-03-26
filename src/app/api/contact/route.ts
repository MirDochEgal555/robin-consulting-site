import { NextResponse } from "next/server";
import {
  buildFallbackMailto,
  validateContactSubmission,
} from "@/lib/contact";
import {
  deliverContactLead,
  hasContactDeliveryTarget,
} from "@/lib/contact-delivery";
import { siteContent } from "@/content/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const SUCCESS_MESSAGE =
  "Thanks. Your message is through, and Robin should get back to you within one business day.";
const SPAM_SUCCESS_MESSAGE =
  "Thanks for reaching out. If the message matters, use the direct email option below as well.";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore =
  globalThis.contactRateLimitStore ?? new Map<string, RateLimitEntry>();

globalThis.contactRateLimitStore = rateLimitStore;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(",")[0]?.trim() || null;
}

function isRateLimited(ip: string | null) {
  if (!ip) {
    return false;
  }

  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const validation = validateContactSubmission({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
    startedAt: formData.get("startedAt"),
  });

  const fallbackMailto = buildFallbackMailto(
    siteContent.contact.email,
    validation.values,
  );

  if (validation.isLikelySpam) {
    return NextResponse.json(
      {
        ok: true,
        message: SPAM_SUCCESS_MESSAGE,
        fallbackMailto,
      },
      { status: 202 },
    );
  }

  if (!validation.ok || !validation.submission) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields and try again.",
        fieldErrors: validation.fieldErrors,
        fallbackMailto,
      },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many attempts from this connection. Please wait a few minutes or use email instead.",
        fallbackMailto,
      },
      { status: 429 },
    );
  }

  if (!hasContactDeliveryTarget()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The contact form is not connected to a delivery target yet. Please use email or book the consultation directly.",
        fallbackMailto,
      },
      { status: 503 },
    );
  }

  try {
    await deliverContactLead(validation.submission, {
      submittedAt: new Date().toISOString(),
      source: {
        page: "/#contact",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
        bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? null,
      },
      request: {
        ip: clientIp,
        userAgent: request.headers.get("user-agent"),
        referer: request.headers.get("referer"),
      },
    });

    return NextResponse.json({
      ok: true,
      message: SUCCESS_MESSAGE,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The form could not be delivered right now. Please use email or book the consultation directly.",
        fallbackMailto,
      },
      { status: 502 },
    );
  }
}
