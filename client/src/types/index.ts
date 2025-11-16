export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
  availability: boolean;
}

export interface Appointment {
  _id: string;
  date: string;
  time: string;
  doctor: Doctor | string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  specialty: string;
  status: 'booked' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}
