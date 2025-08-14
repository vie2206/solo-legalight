# 🚀 SOLO by Legalight - Production Deployment Guide

## 🌐 Domain Deployment Options

### **Option 1: Vercel + Railway (Recommended - Fast & Easy)**

#### **Frontend Deployment (Vercel)**
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Configure custom domain in Vercel dashboard**

#### **Backend Deployment (Railway)**
1. **Create Railway account:** https://railway.app
2. **Connect GitHub repository**
3. **Deploy backend folder**
4. **Set environment variables in Railway dashboard**

**Estimated Cost:** $5-15/month
**Setup Time:** 15-30 minutes

---

### **Option 2: Netlify + Heroku (Free Tier Available)**

#### **Frontend Deployment (Netlify)**
1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=build
   ```

#### **Backend Deployment (Heroku)**
1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   cd backend
   heroku create solo-by-legalight-api
   git push heroku main
   ```

**Estimated Cost:** Free to $7/month
**Setup Time:** 20-40 minutes

---

### **Option 3: DigitalOcean Droplet (Full Control)**

#### **VPS Setup**
1. **Create DigitalOcean droplet** (Ubuntu 20.04)
2. **Install Node.js, PM2, Nginx**
3. **Clone repository and configure**
4. **Set up reverse proxy with Nginx**
5. **Configure SSL with Let's Encrypt**

**Estimated Cost:** $4-12/month
**Setup Time:** 1-2 hours

---

## 🔧 Environment Variables Needed

### **Frontend (.env.production)**
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Backend (.env)**
```env
PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://your-domain.com
```

---

## 🛠️ Quick Deployment Steps

### **Tell me your domain name and I'll set up the deployment for you!**

**Example domains:**
- `demo.legalight.com`
- `solo.legalight.com` 
- `try.legalight.com`

**What do you prefer?**
1. **Quick & Easy**: Vercel + Railway (recommended)
2. **Budget-Friendly**: Netlify + Heroku
3. **Full Control**: DigitalOcean VPS

**Next steps:**
1. Share your domain name
2. Choose hosting option
3. I'll configure everything automatically
4. Deploy and test live!