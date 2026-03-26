# Robin Consulting Landing Page

Landing page scaffold for Robin Keim's IT consulting offer. The repository is set up as a modular Next.js project that follows the funnel structure, messaging, and technical conventions defined in the original brief.

## Goals

- Generate qualified leads through booked calls and direct email contact
- Communicate value within a few seconds of arrival
- Keep the codebase simple to extend as messaging and offers evolve

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based page sections

## Current Scope

The scaffold includes:

- A one-page landing page with the planned sections
- Shared site content in a single source file for easy copy iteration
- SEO metadata, `robots.ts`, and `sitemap.ts`
- Environment variable placeholders for booking, email, and analytics
- Contact form API with shared validation, delivery webhook support, fallback handling, and lightweight spam protection
- Clear folder structure for section-level development

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    robots.ts
    sitemap.ts
  components/
    section-shell.tsx
    site-footer.tsx
    site-header.tsx
    ui/
      button-link.tsx
    sections/
      about-section.tsx
      contact-section.tsx
      hero-section.tsx
      process-section.tsx
      proof-section.tsx
      services-section.tsx
  content/
    site-content.ts
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BOOKING_URL=https://cal.com/robin-keim
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_ANALYTICS_ID=
CONTACT_DELIVERY_MODE=local
CONTACT_DELIVERY_WEBHOOK_URL=
CONTACT_DELIVERY_BEARER_TOKEN=
CONTACT_ADMIN_TOKEN=
```

`CONTACT_DELIVERY_MODE=local` enables a built-in Next.js development inbox. Submissions are stored in `.data/contact-leads.ndjson`, and you can inspect them at `/api/contact/leads`.

When you switch to a real backend later, set `CONTACT_DELIVERY_WEBHOOK_URL` instead. The app posts JSON to that endpoint and adds a bearer token when `CONTACT_DELIVERY_BEARER_TOKEN` is set.

`CONTACT_ADMIN_TOKEN` is optional. In production it can protect `/api/contact/leads` with `Authorization: Bearer <token>`.

Delivery payload shape:

```json
{
  "type": "contact_lead",
  "submission": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "company": "Example Co",
    "message": "We need help deciding between two implementation paths."
  },
  "metadata": {
    "submittedAt": "2026-03-26T12:00:00.000Z",
    "source": {
      "page": "/#contact",
      "siteUrl": "https://example.com",
      "bookingUrl": "https://cal.com/example"
    },
    "request": {
      "ip": "203.0.113.42",
      "userAgent": "Mozilla/5.0 ...",
      "referer": "https://example.com/"
    }
  }
}
```

## Development

```bash
npm install
npm run dev
```

## Contact Flow

- Client-side and server-side validation keep the required fields aligned.
- Spam controls include a honeypot field, a minimum fill time, and a simple in-memory IP rate limit.
- When delivery is missing or fails, the UI offers a prefilled `mailto:` fallback plus the booking CTA.
- Successful submissions return an in-page confirmation without navigating away from the landing page.

## Local Development Inbox

1. Set `CONTACT_DELIVERY_MODE=local` in `.env.local`.
2. Run `npm run dev`.
3. Submit the contact form locally.
4. Open `http://localhost:3000/api/contact/leads` to inspect stored leads.
5. Stored leads are appended to `.data/contact-leads.ndjson`.

## Next Build Priorities

1. Replace placeholder messaging in `src/content/site-content.ts` with production copy.
2. Point `CONTACT_DELIVERY_WEBHOOK_URL` at the real lead destination when deployment starts.
3. Add analytics and conversion tracking for CTA clicks and form submissions.
4. Refine the visual system with brand assets, screenshots, and Robin's photo.
5. Deploy preview and production environments with real environment variables.
