import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

const router = Router();
const adminController = new AdminController();

router.post('/upload', adminController.uploadCsv);
router.get('/data', adminController.getData);
router.delete('/data/:id', adminController.deleteData);

export default function setRoutes(app: Router) {
    app.use('/admin', router);
}