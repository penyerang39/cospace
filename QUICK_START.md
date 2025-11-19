# Quick Start Guide - Admin Dashboard

## 🚀 Complete Setup (10 Minutes)

### Step 1: Create Vercel Postgres Database (2 minutes)
1. Go to Vercel → Your Project → **Storage** tab
2. Click **Create Database** → **Postgres**
3. Click **Create**
4. Vercel auto-adds `DATABASE_URL` to your env vars
5. Go to **Query** tab in the database
6. Run this SQL to create tables:

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Step 2: Deploy Umami on Vercel (3 minutes)
1. Fork https://github.com/umami-software/umami to your GitHub
2. In Vercel, click **Add New** → **Project**
3. Import your forked Umami repo
4. Vercel will auto-detect it and add Postgres
5. Or manually add env vars:
   - `DATABASE_URL` - Use the same Vercel Postgres or create another
   - `APP_SECRET` - Run `openssl rand -hex 32` and paste
6. Deploy and wait 2-3 minutes
7. Visit your Umami Vercel URL
8. Login: `admin` / `umami` (change password immediately)
9. Settings → Websites → Add website → Copy the UUID

### Step 3: Configure Resend (2 minutes)
1. Go to resend.com → Sign up/login
2. **Domains** → Add your domain → Add DNS records
3. **API Keys** → Create API Key → Copy it

### Step 4: Add Environment Variables (2 minutes)
In Vercel → Your Project → Settings → Environment Variables, add:

```bash
# Database (already added by Vercel Postgres)
DATABASE_URL=<auto-added>

# Auth
AUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://yourdomain.com

# Email
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@yourdomain.com

# Umami
UMAMI_BASE_URL=https://your-umami.vercel.app
UMAMI_WEBSITE_ID=<uuid-from-step-2>
UMAMI_COLLECT_PATH=/api/send
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<uuid-from-step-2>
```

### Step 5: Deploy & Test (1 minute)
1. Redeploy your app (Settings → Deployments → Latest → Redeploy)
2. Visit `https://yourdomain.com/admin/signin`
3. Enter your email
4. Check email for magic link
5. Click link → Dashboard loads
6. Click Analytics → Umami UI appears

## 📍 Important URLs

- **Sign In**: `/admin/signin`
- **Dashboard**: `/admin/dashboard`
- **Analytics**: `/admin/dashboard/analytics`
- **Main Site**: `/`

## 🔑 Environment Variables Checklist

All on Vercel (Production, Preview, Development):

```bash
✅ DATABASE_URL=<auto-added by Vercel Postgres>
✅ AUTH_SECRET=<openssl rand -base64 32>
✅ NEXTAUTH_URL=https://yourdomain.com
✅ RESEND_API_KEY=re_xxxxx
✅ EMAIL_FROM=noreply@yourdomain.com
✅ UMAMI_BASE_URL=https://your-umami.vercel.app
✅ UMAMI_WEBSITE_ID=<uuid>
✅ UMAMI_COLLECT_PATH=/api/send
✅ NEXT_PUBLIC_UMAMI_WEBSITE_ID=<uuid>
```

Optional:
```bash
⭕ UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
⭕ UPSTASH_REDIS_REST_TOKEN=xxx
```

## Everything on Vercel
- Main app: Your Cospace project
- Database: Vercel Postgres (for NextAuth)
- Analytics: Umami deployed on Vercel (separate project)
- Email: Resend (external service)

No Railway needed!

## 🧪 Quick Test

```bash
# 1. Test tracking (should see 200)
curl https://yourdomain.com/api/umami/script

# 2. Test authentication
# Visit: https://yourdomain.com/admin/signin
# Enter email → Check inbox → Click link

# 3. Test dashboard access
# Visit: https://yourdomain.com/admin/dashboard
# Should see dashboard if authenticated

# 4. Test analytics
# Visit: https://yourdomain.com/admin/dashboard/analytics
# Should see Umami UI proxied
```

## 🆘 Common Issues

### "Umami not configured" error
→ Check `UMAMI_BASE_URL` is set and Railway service is running

### Magic link not received
→ Check Resend dashboard for delivery, verify domain, check spam

### Dashboard shows 401
→ Sign in at `/admin/signin` first

### Analytics not tracking
→ Verify `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set correctly

## 📚 Full Documentation

- **Setup**: `SETUP_ADMIN.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Testing**: `TESTING_ADMIN.md`
- **Summary**: `ADMIN_IMPLEMENTATION_SUMMARY.md`

## 🎯 Next: Add CMS

When ready to add CMS:
1. Deploy your CMS to Railway/elsewhere
2. Create `app/admin/dashboard/cms/[[...path]]/route.ts`
3. Copy pattern from analytics proxy
4. Add link to dashboard landing page

Done! 🎉

