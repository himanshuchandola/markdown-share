> **⚠️ Legacy v1:** The previous Markdrop app (Next.js Pages + MongoDB) is on branch **[`v1`](https://github.com/himanshuchandola/markdown-share/tree/v1)** and live at **[v1-markdown.himanshuchandola.dev](https://v1-markdown.himanshuchandola.dev)**. This repo’s default branch (`main`) is v2 (Supabase).

---

# Markdrop

<img src="./public/icon.svg" alt="Markdrop" width="32" />

Edit markdown with live preview and share instantly.

- **Editor**: Type or paste markdown with real-time preview. Syntax highlighting for code blocks.
- **Share**: Create a document and share via link. Anyone with the link can view at `/share/[id]`.

## Requirements

- Node.js
- [Supabase](https://supabase.com/) (project + env vars; run `scripts/001_create_documents.sql` for the documents table)

## Local setup

1. Create a Supabase project and get your project URL and anon key.
2. Copy `.env.example` to `.env.local` in this directory and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run the SQL in `scripts/001_create_documents.sql` in the Supabase SQL editor.
4. Install and run:

```bash
pnpm install
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000).

Development with hot reload:

```bash
pnpm dev
```

## Scripts

| Script        | Description             |
| ------------- | ----------------------- |
| `pnpm dev`    | Start dev server        |
| `pnpm build`  | Build for production    |
| `pnpm start`  | Start production server |
| `pnpm lint`   | Lint                    |

## Environment

| Variable                     | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`   | Supabase project URL                                           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key                                  |
| `V1_REDIRECT_SLUGS`          | Optional. Comma-separated v1-only slugs to redirect to v1 subdomain. |

## Tech stack

- **Next.js** (App Router), **React**, **TypeScript**
- **Supabase** (auth + database)
- **TailwindCSS**, **Radix UI** / **shadcn/ui**
- **react-markdown**, **rehype-highlight**, **remark-gfm** (markdown + code + math)
