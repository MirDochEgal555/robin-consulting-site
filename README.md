# Robin Consulting Website

Marketing site for Robin Keim's IT consulting offer, built with Next.js and exported as a static site for GitHub Pages.

Production is deployed via GitHub Pages and served on the custom domain `https://www.keim-consulting.com`.

## Current State

- Multi-page App Router structure with localized routes
- English and German entrypoints
- Main pages: `Home`, `Services`, `Blog`
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
- `/de/`
- `/de/services/`
- `/de/blog/`

## Architecture

The codebase is structured to support future expansion without reworking the current pages.

- `src/content/site-content.ts`
  Holds locale-specific copy and shared site content.
- `src/content/site-pages.ts`
  Defines page keys, localized paths, navigation labels, metadata, and language-switch targets.
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
      page.tsx
    de/
      blog/
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
    home-page.tsx
    lang-sync.tsx
    page-intro.tsx
    page-shell.tsx
    section-shell.tsx
    services-page.tsx
    site-footer.tsx
    site-header.tsx
  content/
    site-content.ts
    site-pages.ts
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BOOKING_URL=https://cal.com/robin-keim
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_ANALYTICS_ID=
```

Production values are currently injected by the GitHub Actions deploy workflow.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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
3. Next.js builds and exports the site to `out/`
4. `.nojekyll` is added
5. The `out/` directory is deployed to GitHub Pages
6. GitHub Pages serves the site on the configured custom domain

The workflow currently sets these production values:

- `NEXT_PUBLIC_SITE_URL=https://www.keim-consulting.com`
- `NEXT_PUBLIC_BOOKING_URL=https://www.cal.eu/robin-keim-consulting`
- `NEXT_PUBLIC_CONTACT_EMAIL=info@keim-consulting.com`

## Notes

- `npm run lint` is currently not usable as-is because the repo still has `.eslintrc.json` while ESLint 9 expects an `eslint.config.*` file.
- `npm run build` is the reliable verification step right now.
