# Deployment Guide - Cloudflare Pages

## 🚀 Setup Awal

### 1. Install Wrangler
```bash
npm install -g wrangler
```

### 2. Login ke Cloudflare
```bash
wrangler login
```

### 3. Install Dependencies
```bash
npm install
```

## 📦 Build & Deploy

### 1. Build Production
```bash
npm run build
```

### 2. Deploy ke Cloudflare Pages
```bash
# Deploy production
npm run deploy

# Deploy preview
npm run deploy:preview
```

## 🔧 Konfigurasi

### `wrangler.toml`
- **Project Name**: wedding-invitation
- **Build Directory**: dist/
- **Compatibility**: Node.js 18+
- **SPA Routing**: Auto redirect ke index.html
- **Security Headers**: XSS protection, frame options
- **Caching**: 1 tahun untuk static assets

### Environment Variables
- **NODE_VERSION**: 18
- **ENVIRONMENT**: production/development

## 🌐 URL Structure

### Production
```
https://wedding-invitation.pages.dev/
```

### Preview
```
https://wedding-invitation.pages.dev/
```

### Dynamic Routes
```
/undangan/pernikahan/:id     → View undangan spesifik
/undangan/pernikahan/create    → Buat undangan baru
/daftar-tamu               → Manajemen tamu
/dashboard                   → Dashboard admin
```

## 📱 PWA Features

### Service Worker
- Cache semua static assets
- Offline support
- Background sync

### Manifest
- Installable di mobile
- Custom theme colors
- App icons

## 🔍 Testing

### Local Testing
```bash
npm run dev
# http://localhost:5173
```

### Preview Deployment
```bash
npm run deploy:preview
# Dapat diakses sebelum production
```

## 📊 Analytics

### Cloudflare Analytics
1. Buka Cloudflare Dashboard
2. Pilih project wedding-invitation
3. Aktifkan Web Analytics
4. Monitor traffic dan performance

## 🛠️ Troubleshooting

### Common Issues

1. **Build Error**
   ```bash
   npm run build
   # Check TypeScript errors
   ```

2. **Deploy Error**
   ```bash
   wrangler whoami
   # Verify login status
   ```

3. **Routing Issues**
   - Pastikan `wrangler.toml` redirect rules benar
   - Test SPA routing di production

4. **Cache Issues**
   - Clear browser cache
   - Check `Cache-Control` headers

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 📝 Custom Domain

### 1. Tambah Custom Domain
1. Buka Cloudflare Dashboard
2. Pages → wedding-invitation
3. Custom domains → Add custom domain
4. Update DNS records

### 2. SSL Certificate
- Otomatis provided oleh Cloudflare
- Auto-renewal
- Full SSL support

## 🎯 Best Practices

### Performance
- Enable Brotli compression
- Optimize images (WebP, AVIF)
- Minify CSS/JS
- Use CDN edge caching

### Security
- Enable HSTS
- CSP headers
- Rate limiting
- DDoS protection

### SEO
- Meta tags otomatis
- Sitemap generation
- Open Graph tags
- Structured data

## 📈 Monitoring

### Cloudflare Metrics
- Page views
- Unique visitors
- Bandwidth usage
- Error rates
- Geographic distribution

### Uptime Monitoring
- Cloudflare Uptime checks
- Alert configuration
- Performance monitoring

## 🔗 Link References

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
