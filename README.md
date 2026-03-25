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
```

## Development

```bash
npm install
npm run dev
```

## What Still Needs Implementation

- Final copy and proof points
- Real booking destination
- Contact form or email provider integration
- Analytics wiring
- Visual polish, imagery, and motion design
- Deployment configuration

## Next Build Priorities

1. Replace placeholder messaging in `src/content/site-content.ts` with production copy.
2. Decide whether contact should be `mailto:` only or backed by a form service/API.
3. Add analytics and conversion tracking for CTA clicks and form submissions.
4. Refine the visual system with brand assets, screenshots, and Robin's photo.
5. Deploy preview and production environments with real environment variables.

