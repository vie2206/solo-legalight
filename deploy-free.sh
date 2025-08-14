#!/bin/bash

# 🆓 SOLO by Legalight - FREE Deployment Script

echo "🆓 Starting FREE deployment of SOLO by Legalight..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if domain is provided
if [ -z "$1" ]; then
    print_error "Please provide your domain name"
    echo "Usage: ./deploy-free.sh yourdomain.com"
    exit 1
fi

DOMAIN=$1

print_status "🆓 FREE Deployment for $DOMAIN"

# Update environment files
print_status "Updating configuration for $DOMAIN..."

# Update frontend environment
cat > frontend/.env.production << EOF
REACT_APP_API_URL=https://api.$DOMAIN
REACT_APP_SUPABASE_URL=https://nrapwcbdowptlrrbfxta.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYXB3Y2Jkb3dwdGxycmJmeHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NzQ5NzksImV4cCI6MjAzNjM1MDk3OX0.VQQ5DRdVpL-kFDGhfUv8L9iJFpg0_tgpgtPv2wHzNR4
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://$DOMAIN
EOF

print_success "Environment configured for $DOMAIN"

# Deploy Frontend (Vercel FREE)
print_status "🚀 Deploying Frontend to Vercel (FREE)..."

if ! command -v vercel &> /dev/null; then
    print_warning "Installing Vercel CLI..."
    npm install -g vercel
fi

cd frontend
print_status "Building optimized production bundle..."
npm run build

print_status "Deploying to Vercel..."
vercel --prod --yes

cd ..
print_success "✅ Frontend deployed to Vercel!"

# Deploy Backend (Heroku FREE)
print_status "🚀 Deploying Backend to Heroku (FREE)..."

if ! command -v heroku &> /dev/null; then
    print_error "Heroku CLI not found!"
    print_warning "Please install: https://devcenter.heroku.com/articles/heroku-cli"
    print_warning "Then run: heroku login"
    exit 1
fi

cd backend

# Initialize git if needed
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
fi

# Create Heroku app with unique name
APP_NAME="solo-legalight-$(date +%s)"
print_status "Creating Heroku app: $APP_NAME"

heroku create $APP_NAME

# Set environment variables
print_status "Setting up environment variables..."
heroku config:set NODE_ENV=production
heroku config:set SUPABASE_URL=https://nrapwcbdowptlrrbfxta.supabase.co
heroku config:set SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYXB3Y2Jkb3dwdGxycmJmeHRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDc3NDk3OSwiZXhwIjoyMDM2MzUwOTc5fQ.DfQEiuewuzKPdCzP1ViYjwLKm7L9MKr5D_Vl4pZm6qs
heroku config:set JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
heroku config:set FRONTEND_URL=https://$DOMAIN

# Deploy to Heroku
print_status "Deploying to Heroku..."
git add .
git commit -m "Deploy to Heroku" --allow-empty
git push heroku main

# Add custom domain
print_status "Adding custom domain..."
heroku domains:add api.$DOMAIN

cd ..
print_success "✅ Backend deployed to Heroku!"

# Instructions
print_success "🎉 FREE Deployment Complete!"
echo ""
print_status "📋 NEXT STEPS:"
echo "1. 🌐 Configure DNS for your domain:"
echo "   - Add CNAME record: @ → cname.vercel-dns.com"
echo "   - Add CNAME record: api → $APP_NAME.herokuapp.com"
echo ""
echo "2. 🔗 Your app will be available at:"
echo "   - Frontend: https://$DOMAIN"
echo "   - Backend API: https://api.$DOMAIN"
echo ""
print_warning "⚠️  FREE TIER LIMITATIONS:"
echo "   - Heroku sleeps after 30min inactivity"
echo "   - Use uptimerobot.com to ping every 25min"
echo "   - Upgrade to Railway (\$5/month) for always-on backend"
echo ""
print_status "🔄 TO UPDATE YOUR APP:"
echo "   Frontend: cd frontend && vercel --prod"
echo "   Backend: cd backend && git push heroku main"
echo ""
print_success "🚀 SOLO by Legalight is live on $DOMAIN!"