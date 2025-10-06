# 🧹 MongoDB Cleanup Guide

## Files to Remove (MongoDB related)

The following files are no longer needed after Supabase migration:

### **Test Files:**
- ❌ `test-mongodb.js` 
- ❌ `quick-mongo-test.js`
- ❌ `test-quick-mongodb.html`
- ❌ `test-local-api.html` (MongoDB version)
- ❌ `MONGODB_TROUBLESHOOTING.md`

### **Library Files:**
- ❌ `/lib/mongodb.ts`
- ❌ `/api/*` (if MongoDB API routes exist)

### **Config Files:**
- ❌ MongoDB connection strings in `.env.local` (already cleaned)

## Keep These Files (Supabase related)

✅ `/supabase/config.toml` - Supabase configuration  
✅ `/supabase/seed.sql` - Database schema  
✅ `/supabase/functions/server/index.ts` - Edge functions  
✅ `/utils/supabase/client.ts` - Supabase client  
✅ `/utils/supabase/info.tsx` - Project info  
✅ `/services/supabaseService.ts` - Service layer  
✅ `/lib/supabase.ts` - Main client  
✅ `test-supabase.html` - Supabase testing  
✅ `SUPABASE_MIGRATION_GUIDE.md` - Documentation  

## Cleanup Commands

If you want to remove MongoDB files:

```bash
# Remove MongoDB test files
rm -f test-mongodb.js
rm -f quick-mongo-test.js  
rm -f test-quick-mongodb.html
rm -f MONGODB_TROUBLESHOOTING.md

# Remove MongoDB library
rm -f lib/mongodb.ts

# Remove MongoDB API routes (if they exist)
rm -rf api/
```

## Note

Keep MongoDB files temporarily during migration for reference, then remove them once Supabase integration is confirmed working.