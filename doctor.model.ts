import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    specialty: string;
    availability: boolean;
}

const DoctorSchema: Schema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    availability: { type: Boolean, default: true }
});

export const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);