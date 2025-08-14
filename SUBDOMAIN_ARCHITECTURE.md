# 🌐 SOLO by Legalight - Subdomain Architecture Strategy

## 📊 **STORAGE LIMITS & SCALING ANALYSIS**

### **Current Free Tier Limits:**
| Service | Storage | Usage for 100 Users | Safety Margin |
|---------|---------|---------------------|---------------|
| **Supabase** | 500MB | ~75MB | 6.6x headroom |
| **Railway** | 1GB | ~50MB | 20x headroom |
| **Vercel** | 1GB | ~100MB | 10x headroom |
| **TOTAL** | **2.5GB** | **~225MB** | **11x headroom** |

### **What Happens When Limits Are Crossed:**

#### **Supabase Database (500MB → 8GB)**
- **Warning at 400MB** (80% usage)
- **Read-only at 500MB** (no new user registrations)
- **Upgrade Trigger**: When you reach ~300 users
- **Cost**: $25/month for 8GB Pro plan

#### **Railway Backend (1GB → 10GB)**
- **Automatic log rotation** (old logs deleted)
- **App continues running** (no downtime)
- **Upgrade Trigger**: Heavy logging or file uploads
- **Cost**: $20/month for Pro plan

#### **Vercel Frontend (1GB → 100GB)**
- **Build failures** if bundle too large
- **Old deployments deleted** automatically
- **Upgrade Trigger**: Many large assets
- **Cost**: $20/month for Pro plan

---

## 🏗️ **SUBDOMAIN ARCHITECTURE STRATEGY**

### **Option 1: Single Domain with Role-Based Routing (RECOMMENDED)**
```
🌐 legalight.org.in (Main Landing + All Dashboards)
├── / (Landing page)
├── /login (OTP Authentication)
├── /student (Student dashboard)
├── /parent (Parent dashboard)
├── /educator (Educator dashboard)
├── /manager (Operation manager dashboard)
└── /admin (Admin dashboard)

🔗 api.legalight.org.in (Backend API)
```

**✅ Advantages:**
- **Cost**: $5/month total (no subdomain costs)
- **SEO**: Better for search rankings
- **Maintenance**: Single codebase
- **SSL**: One certificate
- **Users**: Simpler to remember

### **Option 2: Role-Based Subdomains (PREMIUM)**
```
🌐 legalight.org.in (Main Landing)
👨‍🎓 student.legalight.org.in (Student Portal)
👨‍👩‍👧‍👦 parent.legalight.org.in (Parent Portal)  
👩‍🏫 educator.legalight.org.in (Educator Portal)
👔 manager.legalight.org.in (Manager Portal)
⚙️ admin.legalight.org.in (Admin Portal)
🔗 api.legalight.org.in (Backend API)
```

**✅ Advantages:**
- **Branding**: Professional appearance
- **Security**: Role isolation
- **Customization**: Different themes per role
- **Scaling**: Independent deployments

**❌ Disadvantages:**
- **Cost**: 5x hosting costs ($25/month)
- **Complexity**: Multiple deployments
- **SSL**: Multiple certificates needed

### **Option 3: Hybrid Approach (SMART)**
```
🌐 legalight.org.in (Main App - Students, Parents, Educators)
👔 manage.legalight.org.in (Managers + Admins)
🔗 api.legalight.org.in (Backend API)
```

**✅ Best Balance:**
- **Cost**: $10/month (2x frontend deployments)
- **Security**: Admin isolation
- **User Experience**: Simple for students/parents
- **Maintenance**: Manageable

---

## 💰 **COST COMPARISON**

| Architecture | Monthly Cost | Annual Cost | Best For |
|--------------|--------------|-------------|----------|
| **Single Domain** | $5 | $60 | Startups, Testing |
| **Hybrid (2 domains)** | $10 | $120 | Growing Business |
| **Full Subdomains** | $25 | $300 | Enterprise |

---

## 🚀 **RECOMMENDED IMPLEMENTATION PLAN**

### **Phase 1: Start Simple (Months 1-6)**
- ✅ Single domain: `legalight.org.in`
- ✅ Role-based routing: `/student`, `/parent`, etc.
- ✅ Cost: $5/month
- ✅ Perfect for 100-500 users

