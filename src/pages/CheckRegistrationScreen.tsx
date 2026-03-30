import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, CheckCircle2 } from 'lucide-react';

const CheckRegistrationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [rera, setRera] = useState('');
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isFound, setIsFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rera.trim()) {
      setError("Please enter a RERA or Mobile Number to search");
      return;
    }
    // simple length check
    if (rera.trim().length < 8) {
      setError("Please enter a valid length identifier");
      return;
    }
    setError('');
    
    // Explicitly testing P52000012345 as the registered company
    if (rera.trim().toUpperCase() === 'P52000012345') {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
    
    setHasSearched(true);
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh' }}>
      <header className="app-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Check Registration</h2>
      </header>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto' }}>
        <p className="slide-up" style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
          Enter your RERA number or mobile number to check if your company is already registered with ACX.
        </p>

        <form className="flex-column slide-up" onSubmit={handleSearch}>
          <div className="input-group">
            <input 
              type="text" 
              id="rera" 
              className={`input-field ${error ? 'input-error' : ''}`} 
              placeholder=" " 
              value={rera} 
              onChange={e => { setRera(e.target.value.toUpperCase()); setError(''); setHasSearched(false); setIsFound(false); }} 
            />
            <label htmlFor="rera" className="input-label">RERA / Mobile Number *</label>
            <Search size={20} color="var(--text-disabled)" style={{ position: 'absolute', right: '16px', top: '16px' }} />
            {error && <div className="error-text">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={false}>
            Check Registration
          </button>
        </form>

        {hasSearched && !isFound && (
          <div className="card slide-up" style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-sm)' }}>
              <Search size={24} color="var(--text-secondary)" />
            </div>
            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Company Not Found</h4>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '14px' }}>
              We couldn't find any registration for <strong style={{color: 'var(--primary-color)'}}>{rera}</strong>.
            </p>
            
            <div className="flex-column gap-md">
              <button className="btn btn-primary" onClick={() => navigate('/register-company')}>
                Register Now
              </button>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                Request an Invite
              </button>
              <button className="btn btn-ghost" onClick={() => { setRera(''); setHasSearched(false); setIsFound(false); }}>
                Check Another Number
              </button>
            </div>
          </div>
        )}

        {hasSearched && isFound && (
          <div className="card slide-up" style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center', backgroundColor: 'rgba(52, 199, 89, 0.05)', borderColor: 'rgba(52, 199, 89, 0.2)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(52, 199, 89, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-sm)' }}>
              <CheckCircle2 color="var(--success-color)" size={24} />
            </div>
            <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--success-color)' }}>Company Found!</h4>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '14px', color: 'var(--text-secondary)' }}>
              We found an existing registration for <strong style={{color: 'var(--text-primary)'}}>{rera}</strong>.
            </p>
            
            <div className="flex-column gap-md">
              <button className="btn btn-primary" onClick={() => navigate('/login')}>
                Proceed to Login
              </button>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                Request an Invite
              </button>
              <button className="btn btn-ghost" onClick={() => { setRera(''); setHasSearched(false); setIsFound(false); }}>
                Check Another Number
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckRegistrationScreen;
