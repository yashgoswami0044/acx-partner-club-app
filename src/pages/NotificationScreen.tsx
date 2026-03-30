import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft } from 'lucide-react';

const NotificationScreen: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Welcome to ACX!', message: 'Your profile has been created successfully.', time: '2m ago', isRead: false },
    { id: 2, title: 'Document Verification', message: 'Your submitted RERA and PAN are under review.', time: '1h ago', isRead: false },
    { id: 3, title: 'New Launch Alert', message: 'ACX Heights phase 2 is now open for partnering.', time: '2d ago', isRead: true },
  ];

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <header className="app-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', marginRight: '32px', fontSize: '18px' }}>Notifications</h2>
      </header>

      <div style={{ padding: 'var(--spacing-md)', flex: 1, overflowY: 'auto' }}>
        {notifications.map((notif, idx) => (
          <div 
            key={notif.id} 
            className="slide-up" 
            style={{ 
              animationDelay: `${idx * 0.1}s`, opacity: 0, animationFillMode: 'forwards',
              backgroundColor: 'var(--surface-color)', 
              padding: 'var(--spacing-md)', 
              borderRadius: 'var(--border-radius-md)', 
              marginBottom: 'var(--spacing-md)',
              borderLeft: notif.isRead ? 'none' : '4px solid var(--primary-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h4 style={{ fontSize: '16px', margin: 0 }}>{notif.title}</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-disabled)' }}>{notif.time}</span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{notif.message}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--text-disabled)' }}>
          <Bell size={32} opacity={0.5} style={{ marginBottom: 'var(--spacing-sm)' }} />
          <p>That's all your notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
