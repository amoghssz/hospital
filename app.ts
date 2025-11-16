import express from 'express';
import { json } from 'body-parser';
import { setRoutes as appointmentRoutes } from './routes/appointments.routes';
import { setRoutes as adminRoutes } from './routes/admin.routes';

const app = express();

// Middleware
app.use(json());

// Routes
appointmentRoutes(app);
adminRoutes(app);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;