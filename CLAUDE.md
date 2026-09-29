# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Informational website for "Despertar Escuela de Taekwondo", a taekwondo academy with multiple locations (sedes). This is a freshly scaffolded Next.js app with no custom features implemented yet beyond the starting page.

The site is meant to become a sellable template for other businesses. Because of that, no business-specific content (copy, sedes, horarios, contact info) is hardcoded — it all comes from a Supabase (PostgreSQL) database.

Stack: Next.js App Router + TypeScript + Tailwind, Supabase, Resend for emails, deployed on Cloudflare.

Philosophy: keep the architecture simple and no more than what's needed — avoid overengineering.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`)
- `npm run typecheck` — `next typegen && tsc --noEmit` (typegen is required: global route types like `LayoutProps` live in `.next/types`, absent on a clean checkout)

There is no test runner configured yet.

Before considering any change done: `npm run lint`, `npm run typecheck`, and `npm run build` must all pass.

## Git workflow

Never work directly on `main`, `staging`, or `develop`. Every change starts on a `feature/*`, `fix/*`, `chore/*`, or `docs/*` branch created from `develop` and merges back via PR to `develop`.

Promotion path: `develop` → `staging` → `main`, each via PR. `hotfix/*` branches out of `main` and merges via PR to `main`, then to `develop`.

Merge method (GitHub PR button):
- `feature/*`, `fix/*`, `chore/*`, `docs/*` → `develop`: **Squash and merge**.
- Promotions `develop` → `staging` → `main` (and `hotfix/*`): **Create a merge commit**. Never squash a promotion — it desyncs the branch histories and the next promotion PR shows false conflicts.

Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

## Architecture

- Next.js App Router (`src/app`), TypeScript, Tailwind CSS v4.
- Path alias `@/*` maps to `src/*` (see [tsconfig.json](tsconfig.json)).
- Tailwind is loaded via `@import "tailwindcss"` in [src/app/globals.css](src/app/globals.css), with theme tokens (`--color-background`, `--color-foreground`, fonts) defined through the `@theme inline` block rather than a `tailwind.config.js` — there is no separate Tailwind config file in v4.
- Fonts (Geist Sans/Mono) are loaded via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx) and exposed as CSS variables consumed by `globals.css`.
