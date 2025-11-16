import React, { useState, useEffect } from 'react';
import { Appointment, Doctor } from '../types';
import { adminService } from '../services/api';
import { DoctorForm } from '../components/DoctorForm';
import { DoctorList } from '../components/DoctorList';
import { AppointmentList } from '../components/AppointmentList';
import { CsvUploader } from '../components/CsvUploader';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'appointments' | 'upload'>('overview');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [doctorsData, appointmentsData, statsData] = await Promise.all([
        adminService.getDoctors(),
        adminService.getAppointments(),
        adminService.getStatistics(),
      ]);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((doc) => doc._id !== id));
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt._id !== id));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mt">
          <div className="loading"></div>
          <p className="mt">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>🔧 Admin Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>Manage doctors, appointments, and system data</p>
        </header>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['overview', 'doctors', 'appointments', 'upload'].map((tab) => (
            <button
              key={tab}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab(tab as any)}
              style={{
                background: activeTab === tab ? '#667eea' : '#f093fb',
              }}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'doctors' && '👨‍⚕️ Doctors'}
              {tab === 'appointments' && '📅 Appointments'}
              {tab === 'upload' && '📤 Upload CSV'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', color: '#667eea', margin: '10px 0' }}>
                {stats?.totalDoctors || 0}
              </h3>
              <p>Total Doctors</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', color: '#f093fb', margin: '10px 0' }}>
                {stats?.totalAppointments || 0}
              </h3>
              <p>Total Appointments</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', color: '#66bb6a', margin: '10px 0' }}>
                {stats?.bookedAppointments || 0}
              </h3>
              <p>Booked</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', color: '#2196f3', margin: '10px 0' }}>
                {stats?.completedAppointments || 0}
              </h3>
              <p>Completed</p>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginBottom: '30px' }}>
            <div className="card">
              <h2>Add New Doctor</h2>
              <DoctorForm onSuccess={loadData} />
            </div>
            <div className="card">
              <h2>All Doctors ({doctors.length})</h2>
              <DoctorList doctors={doctors} onDelete={handleDeleteDoctor} />
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="card">
            <h2>All Appointments ({appointments.length})</h2>
            <AppointmentList
              appointments={appointments}
              onDelete={handleDeleteAppointment}
              onStatusChange={loadData}
              isAdmin={true}
            />
          </div>
        )}

        {/* Upload CSV Tab */}
        {activeTab === 'upload' && (
          <div className="card">
            <h2>📤 Upload CSV Data</h2>
            <p className="text-muted" style={{ marginBottom: '20px' }}>
              Upload a CSV file to bulk import doctors and appointments. 
              <br />
              Columns: type, name, specialty, email, phone, date, time, doctorId, patientName, patientPhone, patientEmail
            </p>
            <CsvUploader onSuccess={loadData} />
          </div>
        )}
      </div>
    </div>
  );
};
