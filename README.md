# Markdrop

<img src="./public/favicon.svg" alt="Markdrop" width="32" />

Edit markdown with live preview and share instantly.

- **Editor**: Type or paste markdown, upload `.md`/`.txt`, clear. Live preview.
- **Share**: Create a page with optional expiration and password protection. Anyone with the link (and password if set) can view; password allows edit at `/[slug]/edit`.

## Requirements

- Node.js
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas/database))

## Local setup

1. Ensure MongoDB is running.
2. Copy `.env.example` to `.env` and set variables (see [Environment](#environment)).
3. Install and run:

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

| Script        | Description                |
| ------------- | -------------------------- |
| `pnpm dev`    | Start dev server           |
| `pnpm build`  | Build for production       |
| `pnpm start`  | Start production server    |
| `pnpm test`   | Run tests (watch)          |
| `pnpm test:ci`| Run tests once             |
| `pnpm lint`   | Lint JS and CSS            |
| `pnpm typecheck` | TypeScript check        |

## Environment

| Variable        | Description |
| --------------- | ----------- |
| `APP_URL`       | App URL for SEO and links (e.g. `https://example.com` or `http://localhost:3000`) |
| `MONGO_HOST`    | MongoDB host |
| `MONGO_PORT`    | MongoDB port |
| `MONGO_USER`    | MongoDB user |
| `MONGO_PASSWD`  | MongoDB password |
| `MONGO_DATABASE`| Database name (default: `markdrop`) |
| `MONGO_URI`     | Full connection string (overrides the above if set) |
| `API_SECRET`    | Optional. If set, requests must send it in `X-API-Secret` header |

## Tech stack

- **Next.js** (React), **TypeScript**
- **MongoDB** (Mongoose)
- **markdown-it** (markdown → HTML), **highlight.js** (code), **dompurify** (sanitize)
- **Jest** + **Testing Library** for tests
- **PostCSS**, **next-themes** (light/dark)

