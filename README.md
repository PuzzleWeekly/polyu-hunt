# PolyU Hunt - Complete Setup Guide

## 📁 File Structure

```
polyu-hunt/
├── index.html                 # Main web app (React frontend)
├── README.md                  # This file
├── backend-supabase.js        # Option 1: Supabase backend
├── backend-nodejs.js          # Option 2: Node.js backend
├── backend-firebase.js        # Option 3: Firebase backend
├── package.json               # For Node.js backend
└── .env                       # Environment variables (Node.js only)
```

---

## 🚀 Quick Start (5 minutes)

### Option A: Frontend Only (No Database)
1. Download `index.html`
2. Open in browser: `file:///path/to/index.html`
3. App works! (Data resets on page refresh)

### Option B: With Supabase (Easiest)
1. Go to https://supabase.com/ and create account
2. Create new project
3. Go to SQL Editor and paste this:

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

4. Click Settings > API and copy:
   - Project URL → `BACKEND.url`
   - `anon` public key → `BACKEND.apiKey`

5. In `index.html`, find:
```javascript
const BACKEND = {
    type: 'supabase',
    url: 'https://YOUR_PROJECT.supabase.co',
    apiKey: 'YOUR_ANON_KEY'
};
```

6. Replace with your values and deploy!

### Option C: With Firebase (Serverless)
1. Go to https://console.firebase.google.com/
2. Create new project (enable Firestore)
3. Go to Project Settings > Web and copy config
4. Add to `index.html`:

```javascript
const BACKEND = {
    type: 'firebase',
    firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:958809195745:web:1be0bc46e7cdf88a6e63a0"
    }
};
```

### Option D: With Node.js + MongoDB (Production)
1. Install Node.js from nodejs.org
2. Create folder: `mkdir polyu-hunt && cd polyu-hunt`
3. Initialize project: `npm init -y`
4. Install dependencies: `npm install express mongoose cors dotenv`
5. Create `server.js` from `backend-nodejs.js`
6. Create `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/polyu-hunt
PORT=5000
```
7. Run: `node server.js`
8. Update `index.html` BACKEND:
```javascript
const BACKEND = {
    type: 'nodejs',
    url: 'http://localhost:5000/api'
};
```

---

## 🗄️ Database Comparison

| Feature | Supabase | Firebase | Node.js |
|---------|----------|----------|---------|
| **Setup Time** | 5 min | 5 min | 15 min |
| **Free Tier** | 500MB, ∞ API | 1GB, 50K reads/day | ∞ (if self-hosted) |
| **Cost** | $25/mo after free | $25/mo after free | $5-50/mo hosting |
| **Learning Curve** | Easy | Medium | Hard |
| **Scalability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Best For** | Prototyping | Mobile apps | Production |

**Recommendation:** Start with Supabase, upgrade to Node.js when you need more control.

---

## 🌐 Deploy Frontend to Web

### Deploy with Netlify (FREE)
1. Go to https://netlify.com/
2. Drag `index.html` onto Netlify
3. Get public URL instantly!

### Deploy with GitHub Pages (FREE)
1. Create GitHub repo
2. Add `index.html`
3. Go to Settings > Pages > Deploy from branch
4. Get URL: `username.github.io/polyu-hunt`

### Deploy with Firebase Hosting (FREE)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init hosting`
3. Deploy: `firebase deploy`

---

## 🔧 Configuration Guide

### Change Locations
In `index.html`, find `LOCATIONS` array:

```javascript
const LOCATIONS = [
    {
        id: "corez",
        name: { en: "Core Z", tc: "Z棟", sc: "Z棟" },
        lat: 22.3050,
        lng: 114.1780,
        mapX: 15,          // X position on map (0-100%)
        mapY: 20,          // Y position on map (0-100%)
        icon: "fa-cube",   // FontAwesome icon
        code: "1234",      // PIN code
        hint: { en: "Near entrance...", tc: "...", sc: "..." }
    }
];
```

### Change Questions
In `LOCATIONS`, find `QUESTIONS`:

```javascript
const QUESTIONS = {
    corez: {
        text: { en: "What is Block Z famous for?", tc: "...", sc: "..." },
        options: { en: ["A", "B", "C", "D"], tc: [...], sc: [...] },
        answer: { en: "B", tc: "B", sc: "B" }
    }
};
```

### Add Alumni Stories
In `ALUMNISTORIES`:

