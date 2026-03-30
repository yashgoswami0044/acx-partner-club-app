import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, ScanLine, Loader2, CheckCircle2, Eye, RefreshCw, X } from 'lucide-react';

const RegisterCompanyScreen: React.FC = () => {
  const navigate = useNavigate();
  
  if (!sessionStorage.getItem('profileCompleted')) {
    return <Navigate to="/create-profile" replace />;
  }

  // Wizard state
  const [step, setStep] = useState(0); // 0: RERA, 1: PAN, 2: Cheque, 3: GST
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);
  
  // Step interaction states
  const [isScanning, setIsScanning] = useState(false);
  const [scannedSteps, setScannedSteps] = useState([false, false, false, false]);

  // Form Data
  // RERA
  const [reraEntityType, setReraEntityType] = useState('');
  const [reraCompanyName, setReraCompanyName] = useState('');
  const [rera, setRera] = useState('');
  const [reraState, setReraState] = useState('');
  const [reraAddress, setReraAddress] = useState('');
  const [reraStartDate, setReraStartDate] = useState('');
  const [reraEndDate, setReraEndDate] = useState('');

  // PAN
  const [pan, setPan] = useState('');
  const [panCompanyName, setPanCompanyName] = useState('');

  // Cheque
  const [chequeCompanyName, setChequeCompanyName] = useState('');
  const [chequeBank, setChequeBank] = useState('');
  const [chequeAcc, setChequeAcc] = useState('');
  const [chequeBranch, setChequeBranch] = useState('');
  const [chequeIfsc, setChequeIfsc] = useState('');
  const [chequeType, setChequeType] = useState('');

  // GST
  const [gst, setGst] = useState('');
  const [gstCompanyName, setGstCompanyName] = useState('');
  const [gstState, setGstState] = useState('');
  const [gstStatus, setGstStatus] = useState('');
  const [noGst, setNoGst] = useState(false);

  const [errors, setErrors] = useState<{rera?: string, pan?: string, cheque?: string, gst?: string, general?: string}>({});

  const handleScanCurrentTask = () => {
    setIsScanning(true);
    setTimeout(() => {
      if (step === 0) {
         setReraEntityType('Private Limited');
         setReraCompanyName('Brikkin Builders Pvt Ltd');
         setRera('P52000012345');
         setReraState('Maharashtra');
         setReraAddress('123, Tech Park, Mumbai, 400001');
         setReraStartDate('2023-01-15');
         setReraEndDate('2028-01-14');
      }
      if (step === 1) {
         setPan('ABCDE1234F');
         setPanCompanyName('Brikkin Builders Pvt Ltd');
      }
      if (step === 2) {
         setChequeCompanyName('Brikkin Builders Pvt Ltd');
         setChequeBank('HDFC Bank');
         setChequeAcc('50100234567890');
         setChequeBranch('Andheri West');
         setChequeIfsc('HDFC0001234');
         setChequeType('Current');
      }
      if (step === 3) {
         setGst('27ABCDE1234F1Z5');
         setGstCompanyName('Brikkin Builders Pvt Ltd');
         setGstState('Maharashtra');
         setGstStatus('Active');
      }
      
      setIsScanning(false);
      const newScanned = [...scannedSteps];
      newScanned[step] = true;
      setScannedSteps(newScanned);
    }, 1500);
  };

  const validateCurrentStep = () => {
    const newErrors: any = {};
    if (step === 0) {
      const reraRegex = /^[A-Z0-9]{8,15}$/i;
      if (!rera.trim()) newErrors.rera = "RERA ID is required";
      else if (!reraRegex.test(rera)) newErrors.rera = "Invalid RERA format (e.g., P52000012345)";
      if (!reraCompanyName.trim()) newErrors.general = "Company Name is required";
      if (!reraState.trim()) newErrors.general = "RERA State is required";
    }
    if (step === 1) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!pan.trim()) newErrors.pan = "Company PAN is required";
      else if (!panRegex.test(pan)) newErrors.pan = "Invalid PAN format";
      if (!panCompanyName.trim()) newErrors.general = "Company Name is required";
    }
    if (step === 2) {
      if (!chequeBank.trim()) newErrors.cheque = "Bank Name is required";
      else if (!chequeAcc.trim()) newErrors.cheque = "Account number is required";
      if (!chequeCompanyName.trim()) newErrors.general = "Company Name is required";
      if (!chequeIfsc.trim()) newErrors.general = "IFSC code is required";
    }
    if (step === 3) {
      if (!noGst) {
         const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
         if (!gst.trim()) newErrors.gst = "GST Number is required";
         else if (!gstRegex.test(gst)) newErrors.gst = "Invalid GST format";
         if (!gstCompanyName.trim()) newErrors.general = "Company Name is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      if (step < 3) {
        setStep(step + 1);
        setErrors({});
      } else {
        sessionStorage.setItem('companyRegistered', 'true');
        navigate('/contact-detail');
      }
    }
  };

  const stepTitles = ["RERA Certificate", "Company PAN", "Cancelled Cheque", "GST Certificate"];

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <header className="app-header" style={{boxShadow: 'var(--shadow-sm)'}}>
        <button className="back-button" onClick={() => (step > 0 ? setStep(step - 1) : navigate(-1))}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Register Company</h2>
      </header>
      
      {/* Progress Bar */}
      <div style={{ display: 'flex', padding: 'var(--spacing-md) var(--spacing-lg)', gap: '4px', backgroundColor: 'var(--surface-color)' }}>
        {[0, 1, 2, 3].map(s => (
          <div key={s} style={{ height: '4px', flex: 1, backgroundColor: s <= step ? 'var(--primary-color)' : 'var(--border-color)', borderRadius: '2px', transition: 'var(--transition-fast)' }} />
        ))}
      </div>

      <div style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto' }}>
        
        <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '1px' }}>Step {step + 1} of 4</p>
          <h3 style={{ fontSize: '24px', marginTop: '4px' }}>Upload {stepTitles[step]}</h3>
        </div>
        
        {!scannedSteps[step] && (
          <div className="card slide-up" style={{ textAlign: 'center', padding: 'var(--spacing-xxl) var(--spacing-lg)', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--primary-color)', backgroundColor: 'rgba(226, 55, 68, 0.02)' }}>
            <ScanLine size={48} color="var(--primary-color)" style={{ marginBottom: 'var(--spacing-md)' }} />
            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Smart Document Scanner</h4>
            <p style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
              Take a photo or upload your {stepTitles[step]} to automatically extract its details.
            </p>
            
            {step === 3 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: 'var(--spacing-xl)' }}>
                <input 
                  type="checkbox" 
                  id="noGstInit" 
                  checked={noGst} 
                  onChange={(e) => {
                    setNoGst(e.target.checked);
                    if (e.target.checked) setScannedSteps([scannedSteps[0], scannedSteps[1], scannedSteps[2], true]);
                  }} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                />
                <label htmlFor="noGstInit" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  I do not have a GST Certificate
                </label>
              </div>
            )}

            <button className="btn btn-outline" onClick={handleScanCurrentTask} disabled={isScanning}>
              {isScanning ? <Loader2 className="spin" size={20} /> : <ScanLine size={20} />}
              {isScanning ? 'Scanning Document...' : 'Upload & Scan'}
            </button>
          </div>
        )}

        {scannedSteps[step] && (
          <form className="flex-column slide-up" onSubmit={handleNextStep}>
            
            {!(step === 3 && noGst) && (
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--spacing-lg)', backgroundColor: 'rgba(52, 199, 89, 0.1)', borderColor: 'rgba(52, 199, 89, 0.2)' }}>
                <CheckCircle2 color="var(--success-color)" size={24} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--success-color)' }}>Document Scanned</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Please verify extracted details</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={() => setViewingDoc(stepTitles[step])} style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="View Document" title="View">
                    <Eye size={16} />
                  </button>
                  <button type="button" onClick={() => {
                    const newScanned = [...scannedSteps];
                    newScanned[step] = false;
                    setScannedSteps(newScanned);
                  }} style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Change Document" title="Change">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 0 && (
              <div className="card">
                <div className="input-group">
                  <input type="text" id="reraEntityType" className="input-field" placeholder=" " value={reraEntityType} onChange={e => setReraEntityType(e.target.value)} />
                  <label htmlFor="reraEntityType" className="input-label">Entity Type</label>
                </div>
                <div className="input-group">
                  <input type="text" id="reraCompanyName" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={reraCompanyName} onChange={e => { setReraCompanyName(e.target.value); setErrors(p => ({...p, general: undefined}))}} />
                  <label htmlFor="reraCompanyName" className="input-label">Company Name *</label>
                </div>
                <div className="input-group">
                  <input type="text" id="rera" className={`input-field ${errors.rera ? 'input-error' : ''}`} placeholder=" " value={rera} onChange={e => { setRera(e.target.value.toUpperCase()); setErrors(p => ({...p, rera: undefined}))}} />
                  <label htmlFor="rera" className="input-label">RERA Number *</label>
                  {errors.rera && <div className="error-text">{errors.rera}</div>}
                </div>
                <div className="input-group">
                  <input type="text" id="reraState" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={reraState} onChange={e => { setReraState(e.target.value); setErrors(p => ({...p, general: undefined}))}} />
                  <label htmlFor="reraState" className="input-label">RERA State *</label>
                </div>
                <div className="input-group">
                  <input type="text" id="reraAddress" className="input-field" placeholder=" " value={reraAddress} onChange={e => setReraAddress(e.target.value)} />
                  <label htmlFor="reraAddress" className="input-label">Registered Address</label>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: 0 }}>
                  <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                    <input type="text" id="reraStartDate" className="input-field" placeholder=" " value={reraStartDate} onChange={e => setReraStartDate(e.target.value)} onFocus={e => e.target.type = 'date'} onBlur={e => { if(!e.target.value) e.target.type = 'text'; }} />
                    <label htmlFor="reraStartDate" className="input-label">Start Date</label>
                  </div>
                  <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                    <input type="text" id="reraEndDate" className="input-field" placeholder=" " value={reraEndDate} onChange={e => setReraEndDate(e.target.value)} onFocus={e => e.target.type = 'date'} onBlur={e => { if(!e.target.value) e.target.type = 'text'; }} />
                    <label htmlFor="reraEndDate" className="input-label">End Date</label>
                  </div>
                </div>
                {errors.general && <div className="error-text" style={{ marginTop: '8px' }}>{errors.general}</div>}
              </div>
            )}

            {step === 1 && (
              <div className="card">
                <div className="input-group">
                  <input type="text" id="pan" className={`input-field ${errors.pan ? 'input-error' : ''}`} placeholder=" " value={pan} onChange={e => { setPan(e.target.value.toUpperCase()); setErrors(p => ({...p, pan: undefined}))}} maxLength={10} />
                  <label htmlFor="pan" className="input-label">Pan Number *</label>
                  {errors.pan && <div className="error-text">{errors.pan}</div>}
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <input type="text" id="panCompanyName" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={panCompanyName} onChange={e => { setPanCompanyName(e.target.value); setErrors(p => ({...p, general: undefined}))}} />
                  <label htmlFor="panCompanyName" className="input-label">Company Name *</label>
                  {errors.general && <div className="error-text">{errors.general}</div>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <div className="input-group">
                  <input type="text" id="chequeCompanyName" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={chequeCompanyName} onChange={e => { setChequeCompanyName(e.target.value); setErrors(p => ({...p, general: undefined}))}} />
                  <label htmlFor="chequeCompanyName" className="input-label">Company Name *</label>
                </div>
                <div className="input-group">
                  <input type="text" id="chqBank" className={`input-field ${errors.cheque ? 'input-error' : ''}`} placeholder=" " value={chequeBank} onChange={e => { setChequeBank(e.target.value); setErrors(p => ({...p, cheque: undefined}))}} />
                  <label htmlFor="chqBank" className="input-label">Bank Name *</label>
                </div>
                <div className="input-group">
                  <input type="text" id="chqAcc" className={`input-field ${errors.cheque ? 'input-error' : ''}`} placeholder=" " value={chequeAcc} onChange={e => { setChequeAcc(e.target.value.replace(/\D/g, '')); setErrors(p => ({...p, cheque: undefined}))}} />
                  <label htmlFor="chqAcc" className="input-label">Account Number *</label>
                  {errors.cheque && <div className="error-text">{errors.cheque}</div>}
                </div>
                <div className="input-group">
                  <input type="text" id="chqBranch" className="input-field" placeholder=" " value={chequeBranch} onChange={e => setChequeBranch(e.target.value)} />
                  <label htmlFor="chqBranch" className="input-label">Branch</label>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: 0 }}>
                  <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                    <input type="text" id="chqIfsc" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={chequeIfsc} onChange={e => { setChequeIfsc(e.target.value.toUpperCase()); setErrors(p => ({...p, general: undefined}))}} />
                    <label htmlFor="chqIfsc" className="input-label">IFSC *</label>
                  </div>
                  <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                    <select id="chqType" className="input-field" value={chequeType} onChange={e => setChequeType(e.target.value)} style={{ appearance: 'auto', backgroundColor: 'transparent' }}>
                      <option value="" disabled></option>
                      <option value="Current">Current</option>
                      <option value="Savings">Savings</option>
                    </select>
                    <label htmlFor="chqType" className="input-label" style={{ transform: chequeType ? 'translateY(-20px) scale(0.85)' : 'none' }}>Type</label>
                  </div>
                </div>
                {errors.general && <div className="error-text" style={{ marginTop: '8px' }}>{errors.general}</div>}
              </div>
            )}

            {step === 3 && (
              <div className="card">
                {noGst ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-secondary)', margin: 'var(--spacing-md) 0' }}>You have chosen to proceed without a GST Certificate.</p>
                ) : (
                  <>
                    <div className="input-group">
                      <input type="text" id="gst" className={`input-field ${errors.gst ? 'input-error' : ''}`} placeholder=" " value={gst} onChange={e => { setGst(e.target.value.toUpperCase()); setErrors(p => ({...p, gst: undefined}))}} maxLength={15} />
                      <label htmlFor="gst" className="input-label">GSTin *</label>
                      {errors.gst && <div className="error-text">{errors.gst}</div>}
                    </div>
                    <div className="input-group">
                      <input type="text" id="gstCompanyName" className={`input-field ${errors.general ? 'input-error' : ''}`} placeholder=" " value={gstCompanyName} onChange={e => { setGstCompanyName(e.target.value); setErrors(p => ({...p, general: undefined}))}} />
                      <label htmlFor="gstCompanyName" className="input-label">Company Name *</label>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--spacing-lg)' }}>
                      <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                        <input type="text" id="gstState" className="input-field" placeholder=" " value={gstState} onChange={e => setGstState(e.target.value)} />
                        <label htmlFor="gstState" className="input-label">RERA State / State</label>
                      </div>
                      <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                        <input type="text" id="gstStatus" className="input-field" placeholder=" " value={gstStatus} onChange={e => setGstStatus(e.target.value)} />
                        <label htmlFor="gstStatus" className="input-label">GSTIN Status</label>
                      </div>
                    </div>
                    {errors.general && <div className="error-text" style={{ marginBottom: 'var(--spacing-md)' }}>{errors.general}</div>}
                  </>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    id="noGst" 
                    checked={noGst} 
                    onChange={(e) => {
                      setNoGst(e.target.checked);
                      if (e.target.checked) {
                        setGst(''); setGstCompanyName(''); setGstState(''); setGstStatus('');
                        setErrors(p => ({...p, gst: undefined, general: undefined}));
                      }
                    }} 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                  />
                  <label htmlFor="noGst" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    I do not have a GST Certificate (Declaration)
                  </label>
                </div>
              </div>
            )}
            
            {/* Note: I use a spacer here because the button is contained in its own slide-up div below. */}
            <div style={{ height: '24px' }} />
          </form>
        )}
      </div>

      {scannedSteps[step] && (
        <div className="slide-up" style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
          <button className="btn btn-primary" onClick={handleNextStep}>
            {step < 3 ? 'Confirm & Next Document' : 'Finish Registration'}
          </button>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-lg)', animation: 'fade-in 0.2s ease-out' }}
          onClick={() => setViewingDoc(null)}
        >
          <div 
            style={{ backgroundColor: 'var(--surface-color)', width: '100%', maxWidth: '400px', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{viewingDoc}</h3>
              <button 
                onClick={() => setViewingDoc(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '32px', textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>
                <Eye size={48} style={{ opacity: 0.2, marginBottom: '12px' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Preview for {viewingDoc}</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.7 }}>(Mock Document Image)</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}} />
    </div>
  );
};

export default RegisterCompanyScreen;
