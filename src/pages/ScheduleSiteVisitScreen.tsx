import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation } from 'lucide-react';

const ScheduleSiteVisitScreen: React.FC = () => {
  const navigate = useNavigate();

  // Form State for Site Visit
  const [visitForm, setVisitForm] = useState({ fn: '', ln: '', email: '', mobile: '', project: '', datetime: '' });

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.fn || !visitForm.mobile || !visitForm.project) {
      alert("Please fill required fields (Name, Mobile, Project)");
      return;
    }

    // Simulate success
    alert("Site Visit Scheduled Successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="flex-column fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      
      {/* Header */}
      <header style={{ padding: 'var(--spacing-md) var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--surface-color)', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Schedule Visit</h1>
      </header>

      <main style={{ padding: 'var(--spacing-xl) var(--spacing-lg)', paddingBottom: '120px' }}>
        
        {/* Hero Area */}
        <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(45, 156, 219, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-md)' }}>
            <Navigation size={32} color="var(--primary-color)" />
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Book a Site Visit</h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Schedule a guided tour of our premium properties for your clients.</p>
        </div>

        {/* Form Card */}
        <div className="card slide-up" style={{ padding: 'var(--spacing-xl) var(--spacing-lg)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
          <form className="flex-column" onSubmit={handleVisitSubmit}>
            
            <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Client Details</h3>
            
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <div className="input-group" style={{ marginBottom: 'var(--spacing-md)', flex: 1 }}>
                <input type="text" id="svFn" className="input-field" placeholder=" " value={visitForm.fn} onChange={e => setVisitForm({...visitForm, fn: e.target.value})} required />
                <label htmlFor="svFn" className="input-label">First Name</label>
              </div>
              <div className="input-group" style={{ marginBottom: 'var(--spacing-md)', flex: 1 }}>
                <input type="text" id="svLn" className="input-field" placeholder=" " value={visitForm.ln} onChange={e => setVisitForm({...visitForm, ln: e.target.value})} />
                <label htmlFor="svLn" className="input-label">Last Name</label>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--spacing-md)' }}>
              <input type="tel" id="svMob" className="input-field" placeholder=" " value={visitForm.mobile} onChange={e => setVisitForm({...visitForm, mobile: e.target.value})} required />
              <label htmlFor="svMob" className="input-label">Mobile Number</label>
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <input type="email" id="svEmail" className="input-field" placeholder=" " value={visitForm.email} onChange={e => setVisitForm({...visitForm, email: e.target.value})} />
              <label htmlFor="svEmail" className="input-label">Email ID</label>
            </div>

            <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Visit Details</h3>

            <div className="input-group" style={{ marginBottom: 'var(--spacing-md)' }}>
              <select id="svProj" className="input-field" value={visitForm.project} onChange={e => setVisitForm({...visitForm, project: e.target.value})} style={{ appearance: 'auto', backgroundColor: 'transparent' }} required>
                <option value="" disabled></option>
                <option value="Aurora Sky">Aurora Sky (Wakad)</option>
                <option value="Oceana Ridge">Oceana Ridge (Bandra)</option>
                <option value="The Zenith">The Zenith (Worli)</option>
              </select>
              <label htmlFor="svProj" className="input-label">Select Project</label>
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <input type="datetime-local" id="svDate" className="input-field" value={visitForm.datetime} onChange={e => setVisitForm({...visitForm, datetime: e.target.value})} required />
              <label htmlFor="svDate" className="input-label">Date & Time</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '16px', padding: '16px', borderRadius: '16px', fontWeight: 800, boxShadow: '0 8px 16px rgba(45, 156, 219, 0.25)' }}>
              Confirm Schedule
            </button>
          </form>
        </div>

      </main>
    </div>
  );
};

export default ScheduleSiteVisitScreen;
