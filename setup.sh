#!/bin/bash

# Medical Appointment Booking System - Setup Script

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Medical Booking System - Setup       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed"
echo ""

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "✗ Failed to install server dependencies"
    exit 1
fi
echo "✓ Server dependencies installed"
cd ..
echo ""

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "✗ Failed to install client dependencies"
    exit 1
fi
echo "✓ Client dependencies installed"
cd ..
echo ""

echo "╔════════════════════════════════════════╗"
echo "║   Setup Complete!                      ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "1. Start MongoDB:"
echo "   - If installed locally: mongod"
echo "   - Using Docker: docker run -d -p 27017:27017 mongo"
echo ""
echo "2. Start the server (in new terminal):"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "3. Start the client (in new terminal):"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:3000"
echo ""
