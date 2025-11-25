# 🚀 Deploy Commands - Copy and Paste

## After creating GitHub repository, run these commands:

### Push to GitHub

```bash
# Navigate to project
cd crypto-earning

# Add your GitHub repository (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/crypto-earning.git

# Push to GitHub
git push -u origin master
```

### If you prefer 'main' branch:

```bash
git branch -M main
git push -u origin main
```

---

## Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: crypto-earning
# - Directory: ./
# - Override settings? No

# Add environment variables when prompted:
# REACT_APP_SUPABASE_URL=https://ppeucykbvevlfzfwsgyn.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXVjeWtidmV2bGZ6ZndzZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMjQyOTgsImV4cCI6MjA3OTYwMDI5OH0.yaIs6RjKr6FY0EBFM72y6xXAhDc-H_JMgenPPtLHZpg

# Deploy to production
vercel --prod
```

### Option 2: Vercel Dashboard (Easier)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `crypto-earning` repository
4. Configure:
   - Project Name: `crypto-earning`
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add Environment Variables:
   - `REACT_APP_SUPABASE_URL` = `https://ppeucykbvevlfzfwsgyn.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXVjeWtidmV2bGZ6ZndzZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMjQyOTgsImV4cCI6MjA3OTYwMDI5OH0.yaIs6RjKr6FY0EBFM72y6xXAhDc-H_JMgenPPtLHZpg`
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site will be live!

---

## Quick Copy-Paste (Replace YOUR_USERNAME)

```bash
cd crypto-earning
git remote add origin https://github.com/YOUR_USERNAME/crypto-earning.git
git push -u origin master
```

Then deploy via Vercel Dashboard (Option 2 above)

---

## ✅ After Deployment

Your site will be live at:
- `https://crypto-earning.vercel.app`
- Or custom domain if configured

Test:
1. Visit the site
2. Click 🛡️ for admin login
3. Register a user
4. Play games
5. Check Supabase dashboard for data

---

**Ready to deploy! 🚀**
