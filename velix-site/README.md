# VELIX Site

React implementation of the VELIX landing page, built from the Claude Design handoff bundle in `../project`.

## Stack

- React 19 + Vite
- React Router (client-side routing between `/` and `/portfolio`)
- Plain CSS per component (no framework)

## Getting started

```bash
npm install
npm run dev
```

## Contact form

The contact form on the home page submits to [Formspree](https://formspree.io). To receive real submissions:

1. Create a free account at https://formspree.io and create a new form.
2. Copy `.env.example` to `.env`.
3. Set `VITE_FORMSPREE_ENDPOINT` to your form's endpoint (e.g. `https://formspree.io/f/xxxxxxxx`).
4. Restart the dev server / rebuild.

Without a real endpoint configured, submissions will fail silently with an inline error message (the UI still validates required fields and clears the form correctly).

## Structure

```
src/
  components/   Navbar, Hero, Sobre, Contato, Footer (shared across pages)
  pages/        HomePage (/) and PortfolioPage (/portfolio)
  assets/       Images/video copied from the design bundle
```

## Build

```bash
npm run build
npm run preview
```
