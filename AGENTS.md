<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Next.js 16 (App Router) frontend for HireLoop. **pnpm only** (no npm/yarn lockfiles).

## Commands

- `pnpm dev` — dev server; it also rewrites the managed block above (keep it byte-identical).
- `pnpm typecheck` — `tsc --noEmit` · `pnpm lint` — ESLint · `pnpm format` — Prettier write (no semicolons, double quotes, Tailwind class sorting).
- `pnpm build` — Turbopack build that **fails on any TypeScript error**.
- **No test suite and no CI exist** — verify changes with `pnpm typecheck` + `pnpm lint` (+ `pnpm build` for route changes).

## Two backends (most common mistake)

1. **better-auth runs inside Next**: route `app/api/auth/[...all]`, config in `lib/auth.ts` (server) / `lib/auth-client.ts`, MongoDB via `MDB_URI` (db `hireloop`).
2. **Job/application data comes from a separate Express API** in the sibling repo `../hireloop-server` (port **5000**, run with `node index.js`, it has its own `.env`). All fetches go through `NEXT_PUBLIC_BASE_URL` in `lib/api/*.ts` and `lib/actions/*.ts`. If it is not running, pages must render their empty state — they cannot load data.

`.env` holds: `MDB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_BASE_URL`. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are referenced in `lib/auth.ts` but absent — Google sign-in fails until added.

## Architecture gotchas

- **Shared types live in `lib/type/*.ts`** (`jobs.ts`, `applications.ts`, `user.ts`) — single source of truth for forms, tables, filters, and the API layer. Page files import these types and do **not** re-export them; importing `JobRow`/`JobFormData` from a page module fails typecheck.
- Roles `seeker | recruiter | admin` are declared in better-auth `additionalFields` (`lib/auth.ts`) and mirrored in `components/auth-form.tsx`, `components/DashboardSidebar.tsx` (`menuItemsByRole`), and `app/(auth)/sign-up/page.tsx`. There is **no `middleware.ts`** — dashboard routes are not server-side guarded; role gating is client-side (sidebar) only.
- shadcn/ui uses style **`base-nova`**: everything in `components/ui` is built on **`@base-ui/react`**, not Radix. Add components with `npx shadcn@latest add <name>`.
- `cn` is re-exported from the **`cn` npm package** (`lib/utils.ts`), not clsx + tailwind-merge.
- Tailwind v4 is CSS-first: no `tailwind.config`, theme lives in `app/globals.css`.
- Path alias `@/*` → repo root. `pnpm-workspace.yaml` exists with `packages: []` (not a real monorepo; it only holds the build-script allow-list).
