import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, SlidersHorizontal, Menu,
  ChevronDown, ChevronUp, FileText, Share2, Plus,
  CheckCircle2, MapPin, X, TrendingUp
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

// Mock Data
const mockEarnings = [
  { id: 1, customerName: 'Rahul Sharma', project: 'Aurora Sky Residences', unit: 'Unit B-402', status: 'Pending', bookingDate: 'Oct 05, 2023', registrationDate: 'Oct 15, 2023', agreementValue: '₹1.2Cr', brokerageSlab: '2.5%', brokerageAmount: '₹3,00,000', tdsAmount: '₹15,000', netPayable: '₹2,85,000', brokeragePaid: '₹0', lastUpdate: 'Oct 24, 2023 10:30 AM', color: '#F59E0B' },
  { id: 2, customerName: 'Priya Patel', project: 'Lumina Tech Park', unit: 'Retail Space - G12', status: 'Submitted', bookingDate: 'Sep 10, 2023', registrationDate: 'Sep 25, 2023', agreementValue: '₹85L', brokerageSlab: '2.0%', brokerageAmount: '₹1,70,000', tdsAmount: '₹8,500', netPayable: '₹1,61,500', brokeragePaid: '₹0', lastUpdate: 'Oct 22, 2023 04:15 PM', color: '#3B82F6' },
  { id: 3, customerName: 'Amit Kumar', project: 'Aurora Sky Residences', unit: 'Unit A-105', status: 'Approved', bookingDate: 'Aug 20, 2023', registrationDate: 'Sep 05, 2023', agreementValue: '₹2.5Cr', brokerageSlab: '3.0%', brokerageAmount: '₹7,50,000', tdsAmount: '₹37,500', netPayable: '₹7,12,500', brokeragePaid: '₹0', lastUpdate: 'Oct 20, 2023 11:00 AM', color: '#8B5CF6' },
  { id: 4, customerName: 'Sneha Gupta', project: 'Zenith Tech Park', unit: 'Office Space - 402', status: 'Paid', bookingDate: 'Jun 15, 2023', registrationDate: 'Jul 01, 2023', agreementValue: '₹4.5Cr', brokerageSlab: '2.5%', brokerageAmount: '₹11,25,000', tdsAmount: '₹56,250', netPayable: '₹10,68,750', brokeragePaid: '₹10,68,750', lastUpdate: 'Oct 15, 2023 09:20 AM', color: '#10B981' },
];

const TABS = ['Total', 'Pending', 'Submitted', 'Approved', 'Paid'];
const STATUS_STAGES = ['Pending', 'Submitted', 'Accepted', 'Approved', 'Paid'];

const getStatusColor = (status: string) => {
  const map: Record<string, string> = { 'Pending':'#F59E0B', 'Submitted':'#3B82F6', 'Accepted':'#8B5CF6', 'Approved':'#10B981', 'Paid':'#059669' };
  return map[status] || '#64748B';
};

const EarningsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPopupOpen, setShowSideMenu } = useUI();
  const [activeTab, setActiveTab] = useState('Total');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const filteredEarnings = mockEarnings.filter(e => {
    const matchesTab = activeTab === 'Total' || e.status === activeTab;
    const matchesSearch = e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleFilter = (val: boolean) => {
    setShowFilter(val);
    setPopupOpen(val);
  };

  const openSideMenu = () => {
    setShowSideMenu(true);
    setPopupOpen(true);
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ 
        padding: '16px var(--spacing-lg) 12px', 
        backgroundColor: 'var(--surface-color)', 
        borderBottom: '1px solid var(--border-color)', 
        position: 'relative', zIndex: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button onClick={() => navigate(-1)} style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '14px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="var(--text-primary)" strokeWidth={2.5} />
          </button>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--bg-color)', borderRadius: '16px', padding: '0 16px', border: '1px solid var(--border-color)', transition: 'all 0.3s' }}>
            <Search size={18} color="var(--text-disabled)" strokeWidth={2.5} />
            <input 
              placeholder="Search by customer or project..." 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 0', fontSize: '14px', fontWeight: 600, backgroundColor: 'transparent', color: 'var(--text-primary)' }} 
            />
          </div>

          <button onClick={openSideMenu} style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '14px', cursor: 'pointer', display: 'flex' }}>
            <Menu size={20} color="var(--text-primary)" strokeWidth={2.5} />
          </button>

          <button onClick={() => toggleFilter(true)} style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '14px', cursor: 'pointer', display: 'flex' }}>
            <SlidersHorizontal size={20} color="var(--text-primary)" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="hide-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        
        {/* Earnings Overview Card */}
        <div style={{ padding: '24px var(--spacing-lg)' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
            borderRadius: '32px', 
            padding: '24px', 
            color: '#fff', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', backgroundColor: 'rgba(157, 22, 128, 0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
               <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Pipeline Earning</p>
                  <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 900, letterSpacing: '-1px' }}>₹23.45 <span style={{ fontSize: '20px', opacity: 0.8 }}>Lac</span></h2>
               </div>
               <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
                  <TrendingUp size={16} strokeWidth={3} />
                  <span style={{ fontSize: '12px', fontWeight: 900 }}>+12%</span>
               </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <div>
                 <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Received</p>
                 <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#10B981' }}>₹10.68L</h4>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Due Amount</p>
                 <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#F59E0B' }}>₹12.76L</h4>
               </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="hide-scroll" style={{ display: 'flex', gap: '10px', padding: '0 var(--spacing-lg)', overflowX: 'auto', marginBottom: '24px' }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ 
                padding: '10px 20px', borderRadius: '100px', 
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-color)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                fontSize: '13px', fontWeight: isActive ? 800 : 600,
                cursor: 'pointer', whiteSpace: 'nowrap', border: isActive ? 'none' : '1px solid var(--border-color)',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 6px 16px rgba(157, 22, 128, 0.25)' : 'none'
              }}>
                {tab}
              </button>
            );
          })}
        </div>

        {/* Earnings List */}
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          {filteredEarnings.map((item, idx) => {
            const isExpanded = expandedCardId === item.id;
            const statusColor = getStatusColor(item.status);
            const currentStageIdx = STATUS_STAGES.indexOf(item.status);
            
            return (
              <div key={item.id} className="slide-up" style={{ 
                backgroundColor: 'var(--surface-color)', 
                borderRadius: '28px', 
                border: '1px solid var(--border-color)', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)', 
                overflow: 'hidden', 
                marginBottom: '20px',
                animationDelay: `${idx * 0.1}s`
              }}>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{item.customerName}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>
                        <MapPin size={14} color="var(--primary-color)" /> 
                        {item.project}
                      </div>
                    </div>
                    <div style={{ backgroundColor: `${statusColor}15`, color: statusColor, padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.status}
                    </div>
                  </div>

                  {/* Visual Timeline Wrapper */}
                  <div style={{ margin: '24px 0', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: `${Math.max(0, (currentStageIdx / (STATUS_STAGES.length - 1)) * 100 - 5)}%`, height: '2px', backgroundColor: statusColor, zIndex: 1, transition: 'all 0.5s ease-in-out' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                      {STATUS_STAGES.map((stage, sIdx) => {
                        const isCompleted = sIdx <= currentStageIdx;
                        return (
                          <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              width: '22px', height: '22px', borderRadius: '50%', 
                              backgroundColor: isCompleted ? statusColor : 'var(--bg-color)', 
                              border: isCompleted ? 'none' : '2px solid var(--border-color)', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: isCompleted ? `0 4px 10px ${statusColor}40` : 'none',
                              transition: 'all 0.3s'
                            }}>
                              {isCompleted && <CheckCircle2 size={14} color="#fff" strokeWidth={3} />}
                            </div>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: isCompleted ? 'var(--text-primary)' : 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{stage}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '16px', borderRadius: '18px',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 800, display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>Net Payable</span>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary-color)' }}>{item.netPayable}</span>
                    </div>
                    <button onClick={() => setExpandedCardId(isExpanded ? null : item.id)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isExpanded ? 'Show Less' : 'View Breakdown'} {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 24px 24px', backgroundColor: 'var(--surface-color)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px', padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                      <div><span style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 800, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Agreement Value</span><span style={{ fontSize: '14px', fontWeight: 800 }}>{item.agreementValue}</span></div>
                      <div><span style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 800, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Brokerage Slab</span><span style={{ fontSize: '14px', fontWeight: 800 }}>{item.brokerageSlab}</span></div>
                      <div><span style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 800, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Unit Info</span><span style={{ fontSize: '14px', fontWeight: 800 }}>{item.unit}</span></div>
                      <div><span style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 800, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Reg. Date</span><span style={{ fontSize: '14px', fontWeight: 800 }}>{item.registrationDate}</span></div>
                    </div>
                    
                    <div style={{ marginTop: '20px', padding: '16px', borderRadius: '18px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>TDS Deducted (Est)</span><span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 800 }}>- {item.tdsAmount}</span></div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed rgba(16, 185, 129, 0.2)' }}><span style={{ fontSize: '15px', fontWeight: 900 }}>Total Received</span><span style={{ fontSize: '15px', fontWeight: 900, color: '#10B981' }}>{item.brokeragePaid}</span></div>
                    </div>
                  </div>
                )}

                <div style={{ padding: '0 24px 24px', display: 'flex', gap: '12px' }}>
                  {item.status === 'Pending' ? (
                    <button onClick={() => navigate(`/add-invoice/${item.id}`)} style={{ 
                      flex: 1, height: '52px', borderRadius: '16px', border: 'none', 
                      background: 'var(--primary-gradient)', color: '#fff', 
                      fontSize: '15px', fontWeight: 900, cursor: 'pointer', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                      boxShadow: '0 10px 20px rgba(157, 22, 128, 0.3)' 
                    }}>
                      <Plus size={18} strokeWidth={3} /> Raise Invoice
                    </button>
                  ) : (
                    <>
                      <button onClick={() => navigate(`/view-invoice/${item.id}`)} style={{ 
                        flex: 1, height: '52px', borderRadius: '16px', 
                        border: '1px solid var(--primary-color)', background: 'transparent', 
                        color: 'var(--primary-color)', fontSize: '15px', fontWeight: 900, 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
                      }}>
                        <FileText size={18} strokeWidth={2.5} /> View Invoice
                      </button>
                      <button style={{ 
                        width: '52px', height: '52px', borderRadius: '16px', 
                        border: '1px solid var(--border-color)', background: 'var(--bg-color)', 
                        color: 'var(--text-secondary)', cursor: 'pointer', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                      }}>
                        <Share2 size={18} strokeWidth={2.5}/>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      {showFilter && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => toggleFilter(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} />
          <div className="slide-up" style={{ 
            width: '100%', maxWidth: 'var(--max-width-app)', 
            backgroundColor: 'var(--surface-color)', borderRadius: '32px 32px 0 0', 
            padding: '24px var(--spacing-lg) 40px', maxHeight: '85vh', overflowY: 'auto',
            position: 'relative', zIndex: 1,
            boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '5px', borderRadius: '100px', backgroundColor: 'var(--border-color)' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>Filters</h2>
              <button onClick={() => toggleFilter(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}>
                <X size={22} color="var(--text-primary)" />
              </button>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Time Period</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['Current Month', 'Last Quarter', 'financial Year', 'Custom Range'].map(opt => (
                  <button key={opt} style={{ padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 700 }}>{opt}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button onClick={() => toggleFilter(false)} style={{ flex: 1, padding: '18px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontWeight: 800, cursor: 'pointer' }}>
                Reset
              </button>
              <button onClick={() => toggleFilter(false)} style={{ flex: 2, padding: '18px', borderRadius: '18px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 24px rgba(157, 22, 128, 0.3)' }}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsScreen;
