import { NextResponse } from "next/server";
import { readStoredContactLeads } from "@/lib/contact-delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function canViewStoredLeads(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const adminToken = process.env.CONTACT_ADMIN_TOKEN;

  if (!adminToken) {
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${adminToken}`;
}

export async function GET(request: Request) {
  if (!canViewStoredLeads(request)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Not found.",
      },
      { status: 404 },
    );
  }

  const { searchParams } = new URL(request.url);
  const parsedLimit = Number(searchParams.get("limit") ?? "50");
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(Math.trunc(parsedLimit), 1), 200)
    : 50;

  const leads = await readStoredContactLeads(limit);

  return NextResponse.json({
    ok: true,
    mode:
      process.env.CONTACT_DELIVERY_MODE === "local" ||
      (!process.env.CONTACT_DELIVERY_WEBHOOK_URL &&
        process.env.NODE_ENV !== "production")
        ? "local"
        : "webhook",
    count: leads.length,
    leads,
  });
}
