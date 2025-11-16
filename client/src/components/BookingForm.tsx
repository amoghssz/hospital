import React, { useState, useEffect } from 'react';
import { Doctor } from '../types';
import { appointmentService } from '../services/api';

interface BookingFormProps {
  doctors: Doctor[];
  onSuccess: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ doctors, onSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorId: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    specialty: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const specialties = [...new Set(doctors.map((d) => d.specialty))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'specialty' && { doctorId: '' }),
    }));
  };

  const availableDoctors = formData.specialty
    ? doctors.filter((d) => d.specialty === formData.specialty && d.availability)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.date || !formData.time || !formData.doctorId || !formData.patientName || !formData.patientPhone) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await appointmentService.create({
        date: formData.date as any,
        time: formData.time,
        doctor: formData.doctorId,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        patientEmail: formData.patientEmail,
        specialty: formData.specialty,
      });

      setSuccess('Appointment booked successfully!');
      setFormData({
        date: '',
        time: '',
        doctorId: '',
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        specialty: '',
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <label>Specialty *</label>
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        >
          <option value="">Select Specialty</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Doctor *</label>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
          disabled={!formData.specialty}
        >
          <option value="">Select Doctor</option>
          {availableDoctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="form-group">
        <label>Time *</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Patient Name *</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="patientPhone"
          value={formData.patientPhone}
          onChange={handleChange}
          required
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="patientEmail"
          value={formData.patientEmail}
          onChange={handleChange}
          placeholder="Enter your email (optional)"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
};
