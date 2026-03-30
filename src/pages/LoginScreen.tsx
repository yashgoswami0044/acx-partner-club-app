import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Phone, ChevronLeft } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const validateMobile = (value: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!value) return "Mobile number is required";
    if (!phoneRegex.test(value)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  const handleSendOtp = () => {
    const errorMsg = validateMobile(mobile);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError('');
    setShowOtp(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }
    // Simulation logic: Accept any 4 digit code for this demo
    setError('');
    sessionStorage.setItem('isAuthenticated', 'true');
    navigate('/create-profile');
  };

  return (
    <div className="flex-column" style={{ height: '100vh', padding: 'var(--spacing-lg)' }}>
      {showOtp && (
        <header className="app-header fade-in" style={{ padding: '0 0 var(--spacing-lg) 0' }}>
          <button className="back-button" onClick={() => { setShowOtp(false); setOtp(''); setError(''); }}>
            <ChevronLeft size={24} />
          </button>
        </header>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyItems: 'flex-start', paddingTop: showOtp ? '0' : 'env(safe-area-inset-top)' }}>
        <div style={{ marginTop: showOtp ? '10%' : '20%' }} className="slide-up">
            <h1 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-sm)' }}>
              {!showOtp ? (
                <>Welcome to<br/><span style={{ color: 'var(--primary-color)' }}>ACX Partner Club</span></>
              ) : (
                <>Verify your<br/><span style={{ color: 'var(--primary-color)' }}>Mobile Number</span></>
              )}
            </h1>
            <p style={{ opacity: 0.8 }}>
              {!showOtp ? 'Join the prime real estate partner network. Log in to continue.' : `We sent a 4-digit OTP to +91 ${mobile}`}
            </p>
        </div>
      </div>

      <div className="slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', paddingBottom: 'var(--spacing-xl)' }}>
        {!showOtp ? (
          <>
            <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <input
                type="tel"
                id="loginMobile"
                className={`input-field ${error ? 'input-error' : ''}`}
                placeholder=" "
                value={mobile}
                onChange={e => {
                  setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                  setError('');
                }}
                maxLength={10}
              />
              <label htmlFor="loginMobile" className="input-label">Mobile Number</label>
              {error && <div className="error-text">{error}</div>}
            </div>

            <button className="btn btn-primary" onClick={handleSendOtp} style={{ marginBottom: 'var(--spacing-md)' }}>
              <MessageSquare size={20} />
              Login with WhatsApp
            </button>
            <button className="btn btn-outline" onClick={handleSendOtp}>
              <Phone size={20} />
              Login with SMS
            </button>
            <p style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', fontSize: '12px', color: 'var(--text-disabled)' }}>
              By continuing, you agree to our Terms of Service & Privacy Policy
            </p>
          </>
        ) : (
          <>
            <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <input
                type="text"
                id="otpInput"
                className={`input-field ${error ? 'input-error' : ''}`}
                placeholder=" "
                value={otp}
                onChange={e => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                  setError('');
                }}
                maxLength={4}
                style={{ letterSpacing: '8px', fontSize: '24px', textAlign: 'center', padding: '16px' }}
                autoFocus
              />
              <label htmlFor="otpInput" className="input-label" style={{ left: '50%', transform: 'translateX(-50%)', width: 'max-content' }}>Enter 4-digit OTP</label>
              {error && <div className="error-text" style={{ textAlign: 'center', marginLeft: 0 }}>{error}</div>}
            </div>

            <button className="btn btn-primary" onClick={handleVerifyOtp} disabled={otp.length < 4}>
              Verify & Proceed
            </button>
            <p style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setOtp('')}>
              Resend Code
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
