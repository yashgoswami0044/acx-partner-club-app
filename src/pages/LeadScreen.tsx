import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, ChevronRight, Menu,
  SlidersHorizontal, X, MapPin, CalendarDays, 
  User, MessageSquare, Briefcase, FileCheck
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

// Mock Lead Data
const mockLeads = [
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul.s@example.com', project: 'Aurora Sky Residences', configuration: '3 BHK', status: 'Site Visit', date: 'Oct 24, 2023', time: '10:30 AM', color: '#3B82F6', budget: '₹1Cr - ₹3Cr', source: 'Facebook Ads' },
  { id: 2, name: 'Priya Patel', phone: '+91 98765 43211', email: 'priya.p@example.com', project: 'Lumina Tech Park', configuration: 'Office Space', status: 'EOI', date: 'Oct 23, 2023', time: '02:15 PM', color: '#10B981', budget: '₹50L - ₹1Cr', source: 'Website' },
  { id: 3, name: 'Amit Kumar', phone: '+91 98765 43212', email: 'amit.k@example.com', project: 'Aurora Sky Residences', configuration: '2 BHK', status: 'Booking', date: 'Oct 21, 2023', time: '11:00 AM', color: '#F59E0B', budget: '₹1Cr - ₹3Cr', source: 'Referral' },
  { id: 4, name: 'Sneha Gupta', phone: '+91 98765 43213', email: 'sneha.g@example.com', project: 'Zenith Tech Park', configuration: '4 BHK', status: 'Registration', date: 'Oct 20, 2023', time: '04:45 PM', color: '#8B5CF6', budget: '₹3Cr - ₹5Cr', source: 'Google Ads' },
  { id: 5, name: 'Vikram Singh', phone: '+91 98765 43214', email: 'vikram.s@example.com', project: 'Lumina Tech Park', configuration: 'Retail', status: 'Cancelled', date: 'Oct 18, 2023', time: '09:20 AM', color: '#EF4444', budget: '₹50L - ₹1Cr', source: 'Walk-in' },
  { id: 6, name: 'Anjali Desai', phone: '+91 98765 43215', email: 'anjali.d@example.com', project: 'Aurora Sky Residences', configuration: '1 BHK', status: 'Site Visit', date: 'Oct 15, 2023', time: '03:30 PM', color: '#3B82F6', budget: 'Under ₹50L', source: 'Facebook Ads' },
  { id: 7, name: 'Rohan Mehta', phone: '+91 98765 43216', email: 'rohan.m@example.com', project: 'Zenith Tech Park', configuration: '3 BHK', status: 'Site Visit', date: 'Oct 14, 2023', time: '01:00 PM', color: '#3B82F6', budget: '₹3Cr - ₹5Cr', source: 'Website' },
];

const TABS = ['Total', 'Site Visit', 'EOI', 'Booking', 'Registration', 'Cancelled'];

const LeadScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPopupOpen, setShowSideMenu } = useUI();
  const [activeTab, setActiveTab] = useState('Total');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesTab = activeTab === 'Total' || lead.status === activeTab;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lead.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === 'All Projects' || lead.project === selectedProject;
    
    return matchesTab && matchesSearch && matchesProject;
  });

  const hasFilters = selectedProject !== 'All Projects' || selectedBudget !== 'All Budgets';

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
              placeholder="Search customers, projects..." 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 0', fontSize: '14px', fontWeight: 600, backgroundColor: 'transparent', color: 'var(--text-primary)' }} 
            />
          </div>

          <button onClick={openSideMenu} style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '14px', cursor: 'pointer', display: 'flex' }}>
            <Menu size={20} color="var(--text-primary)" strokeWidth={2.5} />
          </button>

          <button onClick={() => toggleFilter(true)} style={{ background: hasFilters ? 'var(--primary-gradient)' : 'var(--bg-color)', color: hasFilters ? '#fff' : 'var(--text-primary)', border: `1px solid ${hasFilters ? 'transparent' : 'var(--border-color)'}`, padding: '10px', borderRadius: '14px', cursor: 'pointer', display: 'flex', position: 'relative', boxShadow: hasFilters ? '0 4px 12px rgba(157, 22, 128, 0.25)' : 'none' }}>
            <SlidersHorizontal size={20} strokeWidth={2.5} />
            {hasFilters && (
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 900, border: '2px solid var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                !
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="hide-scroll" style={{ display: 'flex', gap: '10px', padding: '14px var(--spacing-lg)', overflowX: 'auto', backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)' }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          const count = tab === 'Total' ? mockLeads.length : mockLeads.filter(l => l.status === tab).length;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ 
              padding: '10px 18px', borderRadius: '100px', 
              backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-color)',
              color: isActive ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px', fontWeight: isActive ? 800 : 600,
              cursor: 'pointer', whiteSpace: 'nowrap', border: isActive ? 'none' : '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isActive ? '0 4px 12px rgba(157, 22, 128, 0.25)' : 'none'
            }}>
              {tab}
              <span style={{ fontSize: '11px', opacity: 0.9, backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '8px' }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Lead List */}
      <div className="hide-scroll" style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg) var(--spacing-lg) 120px' }}>
        {filteredLeads.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredLeads.map((lead, idx) => (
              <div key={lead.id} className="slide-up" style={{ 
                backgroundColor: 'var(--surface-color)', 
                borderRadius: '24px', 
                padding: '20px', 
                border: '1px solid var(--border-color)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                animationDelay: `${idx * 0.08}s`,
                animationFillMode: 'both',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '52px', height: '52px', borderRadius: '16px', 
                      background: `linear-gradient(135deg, ${lead.color} 0%, ${lead.color}dd 100%)`,
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', fontWeight: 900,
                      boxShadow: `0 8px 16px ${lead.color}25`
                    }}>
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{lead.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>
                        <MapPin size={13} color="var(--primary-color)" />
                        {lead.project}
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '6px 12px', borderRadius: '10px', 
                    backgroundColor: `${lead.status === 'Cancelled' ? '#EF444415' : lead.color + '15'}`,
                    color: lead.status === 'Cancelled' ? '#EF4444' : lead.color,
                    fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.6px'
                  }}>
                    {lead.status}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '14px', backgroundColor: 'var(--bg-color)', borderRadius: '18px', marginBottom: '18px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                      <Briefcase size={14} color="var(--primary-color)" />
                    </div>
                    <div>
                      <p style={{ margin: '0', fontSize: '10px', color: 'var(--text-disabled)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Config</p>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{lead.configuration}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                      <FileCheck size={14} color="var(--primary-color)" />
                    </div>
                    <div>
                      <p style={{ margin: '0', fontSize: '10px', color: 'var(--text-disabled)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Budget</p>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{lead.budget}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>
                      <CalendarDays size={14} strokeWidth={2.5} />
                      {lead.date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <MessageSquare size={16} color="var(--text-secondary)" />
                    </button>
                    <button onClick={() => navigate(`/poc-detail`)} style={{ padding: '0 14px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(157, 22, 128, 0.08)', border: 'none', color: 'var(--primary-color)', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      View Full UX
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '35px', backgroundColor: 'var(--surface-color)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <User size={40} color="var(--text-disabled)" />
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Empty List</h3>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>No leads found for "{activeTab}" or matching your search criteria.</p>
          </div>
        )}
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
            boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '5px', borderRadius: '100px', backgroundColor: 'var(--border-color)' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>Filter Leads</h2>
              <button onClick={() => toggleFilter(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}>
                <X size={22} color="var(--text-primary)" />
              </button>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>By Project</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['All Projects', 'Aurora Sky Residences', 'Lumina Tech Park', 'Zenith Tech Park'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setSelectedProject(p)}
                    style={{ 
                      padding: '12px 18px', borderRadius: '14px', border: '1px solid var(--border-color)',
                      backgroundColor: selectedProject === p ? 'var(--primary-color)' : 'var(--bg-color)',
                      color: selectedProject === p ? '#fff' : 'var(--text-secondary)',
                      fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Budget Range</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['All Budgets', 'Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹3Cr', '₹3Cr - ₹5Cr', 'Above ₹5Cr'].map(b => (
                  <button 
                    key={b} 
                    onClick={() => setSelectedBudget(b)}
                    style={{ 
                      padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)',
                      backgroundColor: selectedBudget === b ? 'var(--primary-color)' : 'var(--bg-color)',
                      color: selectedBudget === b ? '#fff' : 'var(--text-secondary)',
                      fontSize: '13px', fontWeight: 700, cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s'
                    }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button 
                onClick={() => { setSelectedProject('All Projects'); setSelectedBudget('All Budgets'); }}
                style={{ flex: 1, padding: '18px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}>
                Clear All
              </button>
              <button 
                onClick={() => toggleFilter(false)}
                style={{ flex: 2, padding: '18px', borderRadius: '18px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 24px rgba(157, 22, 128, 0.3)' }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadScreen;
