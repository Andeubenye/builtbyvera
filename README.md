# builtbyvera

Astro migration of the final static HTML/CSS/JS builtbyvera website.

## Architectural Decisions

The migration preserves the approved static HTML as the source of truth. The global stylesheet was kept from the HTML build and only adjusted where the previous Astro draft had drifted from the approved copy. Class names, element nesting, inline labels, animation hooks, CSS variables, and responsive rules are intentionally kept close to the source pages so the rendered site stays visually consistent.

Astro is used without React, Vue, Svelte, or any other UI framework because the original site is static HTML with a small amount of browser JavaScript. Astro components provide structure without adding client-side runtime weight.

`BaseLayout.astro` owns the shared document shell: fonts, global CSS, the `.page` wrapper, and the dark-mode toggle script. This keeps document-level behavior in one place while preserving the original page markup inside the wrapper.

`Header.astro`, `Navigation.astro`, and `Footer.astro` are shared site chrome. Header owns the logo, social links, and theme toggle. Navigation owns the internal section links. Footer intentionally renders no visible markup because the approved HTML design has no visible footer.

All visible links are configured to open in a new tab because that is part of the approved static HTML behavior. Social links also include an explicit `window.open(...)` click handler so they reliably open a new tab/window in browsers that otherwise reuse the current tab.

`FeaturedWork.astro`, `AdoptionSection.astro`, and `Archive.astro` split repeated homepage sections into focused components. Their DOM still matches the original sections, but project card data now comes from the `projects` content collection.

`ComingSoon.astro` centralizes the placeholder used by internal pages and collection detail pages. It renders only `Coming soon. 👀`, matching the approved placeholder copy and avoiding duplicated placeholder markup across pages.

Astro Content Collections are configured for `thoughts`, `research`, `talks`, and `projects`. Projects are seeded with the homepage work links so the homepage can be data-backed immediately. Thoughts, Research, and Talks are ready for Markdown entries without changing the placeholder pages.

Dynamic routes exist for every collection:

```text
src/pages/projects/[...slug].astro
src/pages/research/[...slug].astro
src/pages/talks/[...slug].astro
src/pages/thoughts/[...slug].astro
```

The existing top-level HTML pages were converted directly to Astro pages:

```text
src/pages/index.astro
src/pages/about.astro
src/pages/demos.astro
src/pages/portfolio.astro
src/pages/research.astro
src/pages/talks.astro
```

Cloudflare Pages is configured as a static Astro deployment. The project outputs to `dist`, and `wrangler.toml` declares `pages_build_output_dir = "dist"`. No Cloudflare adapter is required because the site does not use server-rendered routes, Pages Functions, or Cloudflare runtime bindings.

## Folder Structure

```text
src/
  components/
    AdoptionSection.astro
    Archive.astro
    ComingSoon.astro
    FeaturedWork.astro
    Footer.astro
    Header.astro
    Navigation.astro
  content/
    config.ts
    projects/
    research/
    talks/
    thoughts/
  layouts/
    BaseLayout.astro
  pages/
    about.astro
    demos.astro
    index.astro
    portfolio.astro
    projects/[...slug].astro
    research.astro
    research/[...slug].astro
    talks.astro
    talks/[...slug].astro
    thoughts/[...slug].astro
  styles/
    global.css
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is emitted to `dist`.

## Cloudflare Pages

Use these build settings:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
```

The same output directory is recorded in `wrangler.toml` for Cloudflare Pages tooling.
