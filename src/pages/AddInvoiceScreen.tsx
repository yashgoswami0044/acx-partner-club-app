import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, IndianRupee, CheckCircle2, Building2 } from 'lucide-react';

// Basic mock data to populate read-only summary based on URL param
const mockEarningsMap: Record<string, any> = {
  '1': { customerName: 'Rahul Sharma', project: 'Aurora Sky Residences', unit: 'Unit B-402', gross: '₹3,00,000', netPayable: '₹2,85,000' }
};

const AddInvoiceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [form, setForm] = useState({
    invoiceNo: '', 
    date: '', 
    accountName: 'Rahul Sharma', 
    bankName: 'HDFC Bank', 
    accountNumber: '50100234567890', 
    ifsc: 'HDFC0001234'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const earning = mockEarningsMap[id || ''] || mockEarningsMap['1']; // Fallback for mocking

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.invoiceNo || !form.date || !form.accountNumber) return;

    // Simulate backend submission success
    setShowSuccess(true);
    setTimeout(() => {
      // Navigate safely only if still on this screen
      navigate(-1); 
    }, 4500);
  };

  return (
    <div className="flex-column fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      
      {/* Header */}
      <header style={{ padding: 'var(--spacing-md) var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--surface-color)', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Submit Invoice</h1>
      </header>

      <main style={{ padding: 'var(--spacing-lg) var(--spacing-lg)', paddingBottom: '120px' }}>
        
        {/* Context Summary Card */}
        <div className="slide-up" style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', marginBottom: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
             <Building2 size={16} color="var(--primary-color)" />
             <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{earning.project} <span style={{ color: 'var(--text-disabled)', fontWeight: 500 }}>•</span> {earning.unit}</span>
          </div>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{earning.customerName}</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
             <div>
               <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Net Brokerage Payable</p>
               <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#10B981', letterSpacing: '-0.5px' }}>{earning.netPayable}</h3>
             </div>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndianRupee size={20} color="#10B981" strokeWidth={2.5} />
             </div>
          </div>
        </div>

        {/* Invoice Form */}
        <form className="flex-column slide-up" style={{ animationDelay: '0.1s' }} onSubmit={handleSubmit}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Invoice Details</h3>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <div className="input-group" style={{ marginBottom: 'var(--spacing-md)', flex: 1 }}>
              <input type="text" id="invNo" className="input-field" placeholder=" " value={form.invoiceNo} onChange={e => setForm({...form, invoiceNo: e.target.value})} required />
              <label htmlFor="invNo" className="input-label">Invoice Number</label>
            </div>
            <div className="input-group" style={{ marginBottom: 'var(--spacing-md)', flex: 1 }}>
              <input type="date" id="invDate" className="input-field" placeholder=" " value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
              <label htmlFor="invDate" className="input-label" style={{ top: '-10px', fontSize: '12px', background: 'var(--surface-color)', padding: '0 4px' }}>Invoice Date</label>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
             <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Upload Invoice Copy</p>
             <div style={{ padding: '32px 20px', borderRadius: '16px', border: '2px dashed var(--border-color)', backgroundColor: 'rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                 <UploadCloud size={24} color="#3B82F6" strokeWidth={2} />
               </div>
               <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Tap to browse PDF/Images</p>
               <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-disabled)' }}>Max file size 5MB</p>
             </div>
          </div>

          <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Bank Information</h3>
          
          <div className="input-group" style={{ marginBottom: 'var(--spacing-md)' }}>
            <input type="text" id="accName" className="input-field" placeholder=" " value={form.accountName} onChange={e => setForm({...form, accountName: e.target.value})} required />
            <label htmlFor="accName" className="input-label">Name on Account</label>
          </div>

          <div className="input-group" style={{ marginBottom: 'var(--spacing-md)' }}>
            <input type="text" id="bankName" className="input-field" placeholder=" " value={form.bankName} onChange={e => setForm({...form, bankName: e.target.value})} required />
            <label htmlFor="bankName" className="input-label">Bank Name</label>
          </div>

          <div className="input-group" style={{ marginBottom: 'var(--spacing-md)' }}>
            <input type="text" id="accNumber" className="input-field" placeholder=" " value={form.accountNumber} onChange={e => setForm({...form, accountNumber: e.target.value})} required />
            <label htmlFor="accNumber" className="input-label">Account Number</label>
          </div>

          <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <input type="text" id="ifscCode" className="input-field" placeholder=" " value={form.ifsc} onChange={e => setForm({...form, ifsc: e.target.value})} required />
            <label htmlFor="ifscCode" className="input-label">IFSC Code</label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '15px', padding: '16px', borderRadius: '16px', fontWeight: 800, boxShadow: '0 8px 16px rgba(157, 22, 128, 0.25)' }}>
            Submit Invoice
          </button>
        </form>

      </main>

      {/* Success Overlay with Framer Motion UI */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          >
            {/* Glowing background aura */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.15 }} transition={{ duration: 1, type: 'spring' }}
              style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, #10B981 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} 
            />

            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
              style={{ backgroundColor: 'var(--surface-color)', padding: '40px 32px', borderRadius: '32px', textAlign: 'center', maxWidth: '340px', width: '90%', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(16, 185, 129, 0.1) inset', position: 'relative', zIndex: 2 }}
            >
              {/* Animated checkmark container */}
              <motion.div 
                initial={{ scale: 0, rotate: -45 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.2 }}
                style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3), 0 0 0 8px rgba(16, 185, 129, 0.1)' }}
              >
                <CheckCircle2 size={44} color="#fff" strokeWidth={2.5} />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={{ margin: '0 0 12px 0', fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}
              >
                Invoice Sent!
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ margin: '0 0 28px 0', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}
              >
                Your invoice <strong>{form.invoiceNo || 'INV-XXX'}</strong> for <strong style={{color: '#10B981'}}>{earning.netPayable}</strong> is now pending verification.
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                onClick={() => { setShowSuccess(false); navigate(-1); }}
                style={{ padding: '16px', width: '100%', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 800, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              >
                Back to Earnings
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AddInvoiceScreen;
