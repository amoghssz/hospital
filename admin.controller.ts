import { Request, Response } from 'express';
import { CsvService } from '../services/csv.service';
import { Doctor } from '../models/doctor.model';

export class AdminController {
    private csvService: CsvService;

    constructor() {
        this.csvService = new CsvService();
    }

    public async uploadCsv(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.csvService.processCsv(req.file);
            res.status(200).json({ message: 'CSV processed successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error processing CSV', error });
        }
    }

    public async deleteDoctor(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const result = await Doctor.findByIdAndDelete(id);
            if (!result) {
                res.status(404).json({ message: 'Doctor not found' });
                return;
            }
            res.status(200).json({ message: 'Doctor deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting doctor', error });
        }
    }

    public async viewDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await Doctor.find();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving doctors', error });
        }
    }
}