# TinaCMS Self-Hosted Authentication Setup

## ✅ What Was Implemented

Your TinaCMS is now configured for **self-hosted production deployment** with NextAuth magic link authentication restricted to `@neo14.com` email addresses.

### Key Features

1. **No TinaCloud Required**: Fully self-hosted, no external API dependencies
2. **Magic Link Authentication**: Passwordless email-based sign-in
3. **Domain Restricted**: Only `@neo14.com` emails can access the CMS
4. **Beautiful UI**: Custom branded login, verify, and error pages
5. **Dual Mode**: Local dev (no auth) + Production (auth required)

## 🚀 Quick Start

### Local Development

```bash
# 1. Set up environment variables (create .env.local)
NEXTAUTH_SECRET=any-random-string
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_key
EMAIL_FROM=CMS Admin <admin@neo14.com>
TINA_PUBLIC_IS_LOCAL=true

# 2. Run development server
pnpm dev

# 3. Access CMS (no login required in dev)
# Navigate to: http://localhost:3000/admin
```

### Production Deployment

```bash
# 1. Set environment variables in Vercel/hosting provider:
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-domain.com
RESEND_API_KEY=<your resend api key>
EMAIL_FROM=CMS Admin <admin@neo14.com>
# Do NOT set TINA_PUBLIC_IS_LOCAL (or set to false)

# 2. Deploy normally
pnpm build

# 3. Access CMS in production
# Navigate to: https://your-domain.com/admin/login
# Enter your @neo14.com email
# Check email for magic link
# Click link to access CMS
```

## 📁 Files Created

### API Routes
- `pages/api/auth/[...nextauth].ts` - NextAuth configuration with email provider
- `pages/api/tina/[...routes].ts` - TinaCMS backend with authentication

### Admin UI Pages
- `app/admin/login/page.tsx` - Branded login page
- `app/admin/verify/page.tsx` - Email sent confirmation page
- `app/admin/error/page.tsx` - Error handling page

### Configuration
- `tina/config.ts` - Updated for self-hosted mode
- `package.json` - Fixed build script (removed `tinacms build`)

### Documentation
- `ENV_SETUP.md` - Complete environment variable guide
- `TINACMS_AUTH_SETUP.md` - This file

## 🎨 How It Works

### Development Mode (`TINA_PUBLIC_IS_LOCAL=true`)
```
User → /admin → TinaCMS (no auth) → Edit content directly
```

### Production Mode (`TINA_PUBLIC_IS_LOCAL` not set)
```
User → /admin/login → Enter @neo14.com email
     ↓
Email sent with magic link
     ↓
Click link → Authenticated → /admin → TinaCMS → Edit content
```

## 🔐 Security Features

1. **Email Restriction**: Only `@neo14.com` domains accepted
2. **Magic Links**: Expire after 24 hours
3. **Session Management**: Handled by NextAuth
4. **No Passwords**: Passwordless authentication reduces attack surface
5. **HTTPS Only**: Production requires secure connection

## 📝 Content Management Workflow

### Making Changes

1. **Login**: Go to `https://your-domain.com/admin/login`
2. **Authenticate**: Enter your @neo14.com email, click magic link
3. **Edit**: Navigate to "Pricing" collection in CMS
4. **Modify**: Add/edit/remove tiers, features, categories
5. **Save**: Changes are saved to `content/pricing.json`
6. **Deploy**: Commit changes to git, redeploy

### Content Structure

The pricing data lives in `content/pricing.json` with:
- **Categories**: Feature groupings (appbuilder, chat, data, etc.)
- **Tiers**: Pricing plans with all metadata
- **Features**: Individual features with tier availability (1/-1)

## 🛠️ Customization

### Change Allowed Email Domain

Edit `pages/api/auth/[...nextauth].ts`:

```typescript
// Change @neo14.com to your domain
if (!email.endsWith('@yourdomain.com')) {
  throw new Error('Only @yourdomain.com email addresses are allowed');
}
```

### Customize Login Page

Edit `app/admin/login/page.tsx` to match your branding.

### Add More Admin Users

Just ensure they have `@neo14.com` email addresses - no database or user management needed!

## 🐛 Troubleshooting

### Build Fails
**Error**: "Missing clientId, token"  
**Solution**: ✅ Already fixed - `tinacms build` removed from build script

### Can't Send Emails
**Error**: "Failed to send email"  
**Solution**: 
1. Get Resend API key from [resend.com](https://resend.com)
2. Verify your domain in Resend
3. Set `RESEND_API_KEY` environment variable

### Access Denied
**Error**: "Only @neo14.com email addresses are allowed"  
**Solution**: Ensure you're using an @neo14.com email address

### CMS Not Loading in Production
**Issue**: `/admin` shows login instead of CMS  
**Solution**: This is correct! Login first, then you'll see the CMS

## 📊 What You Can Edit in the CMS

Via `/admin` (after authentication):

✅ **Add/Remove Pricing Tiers**: Create new plans or remove existing ones  
✅ **Edit Tier Details**: Name, price, description, user limits  
✅ **Mark Popular**: Flag tiers as "most popular"  
✅ **Add/Remove Features**: Manage the feature list  
✅ **Toggle Features per Tier**: Set 1 (enabled) or -1 (disabled)  
✅ **Manage Categories**: Create new feature groupings  
✅ **Reorder Everything**: Change display order with drag-and-drop  

## 🎯 Next Steps

1. Set up Resend account and get API key
2. Add environment variables to your hosting provider
3. Deploy and test the login flow
4. Start managing your pricing data through the CMS!

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [TinaCMS Self-Hosted Guide](https://tina.io/docs/self-hosted/overview/)
- [Resend Email API](https://resend.com/docs)

---

**Need help?** Check `ENV_SETUP.md` for detailed environment variable configuration.

