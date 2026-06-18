---
title: "Building a Static Site with Next.js and GitHub Pages"
date: "2026-05-15"
tags: ["nextjs", "deployment", "tutorial"]
excerpt: "How to configure Next.js for static export and deploy it automatically to GitHub Pages with GitHub Actions."
published: false
---

GitHub Pages is a free, fast option for hosting static sites. Next.js makes it easy to export your app as static HTML — here's how to wire them together.

## Static Export

In `next.config.ts`, set:

```ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```

After `next build`, Next.js writes all pages to the `out/` directory as plain HTML files.

## GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Push to `main` and the site deploys automatically.

## Project Page vs User Page

If your repo is named `username.github.io`, the site lives at `https://username.github.io` — no extra config needed.

If it's any other repo name, the site lives at `https://username.github.io/repo-name`. In that case, add `basePath` to your Next.js config:

```ts
const nextConfig = {
  output: 'export',
  basePath: '/repo-name',
  images: { unoptimized: true },
}
```
