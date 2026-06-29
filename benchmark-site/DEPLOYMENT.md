# Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above (or visit [Vercel](https://vercel.com))
2. Import the repository
3. Vercel will automatically detect Next.js and configure settings
4. Click "Deploy"
5. Your site will be live in ~2 minutes!

**Vercel handles:**
- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Zero configuration needed

### Option 2: Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your GitHub repository
3. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

### Option 3: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Next.js and deploy

### Option 4: Self-Hosted (Docker)

Create a `Dockerfile` in the benchmark-site directory:

```dockerfile
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

Then build and run:

```bash
docker build -t llm-benchmark-hub .
docker run -p 3000:3000 llm-benchmark-hub
```

### Option 5: Traditional VPS (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone <your-repo>
cd benchmark-site
npm install
npm run build

# Run with PM2
npm install -g pm2
pm2 start npm --name "benchmark-site" -- start
pm2 save
pm2 startup
```

## Environment Variables

Copy `.env.example` to `.env.local` and update:

```bash
cp .env.example .env.local
```

For production, set:
- `NEXT_PUBLIC_SITE_URL` to your domain
- Optional analytics IDs if using tracking

## Custom Domain

### Vercel
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS

## Performance Optimization

The site is already optimized with:
- ✅ Static generation where possible
- ✅ Code splitting
- ✅ Image optimization
- ✅ CSS minification
- ✅ Tree shaking

For additional optimization:
1. Enable Vercel Analytics
2. Add Cloudflare CDN
3. Enable gzip/brotli compression (automatic on Vercel/Netlify)

## Monitoring

Recommended tools:
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: Vercel Analytics, Google Analytics
- **Errors**: Sentry

## Continuous Deployment

Already configured! Once deployed to Vercel/Netlify:
- Every push to `main` branch = production deployment
- Every PR = preview deployment
- Automatic rollbacks available

## Cost Estimates

- **Vercel Hobby**: Free (perfect for this project)
- **Netlify Free**: Free (100GB bandwidth)
- **Railway**: ~$5/month
- **VPS (DigitalOcean)**: $4-6/month
- **Docker on any provider**: Varies

## Post-Deployment Checklist

- [ ] Custom domain configured
- [ ] HTTPS working
- [ ] robots.txt updated with actual domain
- [ ] Analytics configured (optional)
- [ ] Test all features work in production
- [ ] Mobile responsiveness verified
- [ ] Dark mode working
- [ ] Charts rendering correctly

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Create an issue in the repository
