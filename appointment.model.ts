import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
    date: Date;
    time: string;
    doctor: mongoose.Types.ObjectId;
    patientName: string;
    patientContact: string;
    specialty: string;
}

const AppointmentSchema: Schema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: mongoose.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: true },
    patientContact: { type: String, required: true },
    specialty: { type: String, required: true }
});

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);