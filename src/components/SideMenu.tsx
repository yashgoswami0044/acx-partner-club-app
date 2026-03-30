import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  House, Users, FolderKanban, Trophy, Wallet, CalendarDays, 
  Star, Shield, CircleHelp, ChevronRight, Moon, LogOut
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

interface SideMenuProps {
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPopupOpen, setShowSideMenu, toggleDarkMode, isDarkMode } = useUI();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: House, path: '/dashboard' },
    { id: 'leads', label: 'My Leads', icon: Users, path: '/leads' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { id: 'earnings', label: 'Earnings', icon: Wallet, path: '/earnings' },
    { id: 'events', label: 'Events', icon: CalendarDays, path: '/events' },
    { id: 'rewards', label: 'Rewards', icon: Star, path: '/rewards' },
    { id: 'rera', label: 'RERA Documents', icon: Shield, path: '/rera' },
    { id: 'help', label: 'Help & Support', icon: CircleHelp, path: '/help' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
    setPopupOpen(false);
    setShowSideMenu(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex' }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{ 
          position: 'absolute', inset: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }} 
      />

      {/* Menu Sidebar */}
      <div 
        className="slide-in-left" 
        style={{ 
          position: 'absolute', width: '300px', height: '100%', 
          backgroundColor: 'var(--surface-color)', 
          borderRadius: '0px 28px 28px 0px', 
          boxShadow: 'rgba(0, 0, 0, 0.15) 12px 0px 40px', 
          display: 'flex', flexDirection: 'column', overflow: 'hidden' 
        }}
      >
        {/* Profile Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, #211655 100%)', padding: '24px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '0px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '18px', 
              backgroundColor: '#FFFFFF', padding: '3px', 
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 6px 16px' 
            }}>
              <img alt="Profile" src="https://i.pravatar.cc/150?img=11" style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>Alex Johnson</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>alex.johnson@brikkin.com</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="hide-scroll" style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <div 
                key={item.id}
                onClick={() => handleNav(item.path)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '14px', 
                  padding: '14px 16px', borderRadius: '16px', 
                  backgroundColor: isActive ? 'rgba(226, 55, 68, 0.06)' : 'transparent', 
                  cursor: 'pointer', transition: 'background 0.2s', marginBottom: '2px' 
                }}
              >
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '14px', 
                  backgroundColor: isActive ? 'rgba(226, 55, 68, 0.1)' : 'var(--bg-color)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Icon 
                    size={20} 
                    color={isActive ? 'var(--primary-color)' : '#64748b'} 
                    strokeWidth={isActive ? 2.5 : 1.5} 
                  />
                </div>
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: isActive ? 800 : 600, 
                  color: isActive ? 'var(--primary-color)' : 'var(--text-primary)', 
                  flex: 1 
                }}>
                  {item.label}
                </span>
                <ChevronRight 
                  size={16} 
                  color="#cbd5e1" 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                />
              </div>
            );
          })}
        </div>

        {/* Footer Section */}
        <div style={{ padding: '12px 16px 24px', borderTop: '1px solid var(--border-color)' }}>
          {/* Dark Mode Toggle */}
          <div 
            onClick={toggleDarkMode}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '14px', 
              padding: '14px 16px', borderRadius: '16px', 
              backgroundColor: 'var(--bg-color)', marginBottom: '8px',
              cursor: 'pointer'
            }}
          >
            <Moon size={20} color="#64748b" strokeWidth={1.5} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>Dark Mode</span>
            <div style={{ 
              width: '44px', height: '24px', borderRadius: '100px', 
              backgroundColor: isDarkMode ? 'var(--primary-color)' : 'rgb(203, 213, 225)', 
              position: 'relative', cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <div style={{ 
                width: '20px', height: '20px', borderRadius: '50%', 
                backgroundColor: 'rgb(255, 255, 255)', position: 'absolute', 
                top: '2px', left: isDarkMode ? '22px' : '2px', 
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
                transition: 'left 0.2s'
              }} />
            </div>
          </div>

          {/* Logout */}
          <div 
            onClick={() => { /* Handle Logout */ onClose(); setPopupOpen(false); setShowSideMenu(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '16px', cursor: 'pointer' }}
          >
            <LogOut size={20} color="#ef4444" strokeWidth={1.5} />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444' }}>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
