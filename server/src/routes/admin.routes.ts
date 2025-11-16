import { Router, Express } from 'express';
import multer from 'multer';
import { AdminController } from '../controllers/admin.controller';

const router = Router();
const adminController = new AdminController();
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.post('/upload-csv', upload.single('file'), adminController.uploadCsv.bind(adminController));
router.get('/doctors', adminController.getDoctors.bind(adminController));
router.post('/doctors', adminController.createDoctor.bind(adminController));
router.delete('/doctors/:id', adminController.deleteDoctor.bind(adminController));
router.get('/appointments', adminController.getAppointments.bind(adminController));
router.delete('/appointments/:id', adminController.deleteAppointment.bind(adminController));
router.get('/statistics', adminController.getStatistics.bind(adminController));

export function setRoutes(app: Express) {
  app.use('/api/admin', router);
}
