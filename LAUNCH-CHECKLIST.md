# Onix Studios launch checklist

Use this before promoting the site.

## Product media

- Product card images: export around 1600 x 1000, ideally under 500 KB each.
- Gallery images: export around 1600 x 900, ideally under 700 KB each.
- Video previews: keep clips short, around 10 to 20 seconds where possible.
- Cloudflare Pages has a 25 MiB limit per single uploaded file, so keep each self-hosted video below that.
- Use clear filenames in `images/` and `videos/`, for example `collision-demo-preview.jpg` and `collision-demo.mp4`.
- Prefer compressed `.jpg` or `.webp` for large screenshots. Keep `.png` for logos or transparency.

## Analytics

Cloudflare Web Analytics is the cleanest option for this site because it fits the Cloudflare Pages setup.

1. Open Cloudflare dashboard.
2. Go to Analytics & Logs, then Web Analytics.
3. Add the site.
4. Cloudflare will give you a small script with a token.
5. Paste that script before `</head>` on each public HTML page.

Do not add a fake analytics token. Wait until Cloudflare gives you the real one.

## Before selling

- Create the final Lemon Squeezy products.
- Attach the real product files.
- Replace placeholder checkout links in `data/products.js`.
- Activate payments, bank, tax, and business settings.
- Run a full test purchase.
- Check the receipt email and download flow.
- Review the policy wording against the real business and checkout setup.
