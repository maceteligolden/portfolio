# Golden Mac-Eteli — Portfolio

AI Engineer & Backend-Focused Software Engineer portfolio built with Next.js 16, Tailwind CSS, Shadcn UI, Framer Motion, React Query, Pino, and BlogForAll.

## Setup

```bash
cd portfolio
npm install
cp .env.example .env.local
# Fill in BlogForAll and Resend credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Production build         |
| `npm run lint`      | ESLint                   |
| `npm run format`    | Prettier write           |
| `npm run typecheck` | TypeScript check         |

## Environment Variables

See [`.env.example`](.env.example):

- **BlogForAll** — `BLOG_API_BASE_URL`, `BLOG_ACCESS_KEY_ID`, `BLOG_SECRET_KEY`, `BLOG_SITE_ID`
- **Resend** — `RESEND_API_KEY`, `CONTACT_EMAIL`
- **Site** — `NEXT_PUBLIC_SITE_URL`

## Content

Edit typed content files under [`content/`](content/) — no UI changes needed:

- `site.ts` — personal info, social links, availability
- `metrics.ts` — impact counters
- `expertise.ts` — expertise cards
- `projects/index.ts` — project case studies
- `testimonials.ts` — client quotes
- `resume.ts` — resume data
- `philosophy.ts` — about page content

Add resume PDF to `public/resume/golden-mac-eteli-resume.pdf`.

## Deployment (Vercel)

1. Import the `portfolio` directory as a Vercel project
2. Set environment variables from `.env.example`
3. Deploy — build command: `npm run build`

Point `maceteligolden.com` DNS to Vercel when ready to go live.

## Git Hooks

- **pre-commit** — lint-staged (ESLint + Prettier on staged files)
- **pre-push** — full lint + production build
