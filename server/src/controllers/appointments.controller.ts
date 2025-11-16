import { Request, Response } from 'express';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';

export class AppointmentsController {
  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await Appointment.find().populate('doctor').sort({ date: 1 });
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

  async getAppointmentsBySpecialty(req: Request, res: Response): Promise<void> {
    try {
      const { specialty } = req.params;
      if (!specialty) {
        res.status(400).json({ success: false, message: 'Specialty is required' });
        return;
      }

      const appointments = await Appointment.find({
        specialty: { $regex: specialty, $options: 'i' },
      })
        .populate('doctor')
        .sort({ date: 1 });

      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.error('Error filtering appointments:', error);
      res.status(500).json({
        success: false,
        message: 'Error filtering appointments',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { date, time, doctorId, patientName, patientPhone, patientEmail, specialty } = req.body;

      // Validation
      if (!date || !time || !doctorId || !patientName || !patientPhone || !specialty) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      // Verify doctor exists
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
        return;
      }

      const appointment = new Appointment({
        date: new Date(date),
        time,
        doctor: doctorId,
        patientName,
        patientPhone,
        patientEmail,
        specialty,
        status: 'booked',
      });

      const savedAppointment = await appointment.save();
      await savedAppointment.populate('doctor');

      res.status(201).json({
        success: true,
        message: 'Appointment created successfully',
        data: savedAppointment,
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(400).json({
        success: false,
        message: 'Error creating appointment',
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

  async updateAppointmentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['booked', 'completed', 'cancelled'].includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status',
        });
        return;
      }

      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate('doctor');

      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Appointment not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Appointment updated successfully',
        data: appointment,
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating appointment',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
