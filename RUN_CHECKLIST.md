# ✅ Run Checklist - Medical Booking System

Use this checklist to get your app running in 5 minutes!

## Pre-Flight Check

- [ ] Node.js installed? `node --version`
- [ ] npm installed? `npm --version`
- [ ] 500MB disk space available
- [ ] Internet connection available
- [ ] You have the `hospital` folder open in terminal

## Option A: Automated Setup (Easiest)

### Windows Users
- [ ] Open PowerShell or Command Prompt
- [ ] Navigate to hospital folder: `cd <path-to-hospital>`
- [ ] Run: `setup.bat`
- [ ] Wait for completion
- [ ] Follow on-screen instructions

### Mac/Linux Users
- [ ] Open Terminal
- [ ] Navigate to hospital folder: `cd <path-to-hospital>`
- [ ] Run: `bash setup.sh`
- [ ] Wait for completion
- [ ] Follow on-screen instructions

## Option B: Docker (Easiest for All)

- [ ] Docker installed? `docker --version`
- [ ] Open Terminal/PowerShell
- [ ] Navigate to hospital folder
- [ ] Run: `docker-compose up --build`
- [ ] Wait 2-3 minutes for build
- [ ] Visit: http://localhost:3000
- [ ] **Done! 🎉**

## Option C: Manual Setup

### Step 1: Install Server Dependencies
- [ ] Open Terminal/PowerShell
- [ ] Navigate to: `cd server`
- [ ] Run: `npm install`
- [ ] Wait for completion (1-2 minutes)
- [ ] Navigate back: `cd ..`

### Step 2: Install Client Dependencies
- [ ] Navigate to: `cd client`
- [ ] Run: `npm install`
- [ ] Wait for completion (1-2 minutes)
- [ ] Navigate back: `cd ..`

### Step 3: Start MongoDB
- [ ] **Option A - Docker (Recommended):**
  - [ ] Run: `docker run -d -p 27017:27017 --name mongodb mongo`
  - [ ] Wait 5 seconds for startup

- [ ] **Option B - Local MongoDB:**
  - [ ] MongoDB installed on your system?
  - [ ] Run mongod service/command
  - [ ] Wait for "listening on port 27017"

### Step 4: Start Backend
- [ ] Open Terminal #1 (Keep it open)
- [ ] Navigate to: `cd server`
- [ ] Run: `npm run dev`
- [ ] Wait for: ✓ Server running on http://localhost:5000
- [ ] **Don't close this terminal!**

### Step 5: Start Frontend
- [ ] Open Terminal #2 (Keep it open)
- [ ] Navigate to: `cd client`
- [ ] Run: `npm run dev`
- [ ] Wait for: ➜ Local: http://localhost:3000
- [ ] **Don't close this terminal!**

### Step 6: Open Browser
- [ ] Open web browser
- [ ] Navigate to: **http://localhost:3000**
- [ ] You should see the home page! ✅

## Verification Checklist

### All Running?
- [ ] Terminal 1: Server is running
- [ ] Terminal 2: Client is running
- [ ] Browser: http://localhost:3000 loads
- [ ] No error messages in terminals

### Test the App

#### Test User Side:
- [ ] Page loads with "Medical Appointment Booking"
- [ ] Can see doctor list (might be empty)
- [ ] Specialty dropdown works
- [ ] Form fields appear

#### Test Admin Side:
- [ ] Click "Admin Panel" button
- [ ] See admin dashboard
- [ ] Can see 4 tabs: Overview, Doctors, Appointments, Upload CSV
- [ ] Statistics section shows numbers

#### Test Adding Data:
- [ ] Go to Admin → Doctors tab
- [ ] Add a doctor:
  - Name: Dr. Test
  - Specialty: Cardiology
  - Click "Add Doctor"
- [ ] See success message ✓
- [ ] Doctor appears in list

#### Test Booking:
- [ ] Go back to home
- [ ] Select specialty: Cardiology
- [ ] Doctor appears in dropdown
- [ ] Fill booking form
- [ ] Click "Book Appointment"
- [ ] See success message ✓

#### Test Admin Functions:
- [ ] Go to Admin → Appointments
- [ ] See your appointment
- [ ] Try changing status
- [ ] Try deleting appointment

### If Something Fails:

**Page won't load?**
- [ ] Check browser URL is exactly: http://localhost:3000
- [ ] Check Terminal 2 shows no errors
- [ ] Refresh page (F5 or Ctrl+R)
- [ ] Try Ctrl+Shift+R for hard refresh

**API errors?**
- [ ] Check Terminal 1 shows "Server running"
- [ ] Check Terminal 2 shows "Local: http://localhost:3000"
- [ ] Check MongoDB is running (should show in Terminal or docker)
- [ ] Check .env files have correct ports

**MongoDB error?**
- [ ] If using Docker: `docker ps` should show mongo container
- [ ] If local: `mongosh` should connect to localhost:27017
- [ ] Try Docker: `docker run -d -p 27017:27017 mongo`

**Port already in use?**
- [ ] Stop other services using port 3000 or 5000
- [ ] Or change port in:
  - Server: `server/.env` → `PORT=5001`
  - Client: `client/vite.config.ts` → `port: 3001`

## Troubleshooting Guide

| Problem | Check | Fix |
|---------|-------|-----|
| Page blank | Browser console (F12) | Check error message |
| API not responding | Terminal 1 output | Check MongoDB connection |
| 404 errors | Network tab (F12) | Check API URL in .env |
| Port conflicts | Task manager / lsof | Kill process or change port |
| Module errors | npm logs | Run `npm install` again |

## Success Indicators

✅ All of these should be TRUE:

- [ ] Server terminal shows: "✓ Connected to MongoDB"
- [ ] Server terminal shows: "✓ Server running on http://localhost:5000"
- [ ] Client terminal shows: "➜ Local: http://localhost:3000"
- [ ] Browser opens http://localhost:3000
- [ ] Page shows "Medical Appointment Booking"
- [ ] Admin panel loads at http://localhost:3000/admin
- [ ] Can add a doctor
- [ ] Can book an appointment
- [ ] No red error messages in browser console

## Quick Reference

| Task | Command |
|------|---------|
| Check Node.js | `node --version` |
| Check npm | `npm --version` |
| Install deps | `npm install` |
| Run dev server | `npm run dev` |
| Start Docker | `docker-compose up --build` |
| Stop all services | Ctrl+C in each terminal |
| Check MongoDB | `docker ps` or `mongosh` |

## After Running

### To Stop:
1. Terminal 1: Press Ctrl+C
2. Terminal 2: Press Ctrl+C
3. If using Docker: `docker-compose down`

### To Run Again:
1. Follow steps starting from "Option A", "B", or "C"
2. All files are still there
3. No reinstall needed unless you deleted node_modules

### To Clean Up:
```bash
# If you want to clean everything:
rm -r server/node_modules client/node_modules
npm install  # Install again when needed
```

## Done! 🎉

Your Medical Appointment Booking System is running!

- **Booking App**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Health**: http://localhost:5000/api/health

Enjoy using your application!

---

**Need help?** Check README.md or GUIDE.md for more info.
