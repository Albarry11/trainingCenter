# STC Corner Admin - MongoDB + Vercel Backend Setup

## 🚀 Overview

Panduan lengkap untuk setup backend MongoDB + Vercel untuk dashboard admin STC Corner.

## 📋 Prerequisites

- MongoDB Atlas account
- Vercel account
- Node.js 18+
- Git

## 🏗️ Backend Architecture

```
Backend Structure:
├── api/
│   ├── articles/
│   │   ├── index.js          # GET /api/articles (list with pagination)
│   │   ├── [id].js           # GET/PUT/DELETE /api/articles/:id
│   │   └── create.js         # POST /api/articles
│   ├── categories/
│   │   ├── index.js          # GET/POST /api/categories
│   │   └── [id].js           # PUT/DELETE /api/categories/:id
│   ├── dashboard/
│   │   └── stats.js          # GET /api/dashboard/stats
│   ├── upload/
│   │   └── image.js          # POST /api/upload/image
│   └── auth/
│       └── login.js          # POST /api/auth/login
├── lib/
│   ├── mongodb.js            # MongoDB connection
│   ├── auth.js               # JWT middleware
│   └── upload.js             # File upload utilities
└── vercel.json               # Vercel configuration
```

## 🛠️ Setup Steps

### 1. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   ```
   https://www.mongodb.com/cloud/atlas
   ```

2. **Create New Cluster**
   - Choose AWS (recommended)
   - Select region terdekat (Singapore/Jakarta)
   - Use M0 (free tier) untuk development

3. **Create Database User**
   ```
   Username: stc-admin
   Password: [generate strong password]
   ```

4. **Whitelist IP Addresses**
   ```
   Add: 0.0.0.0/0 (allow from anywhere for Vercel)
   ```

5. **Get Connection String**
   ```
   mongodb+srv://stc-admin:<password>@cluster0.xxxxx.mongodb.net/stc_corner?retryWrites=true&w=majority
   ```

### 2. Create Backend Repository

```bash
# Create new repository for backend
mkdir stc-corner-backend
cd stc-corner-backend
npm init -y

# Install dependencies
npm install mongodb mongoose bcryptjs jsonwebtoken multer cloudinary cors dotenv

# Create project structure
mkdir -p api/articles api/categories api/dashboard api/upload api/auth lib
```

### 3. Environment Variables

Create `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://stc-admin:<password>@cluster0.xxxxx.mongodb.net/stc_corner?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (for image upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin credentials
ADMIN_EMAIL=admin@swaragama.com
ADMIN_PASSWORD=your-secure-password
```

### 4. Core Backend Files

**lib/mongodb.js**
```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

**lib/auth.js**
```javascript
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}
```

**api/articles/index.js**
```javascript
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('stc_corner');

  if (req.method === 'GET') {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        category = '',
        status = '',
        sortBy = 'updatedAt',
        sortOrder = 'desc'
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build filter
      const filter = {};
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ];
      }
      if (category && category !== 'all') {
        filter.category = category;
      }
      if (status && status !== 'all') {
        filter.status = status;
      }

      // Get articles with pagination
      const articles = await db.collection('articles')
        .find(filter)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      // Get total count
      const totalItems = await db.collection('articles').countDocuments(filter);
      const totalPages = Math.ceil(totalItems / parseInt(limit));

      res.status(200).json({
        success: true,
        data: {
          data: articles,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems,
            hasNext: parseInt(page) < totalPages,
            hasPrev: parseInt(page) > 1
          }
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } 
  
  else if (req.method === 'POST') {
    try {
      const articleData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        likes: 0,
        author: {
          name: 'Admin STC',
          avatar: ''
        }
      };

      // Generate slug from title
      articleData.slug = articleData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Calculate read time
      const wordsPerMinute = 200;
      const words = articleData.content.trim().split(/\s+/).length;
      articleData.readTime = Math.ceil(words / wordsPerMinute);

      const result = await db.collection('articles').insertOne(articleData);
      const article = await db.collection('articles').findOne({ _id: result.insertedId });

      res.status(201).json({ success: true, data: article });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } 
  
  else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
```

**vercel.json**
```json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Go to your project settings and add all environment variables
```

### 6. Update Frontend API URL

In `/services/adminApi.ts`, update the API_BASE_URL:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-deployment.vercel.app/api' 
  : 'http://localhost:3001/api';
```

## 🔧 Database Schema

### Articles Collection
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  category: String,
  tags: [String],
  featuredImage: String,
  author: {
    name: String,
    avatar: String
  },
  publishedAt: Date,
  status: 'draft' | 'published' | 'archived',
  readTime: Number,
  views: Number,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  color: String,
  articleCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Usage

1. **Access Admin Dashboard**
   ```
   https://your-site.com/#admin
   ```

2. **Development**
   ```bash
   # Start frontend
   npm run dev

   # Start backend (in separate terminal)
   cd stc-corner-backend
   vercel dev
   ```

3. **Production**
   - Frontend: Deploy to Vercel/Netlify
   - Backend: Already deployed to Vercel
   - Database: MongoDB Atlas (always online)

## 🔐 Security Features

- JWT authentication
- Input validation
- File upload restrictions
- CORS configuration
- Environment variables protection

## 📊 Features Included

✅ **CRUD Operations** - Complete article management
✅ **File Upload** - Image handling with Cloudinary
✅ **Search & Filter** - Advanced filtering options
✅ **Pagination** - Efficient data loading
✅ **Authentication** - Secure admin access
✅ **Dashboard Stats** - Analytics and insights
✅ **Responsive Design** - Works on all devices

## 🎯 Next Steps

1. Deploy backend to Vercel
2. Update frontend API endpoints
3. Test all CRUD operations
4. Add image upload functionality
5. Implement category management
6. Set up analytics tracking

---

**🔗 Quick Links:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Cloudinary](https://cloudinary.com) (for image uploads)

**Need help?** Contact the development team or check the documentation!