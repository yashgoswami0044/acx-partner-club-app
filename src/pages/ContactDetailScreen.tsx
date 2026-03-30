import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ContactDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  if (!sessionStorage.getItem('companyRegistered')) {
    return <Navigate to="/register-company" replace />;
  }

  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  
  const [errors, setErrors] = useState<{mobile?: string, address?: string, website?: string}>({});

  const validate = () => {
    const newErrors: {mobile?: string, address?: string, website?: string} = {};
    
    // Validate Mobile
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!mobile) newErrors.mobile = "Company mobile number is required";
    else if (!phoneRegex.test(mobile)) newErrors.mobile = "Invalid mobile number format";
    
    // Validate Address
    if (!address.trim()) newErrors.address = "Correspondence address is required";
    else if (address.length < 10) newErrors.address = "Please provide a complete address";
    
    // Validate URL (if entered)
    if (website.trim()) {
      try {
        new URL(website.startsWith('http') ? website : `https://${website}`);
      } catch (_) {
        newErrors.website = "Please enter a valid website URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      sessionStorage.setItem('contactProvided', 'true');
      navigate('/poc-detail');
    }
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh' }}>
      <header className="app-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Contact Details</h2>
      </header>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto' }}>
        <p className="slide-up" style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
          Provide your company's official communication details.
        </p>

        <form className="flex-column slide-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }} onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="tel" id="mobile" className={`input-field ${errors.mobile ? 'input-error' : ''}`} placeholder=" " value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '').slice(0,10)); setErrors(p => ({...p, mobile: undefined})) }} maxLength={10} />
            <label htmlFor="mobile" className="input-label">Company Mobile Number *</label>
            {errors.mobile && <div className="error-text">{errors.mobile}</div>}
          </div>

          <div className="input-group">
            <textarea 
              id="address" 
              className={`input-field ${errors.address ? 'input-error' : ''}`} 
              placeholder=" " 
              value={address} 
              onChange={e => { setAddress(e.target.value); setErrors(p => ({...p, address: undefined})) }} 
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
            <label htmlFor="address" className="input-label">Correspondence Address *</label>
            {errors.address && <div className="error-text">{errors.address}</div>}
          </div>

          <div className="input-group">
            <input type="text" id="website" className={`input-field ${errors.website ? 'input-error' : ''}`} placeholder=" " value={website} onChange={e => { setWebsite(e.target.value); setErrors(p => ({...p, website: undefined})) }} />
            <label htmlFor="website" className="input-label">Website (Optional)</label>
            {errors.website && <div className="error-text">{errors.website}</div>}
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

export default ContactDetailScreen;
