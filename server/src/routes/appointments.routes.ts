import { Router, Express } from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';

const router = Router();
const appointmentsController = new AppointmentsController();

// Routes
router.get('/appointments', appointmentsController.getAllAppointments.bind(appointmentsController));
router.get('/appointments/specialty/:specialty', appointmentsController.getAppointmentsBySpecialty.bind(appointmentsController));
router.post('/appointments', appointmentsController.createAppointment.bind(appointmentsController));
router.delete('/appointments/:id', appointmentsController.deleteAppointment.bind(appointmentsController));
router.patch('/appointments/:id/status', appointmentsController.updateAppointmentStatus.bind(appointmentsController));

export function setRoutes(app: Express) {
  app.use('/api', router);
}
