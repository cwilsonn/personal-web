# personal-web

Source for [codywilson.dev](https://codywilson.dev): the portfolio of Cody Wilson, a senior frontend engineer.

Built with Nuxt 4 and Nuxt UI, in a neo-brutalist theme. Static output, deployed on Netlify.

## Stack

- [Nuxt 4](https://nuxt.com) with static generation (`nuxt generate`)
- [Nuxt UI 4](https://ui.nuxt.com) themed in `app/app.config.ts` and `app/assets/css/main.css`
- [Nuxt Content 3](https://content.nuxt.com) for content collections
- Archivo (variable width) and IBM Plex Mono via `@nuxt/fonts`
- ESLint with `eslint-plugin-vuejs-accessibility`, `vue-tsc`, Vitest
- `@nuxt/a11y` for accessibility checks in Nuxt DevTools

## Theme

`/styleguide` is a kitchen sink of every component the site uses in the theme: tokens, type scale,
buttons, forms, overlays, navigation, data and cards. It's excluded from search indexing.

Rules the theme follows:

- Square corners, 2px ink borders, and hard offset shadows on every card-like surface
- Mono for labels and figures, Archivo for everything else
- Signal yellow marks hover and keyboard highlight
- Light mode only; text contrast meets WCAG AA

## Development

Requires Node 24 (see `.nvmrc`) and pnpm via corepack.

```bash
corepack enable
pnpm install
pnpm dev        # http://localhost:3000
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm generate   # static site in .output/public
```

## Deploy

Netlify builds from `main` using `netlify.toml`: `pnpm generate`, publishing `dist/` (the netlify-static preset's output).

## Image credits

- `public/images/seattle-kerry-park.jpg`: "Downtown seattle from Kerry Park" by Symi81, public domain,
  via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Downtown_seattle_from_Kerry_Park.JPG)
  (resized to 960px and converted to black and white; served as WebP by @nuxt/image).
