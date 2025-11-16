import React from 'react';
import { Doctor } from '../types';
import { adminService } from '../services/api';

interface DoctorListProps {
  doctors: Doctor[];
  onDelete: (id: string) => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({ doctors, onDelete }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;

    try {
      setLoading(true);
      setError('');
      await adminService.deleteDoctor(id);
      onDelete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete doctor');
    } finally {
      setLoading(false);
    }
  };

  if (doctors.length === 0) {
    return <div className="text-center text-muted">No doctors found</div>;
  }

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.specialty}</td>
              <td>{doc.email || '-'}</td>
              <td>{doc.phone || '-'}</td>
              <td>
                <span className={doc.availability ? 'text-success' : 'text-muted'}>
                  {doc.availability ? '✓ Available' : '✗ Unavailable'}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(doc._id)}
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
