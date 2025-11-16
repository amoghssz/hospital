import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  doctor: mongoose.Types.ObjectId;
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  specialty: string;
  status: 'booked' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: mongoose.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String },
    patientPhone: { type: String, required: true },
    specialty: { type: String, required: true },
    status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
