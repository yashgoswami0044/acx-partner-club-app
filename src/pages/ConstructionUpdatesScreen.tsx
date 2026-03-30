import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, ChevronDown, Menu, Home, Users, FolderKanban, Trophy, Wallet, CalendarDays, Star, Shield, HelpCircle, ChevronRight, Moon, LogOut } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

const ConstructionUpdatesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPopupOpen, toggleDarkMode } = useUI();
  const { id: _id } = useParams();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const projectName = 'Aurora Sky Residences';
  const progress = 45;

  const updates = [
    { date: 'Mar 2026', title: '12th Floor Slab Completed', desc: 'Structure work for Tower A reached the 12th floor. All structural columns and beams have been cast with M40 grade concrete. Quality inspections passed successfully.', status: 'completed', images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=280&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=280&fit=crop'] },
    { date: 'Jan 2026', title: '10th Floor Slab Work', desc: 'Slab casting for 10th floor completed.', status: 'completed', images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=280&fit=crop'] },
    { date: 'Nov 2025', title: 'Plumbing & Electrical Work', desc: 'MEP (Mechanical, Electrical, Plumbing) work started.', status: 'completed', images: [] }
  ];

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
      {/* Top Bar */}
      <div style={{ padding: '16px var(--spacing-lg) 12px', backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer', display: 'flex', backgroundColor: 'rgba(0,0,0,0.04)', flexShrink: 0 }}>
            <ArrowLeft size={20} strokeWidth={2} color="var(--text-primary)" />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>Construction Updates</h1>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{projectName}</p>
          </div>
        </div>
        <button onClick={() => { setShowSideMenu(true); setPopupOpen(true); }} style={{ background: 'none', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer', display: 'flex', backgroundColor: 'rgba(0,0,0,0.04)', flexShrink: 0 }}>
          <Menu size={20} strokeWidth={2} color="var(--text-primary)" />
        </button>
      </div>

      <div className="hide-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: '40px' }}>
        {/* Progress Header Card */}
        <div style={{ padding: 'var(--spacing-lg)' }}>
          <div style={{ padding: '18px 20px', borderRadius: '18px', background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Overall Progress</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{progress}%</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <CheckCircle2 size={14} color="#10B981" /> <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>On Track</span>
              </div>
            </div>
            <div style={{ height: '8px', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div style={{ height: '100%', borderRadius: '100px', background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)', width: `${progress}%`, transition: 'width 1s ease-out' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{updates.length} Updates</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Latest: {updates[0].date}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            <div style={{ position: 'absolute', left: '9px', top: '12px', bottom: '12px', width: '2px', background: 'linear-gradient(to bottom, #10B981 0%, var(--border-color) 20%, var(--border-color) 100%)' }} />
            {updates.map((update, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <div key={idx} style={{ marginBottom: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-28px', top: '18px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: idx === 0 ? '#10B981' : 'var(--surface-color)', border: idx === 0 ? '3px solid rgba(16, 185, 129, 0.25)' : '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    {idx === 0 ? <CheckCircle2 size={20} color="#fff" fill="#10B981" /> : <Clock size={16} color="var(--text-disabled)" />}
                  </div>
                  <div onClick={() => setExpandedIdx(isExpanded ? null : idx)} style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--surface-color)', border: idx === 0 ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-color)', boxShadow: idx === 0 ? '0 4px 16px rgba(16, 185, 129, 0.08)' : '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isExpanded ? '10px' : '0' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: idx === 0 ? '#10B981' : 'var(--primary-color)', textTransform: 'uppercase' }}>{idx === 0 ? '● Latest' : ''} {update.date}</span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{update.title}</div>
                      </div>
                      <ChevronDown size={18} color="var(--text-disabled)" style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </div>
                    {isExpanded && (
                      <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>{update.desc}</div>
                        {update.images && update.images.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {update.images.map((img, imgIdx) => (
                              <div key={imgIdx} style={{ width: `calc(50% - 4px)`, height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                <img src={img} alt="Update" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showSideMenu && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex' }} onClick={() => { setShowSideMenu(false); setPopupOpen(false); }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div className="slide-in-left" onClick={e => e.stopPropagation()} style={{ position: 'absolute', width: '300px', height: '100%', backgroundColor: 'var(--surface-color)', borderRadius: '0 28px 28px 0', boxShadow: '12px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, #211655 100%)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" style={{ width: '56px', height: '56px', borderRadius: '15px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#fff' }}>Alex Johnson</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>alex.johnson@brikkin.com</p>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              {[{ icon: Home, label: 'Dashboard', path: '/dashboard' }, { icon: FolderKanban, label: 'Projects', path: '/projects' }, { icon: Wallet, label: 'Earnings', path: '/earnings' }].map(({ icon: Icon, label, path }, idx) => (
                <div key={idx} onClick={() => { if(path) { navigate(path); setShowSideMenu(false); setPopupOpen(false); } }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', cursor: 'pointer' }}>
                  <Icon size={20} color="var(--text-secondary)" /> <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
              <div onClick={toggleDarkMode} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px' }}>
                <Moon size={20} color="var(--text-primary)" /> <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Toggle Dark Mode</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in-left { animation: slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}} />
    </div>
  );
};

export default ConstructionUpdatesScreen;
