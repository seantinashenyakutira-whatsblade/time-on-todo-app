@echo off
echo ========================================
echo Time-On - GitHub Pages Setup
echo ========================================
echo.

echo Step 1: Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    echo Or use GitHub Desktop: https://desktop.github.com/
    pause
    exit /b 1
)

echo [OK] Git is installed!
echo.

echo Step 2: Initializing Git repository...
git init
echo.

echo Step 3: Adding all files...
git add .
echo.

echo Step 4: Creating initial commit...
git commit -m "Initial commit: Time-On PWA"
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a repository on GitHub: https://github.com/new
echo 2. Name it: time-on-todo-app (or your choice)
echo 3. Make it PUBLIC
echo 4. Copy the repository URL
echo 5. Run this command (replace YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/time-on-todo-app.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo Then enable GitHub Pages:
echo - Go to Settings ^> Pages
echo - Select 'main' branch
echo - Click Save
echo.
pause

