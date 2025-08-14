# 🌐 GoDaddy DNS Configuration for legalight.org.in
## Complete Setup Guide for SOLO by Legalight

### 📋 **DNS RECORDS TO ADD IN GODADDY**

#### **Step 1: Access GoDaddy DNS Management**
1. Login to your GoDaddy account
2. Go to "My Products" → "Domain Names"
3. Click on `legalight.org.in`
4. Click "DNS" → "Manage DNS"

#### **Step 2: Add CNAME Records**

##### **Main Website (Frontend)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 600 (10 minutes)
```

##### **API Subdomain (Backend)**
```
Type: CNAME  
Name: api
Value: [Will be provided by Railway after deployment]
TTL: 600
```

##### **CDN Subdomain (CloudFlare R2 - Optional)**
```
Type: CNAME
Name: cdn
Value: [Will be provided by CloudFlare R2]
TTL: 600
```

##### **WWW Redirect (Optional)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

---

### 🔧 **DETAILED SETUP PROCESS**

#### **Phase 1: Frontend Deployment (Vercel)**

1. **Deploy Frontend First:**
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Add Custom Domain in Vercel:**
   - Go to [vercel.com](https://vercel.com) dashboard
   - Select your project
   - Go to "Settings" → "Domains"
   - Add `legalight.org.in`
   - Vercel will provide DNS instructions

3. **Update GoDaddy DNS:**
   - Add the CNAME record: `@` → `cname.vercel-dns.com`
   - Wait 5-10 minutes for propagation

#### **Phase 2: Backend Deployment (Railway)**

1. **Deploy Backend:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Deploy `/backend` folder
   - Upgrade to Hobby plan ($5/month)

2. **Add Custom Domain in Railway:**
   - Go to Railway project settings
   - Add domain: `api.legalight.org.in`
   - Railway will provide CNAME target

3. **Update GoDaddy DNS:**
   - Add CNAME record: `api` → `[railway-provided-domain]`

#### **Phase 3: CloudFlare R2 Setup (Enterprise Storage)**

1. **Create CloudFlare Account:**
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Go to R2 Object Storage
   - Create bucket: `solo-legalight-content`

2. **Generate API Credentials:**
   - Go to "Manage Account" → "API Tokens"
   - Create token with R2 read/write permissions
   - Note down: Access Key, Secret Key, Account ID

3. **Optional CDN Setup:**
   - Create custom domain for R2: `cdn.legalight.org.in`
   - Add CNAME in GoDaddy: `cdn` → `[cloudflare-r2-domain]`

---

### 🎯 **DEPLOYMENT COMMAND**

**Run this single command to deploy everything:**

```bash
./deploy-legalight.sh
```

**This will:**
- ✅ Configure all environment variables for `legalight.org.in`
- ✅ Deploy Apple-style frontend to Vercel
- ✅ Provide Railway backend setup instructions
- ✅ Generate CloudFlare R2 configuration
- ✅ Show exact DNS records for GoDaddy

---

### 📊 **FINAL ARCHITECTURE**

```
🌐 legalight.org.in
├── Frontend (Vercel FREE)
│   ├── Apple-style landing page
│   ├── OTP authentication
│   ├── 5 role-based dashboards
│   └── Global CDN delivery
│
├── api.legalight.org.in  
│   ├── Backend API (Railway $5/mo)
│   ├── Authentication & user management
│   ├── File upload orchestration
│   └── AI processing pipeline
│
├── Database (Supabase Pro $25/mo)
│   ├── User data & profiles
│   ├── Test results & analytics
│   ├── Payment transactions
│   └── Real-time features
│
└── cdn.legalight.org.in (Optional)
    ├── CloudFlare R2 storage ($3-15/mo)
    ├── AI models & content
    ├── User uploads & media
    └── Global edge delivery
```

### 💰 **COST BREAKDOWN**

| Service | Plan | Monthly Cost | Features |
|---------|------|--------------|----------|
| **Frontend** | Vercel FREE | $0 | Global CDN, SSL, Custom domain |
| **Backend** | Railway Hobby | $5 | Always-on API, 1GB storage |
| **Database** | Supabase Pro | $25 | 8GB DB + 100GB storage |
| **Storage** | CloudFlare R2 | $3-15 | TB-scale files, free egress |
| **Domain** | GoDaddy | $1.25 | Annual domain cost |
| **TOTAL** | | **$35-45** | **Enterprise-grade platform** |

### 🚀 **PERFORMANCE EXPECTATIONS**

#### **For 100 Users:**
- **Load Time**: 0.2-0.8s globally
- **API Response**: 50-200ms
- **File Upload**: Direct to CloudFlare R2
- **Storage Capacity**: 8GB + TB-scale files
- **Concurrent Users**: 200-500 easily

#### **Scaling Capacity:**
- **500 Users**: Same infrastructure
- **1000 Users**: Possible backend upgrade
- **5000 Users**: Enterprise scaling available

---

### 🔒 **SECURITY FEATURES**

- ✅ **Automatic SSL**: Free certificates on all domains
- ✅ **OTP Authentication**: Phone/email verification
- ✅ **Role-based Access**: 5 different user types
- ✅ **Encrypted Storage**: AES-256 encryption
- ✅ **GDPR Compliant**: Data privacy controls
- ✅ **Rate Limiting**: API abuse protection

---

### 📱 **MOBILE OPTIMIZATION**

- ✅ **Responsive Design**: Perfect on all screen sizes
- ✅ **PWA Ready**: Installable web app
- ✅ **Offline Support**: Core features work offline
- ✅ **Touch Optimized**: Gesture-friendly interface
- ✅ **Fast Loading**: Optimized for mobile networks

---

### 🎯 **GO-LIVE CHECKLIST**

#### **Pre-Launch (You Do):**
- [ ] Run `./deploy-legalight.sh`
- [ ] Add DNS records in GoDaddy
- [ ] Set up Railway backend
- [ ] Configure CloudFlare R2
- [ ] Upgrade Supabase to Pro

#### **Post-Launch (Automatic):**
- [ ] SSL certificates active
- [ ] Global CDN propagated
- [ ] OTP system functional
- [ ] File uploads working
- [ ] All dashboards accessible

#### **Testing:**
- [ ] Landing page loads: `https://legalight.org.in`
- [ ] API responds: `https://api.legalight.org.in/health`
- [ ] User registration works
- [ ] File upload functions
- [ ] All user roles accessible

---

### 🎉 **ESTIMATED TIMELINE**

- **DNS Propagation**: 5-30 minutes
- **SSL Certificate**: 5-15 minutes  
- **CDN Distribution**: 10-60 minutes
- **Full Platform Ready**: 1-2 hours maximum

**SOLO by Legalight will be live at `https://legalight.org.in` with enterprise performance for your 100+ test users! 🚀**