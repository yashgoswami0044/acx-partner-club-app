import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-column align-center justify-between fade-in" style={{ height: '100vh', padding: 'var(--spacing-xl)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '36px', marginBottom: '8px' }}>ACX</h1>
          <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '2px' }}>PARTNER CLUB</h2>
        </div>
      </div>
      
      <div className="mt-auto" style={{ textAlign: 'center', opacity: 0.6 }}>
        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Powered by</p>
        <h4 style={{ fontSize: '14px', margin: 0 }}>ACX Group</h4>
      </div>
    </div>
  );
};

export default SplashScreen;
