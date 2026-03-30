import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, FolderKanban, Settings, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../contexts/UIContext';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPopupOpen } = useUI();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Home' },
    { id: 'leads', path: '/leads', icon: Users, label: 'Leads' },
    { id: 'projects', path: '/projects', icon: FolderKanban, label: 'Projects' },
    { id: 'account', path: '/account', icon: Settings, label: 'Account' },
  ];

  const getActiveId = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('leads') || path.includes('poc')) return 'leads';
    if (path.includes('projects')) return 'projects';
    if (path.includes('account')) return 'account';
    if (path.includes('earnings')) return 'earn';
    return '';
  };

  const activeId = getActiveId();

  if (isPopupOpen) return null; // completely hide when dialogs open

  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 24px)', maxWidth: 'var(--max-width-app)',
      display: 'flex', alignItems: 'flex-end', gap: '12px',
      zIndex: 100, padding: 0
    }}>
      {/* Left Nav Pill (Glassmorphism) */}
      <div style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.58)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderRadius: '0 22px 22px 0',
        height: '64px',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '0 8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.9) inset',
        borderTop: '1px solid rgba(255, 255, 255, 0.34)',
        borderRight: '1px solid rgba(255, 255, 255, 0.34)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.34)',
        borderLeft: 'none',
      }}>
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                position: 'relative',
                display: 'flex', flex: isActive ? 1.5 : 1,
                justifyContent: 'center', alignItems: 'center',
                height: '44px', cursor: 'pointer',
                borderRadius: '16px',
                color: isActive ? '#fff' : '#211655',
                transition: 'flex 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, #9D1680 100%)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(157, 22, 128, 0.25)'
                    }}
                  />
                )}
              </AnimatePresence>

              <Icon 
                size={isActive ? 20 : 22} 
                strokeWidth={isActive ? 2.5 : 1.8} 
                color={isActive ? '#fff' : '#211655'} 
                style={{ transition: 'all 0.3s', position: 'relative', zIndex: 2 }}
              />
              
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    position: 'relative', zIndex: 2,
                    marginLeft: '8px', fontSize: '13px', fontWeight: 800,
                    letterSpacing: '0.5px'
                  }}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Separate Earn FAB (iOS Glassmorphism) */}
      <motion.div 
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/earnings')}
        style={{
          width: '64px', height: '64px',
          background: activeId === 'earn' 
            ? 'linear-gradient(135deg, var(--primary-color) 0%, #9D1680 100%)'
            : 'linear-gradient(145deg, rgba(157, 22, 128, 0.85), rgba(33, 22, 85, 0.9))',
          backdropFilter: 'blur(20px)',
          borderRadius: '22px 0 0 22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'rgba(33, 22, 85, 0.35) 0px 8px 32px, rgba(255, 255, 255, 0.15) 0px 1.5px 0px inset',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
          cursor: 'pointer', color: '#fff', flexShrink: 0
        }} 
      >
        <IndianRupee size={24} strokeWidth={2.5} />
      </motion.div>
    </div>
  );
};

export default BottomNavigation;
