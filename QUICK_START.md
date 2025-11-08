# Quick Start Guide - Admin Dashboard

## 🚀 5-Minute Setup (After Deployment)

### Prerequisites
- Umami deployed on Railway with PostgreSQL
- Resend account with verified domain
- All environment variables set in Vercel

### Step 1: Generate AUTH_SECRET (30 seconds)
```bash
openssl rand -base64 32
```
Add to Vercel as `AUTH_SECRET`

### Step 2: Get Umami Website ID (1 minute)
1. Visit your Railway Umami URL
2. Login (default: admin/umami)
3. Settings → Websites → Add website
4. Copy the Website ID (UUID)
5. Add to Vercel as `UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

### Step 3: Configure Resend (2 minutes)
1. Verify domain in Resend
2. Generate API key
3. Add to Vercel as `RESEND_API_KEY`
4. Set `EMAIL_FROM=noreply@yourdomain.com`

### Step 4: Deploy & Test (1 minute)
1. Deploy to Vercel (auto-deploy on push)
2. Visit `https://yourdomain.com/admin/signin`
3. Enter your email
4. Check email for magic link
5. Click link → You're in!

## 📍 Important URLs

- **Sign In**: `/admin/signin`
- **Dashboard**: `/admin/dashboard`
- **Analytics**: `/admin/dashboard/analytics`
- **Main Site**: `/`

## 🔑 Environment Variables Checklist

Copy to Vercel (Production, Preview, Development):

```bash
✅ AUTH_SECRET=<from openssl command>
✅ NEXTAUTH_URL=https://yourdomain.com
✅ RESEND_API_KEY=re_xxx
✅ EMAIL_FROM=noreply@yourdomain.com
✅ UMAMI_BASE_URL=https://your-umami.railway.app
✅ UMAMI_WEBSITE_ID=<uuid>
✅ UMAMI_COLLECT_PATH=/api/send
✅ NEXT_PUBLIC_UMAMI_WEBSITE_ID=<uuid>
✅ NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Optional (Rate Limiting):
```bash
⭕ UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
⭕ UPSTASH_REDIS_REST_TOKEN=xxx
```

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

