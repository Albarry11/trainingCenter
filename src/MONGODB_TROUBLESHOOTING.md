# 🔧 MongoDB Connection Troubleshooting Guide

## Common Issues & Solutions

### 1. **Authentication Failed**
```
Error: Authentication failed
```

**Solutions:**
- ✅ Verify username/password in connection string
- ✅ Check MongoDB Atlas user permissions
- ✅ Ensure user has read/write access to database
- ✅ Check if user is created for the correct database

**How to fix:**
1. Go to MongoDB Atlas Dashboard
2. Database Access → Users
3. Verify user: `swaragamatrainingcenter`
4. Check password and permissions

### 2. **Network/DNS Issues**
```
Error: ENOTFOUND or connection timeout
```

**Solutions:**
- ✅ Check internet connection
- ✅ Verify cluster URL in connection string
- ✅ Check if cluster is paused/stopped
- ✅ Verify IP whitelist (allow 0.0.0.0/0 for development)

**How to fix:**
1. MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Or add your current IP address

### 3. **Database/Collection Not Found**
```
Error: Database or collection not found
```

**Solutions:**
- ✅ Database will be created automatically on first write
- ✅ Collections will be created when first document is inserted
- ✅ This is normal for new databases

### 4. **Connection String Issues**
```
Error: Invalid connection string
```

**Correct format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Check:**
- ✅ Starts with `mongodb+srv://`
- ✅ Username and password are URL-encoded
- ✅ Cluster URL is correct
- ✅ Database name is specified
- ✅ No extra spaces or characters

### 5. **Environment Variables Not Loaded**
```
Error: MONGODB_URI not found
```

**Solutions:**
```bash
# Check if .env.local exists
ls -la .env.local

# Check content
cat .env.local

# Restart development server
npm run dev
```

### 6. **Port/Firewall Issues**
```
Error: Connection refused
```

**Solutions:**
- ✅ Check if port 27017 is blocked
- ✅ Try using MongoDB Atlas (cloud) instead of local
- ✅ Check corporate firewall settings
- ✅ Use connection string with SRV record

## Quick Diagnosis Commands

### Test Connection String Format
```bash
node -e "console.log(process.env.MONGODB_URI ? 'Found' : 'Missing')"
```

### Test Network Connectivity
```bash
# Test if MongoDB Atlas is reachable
ping swaragatrainingcenter.vbzboqv.mongodb.net
```

### Test Environment Variables
```bash
# Check if variables are loaded
node -e "require('dotenv').config({path: '.env.local'}); console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');"
```

## MongoDB Atlas Setup Checklist

### 1. **Cluster Status**
- ✅ Cluster is running (not paused)
- ✅ Cluster is accessible
- ✅ Connection method is configured

### 2. **Database User**
- ✅ User exists: `swaragamatrainingcenter`
- ✅ Password is correct
- ✅ User has `readWrite` permissions
- ✅ User is assigned to correct database

### 3. **Network Access**
- ✅ IP whitelist includes your IP or 0.0.0.0/0
- ✅ No restrictive network rules
- ✅ Port 27017 is accessible

### 4. **Database Configuration**
- ✅ Database name: `swaragama_training_center`
- ✅ Connection string includes database name
- ✅ URI parameters are correct

## Common Connection String Fixes

### Current Connection String:
```
mongodb+srv://swaragamatrainingcenter:retnecamagaraws@swaragatrainingcenter.vbzboqv.mongodb.net/swaragama_training_center?retryWrites=true&w=majority
```

### If Password Contains Special Characters:
```
# URL encode the password
# Example: p@ssw0rd → p%40ssw0rd
mongodb+srv://username:encoded_password@cluster.mongodb.net/database
```

### Alternative Format (without SRV):
```
mongodb://swaragamatrainingcenter:retnecamagaraws@swaragatrainingcenter-shard-00-00.vbzboqv.mongodb.net:27017,swaragatrainingcenter-shard-00-01.vbzboqv.mongodb.net:27017,swaragatrainingcenter-shard-00-02.vbzboqv.mongodb.net:27017/swaragama_training_center?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

## Step-by-Step Verification

### 1. **Test Basic Connection**
```bash
npm run test:mongodb
```

### 2. **If Test Fails - Check Environment**
```bash
# Verify .env.local content
cat .env.local

# Check if MongoDB package is installed
npm list mongodb
```

### 3. **If Environment OK - Check MongoDB Atlas**
1. Login to MongoDB Atlas
2. Go to your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the new connection string
6. Update `.env.local`

### 4. **If Atlas OK - Check Network**
```bash
# Test DNS resolution
nslookup swaragatrainingcenter.vbzboqv.mongodb.net

# Test connectivity
telnet swaragatrainingcenter.vbzboqv.mongodb.net 27017
```

### 5. **If Network OK - Check Code**
```bash
# Test with minimal connection code
node -e "
const { MongoClient } = require('mongodb');
const uri = 'your_connection_string_here';
new MongoClient(uri).connect().then(() => console.log('✅ Connected')).catch(err => console.error('❌ Error:', err.message));
"
```

## Emergency Fallback

If MongoDB Atlas continues to fail, you can:

1. **Use LocalStorage temporarily** (already implemented)
2. **Try MongoDB Community Server locally**
3. **Use alternative cloud provider** (MongoDB Community Cloud)
4. **Contact MongoDB Atlas support**

## Getting Help

If none of these solutions work:

1. Run the test script: `npm run test:mongodb`
2. Copy the exact error message
3. Check MongoDB Atlas status page
4. Post the error in MongoDB community forums
5. Contact MongoDB Atlas support with:
   - Connection string (hide password)
   - Exact error message
   - Network configuration
   - Operating system details

---

**Remember:** The website will fall back to localStorage if MongoDB is unavailable, so it won't break your application!