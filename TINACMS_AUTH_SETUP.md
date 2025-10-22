# TinaCMS Authentication Setup

## Overview

This project uses **custom NextAuth v5 with magic link authentication** for TinaCMS. This setup is fully compatible with React 19 and Next.js 15, providing secure email-based authentication restricted to @neo14.com domain.

## Architecture

### Frontend Authentication (`lib/tina-nextauth-provider.ts`)
- Custom TinaCMS `AuthProvider` implementation
- Integrates with NextAuth v5 session management
- Handles login redirect, session token retrieval, and logout
- No client-side domain filtering (accepts any email)

### Backend Authentication (`pages/api/tina/[...routes].ts`)
- Custom `BackendAuthProvider` for TinaCMS API routes
- Validates NextAuth sessions server-side
- **SERVER-SIDE ONLY**: Enforces @neo14.com domain restriction
- Returns authorization status for all TinaCMS GraphQL requests

### Auth Configuration (`auth.ts`)
- NextAuth v5 configuration with Resend email provider
- JWT-based session strategy
- Sign-in callback validates email domain (server-side)
- Custom pages for login, verification, and errors

## How It Works

### 1. User Accesses Admin (`/admin`)
- TinaCMS checks authentication status
- If not authenticated → redirects to `/admin/login`
- If authenticated → loads CMS interface

### 2. Login Flow (`/admin/login`)
- User enters email address (any email accepted by UI)
- NextAuth sends magic link via Resend
- Success message: "Check your email"

### 3. Magic Link Click
- User clicks link in email
- NextAuth validates the token
- **Server-side callback** checks if email ends with @neo14.com
- If valid → creates session, redirects to `/admin/verify`
- If invalid → redirects to `/admin/error?error=AccessDenied`

### 4. Verification (`/admin/verify`)
- Shows "Verifying..." spinner
- Auto-redirects to `/admin` after brief delay
- CMS loads with authenticated session

### 5. CMS Access
- TinaCMS frontend uses `NextAuthProvider` to get session
- All GraphQL requests include NextAuth session token
- Backend validates session on each request
- Checks email domain restriction server-side

### 6. Logout
- User clicks logout in CMS
- Calls NextAuth `signOut()`
- Session cleared, redirects to login

## Security Features

### Server-Side Domain Restriction
✅ **Frontend**: Accepts any email address (no client-side filtering)  
✅ **Backend**: Validates @neo14.com during sign-in callback (server-side only)  
✅ **API Routes**: Every TinaCMS request validates session and domain

This prevents security vulnerabilities from hardcoded domain checks in client code.

### Session Management
- JWT-based sessions (no database required for sessions)
- HttpOnly cookies (not accessible via JavaScript)
- Automatic session expiration
- Secure token transmission

### Magic Link Security
- Single-use tokens (cannot be reused)
- Time-limited expiration (default: 24 hours)
- Sent only to provided email address
- No password storage or management needed

## Setup Instructions

### 1. Install Dependencies

Already installed:
```bash
pnpm add next-auth@beta @auth/core resend
```

### 2. Configure Environment Variables

See [ENV_SETUP.md](./ENV_SETUP.md) for complete environment variable configuration.

**Required for production:**
- `NEXTAUTH_SECRET` - Generated with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM` - Verified sender email
- `TINA_PUBLIC_IS_LOCAL=false` - Enable authentication

### 3. Set Up Resend

1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain (neo14.com)
3. Create API key
4. Add to Vercel environment variables

### 4. Deploy to Vercel

1. Push changes to repository
2. Set environment variables in Vercel dashboard
3. Deploy
4. Test authentication flow

## File Structure

```
c:\Users\Agnija\Documents\cospace/
├── auth.ts                              # NextAuth v5 core configuration
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts             # NextAuth API routes
│   └── admin/
│       ├── page.tsx                     # CMS redirect page
│       ├── login/
│       │   └── page.tsx                 # Magic link login form
│       ├── verify/
│       │   └── page.tsx                 # Post-login verification
│       └── error/
│           └── page.tsx                 # Authentication errors
├── lib/
│   └── tina-nextauth-provider.ts        # Custom TinaCMS frontend provider
├── pages/
│   └── api/
│       └── tina/
│           └── [...routes].ts           # TinaCMS API with auth validation
└── tina/
    ├── config.ts                        # TinaCMS config with NextAuthProvider
    └── database.ts                      # Database config (Upstash Redis)
```

## Local Development

### Without Authentication (Recommended)
```bash
# .env.local
TINA_PUBLIC_IS_LOCAL=true

# Run
pnpm dev

# Access
http://localhost:3000/admin (no login required)
```

### With Authentication (Testing)
```bash
# .env.local
TINA_PUBLIC_IS_LOCAL=false
NEXTAUTH_SECRET=test-secret-for-local
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=CMS <cms@neo14.com>

# Run
pnpm dev

# Access
http://localhost:3000/admin (redirects to login)
```

## Troubleshooting

### "Access Denied" Error
**Cause**: Email doesn't end with @neo14.com  
**Solution**: Use an @neo14.com email address for authentication

### Magic Link Not Received
**Cause**: Resend API key invalid or domain not verified  
**Solution**: 
- Check Resend dashboard for API key status
- Verify neo14.com domain is verified in Resend
- Check spam folder
- Review Vercel logs for Resend errors

### CMS Shows "Unauthorized"
**Cause**: Session expired or invalid  
**Solution**:
- Log out and log in again
- Clear browser cookies
- Check NEXTAUTH_SECRET is set in production
- Verify session is valid in browser dev tools (Application > Cookies)

### Admin Interface Blank/Not Loading
**Cause**: TinaCMS build failed or auth provider misconfigured  
**Solution**:
- Regenerate admin assets: `pnpm exec tinacms build --partial-reindex`
- Check browser console for errors
- Verify `lib/tina-nextauth-provider.ts` is correctly imported in `tina/config.ts`
- Ensure `contentApiUrlOverride: '/api/tina/gql'` is set

## Comparison with tinacms-authjs

| Aspect | tinacms-authjs | Our Custom Solution |
|--------|----------------|---------------------|
| **React Support** | React 18 only | React 19 ✅ |
| **Next.js Support** | Next.js 14 | Next.js 15 ✅ |
| **Auth Method** | Username/Password | Email Magic Links |
| **User Storage** | JSON file | NextAuth sessions |
| **Domain Restriction** | N/A | @neo14.com (server-side) |
| **Compatibility** | Peer dependency issues | Fully compatible |
| **Maintenance** | External package | In-codebase, customizable |

## Benefits of This Approach

✅ **React 19 & Next.js 15 Compatible**: No peer dependency conflicts  
✅ **Secure**: Server-side domain validation, no client-side filtering  
✅ **User-Friendly**: Magic links, no passwords to remember  
✅ **Professional**: Industry-standard NextAuth v5 implementation  
✅ **Flexible**: Easy to modify auth logic or add providers  
✅ **Maintainable**: All auth code in your codebase, not external package  
✅ **Self-Hosted**: No reliance on TinaCloud infrastructure

## Resources

- **NextAuth v5 Documentation**: [authjs.dev](https://authjs.dev)
- **Resend Email Provider**: [resend.com/docs](https://resend.com/docs)
- **TinaCMS Auth Provider API**: [tina.io/docs/reference/auth](https://tina.io/docs/reference/auth)
- **Custom Auth Implementation**: [tina.io/docs/self-hosted/auth-provider](https://tina.io/docs/self-hosted/auth-provider)
