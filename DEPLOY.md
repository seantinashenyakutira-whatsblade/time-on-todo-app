# 🚀 GitHub Pages Deployment Guide

Follow these steps to deploy Time-On to GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `time-on-todo-app` (or your preferred name)
4. Description: `A modern, animated to-do list web application with routine templates, alarm system, and consistency tracking.`
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

### Option A: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/) if you don't have it
2. Open GitHub Desktop
3. Click **File** → **Add Local Repository**
4. Click **Choose** and select the `Time-On project` folder
5. Click **Publish repository** (or **Push origin** if already published)
6. Select your GitHub account and repository name
7. Click **Publish Repository**

### Option B: Using Command Line

Open PowerShell or Command Prompt in the `Time-On project` folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Time-On PWA"

# Add GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/time-on-todo-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch
6. Select **/ (root)** folder
7. Click **Save**
8. Wait 1-2 minutes for GitHub to build your site

## Step 4: Access Your Live Site

1. Your site will be available at:
   ```
   https://YOUR_USERNAME.github.io/time-on-todo-app/
   ```
2. GitHub will show you the URL in the Pages settings
3. It may take a few minutes to go live

## Step 5: Update Manifest for GitHub Pages

If your repository name is different from `time-on-todo-app`, update the `manifest.json` start_url:

```json
"start_url": "./",
"scope": "./",
```

This should already be correct, but verify it matches your repository structure.

## Step 6: Test PWA Installation

1. Open your live site on mobile: `https://YOUR_USERNAME.github.io/time-on-todo-app/`
2. **Android**: Chrome → Menu (⋮) → "Add to Home screen"
3. **iOS**: Safari → Share → "Add to Home Screen"

## 🔄 Updating Your Site

After making changes:

### Using GitHub Desktop:
1. Make your changes
2. Write a commit message
3. Click **Commit to main**
4. Click **Push origin**

### Using Command Line:
```bash
git add .
git commit -m "Your commit message"
git push
```

Changes will be live in 1-2 minutes!

## 📝 Important Notes

- ✅ GitHub Pages automatically provides HTTPS (required for PWA)
- ✅ Your site is free and public
- ✅ Updates are automatic after pushing
- ⚠️ Repository must be **Public** for free GitHub Pages
- ⚠️ Custom domain is optional (not required)

## 🎉 You're Done!

Your Time-On app is now live and installable as a PWA!

Share your site URL with friends and family to let them install it on their phones.

