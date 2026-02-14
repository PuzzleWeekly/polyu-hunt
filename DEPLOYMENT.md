# 🚀 PolyU Hunt - Deployment Guide

## ⚡ Super Quick Start (Choose One)

### OPTION 1: Deploy Frontend Only (5 minutes) ✨ EASIEST

#### Netlify
```bash
# Visit https://netlify.com/
# Drag & drop index.html → Instant public URL!
# Share link: https://your-app.netlify.app
```

#### GitHub Pages
```bash
# 1. Create repo: github.com/new
# 2. Upload index.html
# 3. Settings > Pages > Deploy from branch
# 4. Visit: https://yourusername.github.io/polyu-hunt
```

#### Vercel
```bash
# 1. Go to vercel.com
# 2. Upload index.html
# 3. Get instant HTTPS link
```

**⚠️ NOTE:** Data resets when users refresh! Use Option 2-4 for persistence.

---

### OPTION 2: Deploy with Supabase (10 minutes) ✨ RECOMMENDED FOR BEGINNERS

#### Step 1: Create Supabase Project
```
1. Go to https://supabase.com/
2. Sign up with GitHub
3. Click "New Project"
4. Name: "polyu-hunt"
5. Create database
```

#### Step 2: Create Tables
```
1. Go to SQL Editor
2. Paste this SQL:
```

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  version TEXT NOT NULL,
  programme TEXT,
  grad_year INTEGER,
  stamps TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL REFERENCES users(email),
  location_id TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

```
3. Click "Run"
```

#### Step 3: Get API Keys
```
1. Settings > API
2. Copy "Project URL"
3. Copy "anon" public key
```

#### Step 4: Update Frontend
In `index.html`, find:
```javascript
const BACKEND = {
    type: 'supabase',
    url: 'https://YOUR_PROJECT.supabase.co',
    apiKey: 'YOUR_ANON_KEY'
};
```

Replace with your actual values.

#### Step 5: Deploy Frontend
```
1. Upload index.html to Netlify/GitHub Pages/Vercel
2. Done! ✅
```

**Cost:** FREE tier includes 500MB database + unlimited API calls!

---

### OPTION 3: Deploy with Firebase (15 minutes)

#### Step 1: Create Firebase Project
```
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Name: "polyu-hunt"
4. Enable Firestore
```

#### Step 2: Get Config
```
1. Settings > Project Settings > Web
2. Copy the config object
```

#### Step 3: Update Frontend
In `index.html`, add Firebase libraries:
```html
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>
```

Update BACKEND:
```javascript
const BACKEND = {
    type: 'firebase',
    firebaseConfig: {
        apiKey: "AIzaSyDUCHks8Q3smU6dMruN-otcpEWCamOOWPA",
        authDomain: "polyu-hunt.firebaseapp.com",
        projectId: "polyu-hunt",
        storageBucket: "polyu-hunt.firebasestorage.app",
        messagingSenderId: "958809195745",
        appId: "1:958809195745:web:1be0bc46e7cdf88a6e63a0",
         measurementId: "G-S3HQ8XDE59"
    }
};
```

#### Step 4: Deploy
```
1. Upload to Netlify/GitHub Pages
2. Done! ✅
```

**Cost:** FREE tier includes 1GB storage + 50K reads/day

---

### OPTION 4: Deploy Full Stack with Node.js + MongoDB (30 minutes)

#### Step 1: Set Up MongoDB
```
1. Go to mongodb.com/cloud/atlas
2. Sign up (free!)
3. Create cluster
4. Get connection string
```

#### Step 2: Create Server
```bash
# 1. Create folder
mkdir polyu-hunt-backend
cd polyu-hunt-backend

# 2. Initialize
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv

# 4. Create .env file
echo "MONGODB_URI=your_connection_string" > .env
echo "PORT=5000" >> .env

# 5. Copy server.js from backend-nodejs.js
```

#### Step 3: Run Local
```bash
npm start
# Server running on http://localhost:5000
```

#### Step 4: Update Frontend
In `index.html`:
```javascript
const BACKEND = {
    type: 'nodejs',
    url: 'http://localhost:5000/api'
};
```

#### Step 5: Deploy Server to Cloud

**Option A: Railway (FREE)**
```bash
# 1. Go to railway.app
# 2. Connect GitHub
# 3. Auto-deploys on push!
```

**Option B: Heroku (PAID)**
```bash
# 1. Install Heroku CLI
# 2. heroku login
# 3. heroku create polyu-hunt
# 4. git push heroku main
```

**Option C: Render (FREE)**
```bash
# 1. Go to render.com
# 2. Connect GitHub
# 3. Auto-deploys!
```

#### Step 6: Deploy Frontend
Update `index.html` BACKEND URL:
```javascript
const BACKEND = {
    type: 'nodejs',
    url: 'https://your-app.railway.app/api'  // Your deployed server URL
};
```

Upload to Netlify/GitHub Pages.

---

## 📊 Comparison Table

| Option | Setup | Cost | Best For |
|--------|-------|------|----------|
| **Netlify + Supabase** | 10 min | FREE | Best Start |
| **GitHub Pages + Firebase** | 15 min | FREE | Next Best |
| **Railway + MongoDB** | 30 min | $5/mo | Production |

---

## 🔗 Key Links

### Supabase
- Dashboard: https://app.supabase.com/
- Docs: https://supabase.com/docs
- Pricing: https://supabase.com/pricing

### Firebase
- Console: https://console.firebase.google.com/
- Docs: https://firebase.google.com/docs
- Pricing: https://firebase.google.com/pricing

### MongoDB
- Atlas: https://mongodb.com/cloud/atlas
- Docs: https://mongodb.com/docs/
- Pricing: https://mongodb.com/pricing

### Hosting
- Netlify: https://netlify.com/
- Vercel: https://vercel.com/
- Railway: https://railway.app/
- GitHub Pages: https://pages.github.com/

---

## ✅ Checklist Before Going Live

- [ ] Database is set up and populated
- [ ] Frontend updated with correct API keys
- [ ] QR codes printed for each location
- [ ] Admin password changed from "pwadmin"
- [ ] Tested QR scanner on mobile
- [ ] Tested on both iOS and Android
- [ ] Error messages tested
- [ ] Admin dashboard working
- [ ] Stamp collection working
- [ ] Gift claim form working
- [ ] Multi-language support verified
- [ ] Mobile responsive tested
- [ ] Performance tested (app loads fast)
- [ ] Security: No secrets in frontend code
- [ ] Backup database before launch

---

## 🐛 Troubleshooting

### App doesn't load
- Check browser console (F12)
- Verify backend URL is correct
- Check if API key is valid

### Database not saving
- Verify CORS is enabled (if using backend)
- Check database credentials
- Review API quotas (may have exceeded free tier)

### QR scanner not working
- Must be HTTPS (or localhost)
- Allow camera permission
- Try manual PIN entry as fallback

### Stuck? Need help?
1. Check README.md
2. Review backend setup files
3. Check service status pages
4. Post in support forums with error message

---

## 🎉 Deployment Success!

Once deployed:
1. Share public URL with campus
2. Share admin login (if needed)
3. Monitor user statistics
4. Collect feedback for improvements

**Congratulations! Your app is live!** 🎊

---

**Last Updated:** February 2026
**For:** PolyU 85th Anniversary Hunt
**License:** MIT (Free to use)
