#!/bin/bash

# 🚀 SOLO by Legalight - Automated Deployment Script

echo "🌟 Starting SOLO by Legalight deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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
    echo "Usage: ./deploy.sh yourdomain.com [hosting-option]"
    echo "Hosting options: vercel, netlify, railway, heroku, digitalocean"
    exit 1
fi

DOMAIN=$1
HOSTING=${2:-vercel}

print_status "Deploying SOLO by Legalight to $DOMAIN using $HOSTING"

# Update environment files with domain
print_status "Updating environment configuration..."

# Update frontend environment
sed -i '' "s|https://api.yourdomain.com|https://api.$DOMAIN|g" frontend/.env.production
sed -i '' "s|https://yourdomain.com|https://$DOMAIN|g" frontend/.env.production

# Update vercel config
sed -i '' "s|https://api.yourdomain.com|https://api.$DOMAIN|g" vercel.json

# Update netlify config
sed -i '' "s|https://api.yourdomain.com|https://api.$DOMAIN|g" netlify.toml

print_success "Environment configuration updated for $DOMAIN"

# Deployment based on hosting option
case $HOSTING in
    "vercel")
        print_status "Deploying with Vercel..."
        
        # Check if vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            print_warning "Vercel CLI not found. Installing..."
            npm install -g vercel
        fi
        
        cd frontend
        print_status "Building frontend..."
        npm run build
        
        print_status "Deploying to Vercel..."
        vercel --prod --yes
        
        print_success "Frontend deployed to Vercel!"
        print_warning "Don't forget to:"
        echo "1. Configure custom domain in Vercel dashboard"
        echo "2. Deploy backend to Railway or Heroku"
        ;;
        
    "netlify")
        print_status "Deploying with Netlify..."
        
        # Check if netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            print_warning "Netlify CLI not found. Installing..."
            npm install -g netlify-cli
        fi
        
        cd frontend
        print_status "Building frontend..."
        npm run build
        
        print_status "Deploying to Netlify..."
        netlify deploy --prod --dir=build
        
        print_success "Frontend deployed to Netlify!"
        ;;
        
    "railway")
        print_status "Railway deployment requires web interface"
        print_warning "Please visit https://railway.app and:"
        echo "1. Connect your GitHub repository"
        echo "2. Deploy the backend folder"
        echo "3. Set environment variables"
        ;;
        
    "heroku")
        print_status "Deploying backend with Heroku..."
        
        # Check if heroku CLI is installed
        if ! command -v heroku &> /dev/null; then
            print_error "Heroku CLI not found. Please install: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        cd backend
        print_status "Creating Heroku app..."
        heroku create solo-by-legalight-api-$(date +%s)
        
        print_status "Deploying to Heroku..."
        git add .
        git commit -m "Deploy to Heroku"
        git push heroku main
        
        print_success "Backend deployed to Heroku!"
        ;;
        
    *)
        print_error "Unknown hosting option: $HOSTING"
        echo "Supported options: vercel, netlify, railway, heroku"
        exit 1
        ;;
esac

print_success "🎉 Deployment completed!"
print_status "Next steps:"
echo "1. Configure DNS for $DOMAIN"
echo "2. Set up SSL certificate"
echo "3. Test the live application"
echo "4. Configure environment variables on hosting platform"

print_status "🌐 Your SOLO by Legalight app will be available at: https://$DOMAIN"