```javascript
const ALUMNISTORIES = {
    corez: [
        { 
            user: "John Grad 2020", 
            text: { 
                en: "I learned so much here!", 
                tc: "我在這裡學到很多！", 
                sc: "我在这里学到很多！"
            } 
        }
    ]
};
```

### Change QR Code Format
In `LocationModal` component, find `onScanSuccess`:

```javascript
const expectedCode = "POLYUHUNT-" + location.id;
// Change "POLYUHUNT-" to any prefix you want
```

---

## 🔐 Security Best Practices

### For Supabase:
1. Go to Firestore Rules editor
2. Add Row Level Security (RLS) on `users` table:
```sql
-- Only users can update their own records
CREATE POLICY user_policy ON users
  FOR UPDATE USING (auth.uid() = id);
```

### For Firebase:
Update security rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth == null;
    }
  }
}
```

### For Node.js:
1. Add rate limiting:
```javascript
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

2. Add input validation:
```javascript
app.post('/api/users', validateUser, async (req, res) => {
  // ...
});
```

---

## 📊 Admin Dashboard

Access admin features by typing "admin" in name field and using password "pwadmin":

- **View all QR codes** - Print for each location
- **Download user list** - Excel export
- **Check statistics** - Total stamps, user activity
- **Analytics** - Which locations are most popular

---

## 🐛 Troubleshooting

### QR Scanner not working
- ✅ Make sure you're on HTTPS (or localhost)
- ✅ Allow camera permission
- ✅ Check good lighting
- ✅ Ensure QR code is not pixelated

### Database not saving
- ✅ Check backend URL is correct
- ✅ Verify API key is valid
- ✅ Check browser console for errors (F12)
- ✅ Ensure CORS is enabled

### Stamps not showing
- ✅ Reload page (F5)
- ✅ Check browser localStorage (F12 > Storage)
- ✅ Verify quiz answer is correct
- ✅ Check if already cleared (shows alert)

### Map not displaying
- ✅ Check screen size (mobile friendly)
- ✅ Verify map coordinates (mapX, mapY 0-100)
- ✅ Check if location pin is outside canvas

---

## 📱 Mobile Testing

### Test QR Scanner
1. Deploy to HTTPS URL
2. Open on mobile phone
3. Tap "Scan QR Code"
4. Allow camera access
5. Point at QR code

### Test Responsiveness
1. Open DevTools (F12)
2. Click device toggle (mobile icon)
3. Test on different sizes

---

## 🚀 Advanced Features

### Add Geolocation Verification
```javascript
const handleSelectLocation = async (loc, isLocked) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const distance = calculateDistance(pos.coords, { 
        lat: loc.lat, 
        lng: loc.lng 
      });
      if (distance < 50) { // within 50m
        setActiveLoc(loc);
      }
    });
  }
};
```

### Add Leaderboard
```javascript
const Leaderboard = ({ users, cleared }) => {
  const ranked = users.map(u => ({
    name: u.name,
    stamps: cleared[u.email]?.length || 0
  })).sort((a, b) => b.stamps - a.stamps);
  
  return (
    <div>
      {ranked.map((u, i) => (
        <div key={i}>#{i+1} {u.name} - {u.stamps} stamps</div>
      ))}
    </div>
  );
};
```

### Add Real-time Notifications
```javascript
// With Supabase
const subscription = db.collection('users').on('change', payload => {
  console.log('User data changed:', payload);
  setUsers(users => [...users, payload.new]);
});
```

---

## 📚 API Reference

### User Object
```javascript
{
  id: "uuid",
  name: "Alice Chan",
  email: "alice@polyu.edu.hk",
  role: "student",           // "student" | "grad" | "staff" | "visitor"
  version: "local",          // "local" | "overseas"
  programme: "Computer Science",
  gradYear: 2024,
  stamps: ["corez", "lib", "corem"],
  giftRequest: {
    address: "123 Main St",
    timestamp: "2024-02-10T00:00:00Z"
  },
  createdAt: "2024-02-10T00:00:00Z"
}
```

### Quiz Object
```javascript
{
  id: "uuid",
  email: "alice@polyu.edu.hk",
  locationId: "corez",
  correct: true,
  timestamp: "2024-02-10T00:00:00Z"
}
```

---

## 📞 Support

- Frontend Issues → Check browser console (F12)
- Database Issues → Check service dashboard
- QR Code Issues → Print and test with phone camera first
- Deployment Issues → Check service docs (Netlify/Firebase/Heroku)

---

## 📄 License

This project is open source and free to use for PolyU events and education.

---

**Happy hunting! 🎉**
