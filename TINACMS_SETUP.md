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
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
```

## GitHub Setup

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with `repo` scope
   - Copy the token and add it to your environment variables

## Vercel KV Setup

1. In your Vercel dashboard, go to your project
2. Navigate to the Storage tab
3. Create a new KV Database
4. Copy the `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your environment variables

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
1. Run TinaCMS build with partial reindexing
2. Generate navigation files
3. Scrape legal content
4. Build the Next.js application

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
