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
- JSON-LD structured data and dynamic Open Graph image generation
- Environment variable placeholders for booking, email, and analytics
- CTA analytics, conversion hooks, and web-vitals performance target reporting
- Accessibility basics such as skip links, focus states, and labelled sections
- Clear folder structure for section-level development

## What Is Implemented

### Metadata and Search Basics

The site now ships with production-ready metadata for a simple marketing site:

- Canonical URL handling via `metadataBase` and `alternates`
- `title`, `description`, keywords, author, and publisher metadata
- Open Graph and Twitter metadata for link previews
- `robots.ts` and `sitemap.ts` for crawlability
- A generated Open Graph image route at `/opengraph-image`

This is primarily configured in:

- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx`
- `src/lib/site-config.ts`

### Structured Data

The home page injects JSON-LD so search engines can better understand the site and offer:

- `WebSite`
- `ProfessionalService`
- `WebPage`

The structured data is built from the same shared content used by the page, so the messaging stays in sync.

This is handled in:

- `src/lib/structured-data.ts`
- `src/components/structured-data.tsx`
- `src/app/page.tsx`
- `src/content/site-content.ts`

### Analytics and Conversion Tracking

CTA interactions are instrumented so the page can measure lead intent without adding a full form flow.

Tracked behaviors:

- Header booking CTA click
- Hero booking CTA click
- Hero email CTA click
- Contact booking CTA click
- Contact email CTA click
- Section navigation clicks in the header
- Web Vitals reporting
- Performance target misses when a Core Web Vitals threshold is exceeded

How it works:

- `AnalyticsProvider` loads Google tag scripts if `NEXT_PUBLIC_ANALYTICS_ID` is set.
- `ButtonLink` can emit generic CTA events and optional conversion events.
- Booking and email conversions can send a Google Ads/GA conversion event if a conversion ID is configured.
- Events are also pushed into `window.dataLayer`, which keeps the setup flexible if the analytics stack changes later.

This is handled in:

- `src/components/analytics-provider.tsx`
- `src/components/ui/button-link.tsx`
- `src/lib/analytics.ts`

### Performance Targets

The project defines basic front-end performance thresholds and reports when the page misses them.

Current targets:

- `LCP <= 2500ms`
- `INP <= 200ms`
- `CLS <= 0.1`
- `FCP <= 1800ms`
- `TTFB <= 800ms`

These are not enforced as build budgets. They are reporting thresholds used for runtime analytics.

### Accessibility Basics

The current implementation includes a few high-value accessibility improvements:

- Skip link to jump directly to main content
- Visible keyboard focus styles on interactive elements
- Labelled `nav`, `main`, and section landmarks
- Better section heading relationships via `aria-labelledby`
- Reduced-motion handling in CSS

This is handled in:

- `src/app/globals.css`
- `src/components/section-shell.tsx`
- `src/components/site-header.tsx`
- `src/components/sections/hero-section.tsx`
- `src/components/sections/contact-section.tsx`

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    opengraph-image.tsx
    robots.ts
    sitemap.ts
  components/
    analytics-provider.tsx
    section-shell.tsx
    site-footer.tsx
    site-header.tsx
    structured-data.tsx
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
  lib/
    analytics.ts
    site-config.ts
    structured-data.ts
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BOOKING_URL=https://cal.com/robin-keim
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_BOOKING_CONVERSION_ID=
NEXT_PUBLIC_EMAIL_CONVERSION_ID=
```

What they do:

- `NEXT_PUBLIC_SITE_URL`: The canonical public URL used for metadata, sitemap, robots, and structured data.
- `NEXT_PUBLIC_BOOKING_URL`: The booking link used by primary CTAs.
- `NEXT_PUBLIC_CONTACT_EMAIL`: The email address shown on the page and used for `mailto:` links.
- `NEXT_PUBLIC_ANALYTICS_ID`: Enables the analytics script loader. If empty, analytics do not load.
- `NEXT_PUBLIC_BOOKING_CONVERSION_ID`: Optional conversion target for booking CTA clicks.
- `NEXT_PUBLIC_EMAIL_CONVERSION_ID`: Optional conversion target for email CTA clicks.

## How To Update Things

### Change Page Copy

Most visible content lives in `src/content/site-content.ts`.

That file currently drives:

- Hero messaging
- Services
- Process steps
- About content
- Proof/capability content
- Contact copy
- SEO title, description, and keywords

### Change Metadata or Link Preview Details

Use:

- `src/content/site-content.ts` for the basic SEO copy
- `src/lib/site-config.ts` for normalized site-wide config
- `src/app/layout.tsx` for metadata wiring
- `src/app/opengraph-image.tsx` for the generated OG image design

### Change Structured Data

Use `src/lib/structured-data.ts`.

That file maps the content model into schema.org objects. If the offer changes from a solo consulting service to something broader, this is the place to update the schema shape.

### Change or Extend Analytics Events

Use:

- `src/lib/analytics.ts` to define event behavior and performance targets
- `src/components/ui/button-link.tsx` to instrument CTA links
- `src/components/analytics-provider.tsx` to change provider bootstrapping

If you add a new CTA and want it tracked, pass these props into `ButtonLink`:

- `trackingEvent`
- `trackingLabel`
- `trackingSection`
- `conversionType`

## Event Reference

Current event names:

- `cta_click`
- `cta_conversion`
- `section_navigation`
- `web_vital`
- `performance_target_miss`

Common event parameters:

- `cta_label`
- `cta_section`
- `cta_url`
- `conversion_kind`
- `metric_name`
- `metric_value`
- `metric_delta`
- `metric_rating`
- `metric_target`
- `navigation_type`

## Development

```bash
npm install
npm run dev
npm run build
```

`npm run build` currently passes.

`npm run lint` is not currently usable because the repo has ESLint 9 installed while still using `.eslintrc.json`. That needs an `eslint.config.js` migration before linting will run again.

## What Still Needs Implementation

- Final copy and proof points
- Real booking destination
- Contact form or email provider integration
- Real analytics / ads IDs
- Visual polish, imagery, and motion design
- Deployment configuration

## Next Build Priorities

1. Replace placeholder messaging in `src/content/site-content.ts` with production copy.
2. Decide whether contact should be `mailto:` only or backed by a form service/API.
3. Add real analytics and ad conversion IDs in the environment configuration.
4. Refine the visual system with brand assets, screenshots, and Robin's photo.
5. Deploy preview and production environments with the production site URL.

