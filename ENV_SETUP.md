# Environment Variables Setup

This document outlines the required environment variables for running Cospace with TinaCMS and NextAuth v5 authentication.

## Required Environment Variables

### TinaCMS Mode Configuration

```bash
# Local Development: Set to 'true' for local-only mode (no auth, file system storage)
TINA_PUBLIC_IS_LOCAL=true

# Production: Set to 'false' or omit to enable NextAuth authentication
TINA_PUBLIC_IS_LOCAL=false
```

### NextAuth v5 Configuration

```bash
# Generate a random secret key (required for JWT encryption):
# openssl rand -base64 32

NEXTAUTH_SECRET=your-generated-secret-key-here
NEXTAUTH_URL=https://your-domain.com
```

**Production Setup:**
- Generate a secure secret using `openssl rand -base64 32`
- Set `NEXTAUTH_URL` to your production domain (e.g., `https://cospace.neo14.com`)
- These must be set in your Vercel environment variables

### Email Provider (Resend)

```bash
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=CMS <cms@neo14.com>
```

**How to get Resend API Key:**
1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add your domain and verify DNS records
6. Use the API key in your environment variables

### GitHub Configuration (for content commits)

```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxxx

# These are auto-detected on Vercel, but can be set manually:
# GITHUB_OWNER=your-github-username
# GITHUB_REPO=your-repo-name
```

**How to generate GitHub PAT:**
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Select scope: `repo` (full control of private repositories)
4. Copy and save the token

### Upstash Redis Configuration (for TinaCMS database)

```bash
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

**How to set up Upstash Redis:**
1. Go to [console.upstash.com](https://console.upstash.com)
2. Create a new Redis database
3. Copy the REST URL and REST TOKEN
4. Add to Vercel environment variables

## Local Development Setup

Create a `.env.local` file in your project root:

```bash
# TinaCMS - Local mode (no authentication required)
TINA_PUBLIC_IS_LOCAL=true

# NextAuth (only needed if testing production auth locally)
NEXTAUTH_SECRET=any-random-string-for-local-dev
NEXTAUTH_URL=http://localhost:3000

# Resend (only needed if testing email magic links locally)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=CMS <cms@neo14.com>
```

**Local Development Behavior:**
- With `TINA_PUBLIC_IS_LOCAL=true`: No authentication, direct file system access
- Access CMS at `http://localhost:3000/admin` (no login required)
- Content changes save directly to local files

## Production Setup (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables for **Production** environment:

```bash
# TinaCMS
TINA_PUBLIC_IS_LOCAL=false

# NextAuth
NEXTAUTH_SECRET=<generated-with-openssl-rand>
NEXTAUTH_URL=https://your-domain.com

# Resend Email
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=CMS <cms@neo14.com>

# GitHub (for content commits)
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxx
# GITHUB_OWNER and GITHUB_REPO auto-detected by Vercel

# Upstash Redis (for TinaCMS database layer)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

**Production Behavior:**
- With `TINA_PUBLIC_IS_LOCAL=false`: NextAuth authentication required
- Access CMS at `https://your-domain.com/admin` → redirects to `/admin/login`
- Only @neo14.com email addresses can authenticate
- Content changes commit to GitHub repository via Upstash Redis

## How Authentication Works

### Local Development (`TINA_PUBLIC_IS_LOCAL=true`)
- No authentication required
- TinaCMS uses file system (no Redis needed)
- Access CMS directly at `http://localhost:3000/admin`
- Changes save to local files immediately
- Ideal for content editing and development

### Production (`TINA_PUBLIC_IS_LOCAL=false`)
- NextAuth v5 authentication with magic links via Resend
- Server-side domain restriction to @neo14.com only
- TinaCMS uses Upstash Redis for database layer
- Content changes commit to GitHub repository
- Access requires authentication at `/admin/login`

**Security Implementation:**
- Frontend accepts any email address (no client-side filtering)
- Backend validates during sign-in callback (server-side only)
- Only @neo14.com email addresses can complete authentication
- Non-matching domains are rejected during verification

## Testing Production Authentication Locally

To test the full authentication flow locally:

1. Update `.env.local`:
   ```bash
   TINA_PUBLIC_IS_LOCAL=false
   NEXTAUTH_SECRET=<generate-with-openssl>
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=CMS <cms@neo14.com>
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Visit `http://localhost:3000/admin` → redirects to login
4. Enter your @neo14.com email address
5. Check email for magic link
6. Click link to authenticate
7. Access CMS admin interface

## Troubleshooting

### Build Errors

**"TinaCMS build failed"**
- Check that `tina/config.ts` is valid TypeScript
- Ensure `contentApiUrlOverride` is set to `/api/tina/gql`
- Verify no `clientId`, `token`, `branch`, or `search` configs remain
- Run `pnpm exec tinacms build` locally to see detailed errors

**"Module not found" during build**
- Ensure all imports are correct in `auth.ts` and auth provider files
- Check that NextAuth v5 beta is installed: `pnpm list next-auth`
- Verify `lib/tina-nextauth-provider.ts` exports `NextAuthProvider` class

### Authentication Errors

**"Failed to send email"**
- Verify Resend API key is correct and active
- Ensure your domain (neo14.com) is verified in Resend dashboard
- Check `EMAIL_FROM` uses the verified domain
- Review Vercel deployment logs for Resend errors

**"Access Denied" / 401 errors**
- Confirm email ends with @neo14.com
- Check `auth.ts` signIn callback logic
- Verify `NEXTAUTH_SECRET` is set in production
- Check browser console for authentication errors

**"Unauthorized: Access restricted to @neo14.com domain"**
- This is expected for non-@neo14.com email addresses
- Domain restriction is enforced server-side in `pages/api/tina/[...routes].ts`
- Only emails ending in @neo14.com can access CMS

**Magic link expired**
- Magic links expire after a short period (default: 24 hours)
- Request a new magic link from `/admin/login`
- Each link can only be used once

### CMS Interface Errors

**Admin interface fails to load / blank page**
- Regenerate admin assets: `pnpm exec tinacms build --partial-reindex`
- Check browser console for JavaScript errors
- Verify `public/admin/` directory exists with assets
- Ensure `contentApiUrlOverride` is correctly set

**"Cannot connect to API" errors**
- Verify `pages/api/tina/[...routes].ts` is correctly configured
- Check authentication is working (session exists)
- Review network tab for API request failures
- Ensure Redis configuration is correct for production

### Database Errors

**"No branch found" error**
- Vercel auto-detects branch from `VERCEL_GIT_COMMIT_REF`
- For other hosts, set `GITHUB_BRANCH` environment variable

**"Upstash Redis configuration is required"**
- Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Or set `TINA_PUBLIC_IS_LOCAL=true` to use local database

**Content changes not saving**
- Check `GITHUB_PERSONAL_ACCESS_TOKEN` has `repo` scope
- Verify token is valid and not expired
- Review Vercel logs for GitHub API errors
- Ensure GitHub user has write access to repository

## Resources

- **NextAuth v5**: [authjs.dev](https://authjs.dev)
- **Resend Email**: [resend.com/docs](https://resend.com/docs)
- **TinaCMS Self-Hosted**: [tina.io/docs/self-hosted](https://tina.io/docs/self-hosted)
- **Upstash Redis**: [docs.upstash.com/redis](https://docs.upstash.com/redis)
- **Vercel Environment Variables**: [vercel.com/docs/projects/environment-variables](https://vercel.com/docs/projects/environment-variables)

