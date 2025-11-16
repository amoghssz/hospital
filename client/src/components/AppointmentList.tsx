import React, { useState } from 'react';
import { Appointment } from '../types';
import { appointmentService } from '../services/api';

interface AppointmentListProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
  isAdmin?: boolean;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onDelete,
  onStatusChange,
  isAdmin = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      setLoading(true);
      setError('');
      await appointmentService.delete(id);
      onDelete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setLoading(true);
      setError('');
      await appointmentService.updateStatus(id, newStatus);
      if (onStatusChange) onStatusChange(id, newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  if (appointments.length === 0) {
    return <div className="text-center text-muted">No appointments found</div>;
  }

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Patient Name</th>
            <th>Specialty</th>
            <th>Doctor</th>
            {isAdmin && <th>Status</th>}
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td>
                {new Date(apt.date).toLocaleDateString()} {apt.time}
              </td>
              <td>{apt.patientName}</td>
              <td>{apt.specialty}</td>
              <td>
                {typeof apt.doctor === 'object' ? apt.doctor.name : apt.doctor}
              </td>
              {isAdmin && (
                <td>
                  <select
                    value={apt.status}
                    onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                    className="form-control"
                    disabled={loading}
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              )}
              <td>{apt.patientPhone}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(apt._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
