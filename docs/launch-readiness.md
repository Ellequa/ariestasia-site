# Launch readiness — 27 September 2026

## Ready

- Static Astro output; no SSR adapter, database, new dependency or Cloudflare Function required.
- All seven public pages return 200 locally. The custom missing-page response returns 404.
- 61 internal links/anchors checked against generated output; no broken destinations. Both homepage Adornments links reach the gallery.
- 73 unique rendered images (77 instances) return 200, with alt text and intrinsic dimensions. No test images render. Five previously omitted Deep Sea photos now appear after correcting hyphen/underscore references.
- Unique titles/descriptions, English language, charset, viewport, one h1 per page, semantic main areas, labelled required form fields, optional budget and visible keyboard focus.
- Responsive DOM checks at 320, 375, 430, 768, 1024 and 1440px across all eight HTML pages: no horizontal page overflow. Desktop hero text extends slightly beyond its own text box but remains visible; preserved intentionally. Representative screenshots reviewed for hero, gallery headings and form.
- Native empty-form validation focuses Name. Isolated mocked tests cover accepted/rejected responses, network/JSON errors, failure handling, honeypot and invalid submissions. No live enquiry or activation was attempted. Real email delivery is still unverified.
- FormSubmit destination remains indyariestasia@gmail.com. Its small existing script preserves values on failure, prevents concurrent sends, times out after 30 seconds and announces status. No API secret or localhost redirect is present. Honeypot protection is basic; CAPTCHA remains disabled.
- Largest deployed asset is now 2.27 MB. Photography was not resized or recompressed during this pass. Some large supporting images and duplicate photos remain optional performance work, not launch blockers. Fonts still use the existing Google Fonts stylesheet with display=swap; added connection hints. No image pipeline introduced.

## Files changed in this pass

- `astro.config.mjs`: optional validated SITE_URL build setting; existing development watcher preserved.
- `src/layouts/BaseLayout.astro`: descriptive homepage title/description, canonical and social metadata, existing crown as social preview, branded PNG favicon, font preconnects, deliberate noindex while SITE_URL is unset.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: dependency-free static search-engine endpoints, using the existing World collection list.
- `src/pages/404.astro`: minimal Dark Atelier error page with Home link and noindex.
- `src/utils/imageDimensions.ts`: read current public-image dimensions at build time using Astro's existing API; no image processing or browser code.
- `src/components/WorldSection.astro`, `src/pages/worlds/[slug].astro`, `src/pages/adornments.astro`: intrinsic image dimensions; gallery templates eagerly load only the first image.
- `src/components/Hero.astro`: dimensions/decoding and removal of the redundant 120px mobile spacer below the in-flow header; high fetch priority preserved.
- `src/components/Header.astro`, `src/components/MakerSection.astro`, `src/components/Adornments.astro`: dimensions and appropriate decoding attributes.
- `src/components/Footer.astro`: image dimensions/decoding; Contact now opens the commission form instead of the unverified hello mailbox.
- `src/data/collections.js`: corrected five Deep Sea filenames; no collection renamed.
- `.node-version`: Node 22 release line (Astro requires 22.12.0 or later).
- Moved `public/images/logo/up2000logo.png` to `source-assets/up2000logo.png`, unchanged. This unused 39 MB original exceeded Cloudflare Pages' 25 MiB asset limit; it is preserved outside deployment output.
- `docs/launch-readiness.md`: this handoff.

Existing unrelated user changes, including image reductions and Commission form code, were preserved. Nothing was committed, pushed, deployed or connected to a domain.

## Remaining before Cloudflare

1. Review, commit and push the current working tree, including the currently untracked Adornments images/page and new launch files. Git remote: https://github.com/Ellequa/ariestasia-site.git. Cloudflare builds the committed repository, not this working directory.
2. Decide the canonical HTTPS origin (including the www/apex choice). No domain was assumed. Set SITE_URL in Cloudflare build variables to that exact origin, with no path/query, and rebuild before public launch.
3. With SITE_URL unset, pages intentionally contain noindex, canonical/social image URLs are omitted, and sitemap.xml is an empty valid URL set. This is suitable for temporary review, not the final public launch. Once SITE_URL is set, the seven public pages become indexable and absolute canonical/social/sitemap URLs are generated automatically; 404 remains noindex. A reserved example.com origin was used only in an isolated test build, then removed by the final normal build.
4. The data still mentions `selene-right.jpg`, which is absent and filtered out. `vv.jpg` exists but is unreferenced. The original deletion was already present before this audit; no replacement was guessed. Confirm whether an additional Selene view is intended. It does not produce a broken image request.
5. Activate FormSubmit after deployment and verify delivery. See `docs/commission-form.md`.

## Cloudflare Pages settings

- Framework preset: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Root directory: repository root (leave blank).
- Node: latest available Node 22 patch, minimum 22.12.0; `.node-version` selects 22. No NODE_VERSION variable is needed unless overriding it in Cloudflare.
- Runtime: static; no adapter or SSR setting.
- Build variables: SITE_URL required for final SEO/public launch, optional for temporary review. No secrets or FormSubmit environment variables needed.
- FormSubmit needs no Cloudflare-specific integration. Browser POSTs go directly to FormSubmit.
- Keep preview-environment SITE_URL unset until its indexing policy is deliberate. Once the custom domain is connected later, consider redirecting the production pages.dev alias to it; no redirect/domain change was made here.

## Checks on the temporary pages.dev URL

1. Open `/`, `/worlds/deep-sea/`, `/worlds/pearl/`, `/worlds/reef/`, `/worlds/garden/`, `/worlds/ember/`, `/adornments/` directly; each must return 200, including after refresh.
2. Visit `/a-page-that-does-not-exist/`; confirm the custom design, HTTP 404 status and working Home link (not a homepage/SPA fallback).
3. Follow all homepage World links, both Adornments links, World-page Home/bottom navigation, header logo and footer Contact. Contact must reach the commission form.
4. Scroll every gallery to trigger lazy images; check the five restored Deep Sea views. Confirm no image requests return 404.
5. Review at 320/375/430px, tablet and desktop. Tab through navigation and form; submit empty and malformed-email fields to check validation; leave budget blank in a valid test.
6. Submit a clearly labelled test using an email you control. Open indyariestasia@gmail.com (including Spam), follow FormSubmit activation, then submit another test. Verify all enquiry fields and Reply-To. The displayed success state confirms provider acceptance, not inbox delivery.
7. Check `/robots.txt`, `/sitemap.xml`, page source and favicon. With SITE_URL unset, expect deliberate noindex and empty sitemap. Before live launch, set SITE_URL, rebuild and confirm seven correct URLs, absolute social image/canonical URLs, no localhost/example.com values and no noindex on the seven public pages.
8. Check the existing hero image URL used by social metadata is publicly reachable; verify a social preview after SITE_URL is configured.

## Build status

`npm run build` passed: eight HTML pages including 404, plus robots.txt and sitemap.xml. Configured-origin metadata/sitemap/indexing tests also passed. Final build has SITE_URL unset. Local build used Node 26.1.0; Cloudflare's Node 22 installation remains to be verified in its build log. No deployment was performed.

References:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/configuration/build-image/
- https://formsubmit.co/ajax-documentation
