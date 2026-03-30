import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Camera, ChevronLeft } from 'lucide-react';

const CreateProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // Guard access if they didn't login
  if (!sessionStorage.getItem('isAuthenticated')) {
    return <Navigate to="/login" replace />;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [errors, setErrors] = useState<{firstName?: string, email?: string}>({});

  const validate = () => {
    const newErrors: {firstName?: string, email?: string} = {};
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName = "Must be at least 2 characters";
    }
    
    // Basic email regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      sessionStorage.setItem('profileCompleted', 'true');
      navigate('/select-action');
    }
  };

  const handleBlur = () => {
    validate();
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh' }}>
      <header className="app-header">
        <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Create Profile</h2>
      </header>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto' }}>
        <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'var(--spacing-xl) 0', animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            backgroundColor: 'var(--bg-color)', border: '2px dashed var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-disabled)',
            cursor: 'pointer', marginBottom: 'var(--spacing-sm)'
          }}>
            <Camera size={32} />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Add Photo</span>
        </div>

        <form className="flex-column slide-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="input-group">
            <input 
              id="firstName"
              type="text" 
              className={`input-field ${errors.firstName ? 'input-error' : ''}`}
              placeholder=" " 
              value={firstName} 
              onBlur={handleBlur}
              onChange={e => { setFirstName(e.target.value); setErrors(p => ({...p, firstName: undefined})) }} 
            />
            <label htmlFor="firstName" className="input-label">First Name *</label>
            {errors.firstName && <div className="error-text">{errors.firstName}</div>}
          </div>

          <div className="input-group">
            <input 
              id="lastName"
              type="text" 
              className="input-field" 
              placeholder=" " 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
            />
            <label htmlFor="lastName" className="input-label">Last Name (Optional)</label>
          </div>

          <div className="input-group">
            <input 
              id="email"
              type="email" 
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              placeholder=" " 
              value={email} 
              onBlur={handleBlur}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: undefined})) }} 
            />
            <label htmlFor="email" className="input-label">Email Address *</label>
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
        </form>
      </div>

      <div style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--surface-color)', boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CreateProfileScreen;
