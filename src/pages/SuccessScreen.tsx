import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--spacing-xl)' }}>
      {/* Spacer for centering */}
      <div style={{ flex: 1 }} />

      {/* Main Success Container */}
      <div className="card slide-up" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--spacing-xxl) var(--spacing-md)', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ position: 'absolute', inset: -16, backgroundColor: 'rgba(52, 199, 89, 0.15)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <CheckCircle2 size={80} color="var(--success-color)" style={{ position: 'relative', zIndex: 2 }} />
        </div>

        <h2 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)', fontSize: 'var(--font-size-xl)' }}>
          Registration Successful!
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)', lineHeight: 1.5 }}>
          Welcome to the <strong>ACX Partner Club</strong>.<br/>
          Your profile is currently under review and will be approved shortly.
        </p>

        {/* Benefits List inside the card */}
        <div style={{ width: '100%', textAlign: 'left', backgroundColor: 'var(--bg-color)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: 'rgba(52, 199, 89, 0.1)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
              <ShieldCheck size={20} color="var(--success-color)" />
            </div>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>Secure Data Encryption</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(226, 55, 68, 0.1)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
              <Clock size={20} color="var(--primary-color)" />
            </div>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>Priority Support Access</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom Action */}
      <div className="slide-up" style={{ width: '100%', maxWidth: '400px', paddingBottom: 'var(--spacing-lg)', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', padding: '16px', fontSize: 'var(--font-size-base)', display: 'flex', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}
        >
          Go to Dashboard
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
      `}} />
    </div>
  );
};

export default SuccessScreen;
