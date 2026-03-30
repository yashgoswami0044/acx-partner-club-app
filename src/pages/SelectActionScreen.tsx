import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Building2, Search, ChevronLeft } from 'lucide-react';

const SelectActionScreen: React.FC = () => {
  const navigate = useNavigate();

  if (!sessionStorage.getItem('profileCompleted')) {
    return <Navigate to="/create-profile" replace />;
  }

  return (
    <div className="flex-column fade-in" style={{ height: '100vh' }}>
      <header className="app-header">
        <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Select Action</h2>
      </header>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1 }}>
        <h3 className="slide-up" style={{ marginBottom: 'var(--spacing-xl)', fontSize: '24px' }}>What would you like to do?</h3>

        <div 
          className="card slide-up" 
          style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', cursor: 'pointer', padding: 'var(--spacing-xl) var(--spacing-lg)', animationFillMode: 'forwards', opacity: 0 }}
          onClick={() => navigate('/register-company')}
        >
          <div style={{ padding: '12px', backgroundColor: 'rgba(226, 55, 68, 0.1)', color: 'var(--primary-color)', borderRadius: '50%' }}>
            <Building2 size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Register my company</h4>
            <p style={{ margin: 0 }}>Join the ACX Partner Club</p>
          </div>
        </div>

        <div 
          className="card slide-up" 
          style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', cursor: 'pointer', padding: 'var(--spacing-xl) var(--spacing-lg)', animationFillMode: 'forwards', opacity: 0 }}
          onClick={() => navigate('/check-registration')}
        >
          <div style={{ padding: '12px', backgroundColor: 'rgba(45, 156, 219, 0.1)', color: 'var(--secondary-color)', borderRadius: '50%' }}>
            <Search size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Check if my company is registered</h4>
            <p style={{ margin: 0 }}>Verify existing registration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectActionScreen;
