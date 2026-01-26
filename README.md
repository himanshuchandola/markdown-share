# markdown-share

Same repo, two versions:

| Version | Stack | Directory |
|--------|--------|-----------|
| **v1** | Next.js (Pages) + MongoDB | [`v1/`](./v1/) |
| **v2** | Next.js (App Router) + Supabase | [`v2/`](./v2/) |

- **v1** — Original app (MongoDB). Run from `v1/`: `cd v1 && pnpm install && pnpm dev`
- **v2** — Markdrop-style app (Supabase). Run from `v2/`: `cd v2 && pnpm install && pnpm dev`

Configure env and DB per version inside each directory (e.g. `v1/.env`, `v2/.env`).
