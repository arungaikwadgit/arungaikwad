# Executive AI & Engineering Leadership Portfolio (GitHub Pages Ready)

This repository now includes a **single-page, anchor-based portfolio architecture** designed for an executive engineering profile.

## Included sections

- Home (`#home`)
- About (`#about`)
- My Work (`#work`)
- My Articles (`#articles`)
- Contact (`#contact`)
- Optional Operating Manual (`#operating-manual`)

## Why this structure

- Optimized for quick credibility scanning (headline + proof chips + clear CTA).
- Adds executive-depth sections (case studies with governance/risk, leadership positioning, writing surface).
- Stays static-host friendly for GitHub Pages (no server routing required).

## Content updates

Replace all `[PLACEHOLDER]` values in:

- `index.html`
- `script.js`

And replace assets:

- `resume/arun-gaikwad-resume.pdf`
- `media/og-cover.svg` (or substitute with your own OG image)


## Admin module

A lightweight admin page is included at `admin.html`. It allows you to:

- edit `caseStudies` and `articles` as JSON
- save content into browser `localStorage`
- reset to defaults
- download the current JSON as `portfolio-content.json`

This is static-host friendly and works on GitHub Pages because it does not require a backend.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Publish on GitHub Pages

For a user site (`<username>.github.io`), push this repo as that special repository name.

For a project site (`<username>.github.io/<repo>`), keep anchor navigation as-is or ensure links and absolute URLs in metadata/sitemap match your final path.

## SEO files

- `robots.txt`
- `sitemap.xml`

Update their URLs to your final domain/repository path before publishing.
