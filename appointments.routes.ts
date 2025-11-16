import { Router } from 'express';
import AppointmentsController from '../controllers/appointments.controller';

const router = Router();
const appointmentsController = new AppointmentsController();

export function setRoutes(app: Router) {
    app.get('/appointments', appointmentsController.getAllAppointments.bind(appointmentsController));
    app.get('/appointments/specialty/:specialty', appointmentsController.getAppointmentsBySpecialty.bind(appointmentsController));
    app.post('/appointments', appointmentsController.createAppointment.bind(appointmentsController));
    app.delete('/appointments/:id', appointmentsController.deleteAppointment.bind(appointmentsController));
}