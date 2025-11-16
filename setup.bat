@echo off
REM Medical Appointment Booking System - Windows Setup Script

echo.
echo ╔════════════════════════════════════════╗
echo ║   Medical Booking System - Setup       ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js is not installed. Please install it from https://nodejs.org/
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ✗ Failed to install server dependencies
    exit /b 1
)
echo ✓ Server dependencies installed
cd ..
echo.

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ✗ Failed to install client dependencies
    exit /b 1
)
echo ✓ Client dependencies installed
cd ..
echo.

echo ╔════════════════════════════════════════╗
echo ║   Setup Complete!                      ║
echo ╚════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Start MongoDB:
echo    - If installed locally: mongod
echo    - Using Docker: docker run -d -p 27017:27017 mongo
echo.
echo 2. Start the server (in new terminal):
echo    cd server
echo    npm run dev
echo.
echo 3. Start the client (in new terminal):
echo    cd client
echo    npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:3000
echo.
pause
