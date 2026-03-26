import { mkdir, readFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { ValidatedContactSubmission } from "@/lib/contact";

export type ContactLeadMetadata = {
  submittedAt: string;
  source: {
    page: string;
    siteUrl: string | null;
    bookingUrl: string | null;
  };
  request: {
    ip: string | null;
    userAgent: string | null;
    referer: string | null;
  };
};

export type StoredContactLead = {
  id: string;
  type: "contact_lead";
  submission: ValidatedContactSubmission;
  metadata: ContactLeadMetadata;
};

const contactLeadStoragePath = path.join(
  process.cwd(),
  ".data",
  "contact-leads.ndjson",
);

function isLocalContactDeliveryEnabled() {
  return (
    process.env.CONTACT_DELIVERY_MODE === "local" ||
    (!process.env.CONTACT_DELIVERY_WEBHOOK_URL &&
      process.env.NODE_ENV !== "production")
  );
}

export function hasContactDeliveryTarget() {
  return Boolean(process.env.CONTACT_DELIVERY_WEBHOOK_URL) || isLocalContactDeliveryEnabled();
}

async function storeContactLeadLocally(record: StoredContactLead) {
  await mkdir(path.dirname(contactLeadStoragePath), { recursive: true });
  await appendFile(
    contactLeadStoragePath,
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
}

async function deliverContactLeadToWebhook(record: StoredContactLead) {
  const webhookUrl = process.env.CONTACT_DELIVERY_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Missing contact delivery target.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (process.env.CONTACT_DELIVERY_BEARER_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CONTACT_DELIVERY_BEARER_TOKEN}`;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Delivery failed with status ${response.status}.`);
  }
}

export async function readStoredContactLeads(limit = 50) {
  try {
    const fileContents = await readFile(contactLeadStoragePath, "utf8");

    return fileContents
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredContactLead)
      .slice(-limit)
      .reverse();
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export async function deliverContactLead(
  submission: ValidatedContactSubmission,
  metadata: ContactLeadMetadata,
) {
  const record: StoredContactLead = {
    id: randomUUID(),
    type: "contact_lead",
    submission,
    metadata,
  };

  if (isLocalContactDeliveryEnabled()) {
    await storeContactLeadLocally(record);
    return;
  }

  await deliverContactLeadToWebhook(record);
}
