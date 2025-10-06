# 🚀 Panduan Deployment Swaragama Training Center ke Vercel

## 📋 Persyaratan Sebelum Deploy

- [x] Website sudah build berhasil (fixed WebAssembly compilation error)
- [x] Semua dependencies terinstall dengan benar
- [x] Git repository sudah disiapkan
- [x] Akun Vercel sudah dibuat

## 🛠️ Persiapan Deployment

### 1. Pastikan Build Berjalan Lokal
```bash
npm run build
```

### 2. Test Preview Lokal
```bash
npm run preview
```

## 🌐 Deploy ke Vercel

### Metode 1: Deploy via CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login ke Vercel**
```bash
vercel login
```

3. **Deploy dari root directory**
```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your username/team**
   - Link to existing project? **No**
   - Project name: **swaragama-training-center**
   - In which directory is your code located? **./  (current directory)**
   - Want to override the settings? **No**

### Metode 2: Deploy via GitHub Integration

1. **Push ke GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "Add New" → "Project"
   - Import dari GitHub repository
   - Pilih repository website Swaragama

3. **Konfigurasi Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## ⚙️ Konfigurasi Environment

### Environment Variables (MongoDB Integration)
Tambahkan di Vercel Dashboard → Project Settings → Environment Variables:

```env
# MongoDB Database Configuration (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.xxx.mongodb.net/swaragama_training_center?retryWrites=true&w=majority
MONGODB_DB=swaragama_training_center

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_google_analytics_id

# Future Supabase Integration (Optional)
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### MongoDB Atlas Setup
1. Buat akun MongoDB Atlas (gratis)
2. Buat cluster database
3. Setup database user dan password
4. Whitelist IP addresses
5. Copy connection string ke MONGODB_URI

## 🔧 Konfigurasi Domain Custom

### 1. Setup Domain Custom
1. Buka project di Vercel Dashboard
2. Go to "Settings" → "Domains"
3. Add domain: `swaragamatrainingcenter.com`
4. Configure DNS records di domain provider:

```
Type    Name    Value
A       @       76.76.19.61
CNAME   www     cname.vercel-dns.com
```

### 2. Redirect www ke non-www
Tambahkan di Vercel Dashboard:
- www.swaragamatrainingcenter.com → swaragamatrainingcenter.com

## 📊 Performance & SEO Optimizations

### Sudah Dikonfigurasi:
- ✅ Static file caching (31536000 seconds)
- ✅ Security headers
- ✅ SPA routing support
- ✅ SEO meta tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags
- ✅ Twitter Card tags

### Additional Optimizations:
- ✅ Code splitting dengan lazy loading
- ✅ Image optimization
- ✅ CSS optimization
- ✅ Font optimization
- ✅ Service Worker ready

## 🔍 Monitoring & Analytics

### Vercel Analytics (Built-in)
Akan otomatis aktif untuk:
- Page views
- Performance metrics
- Core Web Vitals
- Geographic data

### Google Analytics (Optional)
Tambahkan tracking ID di environment variables dan update kode jika diperlukan.

## 🚨 Troubleshooting

### Common Issues:

1. **Build Error: TypeScript Issues**
```bash
npm run lint
# Fix TypeScript errors yang muncul
```

2. **Route Not Found (404 on refresh)**
   - Sudah handled dengan `vercel.json` rewrites
   - Semua routes akan redirect ke `index.html`

3. **Slow Loading**
   - Check Network tab di browser
   - Optimize images menggunakan Unsplash queries
   - Lazy load components sudah diimplementasi

4. **Admin Dashboard Not Working**
   - Admin route: `/#admin`
   - Kredensial: `adminstcstcadmin` / `20111102`
   - Data tersimpan di localStorage

## 📱 Testing Deployment

### 1. Functional Testing
- [ ] Homepage loading
- [ ] Navigation working
- [ ] All sections visible
- [ ] Dark mode toggle
- [ ] Contact form
- [ ] Admin dashboard accessible
- [ ] Mobile responsiveness

### 2. Performance Testing
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals Green
- [ ] Fast loading on 3G

### 3. SEO Testing
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt working

## 🔄 CI/CD Pipeline

Vercel akan otomatis:
1. **Build on every push** ke main branch
2. **Deploy preview** untuk pull requests
3. **Run build checks** sebelum deploy
4. **Rollback** jika ada error

## 📞 Support & Maintenance

### Auto-Deployment Setup:
- ✅ Setiap push ke `main` branch = production deploy
- ✅ Setiap pull request = preview deploy
- ✅ Branch lain = development preview

### Backup Strategy:
- Repository GitHub sebagai backup
- Vercel otomatis backup deployments
- localStorage data perlu backup manual

## 🎯 Post-Deployment Checklist

- [ ] Website accessible via URL
- [ ] All pages loading correctly
- [ ] Performance score good
- [ ] SEO meta tags working
- [ ] Admin dashboard functional
- [ ] Mobile version responsive
- [ ] Contact form working
- [ ] Social media links working
- [ ] Domain SSL certificate active

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Performance Testing**: https://pagespeed.web.dev/
- **SEO Testing**: https://search.google.com/test/rich-results
- **Lighthouse CI**: Built into Vercel

---

**Note**: Website ini adalah pure frontend application dengan admin dashboard tersembunyi yang menggunakan localStorage. Untuk fitur backend yang lebih robust, pertimbangkan integrasi Supabase di masa depan.