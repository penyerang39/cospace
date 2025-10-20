# Environment Variables Setup

This document outlines the required environment variables for running Cospace with TinaCMS authentication in production.

## Required Environment Variables

### NextAuth Configuration

```bash
# Generate a random secret key (run this command):
# openssl rand -base64 32

NEXTAUTH_SECRET=your-generated-secret-key-here
NEXTAUTH_URL=https://your-domain.com
```

**Production Setup:**
- Generate a secure secret using `openssl rand -base64 32`
- Set `NEXTAUTH_URL` to your production domain (e.g., `https://cospace.neo14.com`)
- These should be set in your Vercel/hosting provider's environment variables

### Email Provider (Resend)

```bash
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=CMS Admin <admin@neo14.com>
```

**How to get Resend API Key:**
1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add your domain and verify DNS records
6. Use the API key in your environment variables

### TinaCMS Configuration

```bash
# Development: Set to 'true' for local-only mode (no auth required)
TINA_PUBLIC_IS_LOCAL=true

# Production: Remove this variable or set to 'false' to enable NextAuth
# TINA_PUBLIC_IS_LOCAL=false
```

## Local Development Setup

Create a `.env.local` file in your project root:

```bash
NEXTAUTH_SECRET=any-random-string-for-local-dev
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=CMS Admin <admin@neo14.com>
TINA_PUBLIC_IS_LOCAL=true
```

## Production Setup (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=<your-production-url>
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=CMS Admin <admin@neo14.com>
```

**Important:** Do NOT set `TINA_PUBLIC_IS_LOCAL` in production, or set it to `false`.

## How Authentication Works

### Development (Local)
- `TINA_PUBLIC_IS_LOCAL=true` enables local-only mode
- No authentication required
- CMS admin accessible at `/admin`

### Production
- `TINA_PUBLIC_IS_LOCAL` is not set or `false`
- NextAuth authentication required
- Magic links sent only to `@neo14.com` email addresses
- Login at `/admin/login`

## Testing Email Authentication Locally

To test magic links locally:
1. Set up Resend with a verified domain
2. Set `TINA_PUBLIC_IS_LOCAL=false` in `.env.local`
3. Run `pnpm dev`
4. Navigate to `http://localhost:3000/admin/login`
5. Enter your @neo14.com email
6. Check your inbox for the magic link

## Security Notes

- Only `@neo14.com` email addresses can access the CMS
- Magic links expire after 24 hours
- All authentication is handled by NextAuth with Resend
- No passwords or external authentication providers needed
- Content changes are committed to your git repository

## Troubleshooting

**"Failed to send email" error:**
- Verify your Resend API key is correct
- Ensure your domain is verified in Resend
- Check that `EMAIL_FROM` uses your verified domain

**"Access Denied" error:**
- Ensure you're using an @neo14.com email address
- Check the NextAuth callbacks in `/pages/api/auth/[...nextauth].ts`

**Build fails in production:**
- Ensure `tinacms build` is removed from the build script (already done)
- Verify all environment variables are set in your hosting provider

## Support

For issues with:
- NextAuth: [nextauth.js.org/getting-started/introduction](https://next-auth.js.org/getting-started/introduction)
- Resend: [resend.com/docs](https://resend.com/docs)
- TinaCMS: [tina.io/docs](https://tina.io/docs)

