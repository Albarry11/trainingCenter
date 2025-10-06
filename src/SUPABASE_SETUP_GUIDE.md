# 🚀 Supabase Database Setup Guide
## Swaragama Training Center - Quick Setup

### ❌ **Current Error**
```
Error: Could not find the table 'public.articles' in the schema cache
Error: Could not find the table 'public.news' in the schema cache
```

**Cause:** Database schema belum di-apply ke Supabase project.

---

## 🛠️ **Immediate Fix Options**

### **Option 1: Manual Schema Setup (Recommended)**
1. **Buka Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih Project** Anda 
3. **Go to SQL Editor** (sidebar kiri)
4. **Copy & Paste** schema dari file `/supabase/seed.sql`
5. **Run Query** untuk create tables

### **Option 2: Use Migration Tool**
1. **Start dev server**: `npm run dev`
2. **Open**: `test-supabase.html` in browser
3. **Click**: "Migrate Data" button
4. System akan auto-setup tables dan migrate localStorage data

### **Option 3: Test Mode (Temporary)**
Website akan otomatis fallback ke localStorage jika Supabase belum ready.
Data akan tetap ditampilkan menggunakan localStorage storage.

---

## 📋 **Database Schema Quick Copy**

Copy script ini ke Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles Table (Tips & Tricks)
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(100) NOT NULL DEFAULT 'Admin STC',
    category VARCHAR(50) DEFAULT 'Tips & Tricks',
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    featured_image TEXT,
    slug VARCHAR(255) UNIQUE,
    meta_description TEXT,
    read_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Table (Berita Terbaru)
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(100) NOT NULL DEFAULT 'Admin STC',
    category VARCHAR(50) DEFAULT 'Berita',
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    featured_image TEXT,
    slug VARCHAR(255) UNIQUE,
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Table (Galeri Swaragama)
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text VARCHAR(255),
    category VARCHAR(50) DEFAULT 'Galeri',
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table (App configuration)
CREATE TABLE IF NOT EXISTS settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO articles (title, content, excerpt, author, category, tags, featured_image) VALUES
('Tips Memulai Training Center', 'Panduan lengkap untuk memulai training center yang sukses...', 'Panduan dasar memulai training center', 'Admin STC', 'Tips & Tricks', ARRAY['training', 'bisnis', 'tips'], 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'),
('Strategi Marketing Efektif', 'Cara melakukan marketing yang efektif untuk training center...', 'Strategi marketing untuk training center', 'Admin STC', 'Tips & Tricks', ARRAY['marketing', 'strategi', 'bisnis'], 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'),
('Teknologi dalam Pendidikan', 'Pemanfaatan teknologi untuk meningkatkan kualitas pendidikan...', 'Teknologi untuk pendidikan modern', 'Admin STC', 'Tips & Tricks', ARRAY['teknologi', 'pendidikan', 'digital'], 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400')
ON CONFLICT DO NOTHING;

INSERT INTO news (title, content, excerpt, author, priority, featured_image) VALUES
('Pembukaan Program Training Baru 2024', 'Swaragama Training Center dengan bangga mengumumkan pembukaan program training terbaru...', 'Program training baru 2024 telah dibuka', 'Admin STC', 1, 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400'),
('Sertifikasi Internasional Tersedia', 'Kini tersedia program sertifikasi internasional untuk berbagai bidang...', 'Program sertifikasi internasional', 'Admin STC', 2, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400'),
('Workshop Gratis Bulan Ini', 'Jangan lewatkan workshop gratis yang akan diadakan bulan ini...', 'Workshop gratis untuk umum', 'Admin STC', 3, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400')
ON CONFLICT DO NOTHING;

INSERT INTO gallery (title, description, image_url, category, featured) VALUES
('Fasilitas Training Room Modern', 'Ruang training dengan fasilitas modern dan nyaman', 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600', 'Fasilitas', true),
('Kegiatan Pelatihan Komputer', 'Suasana pelatihan komputer yang interaktif', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', 'Kegiatan', true),
('Lab Praktikum Lengkap', 'Laboratorium dengan peralatan lengkap dan modern', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600', 'Fasilitas', false),
('Sertifikat Training', 'Sertifikat resmi yang diberikan setelah menyelesaikan training', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600', 'Sertifikat', false)
ON CONFLICT DO NOTHING;
```

---

## ✅ **Verification Steps**

After running the schema:

1. **Check Tables Created**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **Check Sample Data**:
   ```sql
   SELECT COUNT(*) as articles_count FROM articles;
   SELECT COUNT(*) as news_count FROM news;
   SELECT COUNT(*) as gallery_count FROM gallery;
   ```

3. **Test Website**:
   - Refresh your website
   - Check console logs for "✅ Loaded X articles from Supabase"
   - Articles and News sections should show Supabase data

---

## 🔄 **Current Fallback System**

Website sekarang memiliki intelligent fallback system:

1. **Try Supabase** first (if tables exist)
2. **Fallback to localStorage** if Supabase fails
3. **Use default sample data** if both fail
4. **Auto-retry** Supabase connection every 30 seconds
5. **Show clear logs** in console untuk debugging

---

## 🚀 **Next Steps**

1. **Apply schema** using Option 1 above
2. **Test migration** using `test-supabase.html`
3. **Verify admin dashboard** works with Supabase
4. **Deploy to production** once verified

**Schema sudah disetup? Website akan otomatis switch ke Supabase! 🎉**