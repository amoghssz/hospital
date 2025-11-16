# Quick Start Guide - Medical Booking System

## ⚡ Fast Setup (5 minutes)

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- MongoDB running locally or Docker installed

### Step 1: Install Dependencies
```bash
# Run setup script (Windows)
setup.bat

# OR run setup script (Mac/Linux)
bash setup.sh

# OR manually install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Step 2: Start MongoDB
**Option A - Local MongoDB:**
```powershell
# Windows
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B - Docker (Easiest):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 3: Start Server
```bash
cd server
npm run dev
```

### Step 4: Start Client (New Terminal)
```bash
cd client
npm run dev
```

### Step 5: Open Browser
- Booking Page: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Start MongoDB: `docker run -d -p 27017:27017 mongo` |
| Port 3000 already in use | Change port in client/vite.config.ts |
| Port 5000 already in use | Change PORT in server/.env |
| Module not found | Run `npm install` in server and client directories |
| CORS error | Ensure server .env has `CLIENT_URL=http://localhost:3000` |

## 📊 Test Data

Add a sample doctor via admin panel:
- Name: Dr. Smith
- Specialty: Cardiology
- Email: smith@hospital.com
- Phone: 555-1234

Then book an appointment with this doctor!

## 🚀 Docker Compose (One Command)
```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## 📱 Features to Try

1. **User Side:**
   - Select specialty
   - Choose doctor
   - Pick date and time
   - Enter details and book

2. **Admin Side:**
   - View statistics
   - Add doctors
   - Manage appointments
   - Upload CSV data

## 🆘 Still Having Issues?

1. Check if all services are running:
   - MongoDB: `mongosh` or connection check
   - Server: http://localhost:5000/api/health
   - Client: http://localhost:3000

2. Check terminal output for error messages

3. Clear cache and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

**Enjoy! 🎉**
