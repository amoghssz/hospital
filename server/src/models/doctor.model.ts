import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);
