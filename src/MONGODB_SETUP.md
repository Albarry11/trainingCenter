# 🍃 MongoDB Integration Guide for Swaragama Training Center

## 📋 Overview

Panduan lengkap untuk mengintegrasikan MongoDB dengan website Swaragama Training Center, menggantikan sistem localStorage dengan database yang proper dan scalable.

## 🚀 Quick Start

### 1. Setup MongoDB Atlas (Recommended)

1. **Buat Akun MongoDB Atlas**
   - Kunjungi [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Daftar akun gratis (Free Tier: 512MB storage)

2. **Buat Cluster Baru**
   - Pilih "Build a Database"
   - Pilih "FREE" shared cluster
   - Pilih region terdekat (Singapore/Jakarta)
   - Nama cluster: `swaragama-cluster`

3. **Setup Database Access**
   - Buat database user:
     - Username: `swaragama_admin`
     - Password: Generate strong password
     - Role: `Read and write to any database`

4. **Whitelist IP Address**
   - Network Access → Add IP Address
   - Untuk development: `0.0.0.0/0` (Allow from anywhere)
   - Untuk production: Gunakan IP spesifik

5. **Get Connection String**
   - Connect → Drivers → Node.js
   - Copy connection string
   - Format: `mongodb+srv://<username>:<password>@cluster.xxx.mongodb.net/<database>`

### 2. Environment Variables Setup

1. **Buat file `.env.local`**
```bash
cp .env.example .env.local
```

2. **Update environment variables**
```env
# MongoDB Database Configuration
MONGODB_URI=mongodb+srv://swaragama_admin:YOUR_PASSWORD@swaragama-cluster.xxxxx.mongodb.net/swaragama_training_center?retryWrites=true&w=majority
MONGODB_DB=swaragama_training_center
```

3. **Vercel Environment Variables**
   - Buka Vercel Dashboard
   - Project Settings → Environment Variables
   - Tambahkan:
     - `MONGODB_URI`: Connection string MongoDB
     - `MONGODB_DB`: `swaragama_training_center`

### 3. Database Schema

MongoDB akan otomatis membuat collections dengan schema berikut:

#### Articles Collection
```javascript
{
  _id: ObjectId,
  title: String,
  excerpt: String,
  content: String,
  image: String,
  author: String,
  category: String,
  tags: [String],
  published: Boolean,
  publishDate: Date,
  readTime: Number,
  viewCount: Number,
  likes: Number,
  slug: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### News Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  excerpt: String,
  image: String,
  author: String,
  published: Boolean,
  publishDate: Date,
  category: String,
  tags: [String],
  priority: String, // 'high' | 'medium' | 'low'
  slug: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Gallery Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String,
  category: String,
  tags: [String],
  uploadDate: Date,
  photographer: String,
  location: String,
  event: String,
  published: Boolean,
  featured: Boolean,
  likes: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Data Migration

### Migration Tool Usage

1. **Access Admin Dashboard**
   - Klik logo STC di footer 7x dalam 2 detik
   - Login dengan kredensial admin

2. **Use Migration Tool**
   - Navigate ke Dashboard Admin
   - Gunakan Migration Tool component
   - Follow these steps:
     - Check localStorage data
     - Backup data (recommended)
     - Start migration
     - Clear localStorage (optional)

### Manual Migration (Alternative)

Jika migration tool gagal, lakukan manual migration:

```javascript
// Export localStorage data
const articles = JSON.parse(localStorage.getItem('stc-articles') || '[]');
const news = JSON.parse(localStorage.getItem('stc-news') || '[]');
const gallery = JSON.parse(localStorage.getItem('stc-gallery') || '[]');

// Call migration API
fetch('/api/migrate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ articles, news, gallery })
});
```

## 🛠️ API Endpoints

### Articles API
- `GET /api/articles` - Get articles (with pagination)
- `POST /api/articles` - Create article
- `PUT /api/articles?id={id}` - Update article
- `DELETE /api/articles?id={id}` - Delete article

### News API
- `GET /api/news` - Get news (with pagination)
- `POST /api/news` - Create news
- `PUT /api/news?id={id}` - Update news
- `DELETE /api/news?id={id}` - Delete news

### Gallery API
- `GET /api/gallery` - Get gallery (with pagination)
- `POST /api/gallery` - Create gallery item
- `PUT /api/gallery?id={id}` - Update gallery item
- `DELETE /api/gallery?id={id}` - Delete gallery item

### Utility APIs
- `GET /api/stats` - Get database statistics
- `POST /api/migrate` - Migrate from localStorage

## 🔧 Development

### Local Development

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env.local
# Update MongoDB credentials
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Test API Endpoints**
```bash
# Test articles endpoint
curl http://localhost:3000/api/articles

