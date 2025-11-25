# ⚡ Quick Start - GitHub Pages Deployment

## 🎯 Fastest Way to Deploy (5 minutes)

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `time-on-todo-app`
3. Make it **Public** ✅
4. Click **Create repository**

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click **"uploading an existing file"**
2. Drag and drop ALL files from `Time-On project` folder
3. Click **"Commit changes"**

**Option B: Using GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository → Select `Time-On project` folder
3. Click **Publish repository**

**Option C: Using Git Command Line**
```bash
cd "C:\Users\dell\Downloads\Time-On project"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/time-on-todo-app.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**: Select **main** branch
5. Click **Save**

### Step 4: Wait & Access
- Wait 1-2 minutes
- Your site: `https://YOUR_USERNAME.github.io/time-on-todo-app/`
- GitHub will show the URL in Settings → Pages

## ✅ Done!

Your app is now live and installable as a PWA on mobile devices!

## 📱 Test Installation

1. Open your site on mobile: `https://YOUR_USERNAME.github.io/time-on-todo-app/`
2. **Android**: Chrome → Menu (⋮) → "Add to Home screen"
3. **iOS**: Safari → Share → "Add to Home Screen"

## 🔄 Update Your Site

After making changes:
- Upload new files to GitHub (or use `git push`)
- Changes go live in 1-2 minutes automatically!

---

**Need more details?** See [DEPLOY.md](DEPLOY.md) for complete instructions.

