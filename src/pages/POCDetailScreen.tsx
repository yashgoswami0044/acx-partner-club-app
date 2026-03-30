import SideMenu from '../components/SideMenu';
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, Menu, Home, Users, Building2, Trophy, Wallet, CalendarDays, Star, Shield, HelpCircle, ChevronRight, Moon, LogOut } from 'lucide-react';

const POCDetailScreen: React.FC = () => {
  const navigate = useNavigate();

  if (!sessionStorage.getItem('contactProvided')) {
    return <Navigate to="/contact-detail" replace />;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [showSideMenu, setShowSideMenu] = useState(false);

  const [errors, setErrors] = useState<{ firstName?: string, designation?: string, mobile?: string, email?: string }>({});

  const validate = () => {
    const newErrors: { firstName?: string, designation?: string, mobile?: string, email?: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!designation.trim()) newErrors.designation = "Designation is required";
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!mobile) newErrors.mobile = "Mobile number is required";
    else if (!phoneRegex.test(mobile)) newErrors.mobile = "Invalid mobile number format";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email formatting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validate()) {
      sessionStorage.setItem('registrationCompleted', 'true');
      navigate('/success');
    }
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <header className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--surface-color)', padding: '16px var(--spacing-lg)', borderBottom: '1px solid var(--border-color)' }}>
        <button className="back-button" onClick={() => navigate(-1)} style={{ flexShrink: 0, background: 'rgba(0,0,0,0.04)', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer', display: 'flex' }}>
          <ChevronLeft size={24} color="var(--text-primary)" />
        </button>
        <h2 style={{ margin: 0, fontSize: '18px', textAlign: 'center', flex: 1, fontWeight: 800, color: 'var(--text-primary)' }}>Point of Contact</h2>
        <button onClick={() => setShowSideMenu(true)} style={{ 
          background: 'none', border: 'none', padding: '8px', 
          borderRadius: '12px', cursor: 'pointer', display: 'flex',
          backgroundColor: 'rgba(0,0,0,0.04)', flexShrink: 0,
        }}>
          <Menu size={20} strokeWidth={2} color="var(--text-primary)" />
        </button>
      </header>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto' }}>
        <p className="slide-up" style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Who should we contact regarding updates?
        </p>

        <form className="flex-column slide-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }} onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" id="fn" className={`input-field ${errors.firstName ? 'input-error' : ''}`} placeholder=" " value={firstName} onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: undefined })) }} />
            <label htmlFor="fn" className="input-label">First Name *</label>
            {errors.firstName && <div className="error-text">{errors.firstName}</div>}
          </div>

          <div className="input-group">
            <input type="text" id="ln" className="input-field" placeholder=" " value={lastName} onChange={e => setLastName(e.target.value)} />
            <label htmlFor="ln" className="input-label">Last Name (Optional)</label>
          </div>

          <div className="input-group">
            <input type="text" id="desig" className={`input-field ${errors.designation ? 'input-error' : ''}`} placeholder=" " value={designation} onChange={e => { setDesignation(e.target.value); setErrors(p => ({ ...p, designation: undefined })) }} />
            <label htmlFor="desig" className="input-label">Designation *</label>
            {errors.designation && <div className="error-text">{errors.designation}</div>}
          </div>

          <div className="input-group">
            <input type="tel" id="mob" className={`input-field ${errors.mobile ? 'input-error' : ''}`} placeholder=" " value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setErrors(p => ({ ...p, mobile: undefined })) }} maxLength={10} />
            <label htmlFor="mob" className="input-label">Mobile Number *</label>
            {errors.mobile && <div className="error-text">{errors.mobile}</div>}
          </div>

          <div className="input-group">
            <input type="email" id="em" className={`input-field ${errors.email ? 'input-error' : ''}`} placeholder=" " value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }} />
            <label htmlFor="em" className="input-label">Email Address *</label>
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
        </form>
      </div>

      <div style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e as any)}>
          Complete Registration
        </button>
      </div>

      {showSideMenu && <SideMenu onClose={() => setShowSideMenu(false)} />}

      <style dangerouslySetInnerHTML={{ __html: `
        .input-group { position: relative; margin-bottom: 24px; }
        .input-field { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-primary); font-size: 15px; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: var(--primary-color); box-shadow: 0 0 0 4px rgba(226, 55, 68, 0.1); }
        .input-label { position: absolute; left: 16px; top: 14px; color: var(--text-disabled); font-size: 15px; pointer-events: none; transition: all 0.2s; }
        .input-field:focus ~ .input-label, .input-field:not(:placeholder-shown) ~ .input-label { transform: translateY(-30px) scale(0.85); color: var(--primary-color); left: 0; }
        .error-text { color: #EF4444; font-size: 12px; margin-top: 4px; font-weight: 600; }
        .input-error { border-color: #EF4444 !important; }
      `}} />
    </div>
  );
};

export default POCDetailScreen;
