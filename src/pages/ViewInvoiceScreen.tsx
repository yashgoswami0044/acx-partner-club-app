import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2, FileText, Copy } from 'lucide-react';

const mockInvoiceMap: Record<string, any> = {
  '3': {
    status: 'Approved',
    invoiceNo: 'INV-2023-142',
    date: 'Oct 10, 2023',
    customerName: 'Amit Kumar',
    project: 'Aurora Sky Residences',
    unit: 'Unit A-105',
    gross: '₹7,50,000',
    tds: '₹37,500',
    netPayable: '₹7,12,500',
    bankLabel: 'HDFC Bank - **** 4589',
    accName: 'Alex Johnson',
    ifsc: 'HDFC0001234'
  },
  '4': {
    status: 'Paid',
    invoiceNo: 'INV-2023-089',
    date: 'Jun 20, 2023',
    customerName: 'Sneha Gupta',
    project: 'Zenith Tech Park',
    unit: 'Office Space - 402',
    gross: '₹11,25,000',
    tds: '₹56,250',
    netPayable: '₹10,68,750',
    bankLabel: 'SBI - **** 9921',
    accName: 'Alex Johnson',
    ifsc: 'SBIN0004321'
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return '#F59E0B';
    case 'Submitted': return '#3B82F6';
    case 'Accepted': return '#8B5CF6';
    case 'Approved': return '#10B981';
    case 'Paid': return '#059669';
    default: return '#64748B';
  }
};

const ViewInvoiceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Provide robust fallback to ensure it renders if ID doesn't match mock
  const inv = mockInvoiceMap[id || ''] || mockInvoiceMap['3'];
  const sColor = getStatusColor(inv.status);

  return (
    <div className="flex-column fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative' }}>

      {/* Header */}
      <header style={{ padding: 'var(--spacing-md) var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--surface-color)', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', flex: 1 }}>Invoice Details</h1>
        <div style={{
          backgroundColor: `${sColor}15`, color: sColor,
          padding: '6px 12px', borderRadius: '8px', border: `1px solid ${sColor}`,
          fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>{inv.status}</div>
      </header>

      <main style={{ padding: 'var(--spacing-lg) var(--spacing-lg)', paddingBottom: '140px' }}>

        {/* Document Banner */}
        <div className="slide-up" style={{ backgroundColor: 'var(--surface-color)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)', marginBottom: '24px' }}>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <FileText size={28} color="#3B82F6" strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Invoice No.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{inv.invoiceNo}</h2>
                 <button style={{ border: 'none', background: 'none', padding: '4px', cursor: 'pointer', color: 'var(--text-disabled)', display: 'flex' }}><Copy size={14} /></button>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Date: {inv.date}</p>
            </div>
          </div>

          <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Billed For</p>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{inv.customerName}</h3>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{inv.project} — {inv.unit}</p>
        </div>

        {/* Financial Details */}
        <div className="slide-up" style={{ animationDelay: '0.1s', backgroundColor: 'var(--surface-color)', borderRadius: '20px', padding: '20px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Financial Breakdown</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <span>Gross Brokerage</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{inv.gross}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <span>TDS Deduction (5%)</span>
            <span style={{ color: '#EF4444', fontWeight: 700 }}>- {inv.tds}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Net Payable</span>
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#10B981', letterSpacing: '-0.5px' }}>{inv.netPayable}</span>
          </div>
        </div>

        {/* Bank Information Details */}
        <div className="slide-up" style={{ animationDelay: '0.2s', backgroundColor: 'var(--surface-color)', borderRadius: '20px', padding: '20px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Remittance Account</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Account Name</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{inv.accName}</p>
             </div>
             <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Bank</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{inv.bankLabel}</p>
             </div>
             <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>IFSC</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{inv.ifsc}</p>
             </div>
          </div>
        </div>

      </main>

      {/* Floating Action Bar */}
      <div className="slide-up" style={{ animationDelay: '0.3s', position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', padding: '12px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', gap: '12px', zIndex: 100 }}>

         <button style={{
            flex: 1, padding: '14px', borderRadius: '14px',
            border: '2px solid var(--primary-color)', background: 'transparent',
            color: 'var(--primary-color)', fontSize: '15px', fontWeight: 800,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <Download size={18} strokeWidth={2.5} /> Download PDF
         </button>

         <button style={{
            flex: 1, padding: '14px', borderRadius: '14px',
            border: 'none', background: 'linear-gradient(135deg, var(--primary-color) 0%, #9D1680 100%)',
            color: '#fff', fontSize: '15px', fontWeight: 800,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 8px 16px rgba(157, 22, 128, 0.25)'
          }}>
            <Share2 size={18} strokeWidth={2.5} /> Share Invoice
         </button>

      </div>

    </div>
  );
};

export default ViewInvoiceScreen;
