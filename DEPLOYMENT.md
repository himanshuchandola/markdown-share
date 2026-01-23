# Deployment Guide - Subdomain Setup

## Subdomain: `markdown.himanshuchandola.dev`

### Step 1: Namecheap DNS Configuration

1. Log in to your Namecheap account
2. Go to **Domain List** → Click **Manage** next to `himanshuchandola.dev`
3. Navigate to the **Advanced DNS** tab
4. In the **Host Records** section, click **Add New Record**
5. Configure the CNAME record:
   - **Type**: `CNAME Record`
   - **Host**: `markdown`
   - **Value**: `cname.vercel-dns.com.` (include the trailing dot)
   - **TTL**: `Automatic` (or `30 min`)
6. Click the **Save** icon (checkmark) to save the record

**Note**: DNS propagation can take 5 minutes to 48 hours, but usually completes within 1-2 hours.

### Step 2: Vercel Domain Configuration

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your **markdown-share** project
3. Navigate to **Settings** → **Domains**
4. In the **Domains** section, click **Add** or **Add Domain**
5. Enter: `markdown.himanshuchandola.dev`
6. Click **Add**
7. Vercel will automatically detect the DNS configuration
8. Wait for verification (usually takes a few minutes)

**Status Indicators:**

- ✅ **Valid Configuration**: DNS is correctly configured
- ⏳ **Pending**: Waiting for DNS propagation
- ❌ **Invalid Configuration**: Check DNS settings

### Step 3: Update Environment Variables

1. In Vercel project → **Settings** → **Environment Variables**
2. Find or add `APP_URL`
3. Update the value to: `https://markdown.himanshuchandola.dev`
4. Make sure it's set for **Production**, **Preview**, and **Development** (or at least Production)
5. Click **Save**

### Step 4: Redeploy (if needed)

After updating `APP_URL`:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger automatic deployment

### Step 5: Verify Setup

1. Wait for DNS propagation (check with: `nslookup markdown.himanshuchandola.dev`)
2. Visit `https://markdown.himanshuchandola.dev` in your browser
3. The site should load with SSL certificate (automatic via Vercel)

## Troubleshooting

### DNS Not Propagating

- Check Namecheap DNS records are saved correctly
- Verify the CNAME value is exactly: `cname.vercel-dns.com.` (with trailing dot)
- Use DNS checker tools: https://dnschecker.org/
- Wait up to 48 hours for full propagation

### Vercel Shows "Invalid Configuration"

- Double-check the CNAME record in Namecheap
- Ensure the host is `markdown` (not `markdown.himanshuchandola.dev`)
- Verify TTL is set correctly
- Try removing and re-adding the domain in Vercel

### SSL Certificate Issues

- Vercel automatically provisions SSL certificates via Let's Encrypt
- This happens automatically after DNS verification
- Can take up to 24 hours, but usually completes within minutes

### Environment Variables Not Updating

- Make sure you're updating the correct environment (Production/Preview/Development)
- Redeploy after updating environment variables
- Clear browser cache if needed

## Quick Reference

**Namecheap CNAME Record:**

```
Type: CNAME
Host: markdown
Value: cname.vercel-dns.com.
TTL: Automatic
```

**Vercel Domain:**

```
markdown.himanshuchandola.dev
```

**Environment Variable:**

```
APP_URL=https://markdown.himanshuchandola.dev
```
