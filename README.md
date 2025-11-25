# Time-On - Calm To-Do & Routine Planner

A modern, animated to-do list web application with routine templates, alarm system, and consistency tracking. Built with vanilla JavaScript, featuring a calm, minimal UI inspired by Calm and Notion.

## ✨ Features

- ✅ **Task Management** - Add, edit, delete, and mark tasks as complete
- 📅 **Due Dates & Notes** - Schedule tasks with dates and add detailed notes
- 🏷️ **Categories** - Organize tasks by Daily To-Do, Important, and Completed
- 📋 **Routine Templates** - Pre-built templates for Self-Care, Student, and Work routines
- ⏰ **Alarm System** - Set alarms with custom sounds and notifications
- 💬 **Motivational Quotes** - Auto-popup quotes every 45 seconds
- 📊 **Consistency Graph** - Visual bar chart tracking your progress over 7 days
- 🌓 **Dark & Light Mode** - Toggle between themes
- 🔍 **Search** - Find tasks quickly
- 💾 **Export Tasks** - Backup your data as JSON
- 📱 **PWA Support** - Install as a mobile app on your phone

## 🚀 Installation & Setup

### For Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process required - it's vanilla JavaScript!

### Deploy to GitHub Pages (Recommended)

**Quick Setup:**
1. Create a new repository on GitHub (name it `time-on-todo-app` or your choice)
2. Upload all files to the repository
3. Go to **Settings** → **Pages** → Select **main** branch → **Save**
4. Your site will be live at: `https://YOUR_USERNAME.github.io/time-on-todo-app/`

**Detailed instructions:** See [DEPLOY.md](DEPLOY.md) for step-by-step guide.

### For Production (PWA Installation)

1. **Icons are already included** ✅ (all required sizes are in `assets/icons/`)

2. **Deploy to GitHub Pages**:
   - Follow the GitHub Pages setup above
   - GitHub Pages automatically provides HTTPS (required for PWA)

3. **Install on Mobile**:
   - **Android**: Open the site in Chrome, tap the menu (⋮), select "Add to Home screen"
   - **iOS**: Open the site in Safari, tap the Share button, select "Add to Home Screen"

## 📱 PWA Installation Instructions

### Android (Chrome)
1. Open the Time-On website in Chrome
2. Tap the three-dot menu (⋮) in the top right
3. Select "Add to Home screen" or "Install app"
4. Confirm the installation
5. The app icon will appear on your home screen

### iOS (Safari)
1. Open the Time-On website in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"
6. The app icon will appear on your home screen

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **localStorage** - Data persistence
- **Canvas API** - Consistency graph
- **Service Worker** - PWA offline support
- **Web App Manifest** - PWA installation

## 📁 Project Structure

```
Time-On project/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── css/
│   ├── styles.css     # Main styles
│   └── animations.css # Animation keyframes
├── js/
│   ├── app.js         # Main application logic
│   ├── storage.js     # localStorage management
│   ├── templates.js   # Routine templates
│   ├── alarm.js       # Alarm system
│   └── quotes.js      # Motivational quotes
└── assets/
    ├── icons/         # PWA icons
    └── sounds/        # Alarm sounds
```

## 🎨 Features in Detail

### Task Management
- Create tasks with title, category, due date, notes, and importance flag
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- All data saved in localStorage

### Routine Templates
- **Self-Care Template**: Daily wellness routine with time blocks
- **Student Template**: Academic schedule template
- **Work Template**: Professional workday template
- Customize templates before applying

### Alarm System
- Set alarms with time picker
- Upload custom alarm sounds
- Snooze functionality (5 minutes)
- Animated popup notifications

### Consistency Tracking
- Bar chart showing completed tasks per day
- 7-day rolling view
- Visual progress tracking

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 License

This project is open source and available for personal and commercial use.

## 👥 Contributors

**Sean Nyakutira**
- Role: Software Engineer (Back-end, Front-end, and Architecture)
- WhatsApp: +260 776950796
- Phone: +260 968597996
- Email: seantinashenyakutira@gmail.com
- GitHub: [@seantinashenyakutira-whatsblade](https://github.com/seantinashenyakutira-whatsblade)

**Zvikomborero Svotwa**
- Role: Software Engineer and Front-end
- Email: svotwaZvikomborero28@gmail.com
- GitHub: [@svotwazvikomborero28-sudo](https://github.com/svotwazvikomborero28-sudo)

## 🙏 Acknowledgments

- Design inspiration from Calm app and Notion
- Icons and UI patterns inspired by modern productivity apps

---

Made with ❤️ for better productivity and mindful task management.

