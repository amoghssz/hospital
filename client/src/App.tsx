import React from 'react';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';
import './styles/index.css';

const App: React.FC = () => {
  const [page, setPage] = React.useState<'booking' | 'admin'>(() => {
    const path = window.location.pathname;
    return path.includes('/admin') ? 'admin' : 'booking';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setPage(path.includes('/admin') ? 'admin' : 'booking');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (newPage: 'booking' | 'admin') => {
    setPage(newPage);
    const path = newPage === 'admin' ? '/admin' : '/';
    window.history.pushState({}, '', path);
  };

  return (
    <div>
      <nav style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '15px 0',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            🏥 Medical Booking System
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              className={`btn ${page === 'booking' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleNavigation('booking')}
            >
              📅 Book Appointment
            </button>
            <button
              className={`btn ${page === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleNavigation('admin')}
            >
              🔧 Admin Panel
            </button>
          </div>
        </div>
      </nav>

      {page === 'booking' ? <BookingPage /> : <AdminPage />}
    </div>
  );
};

export default App;
