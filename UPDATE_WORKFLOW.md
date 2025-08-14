# 🔄 SOLO by Legalight - Update & Deployment Workflow

## 🆓 FREE TIER DEPLOYMENT SETUP

### **Vercel Free + Heroku Free (100% Free)**

#### **Step 1: Vercel Frontend Setup (FREE)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# Add custom domain (FREE)
# Go to vercel.com dashboard → Project → Domains → Add yourdomain.com
```

#### **Step 2: Heroku Backend Setup (FREE)**
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
cd backend
heroku create solo-legalight-api

# Add environment variables
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_SERVICE_KEY=your_key
heroku config:set JWT_SECRET=your_secret

# Deploy
git add .
git commit -m "Initial deployment"
git push heroku main

# Add custom domain (FREE on Heroku too!)
heroku domains:add api.yourdomain.com
```

---

## 🔄 **UPDATE PROCESS - Super Simple!**

### **Making Changes to the App:**

#### **1. Frontend Updates (React Components, UI, etc.)**
```bash
# Make your changes in /frontend/src/
# Test locally
cd frontend
npm start

# Deploy updates (takes 30 seconds)
vercel --prod
```
**Result**: Live in 30 seconds globally! 🚀

#### **2. Backend Updates (API, Database, Logic)**
```bash
# Make changes in /backend/
# Test locally
cd backend
npm start

# Deploy updates
git add .
git commit -m "Update: description of changes"
git push heroku main
```
**Result**: Live in 2-3 minutes! 🚀

#### **3. Database Updates (Supabase)**
```bash
# Login to Supabase dashboard
# Make changes via SQL editor or dashboard
# Changes are live immediately
```

---

## 🎯 **WORKFLOW FOR DIFFERENT TYPES OF UPDATES:**

### **UI/Design Changes** (Most Common)
```bash
# Edit components in /frontend/src/components/
cd frontend
npm start  # Test locally
vercel --prod  # Deploy (30 seconds)
```

### **New Features**
```bash
# 1. Backend API changes
cd backend
# Edit routes, add endpoints
git push heroku main  # Deploy backend

# 2. Frontend integration  
cd frontend
# Add new components, connect to API
vercel --prod  # Deploy frontend
```

### **Bug Fixes**
```bash
# Quick fix and deploy
git add .
git commit -m "Fix: issue description"

# Backend
git push heroku main

# Frontend  
cd frontend
vercel --prod
```

### **Database Schema Changes**
```bash
# Go to Supabase dashboard
# Run SQL migrations
# No deployment needed - changes are instant
```

---

## 🔧 **CUSTOM DOMAIN SETUP (FREE)**

### **For Frontend (Vercel)**
1. Go to [vercel.com](https://vercel.com) dashboard
2. Select your project
3. Go to "Domains" tab
4. Add `yourdomain.com`
5. Update DNS records (automatic instructions)

### **For Backend (Heroku)**
1. Go to Heroku dashboard
2. Select your app
3. Go to "Settings" → "Domains"
4. Add `api.yourdomain.com`
5. Update DNS CNAME record

### **DNS Configuration Example:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: api
Value: your-app-name.herokuapp.com
```

---

## 📊 **FREE TIER LIMITATIONS:**

### **Vercel Free:**
- ✅ Custom domains: Unlimited
- ✅ Deployments: Unlimited  
- ✅ Bandwidth: 100GB/month
- ⚠️ Build time: 6,000 min/month (plenty)
- ⚠️ Team size: 1 person

### **Heroku Free (Important Notes):**
- ✅ Custom domains: Yes
- ✅ SSL certificates: Free
- ⚠️ **Sleeps after 30min inactivity** (major limitation)
- ⚠️ **550 hours/month** (23 days)
- 💡 **Workaround**: Use uptimerobot.com to ping every 25 minutes

---

## 🚀 **RECOMMENDED APPROACH:**

### **Start Free, Upgrade When Needed:**

#### **Phase 1: Testing (FREE)**
- Vercel Free + Heroku Free
- Perfect for initial testing
- Custom domain supported
- Accept the sleep limitation

#### **Phase 2: Demo Users ($5/month)**  
- Vercel Free + Railway Hobby ($5)
- No sleep, always responsive
- Better for real users

#### **Phase 3: Production ($25/month)**
- Vercel Pro + Railway Pro  
- Enterprise performance
- Analytics and monitoring

---

## 🎯 **QUICK START COMMANDS:**

```bash
# 1. Deploy everything FREE
./deploy.sh yourdomain.com free

# 2. Make UI changes
cd frontend/src/components
# Edit files
cd ../..
vercel --prod

# 3. Make API changes  
cd backend
# Edit files
git add . && git commit -m "Update"
git push heroku main

# 4. Check status
vercel ls  # Frontend status
heroku logs --tail  # Backend logs
```

**Total setup time: 15 minutes**  
**Update time: 30 seconds - 2 minutes**  
**Cost: $0 (with sleep limitation) or $5/month (always on)**