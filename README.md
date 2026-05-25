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

### Encryption helper
 - To encrypt sensitive strings locally (do NOT paste secrets into source), run:
 ```bash
 node scripts/encrypt.js "your-secret-here" "a-strong-passphrase"
 ```
 - The script prints a base64 payload you can store as an env var. Keep the passphrase secret.

### Claim and auth
 - Claim links are available on leaderboard rows and lead to `/claim?user={id}`.
 - Log in and Sign up buttons are in the nav; accounts are stored client-side in `localStorage` (stubbed). Replace with real backend for production.

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

### Lifetime wager sync

This app now supports lifetime wager-based token accrual at $7.50 per token. Use the sync script to reconcile lifetime wagers and credit earned tokens:

```bash
npm run sync:wagers
```

You can automate this with a scheduler that runs every 3–15 minutes. For example, use GitHub Actions with the included workflow `.github/workflows/sync-lifetime-wagers.yml`, or run the script from a cron job:

```bash
*/5 * * * * cd /workspaces/wildcslb && npm run sync:wagers
```

Make sure `DATABASE_URL` and `SYNC_SECRET` are set in your environment.

### Notes for deployment

- `DATABASE_URL` must be configured in your hosting environment.
- Prisma client generation is handled automatically via `prepare` and `postinstall` scripts.
- `next.config.ts` is configured for standalone output to support containerized or server deployments.

### Optional Prisma commands

```bash
npm run prisma:generate
npm run db:migrate
```
