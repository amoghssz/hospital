import React, { useState, useEffect } from 'react';
import { Appointment, Doctor } from '../types';
import { appointmentService, adminService } from '../services/api';
import { BookingForm } from '../components/BookingForm';
import { AppointmentList } from '../components/AppointmentList';

export const BookingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [doctorsData, appointmentsData] = await Promise.all([
        adminService.getDoctors(),
        appointmentService.getAll(),
      ]);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt._id !== id));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mt">
          <div className="loading"></div>
          <p className="mt">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>🏥 Medical Appointment Booking</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>Schedule your appointment with our experienced doctors</p>
        </header>

        {error && <div className="alert alert-error">{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div className="card">
            <h2>📅 Book an Appointment</h2>
            <BookingForm doctors={doctors} onSuccess={loadData} />
          </div>

          <div className="card">
            <h2>👨‍⚕️ Available Doctors</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <div
                    key={doc._id}
                    style={{
                      padding: '15px',
                      border: '1px solid #eee',
                      borderRadius: '6px',
                      background: doc.availability ? '#f0f9ff' : '#f5f5f5',
                    }}
                  >
                    <h4>{doc.name}</h4>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Specialty:</strong> {doc.specialty}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Status:</strong>{' '}
                      <span style={{ color: doc.availability ? '#66bb6a' : '#ef5350' }}>
                        {doc.availability ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No doctors available</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h2>📋 Your Appointments</h2>
          {appointments.length > 0 ? (
            <AppointmentList
              appointments={appointments}
              onDelete={handleDeleteAppointment}
            />
          ) : (
            <p className="text-center text-muted">No appointments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
