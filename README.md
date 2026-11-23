# Fieldnotes — Everyday, outside

A responsive e-commerce product catalog capstone built with native JavaScript modules, HTML, and CSS. It needs no build step or runtime server and can be deployed as a static site.

## Run locally

Open `index.html` in a modern browser, or serve this folder with any static file server. For example:

```sh
npx serve .
```

## Included

- Hash-based client-side routes for the shop, product details, cart, and brand story. Hash routing works on static hosting without server rewrites.
- Product search, category filters, sort options, product detail pages, and responsive layouts.
- Persistent cart using local storage, quantity controls, and an order summary.
- Responsive product photography with lazy-loaded below-the-fold catalog images.
- Newsletter and checkout demo interactions (no email capture or payment processing is connected).

## Deploy

The project is static. Import this folder into Netlify, Vercel, or another static host; set the publish directory to the project root and leave the build command empty. A public deployment requires signing in to your hosting provider and connecting or uploading this project.

Product and editorial photography is served by Unsplash and the font files by Google Fonts, so those assets require an internet connection.
