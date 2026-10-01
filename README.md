# amelen.dev

Austin Melendez's portfolio, built with Next.js (Pages Router), React, TypeScript, and Sass modules.

## Development

Requires Node.js 20.9+.

```bash
yarn install
yarn dev     # http://localhost:3000
yarn lint
yarn build
```

## Where things live

- `pages/` — routes. Each page sets its metadata with the `Seo` component.
- `src/containers/` — page content.
- `src/components/` — shared UI (header, menu, buttons, cards, icons).
- `src/data/work.ts` — work page projects. Add an entry to show a new project; set `hidden: true` to keep one without showing it.
- `src/config.ts` — site URL, contact email, resume path, and the `SHOW_BLOG` flag.
- `public/Austin_Melendez_Resume.pdf` — the resume linked from the About page and social menu.

## Blog

The blog is hidden. Set `SHOW_BLOG` to `true` in `src/config.ts` to bring back `/blog`, the posts under `/post/*`, and the blog links.
