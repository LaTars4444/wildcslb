# wildcslb

A leaderboard and platform dashboard MVP built with Next.js, Prisma, and Tailwind CSS.

## Deployment readiness

### Prerequisites
- Node.js 20+
- PostgreSQL database reachable via `DATABASE_URL`
- `npm` installed

### Environment variables

Create a `.env` or set the following environment variables in your deployment provider:

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_ADMIN_PASSWORD="your-secret-admin-password"
NEXT_PUBLIC_KICK_CLIENT_ID="your-kick-client-id"
NEXT_PUBLIC_KICK_REDIRECT_URI="https://your-domain.com/auth/kick/callback"
```

### Local setup

```bash
npm install
npm run prisma:generate
npm run dev
```

### Production build

```bash
npm install
npm run build
npm run start
```

### Notes for deployment

- `DATABASE_URL` must be configured in your hosting environment.
- Prisma client generation is handled automatically via `prepare` and `postinstall` scripts.
- `next.config.ts` is configured for standalone output to support containerized or server deployments.

### Optional Prisma commands

```bash
npm run prisma:generate
npm run db:migrate
```
