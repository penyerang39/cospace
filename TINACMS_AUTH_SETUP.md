# TinaCMS Authentication Setup

## Overview

This project uses a **simple token-based authentication** for TinaCMS to avoid the React 19 compatibility issues with `tinacms-authjs`.

## How It Works

### Frontend (TinaCMS UI)
- Uses `SimpleAuthProvider` defined in `lib/tina-simple-auth.ts`
- When you access `/admin`, you'll see a prompt asking for a token
- The token is stored in localStorage
- Token is sent with every GraphQL request to the backend

### Backend (API Routes)
- `pages/api/tina/[...routes].ts` validates the bearer token
- Checks if the token matches the `TINA_TOKEN` environment variable
- Returns 401 if token is invalid or missing

## Setup Instructions

### 1. Generate a Secure Token

Generate a random secure token:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### 2. Set Environment Variables

#### Local Development
Create a `.env.local` file:
```bash
TINA_PUBLIC_IS_LOCAL=true  # No auth required locally
```

#### Production (Vercel)
Set these environment variables in Vercel:
```bash
TINA_PUBLIC_IS_LOCAL=false
TINA_TOKEN=your_generated_token_here
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_pat
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 3. Access TinaCMS

#### Local Development
1. Run `pnpm dev`
2. Go to `http://localhost:3000/admin`
3. No authentication required

#### Production
1. Go to `https://your-domain.com/admin`
2. You'll see a prompt: "Enter admin token:"
3. Enter the token you set in `TINA_TOKEN`
4. Click OK
5. Page will reload and you'll be authenticated

## Security Notes

- **Keep your token secret!** Don't commit it to git
- The token is stored in localStorage in the browser
- Anyone with the token can access the CMS
- To revoke access, change the `TINA_TOKEN` in Vercel
- For better security, consider implementing proper user management once `tinacms-authjs` supports React 19

## Troubleshooting

### "Server configuration error"
- Make sure `TINA_TOKEN` is set in Vercel environment variables
- Redeploy after adding the variable

### Still seeing TinaCloud login
- Make sure `TINA_PUBLIC_IS_LOCAL=false` in production
- Check that the auth provider is configured in `tina/config.ts`
- Clear your browser cache and localStorage

### Token not working
- Verify the token matches exactly (no extra spaces)
- Check browser console for errors
- Make sure you're sending requests to the right domain

## Files

- `lib/tina-simple-auth.ts` - Frontend auth provider
- `pages/api/tina/[...routes].ts` - Backend auth validation
- `tina/config.ts` - TinaCMS configuration with auth provider
