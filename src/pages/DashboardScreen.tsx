import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, MapPin, Trophy, 
  CheckCircle2, Wallet, FileCheck, Activity, Target, ArrowRight,
  Star, ChevronRight, Moon, CircleAlert, CalendarDays, Navigation,
  Crown
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPopupOpen, toggleDarkMode, setShowSideMenu } = useUI();
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'booking' | 'revenue'>('revenue');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => setIsScrolled(e.currentTarget.scrollTop > 30);

  const stats = [
    { label: 'Visits', value: '1,245', trend: '↑ +12%', trendUp: true, Icon: MapPin, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'EOI', value: '342', trend: '↑ +8%', trendUp: true, Icon: Target, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Registrations', value: '128', trend: '↑ +5%', trendUp: true, Icon: FileCheck, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    { label: 'Earned', value: '₹4.5M', trend: '↑ +22%', trendUp: true, Icon: Trophy, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    { label: 'Received', value: '₹3.2M', trend: '₹1.1M Pend', trendUp: null, Icon: Wallet, color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)' },
    { label: 'Due', value: '₹1.3M', trend: '↓ -2%', trendUp: false, Icon: Activity, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' }
  ];

  const offers = [
    { title: 'ACX Heights', desc: 'Get extra 2% brokerage on 3BHK bookings this weekend with instant payout.', tag: 'FLASH SALE', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=300&fit=crop', bonus: '+2%', color: '#ef4444', icon: '⚡' },
    { title: 'Oceana Ridge', desc: 'Complimentary international trip for clients closing deals before month end!', tag: 'LIMITED TIME', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=300&fit=crop', bonus: 'TRIP', color: '#8B5CF6', icon: '✈️' },
    { title: 'The Zenith', desc: 'Advance 50% commission unlocked for early registrations today.', tag: 'VIP BONUS', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=300&fit=crop', bonus: '50%', color: '#F59E0B', icon: '💎' }
  ];

  const projects = [
    { id: 1, name: 'Aurora Sky', loc: 'Wakad, Pune', conf: '2 & 3 BHK', price: '85L', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop' },
    { id: 2, name: 'Oceana Ridge', loc: 'Bandra, Mumbai', conf: '3, 4 BHK', price: '4.2Cr', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop' },
    { id: 3, name: 'The Zenith', loc: 'Cyber City, Gurgaon', conf: '4 BHK Ultra', price: '7.5Cr', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=300&fit=crop' }
  ];

  const top10 = [
    { rank: 1, name: 'Rahul', img: 'https://i.pravatar.cc/150?u=11', booking: '45 Units', rev: '₹12.4 Cr', isUser: false },
    { rank: 2, name: 'Amit', img: 'https://i.pravatar.cc/150?u=12', booking: '38 Units', rev: '₹9.2 Cr', isUser: false },
    { rank: 3, name: 'Priya', img: 'https://i.pravatar.cc/150?u=13', booking: '35 Units', rev: '₹9.0 Cr', isUser: false },
    { rank: 4, name: 'Alex (You)', img: 'https://i.pravatar.cc/150?img=11', booking: '32 Units', rev: '₹8.9 Cr', isUser: true },
    { rank: 5, name: 'Vikram Singh', img: 'https://i.pravatar.cc/150?u=15', booking: '29 Units', rev: '₹7.5 Cr', isUser: false },
    { rank: 6, name: 'Neha Gupta', img: 'https://i.pravatar.cc/150?u=16', booking: '26 Units', rev: '₹6.8 Cr', isUser: false },
    { rank: 7, name: 'Sanjay Kumar', img: 'https://i.pravatar.cc/150?u=17', booking: '22 Units', rev: '₹5.9 Cr', isUser: false },
    { rank: 8, name: 'Rajiv Mehta', img: 'https://i.pravatar.cc/150?u=18', booking: '18 Units', rev: '₹5.1 Cr', isUser: false },
    { rank: 9, name: 'Kavita Joshi', img: 'https://i.pravatar.cc/150?u=19', booking: '15 Units', rev: '₹4.3 Cr', isUser: false },
    { rank: 10, name: 'Sunil Verma', img: 'https://i.pravatar.cc/150?u=20', booking: '12 Units', rev: '₹3.5 Cr', isUser: false },
  ];

  const openSideMenu = () => {
    setShowSideMenu(true);
    setPopupOpen(true);
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
      
      {/* --- ELITE HEADER --- */}
      <header className="mesh-bg" style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--primary-color) 0%, #211655 100%)',
        padding: '36px var(--spacing-lg) 26px var(--spacing-lg)',
        color: '#fff', borderBottomLeftRadius: '36px', borderBottomRightRadius: '36px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 10
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        {/* --- Top Bar: Profile & Actions --- */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: isScrolled ? '0' : '32px',
          paddingTop: '8px'
        }}>
          {/* Profile Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ cursor: 'pointer', position: 'relative' }} onClick={openSideMenu}>
              <div style={{ 
                width: '52px', height: '52px', 
                borderRadius: '50%', 
                background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.3))', 
                padding: '2px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
              }}>
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1.5px solid transparent' }} />
              </div>
              <div className="neon-glow" style={{ 
                position: 'absolute', bottom: 1, right: -1, 
                background: '#fff', borderRadius: '50%', 
                padding: '2px', width: '20px', height: '20px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 2
              }}>
                 <CheckCircle2 color="var(--primary-color)" size={14} strokeWidth={3.5} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px', marginBottom: '1px' }}>Elite Partner</span>
              <h2 className="text-gradient" style={{ margin: 0, fontSize: '20px', fontWeight: 900, letterSpacing: '-0.4px', lineHeight: 1.1 }}>Alex Johnson</h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
             <button onClick={toggleDarkMode} className="card-hover" style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(12px)', 
                padding: '12px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
             }}>
                <Moon size={18} strokeWidth={2.5} />
             </button>
             <button onClick={() => navigate('/notifications')} className="card-hover" style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(12px)', 
                padding: '12px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#fff', 
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
             }}>
                <Bell size={18} strokeWidth={2.5} />
                <span className="neon-glow" style={{ position: 'absolute', top: '10px', right: '11px', width: '9px', height: '9px', backgroundColor: '#F59E0B', borderRadius: '50%', border: '2px solid #211655' }} />
             </button>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px',
          padding: isScrolled ? '0 16px' : '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)',
          maxHeight: isScrolled ? '0px' : '120px', opacity: isScrolled ? 0 : 1, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="neon-glow" style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(157, 22, 128, 0.2)' }}>
              <Trophy size={24} color="var(--primary-color)" strokeWidth={2.5} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#fff' }}>Brikkin Martech</h3>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>RERA: P52000012345</div>
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={18} color="rgba(255,255,255,0.8)" strokeWidth={3} />
          </div>
        </div>
      </header>

      <div className="hide-scroll" onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', paddingTop: 'var(--spacing-xxl)', paddingBottom: '140px' }}>
        
        {/* Action Required */}
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          <div className="card slide-up" style={{ 
            marginTop: '-28px', position: 'relative', zIndex: 11, 
            backgroundColor: 'var(--surface-color)', 
            border: '1px solid rgba(226, 55, 68, 0.15)', 
            display: 'flex', gap: '12px', alignItems: 'center', 
            boxShadow: 'var(--shadow-md)', borderRadius: 'var(--border-radius-lg)', 
            padding: 'var(--spacing-md)' 
          }}>
            <div style={{ backgroundColor: 'rgba(226, 55, 68, 0.08)', padding: '10px', borderRadius: '50%', display: 'flex' }}>
              <CircleAlert color="#EF4444" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 2px 0', color: '#EF4444', fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>Action Required</h4>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>You have 2 pending RERA document updates.</p>
            </div>
            <button style={{ background: 'var(--primary-color)', border: 'none', color: '#fff', fontWeight: 600, fontSize: '11px', padding: '6px 12px', borderRadius: '100px', cursor: 'pointer' }}>Fix Now</button>
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div style={{ padding: '0 var(--spacing-lg)', marginTop: 'var(--spacing-md)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: 'var(--spacing-xl)' }}>
            {stats.map((s, idx) => (
              <div key={idx} className="slide-up" style={{ 
                animationDelay: `${idx * 0.05}s`, 
                background: '#fff', borderRadius: '20px', 
                padding: '16px 14px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: '140px'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ 
                    width: '38px', height: '38px', borderRadius: '12px', 
                    backgroundColor: `${s.color}1A`, display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', color: s.color,
                    boxShadow: `0 4px 12px ${s.color}1A`
                  }}>
                    <s.Icon size={24} strokeWidth={1.5} />
                  </div>
                  {s.trend && (
                    <div style={{ 
                      padding: '6px 10px', borderRadius: '100px', 
                      backgroundColor: s.trendUp ? '#ECFDF5' : (s.trendUp === false ? '#FEF2F2' : '#F1F5F9'), 
                      color: s.trendUp ? '#10B981' : (s.trendUp === false ? '#EF4444' : '#64748B'), 
                      fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.5px'
                    }}>
                      {s.trend}
                    </div>
                  )}
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 900, color: '#0F172A', letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</h4>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px' }}>{s.label}</p>
                </div>
                {/* Ghost Icon Background */}
                <div style={{ position: 'absolute', bottom: -15, right: -15, color: s.color, opacity: 0.04, transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 1 }}>
                  <s.Icon size={100} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Invitation Card */}
        <div className="slide-up" style={{ 
          animationDelay: '0.2s', margin: 'var(--spacing-xl) var(--spacing-lg)', 
          padding: 'var(--spacing-xl)', borderRadius: '24px', 
          backgroundColor: '#0F172A', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop") center/cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0F172A 20%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F172A 0%, transparent 80%)' }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '6px', 
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))', 
              color: '#FDE68A', padding: '6px 14px', borderRadius: '100px', 
              fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', 
              marginBottom: '16px', border: '1px solid rgba(245,158,11,0.3)', 
              backdropFilter: 'blur(8px)', letterSpacing: '1px' 
            }}>
              <Trophy size={14} color="#F59E0B" strokeWidth={2} /> VIP INVITATION
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Annual Partner <br/><span style={{ background: 'linear-gradient(to right, #FCD34D, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Awards 2026</span>
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '90%' }}>
              Join us for an exclusive evening celebrating the extraordinary achievements of our top-tier Channel Partners.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <CalendarDays size={18} color="#FCD34D" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '2px' }}>Date & Time</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 700 }}>Nov 10th, 7:00 PM</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <MapPin size={18} color="#FCD34D" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '2px' }}>Venue</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 700 }}>Grand Hyatt, Mumbai</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#fff', fontSize: '14px', fontWeight: 800, borderRadius: '14px', border: 'none', boxShadow: '0 8px 16px rgba(245,158,11,0.3)', cursor: 'pointer' }}>Accept RSVP</button>
              <button style={{ flex: 1, padding: '14px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 600, backdropFilter: 'blur(10px)', borderRadius: '14px', cursor: 'pointer' }}>Decline</button>
            </div>
            <button style={{ width: '100%', background: 'none', border: 'none', color: '#FCD34D', fontSize: '13px', fontWeight: 700, cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: 0.9 }}>
              View Full Itinerary <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Exclusive Offers Slider */}
        <div style={{ paddingLeft: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>Exclusive Offers</h3>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--primary-color)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>See all <ArrowRight size={12} /></span>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)', paddingRight: 'var(--spacing-lg)' }}>
            {offers.map((offer, idx) => (
              <div key={idx} className="card slide-up" style={{ 
                minWidth: '300px', scrollSnapAlign: 'start', borderRadius: '20px', 
                overflow: 'hidden', backgroundColor: 'var(--surface-color)', 
                border: '1px solid var(--border-color)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                position: 'relative', display: 'flex', flexDirection: 'column', margin: 0, padding: 0
              }}>
                <div style={{ position: 'relative', height: '180px', backgroundImage: `url(${offer.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                  <div style={{ 
                    position: 'absolute', top: 16, left: 16, 
                    backgroundColor: offer.color, color: '#fff', 
                    padding: '6px 14px', borderRadius: '100px', 
                    fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', 
                    letterSpacing: '0.5px', boxShadow: `0 4px 12px ${offer.color}60`
                  }}>
                    <span style={{ fontSize: '14px' }}>{offer.icon}</span> {offer.tag}
                  </div>
                  <div style={{ 
                    position: 'absolute', bottom: -26, right: 20, 
                    width: '64px', height: '64px', backgroundColor: '#fff', 
                    borderRadius: '50%', display: 'flex', flexDirection: 'column', 
                    alignItems: 'center', justifyContent: 'center', color: offer.color, 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1.1 }}>{offer.bonus}</span>
                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Bonus</span>
                  </div>
                </div>
                <div style={{ padding: '24px 20px 20px', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.3px', paddingRight: '40px' }}>{offer.title}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666666', lineHeight: 1.5, flex: 1 }}>{offer.desc}</p>
                  <div style={{ position: 'relative', height: '2px', width: '100%', margin: '24px 0 20px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: -10, right: -10, borderTop: '2px dashed #E2E8F0' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: offer.color, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Target size={14} strokeWidth={3} /> Valid 48h
                    </span>
                    <button style={{ background: '#1C1C1C', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>Claim Now</button>
                  </div>
                </div>
                {/* Side Cutouts */}
                <div style={{ position: 'absolute', left: -10, bottom: '62px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', borderRight: '1px solid #E2E8F0', zIndex: 10 }} />
                <div style={{ position: 'absolute', right: -10, bottom: '62px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', borderLeft: '1px solid #E2E8F0', zIndex: 10 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Slider */}
        <div style={{ paddingLeft: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>Featured Projects</h3>
            <span onClick={() => navigate('/projects')} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--primary-color)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>See all <ArrowRight size={12} /></span>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)', paddingRight: 'var(--spacing-lg)' }}>
            {projects.map((proj, idx) => (
              <div key={idx} onClick={() => navigate(`/project/${proj.id}`)} style={{ 
                minWidth: '280px', height: '373px', scrollSnapAlign: 'start', 
                borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 24px rgba(0,0,0,0.15)', 
                position: 'relative', backgroundImage: `url(${proj.img})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ 
                    padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.2)', 
                    backdropFilter: 'blur(10px)', borderRadius: '100px', 
                    border: '1px solid rgba(255,255,255,0.3)', color: '#fff', 
                    display: 'flex', alignItems: 'center', gap: '4px' 
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase' }}>Starts at</span>
                    <span style={{ fontSize: '13px', fontWeight: 800 }}>₹{proj.price}</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    <MapPin size={12} color="#fff" /> {proj.loc}
                  </div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>{proj.name}</h4>
                  <div style={{ 
                    padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.4)', 
                    backdropFilter: 'blur(12px)', borderRadius: '14px', 
                    border: '1px solid rgba(255,255,255,0.15)', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                  }}>
                    <div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Available</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{proj.conf}</div>
                    </div>
                    <button style={{ backgroundColor: 'var(--primary-color)', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Podium Rank Board */}
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          <div className="slide-up" style={{ 
            padding: 'var(--spacing-xl) var(--spacing-lg)', borderRadius: '24px', 
            background: 'linear-gradient(180deg, #1E1B4B 0%, #0F172A 100%)', 
            boxShadow: '0 24px 48px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)', 
            position: 'relative', overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)', position: 'relative', zIndex: 2 }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', letterSpacing: '-0.3px' }}>
                <Trophy size={20} color="#FCD34D" fill="rgba(252,211,77,0.2)" /> Rank Board
              </h3>
              <button style={{ background: 'none', border: 'none', color: '#FCD34D', fontSize: '13px', fontWeight: 700, cursor: 'pointer', opacity: 0.9 }}>View All</button>
            </div>

            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '4px', marginBottom: '24px', position: 'relative', zIndex: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
              <button onClick={() => setActiveLeaderboardTab('booking')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: '0.2s', backgroundColor: activeLeaderboardTab === 'booking' ? '#fff' : 'transparent', color: activeLeaderboardTab === 'booking' ? '#1E1B4B' : 'rgba(255,255,255,0.6)', boxShadow: activeLeaderboardTab === 'booking' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' }}>By Bookings</button>
              <button onClick={() => setActiveLeaderboardTab('revenue')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: '0.2s', backgroundColor: activeLeaderboardTab === 'revenue' ? '#fff' : 'transparent', color: activeLeaderboardTab === 'revenue' ? '#1E1B4B' : 'rgba(255,255,255,0.6)', boxShadow: activeLeaderboardTab === 'revenue' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' }}>By Revenue</button>
            </div>

            {/* Podium */}
            <div className="flex-column" style={{ padding: 0, margin: 0, position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '8px', padding: 0, marginBottom: '8px' }}>
                {/* Rank 2 */}
                <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', position: 'relative', animationDelay: '0s' }}>
                  <div style={{ position: 'relative', zIndex: 2, marginBottom: '-28px' }}>
                    <img src={top10[1].img} alt={top10[1].name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #E2E8F0', padding: '2px', backgroundColor: '#1E1B4B', boxShadow: '0 0 20px rgba(226,232,240,0.3)' }} />
                  </div>
                  <div style={{ width: '100%', height: '115px', background: 'linear-gradient(to top, rgba(148,163,184,0.6), rgba(226,232,240,0.05))', borderTop: '2px solid #E2E8F0', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '36px', paddingBottom: '16px', position: 'relative', backdropFilter: 'blur(8px)', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', textAlign: 'center', letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '4px', zIndex: 2, padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{top10[1].name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#E2E8F0', zIndex: 2, textShadow: '0 0 10px rgba(226,232,240,0.3)' }}>{activeLeaderboardTab === 'booking' ? top10[1].booking : top10[1].rev}</span>
                    <div style={{ marginTop: 'auto', fontSize: '28px', fontWeight: 900, color: '#E2E8F0', opacity: 0.1, lineHeight: 1 }}>#2</div>
                  </div>
                </div>
                {/* Rank 1 */}
                <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', position: 'relative', animationDelay: '0.1s' }}>
                  <div style={{ fontSize: '32px', marginBottom: '-14px', zIndex: 10, filter: 'drop-shadow(0 0 10px rgba(252,211,77,0.8))' }}>👑</div>
                  <div style={{ position: 'relative', zIndex: 2, marginBottom: '-28px' }}>
                    <img src={top10[0].img} alt={top10[0].name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FCD34D', padding: '2px', backgroundColor: '#1E1B4B', boxShadow: '0 0 20px rgba(252,211,77,0.4)' }} />
                  </div>
                  <div style={{ width: '100%', height: '160px', background: 'linear-gradient(to top, rgba(245,158,11,0.8), rgba(252,211,77,0.1))', borderTop: '2px solid #FCD34D', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '36px', paddingBottom: '16px', position: 'relative', backdropFilter: 'blur(8px)', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', textAlign: 'center', letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '4px', zIndex: 2, padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{top10[0].name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FCD34D', zIndex: 2, textShadow: '0 0 10px rgba(252,211,77,0.4)' }}>{activeLeaderboardTab === 'booking' ? top10[0].booking : top10[0].rev}</span>
                    <div style={{ marginTop: 'auto', fontSize: '40px', fontWeight: 900, color: '#FCD34D', opacity: 0.1, lineHeight: 1 }}>#1</div>
                  </div>
                </div>
                {/* Rank 3 */}
                <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', position: 'relative', animationDelay: '0.2s' }}>
                  <div style={{ position: 'relative', zIndex: 2, marginBottom: '-28px' }}>
                    <img src={top10[2].img} alt={top10[2].name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FDBA74', padding: '2px', backgroundColor: '#1E1B4B', boxShadow: '0 0 20px rgba(253,186,116,0.3)' }} />
                  </div>
                  <div style={{ width: '100%', height: '95px', background: 'linear-gradient(to top, rgba(217,119,6,0.6), rgba(253,186,116,0.05))', borderTop: '2px solid #FDBA74', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '36px', paddingBottom: '16px', position: 'relative', backdropFilter: 'blur(8px)', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', textAlign: 'center', letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '4px', zIndex: 2, padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{top10[2].name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FDBA74', zIndex: 2, textShadow: '0 0 10px rgba(253,186,116,0.3)' }}>{activeLeaderboardTab === 'booking' ? top10[2].booking : top10[2].rev}</span>
                    <div style={{ marginTop: 'auto', fontSize: '28px', fontWeight: 900, color: '#FDBA74', opacity: 0.1, lineHeight: 1 }}>#3</div>
                  </div>
                </div>
              </div>

              {/* Ranks 4-10 */}
              <div className="flex-column" style={{ gap: '8px' }}>
                {top10.slice(3).map((usr, i) => (
                  <div key={i} className="slide-up" style={{ 
                    display: 'flex', alignItems: 'center', gap: '14px', padding: '4px 12px', borderRadius: '18px', 
                    background: usr.isUser ? 'linear-gradient(90deg, rgba(226, 55, 68, 0.2), rgba(226, 55, 68, 0.05))' : 'rgba(255,255,255,0.03)', 
                    border: usr.isUser ? '1px solid rgba(226, 55, 68, 0.5)' : '1px solid rgba(255,255,255,0.05)', 
                    boxShadow: usr.isUser ? '0 4px 20px rgba(226, 55, 68, 0.2)' : 'none', 
                    animationDelay: `${0.3 + i * 0.05}s`, backdropFilter: 'blur(10px)' 
                  }}>
                    <div style={{ width: '28px', textAlign: 'center', fontSize: '16px', fontWeight: 800, color: usr.isUser ? '#fff' : 'rgba(255,255,255,0.4)', fontStyle: 'italic', letterSpacing: '-0.5px' }}>#{usr.rank}</div>
                    <img src={usr.img} alt={usr.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: usr.isUser ? '2px solid #9D1680' : '1px solid rgba(255,255,255,0.1)', padding: '2px', backgroundColor: '#1E1B4B' }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: usr.isUser ? 800 : 600, color: '#fff', letterSpacing: '-0.3px' }}>{usr.name} {usr.isUser && '(You)'}</span>
                      {usr.isUser && <span style={{ fontSize: '9px', backgroundColor: '#9D1680', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>You</span>}
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: usr.isUser ? '#fff' : '#FCD34D' }}>{activeLeaderboardTab === 'booking' ? usr.booking : usr.rev}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Site Visit Card */}
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          <div className="card slide-up" style={{ 
            marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', 
            borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', 
            boxShadow: 'var(--shadow-sm)', background: 'linear-gradient(135deg, var(--surface-color), rgba(45,156,219,0.05))' 
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '12px', 
                background: 'var(--primary-color)', color: '#fff', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                flexShrink: 0, boxShadow: '0 8px 16px rgba(45,156,219,0.3)' 
              }}>
                <Navigation size={24} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Schedule Site Visit</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Book a personalized property tour for your clients and fast-track your closings.</p>
                <button className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 800, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(45,156,219,0.2)' }}>
                  Book Appointment <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardScreen;
