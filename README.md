# Medical Appointment Booking System

## Overview
The Medical Appointment Booking System is a web application that allows users to book appointments with doctors based on their specialties. It includes an admin interface for managing appointment data and supports CSV uploads for bulk data entry.

## Features
- **User Booking**: Users can filter and book appointments based on doctor specialties.
- **Admin Management**: Admins can view, add, and delete appointment data through a dedicated interface.
- **CSV Upload**: Admins can upload CSV files to add multiple appointments at once.
- **MongoDB Integration**: The application uses MongoDB for storing appointment and doctor data.

## Project Structure
```
medical-booking-system
├── server
│   ├── src
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   ├── appointments.controller.ts
│   │   │   └── admin.controller.ts
│   │   ├── routes
│   │   │   ├── appointments.routes.ts
│   │   │   └── admin.routes.ts
│   │   ├── models
│   │   │   ├── appointment.model.ts
│   │   │   └── doctor.model.ts
│   │   ├── services
│   │   │   └── csv.service.ts
│   │   ├── utils
│   │   │   └── mongo.ts
│   │   └── types
│   │       └── index.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── client
│   ├── src
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── pages
│   │   │   ├── BookingPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── components
│   │   │   ├── AppointmentList.tsx
│   │   │   ├── SpecialtyFilter.tsx
│   │   │   └── CsvUploader.tsx
│   │   ├── api
│   │   │   └── api.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── public
│       └── index.html
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd medical-booking-system
   ```

2. **Install Server Dependencies**:
   ```
   cd server
   npm install
   ```

3. **Install Client Dependencies**:
   ```
   cd client
   npm install
   ```

4. **Configure Environment Variables**:
   - Copy `.env.example` to `.env` and update the database connection string.

5. **Run the Application**:
   - Start the server:
     ```
     cd server
     npm start
     ```
   - Start the client:
     ```
     cd client
     npm start
     ```

## Usage
- Access the booking page at `http://localhost:3000` to book appointments.
- Access the admin page at `http://localhost:3000/admin` for managing appointments.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- TypeScript
- React

## License
This project is licensed under the MIT License.