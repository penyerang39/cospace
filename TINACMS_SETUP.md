# TinaCMS Self-Hosting Setup Guide

This guide will help you set up TinaCMS self-hosting for your Next.js project on Vercel.

## Prerequisites

1. A GitHub repository with your Next.js project
2. A Vercel account
3. A Vercel KV database (or Upstash Redis)

## Installation

1. Install the required dependencies:
```bash
pnpm install @tinacms/datalayer tinacms-gitprovider-github upstash-redis-level
```

2. Install the TinaCMS CLI globally (if not already installed):
```bash
pnpm add -g @tinacms/cli
```

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

### Development
```env
TINA_PUBLIC_IS_LOCAL=true
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Production (Vercel)
Set these in your Vercel project settings:

```env
TINA_PUBLIC_IS_LOCAL=false
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
GITHUB_BRANCH=main
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

**Important**: The build will work even without these environment variables initially. TinaCMS will use a local database during build time and switch to the production database once the environment variables are configured.

## GitHub Setup

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with `repo` scope
   - Copy the token and add it to your environment variables

## Upstash Redis Setup

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your environment variables
4. Add these to your Vercel project settings

## Development

1. Start the development server:
```bash
pnpm dev
```

2. Access the TinaCMS admin at `http://localhost:3000/admin`

## Production Deployment

1. Push your changes to GitHub
2. Deploy to Vercel (the build process will automatically compile TinaCMS files)
3. Access the admin at `https://your-domain.vercel.app/admin`

## Default Login Credentials

- Username: `tinauser`
- Password: `tinarocks`

**Important**: Change these credentials after first login!

## Build Process

The build process has been configured to:
1. Generate navigation files
2. Scrape legal content  
3. Build TinaCMS (with graceful fallback if Redis is not configured)
4. Build the Next.js application

The build script (`scripts/build-with-tina.js`) handles TinaCMS build failures gracefully, allowing the deployment to succeed even before Redis/Vercel KV is configured.

## Troubleshooting

### Common Issues

1. **Build fails**: Ensure all environment variables are set correctly
2. **Admin not accessible**: Check that the `/admin` route is properly configured
3. **Authentication issues**: Verify NextAuth configuration and secrets

### Debug Mode

Set `DEBUG=true` in your environment variables to enable debug logging.

## File Structure

```
tina/
├── config.ts          # TinaCMS configuration
├── database.ts         # Database configuration
└── __generated__/      # Auto-generated files
```

## Support

For more information, refer to:
- [TinaCMS Self-Hosting Documentation](https://tina.io/docs/self-hosted/)
- [Next.js Vercel Example](https://tina.io/docs/self-hosted/starters/nextjs-vercel)
