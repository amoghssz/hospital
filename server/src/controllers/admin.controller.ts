import { Request, Response } from 'express';
import { CsvService } from '../services/csv.service';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

interface MulterRequest extends Request {
  file?: any;
}

export class AdminController {
  private csvService: CsvService;

  constructor() {
    this.csvService = new CsvService();
  }

  async uploadCsv(req: MulterRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No file provided',
        });
        return;
      }

      const result = await this.csvService.processCsv(req.file.buffer);
      res.status(200).json({
        success: true,
        message: 'CSV processed successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing CSV',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await Doctor.find();
      res.status(200).json({
        success: true,
        data: doctors,
      });
    } catch (error) {
      console.error('Error retrieving doctors:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving doctors',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByIdAndDelete(id);
      if (!doctor) {
        res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Doctor deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting doctor',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { name, specialty, email, phone, availability } = req.body;

      if (!name || !specialty) {
        res.status(400).json({
          success: false,
          message: 'Name and specialty are required',
        });
        return;
      }

      const doctor = new Doctor({
        name,
        specialty,
        email,
        phone,
        availability: availability !== false,
      });

      const savedDoctor = await doctor.save();
      res.status(201).json({
        success: true,
        message: 'Doctor created successfully',
        data: savedDoctor,
      });
    } catch (error) {
      console.error('Error creating doctor:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating doctor',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await Appointment.find().populate('doctor').sort({ date: -1 });
      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving appointments',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Appointment not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Appointment deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting appointment',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getStatistics(req: Request, res: Response): Promise<void> {
    try {
      const totalDoctors = await Doctor.countDocuments();
      const totalAppointments = await Appointment.countDocuments();
      const bookedAppointments = await Appointment.countDocuments({ status: 'booked' });
      const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

      res.status(200).json({
        success: true,
        data: {
          totalDoctors,
          totalAppointments,
          bookedAppointments,
          completedAppointments,
        },
      });
    } catch (error) {
      console.error('Error retrieving statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
