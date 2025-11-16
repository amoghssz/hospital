import { Appointment, Doctor, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const ADMIN_API_URL = `${API_BASE_URL}/admin`;

// Appointments API
export const appointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    const res = await fetch(`${API_BASE_URL}/appointments`);
    const data = (await res.json()) as ApiResponse<Appointment[]>;
    if (!data.success) throw new Error(data.message);
    return data.data || [];
  },

  getBySpecialty: async (specialty: string): Promise<Appointment[]> => {
    const res = await fetch(`${API_BASE_URL}/appointments/specialty/${specialty}`);
    const data = (await res.json()) as ApiResponse<Appointment[]>;
    if (!data.success) throw new Error(data.message);
    return data.data || [];
  },

  create: async (appointment: Partial<Appointment>): Promise<Appointment> => {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    const data = (await res.json()) as ApiResponse<Appointment>;
    if (!data.success) throw new Error(data.message);
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
    });
    const data = (await res.json()) as ApiResponse<any>;
    if (!data.success) throw new Error(data.message);
  },

  updateStatus: async (id: string, status: string): Promise<Appointment> => {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = (await res.json()) as ApiResponse<Appointment>;
    if (!data.success) throw new Error(data.message);
    return data.data!;
  },
};

// Admin API
export const adminService = {
  getDoctors: async (): Promise<Doctor[]> => {
    const res = await fetch(`${ADMIN_API_URL}/doctors`);
    const data = (await res.json()) as ApiResponse<Doctor[]>;
    if (!data.success) throw new Error(data.message);
    return data.data || [];
  },

  createDoctor: async (doctor: Partial<Doctor>): Promise<Doctor> => {
    const res = await fetch(`${ADMIN_API_URL}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor),
    });
    const data = (await res.json()) as ApiResponse<Doctor>;
    if (!data.success) throw new Error(data.message);
    return data.data!;
  },

  deleteDoctor: async (id: string): Promise<void> => {
    const res = await fetch(`${ADMIN_API_URL}/doctors/${id}`, {
      method: 'DELETE',
    });
    const data = (await res.json()) as ApiResponse<any>;
    if (!data.success) throw new Error(data.message);
  },

  getAppointments: async (): Promise<Appointment[]> => {
    const res = await fetch(`${ADMIN_API_URL}/appointments`);
    const data = (await res.json()) as ApiResponse<Appointment[]>;
    if (!data.success) throw new Error(data.message);
    return data.data || [];
  },

  deleteAppointment: async (id: string): Promise<void> => {
    const res = await fetch(`${ADMIN_API_URL}/appointments/${id}`, {
      method: 'DELETE',
    });
    const data = (await res.json()) as ApiResponse<any>;
    if (!data.success) throw new Error(data.message);
  },

  uploadCsv: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${ADMIN_API_URL}/upload-csv`, {
      method: 'POST',
      body: formData,
    });
    const data = (await res.json()) as ApiResponse<any>;
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getStatistics: async () => {
    const res = await fetch(`${ADMIN_API_URL}/statistics`);
    const data = (await res.json()) as ApiResponse<any>;
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