### **Phase 2: Scale Smart (Months 6-12)**
- ✅ Add admin subdomain: `admin.legalight.org.in`
- ✅ Keep main app for students/parents/educators
- ✅ Cost: $10/month
- ✅ Handle 500-2000 users

### **Phase 3: Enterprise Ready (Year 2+)**
- ✅ Full subdomain architecture
- ✅ Custom themes per role
- ✅ Cost: $25/month
- ✅ Handle 2000+ users

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### **DNS Configuration for Single Domain:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: your-app.railway.app
```

### **DNS Configuration for Subdomains:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: student
Value: cname.vercel-dns.com

Type: CNAME
Name: parent
Value: cname.vercel-dns.com

Type: CNAME
Name: admin
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: your-app.railway.app
```

### **Route-Based Implementation (Single Domain):**
```typescript
// App.tsx
const App = () => {
  const location = useLocation();
  const userType = getUserTypeFromPath(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<OTPAuth />} />
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/parent/*" element={<ParentDashboard />} />
      <Route path="/educator/*" element={<EducatorDashboard />} />
      <Route path="/manager/*" element={<ManagerDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
};
```

### **Subdomain-Based Implementation:**
```typescript
// Separate deployments for each subdomain
// student.legalight.org.in → Student-only app
// parent.legalight.org.in → Parent-only app
// admin.legalight.org.in → Admin-only app
```

---

## 📈 **DATA SCALING STRATEGIES**

### **When Database Hits 400MB (Warning Zone):**
1. **Optimize Data**:
   - Compress old test results
   - Archive inactive users
   - Optimize images

2. **Implement Pagination**:
   - Load data in chunks
   - Lazy load historical data
   - Cache frequently accessed data

3. **Prepare for Upgrade**:
   - Budget for Supabase Pro ($25/month)
   - Test migration process
   - Plan downtime window

### **When Backend Hits 800MB (Action Zone):**
1. **Log Management**:
   - Implement log rotation
   - Send logs to external service
   - Reduce logging verbosity

2. **File Management**:
   - Move uploads to cloud storage
   - Implement CDN for assets
   - Clean temporary files

### **Automatic Scaling Triggers:**
```typescript
// Monitor storage usage
const checkStorageLimits = async () => {
  const dbUsage = await getSupabaseStorageUsage();
  const backendUsage = await getRailwayStorageUsage();
  
  if (dbUsage > 0.8) {
    await sendUpgradeAlert('Database approaching limit');
  }
  
  if (backendUsage > 0.8) {
    await cleanupOldLogs();
  }
};
```

---

## 🎯 **RECOMMENDATION FOR 100 USERS**

### **BEST APPROACH: Single Domain + Smart Routing**

**Why This is Perfect:**
- ✅ **Cost Effective**: $5/month total
- ✅ **User Friendly**: One domain to remember
- ✅ **Scalable**: Easy to add subdomains later
- ✅ **Storage**: 11x more capacity than needed
- ✅ **Performance**: Lightning fast with Vercel CDN
- ✅ **Maintenance**: Single deployment pipeline

**Implementation:**
```bash
# Deploy single domain with role routing
./deploy-railway.sh legalight.org.in

# Domain structure:
# legalight.org.in → Landing + Login
# legalight.org.in/student → Student Dashboard
# legalight.org.in/parent → Parent Dashboard
# legalight.org.in/educator → Educator Dashboard
# legalight.org.in/admin → Admin Dashboard
# api.legalight.org.in → Backend API
```

**Upgrade Path:**
- **100-500 users**: Keep single domain
- **500-1000 users**: Add admin subdomain
- **1000+ users**: Full subdomain architecture

**Data Management:**
- **Current capacity**: 2.5GB storage
- **100 users need**: ~225MB
- **Safety margin**: 11x headroom
- **Upgrade trigger**: ~300 users (400MB database)

**Total Monthly Cost: $5**
- Frontend: Vercel FREE
- Backend: Railway $5
- Database: Supabase FREE
- Domain: ~$1/month

🚀 **Ready to implement? This gives you maximum value with minimum complexity!**