# Test stats endpoint
curl http://localhost:3000/api/stats
```

### Testing Migration

1. **Populate localStorage dengan sample data**
2. **Test migration di local environment**
3. **Verify data di MongoDB Atlas dashboard**
4. **Test CRUD operations**

## 🚀 Production Deployment

### Pre-deployment Checklist

- [ ] MongoDB Atlas cluster setup
- [ ] Environment variables configured in Vercel
- [ ] Database connection tested
- [ ] Migration tool tested
- [ ] API endpoints tested
- [ ] Build process successful

### Deployment Steps

1. **Update Vercel Environment Variables**
   ```
   MONGODB_URI=your_production_mongodb_uri
   MONGODB_DB=swaragama_training_center
   ```

2. **Deploy to Vercel**
   ```bash
   npm run deploy:prod
   ```

3. **Verify Deployment**
   - Test API endpoints
   - Test admin dashboard
   - Test migration tool

## 🔒 Security Best Practices

### Database Security
- ✅ Use MongoDB Atlas (managed security)
- ✅ Strong passwords for database users
- ✅ IP whitelisting for production
- ✅ Connection string encryption
- ✅ Regular security updates

### API Security
- ✅ CORS headers configured
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting (future)
- ✅ Authentication (future)

### Environment Security
- ✅ Environment variables for secrets
- ✅ No hardcoded credentials
- ✅ Separate dev/prod environments

## 📊 Monitoring & Maintenance

### MongoDB Atlas Monitoring
- Database performance metrics
- Connection monitoring
- Storage usage tracking
- Query performance insights

### Application Monitoring
- API response times
- Error rates
- Database operation success rates
- Migration success tracking

## 🆘 Troubleshooting

### Common Issues

1. **Connection Timeout**
   ```
   Error: MongoServerSelectionError
   ```
   - Check internet connection
   - Verify MongoDB URI
   - Check IP whitelist
   - Verify database user credentials

2. **Environment Variables Not Found**
   ```
   Error: Invalid/Missing environment variable: "MONGODB_URI"
   ```
   - Check .env.local file exists
   - Verify environment variables in Vercel
   - Restart development server

3. **Migration Fails**
   ```
   Error: Migration failed
   ```
   - Check localStorage data format
   - Verify API endpoint accessibility
   - Check database connection
   - Review migration logs

4. **API Endpoints Return 500**
   ```
   Error: Internal server error
   ```
   - Check Vercel function logs
   - Verify MongoDB connection
   - Check environment variables
   - Review API endpoint implementation

### Debug Commands

```bash
# Check environment variables
echo $MONGODB_URI

# Test MongoDB connection
node -e "const { MongoClient } = require('mongodb'); MongoClient.connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"

# Check Vercel logs
vercel logs
```

## 📈 Performance Optimization

### Database Optimization
- Proper indexing on frequently queried fields
- Pagination for large datasets
- Connection pooling
- Query optimization

### API Optimization
- Response caching
- Compression
- Error handling
- Connection reuse

## 🔮 Future Enhancements

### Authentication System
- JWT-based authentication
- Role-based access control
- Admin user management
- Session management

### Advanced Features
- Full-text search
- Image upload to cloud storage
- Real-time updates
- Backup and restore system
- Analytics and reporting

### Performance Features
- Redis caching
- CDN integration
- Database replication
- Load balancing

---

## 🎯 Summary

MongoDB integration memberikan:
- ✅ **Persistent data storage** menggantikan localStorage
- ✅ **Scalable database** dengan MongoDB Atlas
- ✅ **REST API endpoints** untuk CRUD operations
- ✅ **Migration tool** dari localStorage ke MongoDB
- ✅ **Production-ready** deployment dengan Vercel
- ✅ **Admin dashboard** dengan database management
- ✅ **Performance optimizations** dan error handling

Sistem ini siap untuk production use dan dapat di-scale sesuai kebutuhan growth website Swaragama Training Center.

**Next Steps**: Deploy ke production, test migration, dan monitor performance!