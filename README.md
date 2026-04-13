# Robin Consulting Website

Marketing site for Robin Keim's IT consulting offer, built with Next.js and exported as a static site for GitHub Pages.

Production is deployed via GitHub Pages and served on the custom domain `https://www.keim-consulting.com`.

## Current State

- Multi-page App Router structure with localized routes
- English and German entrypoints
- Main pages: `Home`, `Services`, `Blog`
- Browser-side dashboard for SEO, tracking, and performance checks
- Shared content and page configuration separated into content modules
- Static export enabled for GitHub Pages deployment
- SEO basics in place via `metadata`, `robots.ts`, and `sitemap.ts`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React 19

## Routes

- `/`
- `/services/`
- `/blog/`
- `/blog/[slug]/`
- `/dashboard/`
- `/de/`
- `/de/services/`
- `/de/blog/`
- `/de/blog/[slug]/`
- `/de/dashboard/`

## Architecture

The codebase is structured to support future expansion without reworking the current pages.

- `src/content/site-content.ts`
  Holds locale-specific copy and shared site content.
- `src/content/site-pages.ts`
  Defines page keys, localized paths, navigation labels, metadata, and language-switch targets.
- `src/content/blog-posts.ts`
  Holds localized blog post content, article metadata, and helpers for article routes, structured data, and sitemap generation.
- `src/components/page-shell.tsx`
  Shared page wrapper for header, footer, and language sync.
- `src/components/home-page.tsx`
  Homepage composition using reusable sections.
- `src/components/services-page.tsx`
  Services page composition.
- `src/components/blog-page.tsx`
  Blog landing page composition.
- `src/components/sections/*`
  Reusable content sections shared across pages.

## Project Structure

```text
src/
  app/
    blog/
      [slug]/
        page.tsx
      page.tsx
    de/
      blog/
        [slug]/
          page.tsx
        page.tsx
      services/
        page.tsx
      page.tsx
    services/
      page.tsx
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    sections/
      about-section.tsx
      contact-section.tsx
      hero-section.tsx
      process-section.tsx
      services-section.tsx
    ui/
      button-link.tsx
    blog-page.tsx
    blog-post-page.tsx
    home-page.tsx
    lang-sync.tsx
    page-intro.tsx
    page-shell.tsx
    section-shell.tsx
    services-page.tsx
    site-footer.tsx
    site-header.tsx
  content/
    blog-posts.ts
    site-content.ts
    site-pages.ts
```

## Publishing Blog Content

Blog posts are managed in `src/content/blog-posts.ts`.

For each new post:

1. Add a new entry with `id`, publish dates, reading time, and both locale variants.
2. Provide localized `slug`, `title`, `excerpt`, `seoDescription`, `category`, `tags`, and article sections.
3. Posts with a future `publishedAt` date can be preloaded in the file and remain hidden until their publication day.
4. The site will include published posts on `/blog/`, generate localized article pages, and add the URLs to `sitemap.xml`.

Publication visibility uses `BLOG_PUBLICATION_TIME_ZONE` and defaults to `Europe/Berlin`.

Because the site is exported statically, future-dated posts become visible only after the next build that runs on or after the publication date.

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BOOKING_URL=https://cal.com/robin-keim
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_ANALYTICS_ID=
BLOG_PUBLICATION_TIME_ZONE=Europe/Berlin
```

Production values are currently injected by the GitHub Actions deploy workflow.

The dashboard works without a backend by storing events and recent performance metrics in the browser. GA4 forwarding is enabled only when `NEXT_PUBLIC_ANALYTICS_ID` is set in local env or as a GitHub repository variable for the deploy workflow.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Testing

The project now uses a small deploy-gated test stack:

- `Vitest` for fast unit coverage around content helpers, localized routing, consent state, analytics state, and metadata routes
- `Playwright` for smoke tests against the exported static site in `out/`

Run the unit suite with:

```bash
npm run test:unit
```

Run the smoke suite with:

```bash
npx playwright install chromium
npm run build
npm run test:e2e:smoke
```

The smoke suite serves the generated `out/` directory with `scripts/serve-static.mjs` and checks launch-critical behavior:

- key English and German routes load from the exported site
- header navigation and locale switching work
- the consent banner gates analytics storage correctly
- the latest blog card opens a published article

The unit suite focuses on the logic that is easiest to break during content or route changes:

- blog publication filtering, localized post paths, metadata, and sitemap inputs
- page path generation, language-switch targets, and alternates metadata
- consent persistence and events
- browser-side analytics counters and metric classification
- `robots.ts` and `sitemap.ts`

## Build

The project uses static export:

- `next.config.ts` sets `output: "export"`
- build output is written to `out/`
- `trailingSlash: true` is enabled for GitHub Pages-compatible output

Run a production build with:

```bash
npm run build
```

## Deployment

Deployment is handled by [deploy.yml](./.github/workflows/deploy.yml).

Current deployment flow:

1. Push to `main`
2. GitHub Actions runs `npm ci`
3. `npm run test:unit` validates routing, blog publication logic, consent logic, analytics logic, and metadata helpers
4. Next.js builds and exports the site to `out/`
5. Playwright installs Chromium and runs `npm run test:e2e:smoke` against the exported site
6. `.nojekyll` is added
7. The `out/` directory is uploaded as the GitHub Pages artifact
8. GitHub Pages deploys the artifact on the configured custom domain

The workflow currently sets these production values:

- `NEXT_PUBLIC_SITE_URL=https://www.keim-consulting.com`
- `NEXT_PUBLIC_BOOKING_URL=https://www.cal.eu/robin-keim-consulting`
- `NEXT_PUBLIC_CONTACT_EMAIL=info@keim-consulting.com`
- `NEXT_PUBLIC_ANALYTICS_ID=${{ vars.NEXT_PUBLIC_ANALYTICS_ID }}`

## Notes

- `npm run lint` is currently not usable as-is because the repo still has `.eslintrc.json` while ESLint 9 expects an `eslint.config.*` file.
- The current release gate is `npm run test:unit`, `npm run build`, and `npm run test:e2e:smoke`.
- The Playwright smoke suite is intentionally narrow and protects the GitHub Pages upload path rather than trying to replace broader component or visual regression coverage.
