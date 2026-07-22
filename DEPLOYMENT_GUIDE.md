# SugarCoated Boutique - Deployment Guide

## Step 1: Buy Your Domain

**Options:**
- **Namecheap** (cheapest): namecheap.com (~$8-10/year)
- **GoDaddy**: godaddy.com (~$12-15/year)
- **Google Domains**: domains.google.com (~$12/year)

**Recommended domain:**
- `sugarcoated.gr` (if available - matches Athens brand)
- `sugarcoated-boutique.com`
- `sugarcoated-athens.com`

## Step 2: Deploy to Vercel (FREE)

### Option A: Deploy via GitHub (Recommended - Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/sugarcoated.git
   git push -u origin main
   ```

2. **Create Vercel Account:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Import Project"
   - Select your `sugarcoated` repository

3. **Configure Vercel:**
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add if needed (currently none required)
   - Click "Deploy"

4. **Get Your Vercel URL:**
   - After deployment, you'll get a URL like: `sugarcoated.vercel.app`
   - Test it works!

### Option B: Deploy Directly (Without GitHub)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "Y" to use existing settings

## Step 3: Connect Your Custom Domain

### In Vercel Dashboard:

1. Go to your project settings → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `sugarcoated.gr`)
4. Vercel will show DNS records to configure

### In Your Domain Provider (Namecheap/GoDaddy):

1. Go to your domain's DNS settings
2. Update the **Name Servers** to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

3. Wait 24-48 hours for DNS propagation
4. Your domain will automatically connect to Vercel ✨

## Step 4: Enable HTTPS (Automatic)

Vercel automatically provides free SSL/TLS certificates. Your site will be:
- `https://sugarcoated.gr`
- `https://www.sugarcoated.gr`

## Troubleshooting

**Site not loading?**
- Wait 30 minutes after DNS changes (DNS propagation takes time)
- Check Vercel dashboard for deployment errors
- Verify domain DNS settings are correct

**404 errors on pages?**
- Make sure build was successful in Vercel
- Check output directory is `dist`

**Images not loading?**
- Images should be in `/public/images/`
- Ensure image paths are correct in code

## Cost Breakdown

| Item | Cost |
|------|------|
| Domain (annual) | $8-15 |
| Hosting (Vercel) | FREE |
| SSL Certificate | FREE |
| **Total** | **$8-15/year** |

## After Deployment

1. ✅ Your website is live at your custom domain
2. ✅ Direct customers to Instagram for purchases
3. ✅ Update Instagram bio with website link
4. ✅ Share link in stories/posts

---

**Questions? Support:**
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Domain Provider Support: Contact their help center
