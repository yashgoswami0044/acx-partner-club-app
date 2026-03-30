import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Heart, Share2, MapPin, Building2,
  CalendarDays, Star, ChevronDown, Phone, MessageSquare, Download,
  Menu, IndianRupee, Activity, Target, ShieldCheck, Zap, Waves, Dumbbell,
  Trees, Coffee, Landmark, Train, Hospital, School, ArrowRight
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

const ProjectDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id: _id } = useParams();
  const { setPopupOpen, setShowSideMenu } = useUI();

  const [activeImageIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Mock project data
  const project = {
    id: 1,
    name: 'Aurora Sky Residences',
    developer: 'Vertex Group',
    loc: 'Wakad, Pune',
    rating: 4.8,
    reviews: 124,
    price: '85.5L',
    priceRange: '₹85.5L - ₹1.45Cr',
    tag: 'Trending Project',
    tagColor: '#10B981',
    commission: '2.5%',
    possession: 'Dec 2025',
    status: 'In Progress',
    rera: 'P52100024891',
    heroImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
    ],
    description: 'Aurora Sky Residences is a masterpiece of modern architecture, offering ultra-luxury 2, 3 & 4 BHK apartments. Strategically located in the high-growth corridor of Wakad, the project features 40+ world-class amenities and 70% open green spaces. Designed for those who seek an elevated lifestyle.',
    amenities: [
      { name: 'Clubhouse', icon: <Landmark size={20} /> },
      { name: 'Gymnasium', icon: <Dumbbell size={20} /> },
      { name: 'Infinity Pool', icon: <Waves size={20} /> },
      { name: 'Kids Play', icon: <Target size={20} /> },
      { name: 'Park', icon: <Trees size={20} /> },
      { name: 'Cafe', icon: <Coffee size={20} /> },
      { name: 'EV Charging', icon: <Zap size={20} /> },
      { name: 'Security', icon: <ShieldCheck size={20} /> },
    ],
    connectivity: [
      { name: 'Metro Station', dist: '0.8 km', icon: <Train size={18} /> },
      { name: 'Hospitals', dist: '1.2 km', icon: <Hospital size={18} /> },
      { name: 'School', dist: '1.5 km', icon: <School size={18} /> },
      { name: 'Shopping Mall', dist: '2.4 km', icon: <Building2 size={18} /> },
    ],
    layouts: [
      { type: '2 BHK', size: '980 sq.ft', price: '₹85.5L*', img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop' },
      { type: '3 BHK', size: '1350 sq.ft', price: '₹1.15Cr*', img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop',
    ]
  };

  const toggleSideMenu = () => {
    setShowSideMenu(true);
    setPopupOpen(true);
  };

  return (
    <div className="flex-column fade-in" style={{ height: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>

      {/* --- HEADER --- */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 'var(--max-width-app)', zIndex: 100,
        padding: '12px var(--spacing-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: isScrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{
            width: '40px', height: '40px', borderRadius: '12px',
            backgroundColor: isScrolled ? 'var(--bg-color)' : 'rgba(0,0,0,0.3)',
            border: isScrolled ? '1px solid var(--border-color)' : '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <ArrowLeft size={18} color={isScrolled ? 'var(--text-primary)' : '#fff'} strokeWidth={2.5} />
          </button>
          {isScrolled && (
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
               {project.name}
            </h2>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setLiked(!liked)} style={{
            width: '40px', height: '40px', borderRadius: '12px',
            backgroundColor: isScrolled ? 'var(--bg-color)' : 'rgba(0,0,0,0.3)',
            border: isScrolled ? '1px solid var(--border-color)' : '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Heart size={18} color={liked ? '#EF4444' : isScrolled ? 'var(--text-primary)' : '#fff'} fill={liked ? '#EF4444' : 'none'} strokeWidth={2.5} />
          </button>
          <button style={{
            width: '40px', height: '40px', borderRadius: '12px',
            backgroundColor: isScrolled ? 'var(--bg-color)' : 'rgba(0,0,0,0.3)',
            border: isScrolled ? '1px solid var(--border-color)' : '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Share2 size={18} color={isScrolled ? 'var(--text-primary)' : '#fff'} strokeWidth={2.5} />
          </button>
          <button onClick={toggleSideMenu} style={{
             width: '40px', height: '40px', borderRadius: '12px',
             backgroundColor: isScrolled ? 'var(--bg-color)' : 'rgba(0,0,0,0.3)',
             border: isScrolled ? '1px solid var(--border-color)' : '1px solid rgba(255,255,255,0.2)',
             display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
             <Menu size={18} color={isScrolled ? 'var(--text-primary)' : '#fff'} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="hide-scroll" onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 100)} style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        
        {/* Hero Section */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
          <div className="hide-scroll" style={{ display: 'flex', width: '100%', height: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
            {project.heroImages.map((img, i) => (
              <div key={i} style={{ minWidth: '100%', height: '100%', scrollSnapAlign: 'start' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Glass Price Tag */}
          <div style={{
            position: 'absolute', bottom: '24px', left: 'var(--spacing-lg)',
            padding: '16px 24px', borderRadius: '24px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Starting At</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>₹{project.price}<span style={{ fontSize: '14px', opacity: 0.8 }}> Onwards</span></div>
          </div>

          {/* Image Paginator Overlay */}
          <div style={{ position: 'absolute', bottom: '24px', right: 'var(--spacing-lg)', display: 'flex', gap: '6px' }}>
            {project.heroImages.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeImageIdx === i ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>

        {/* Info Header Card */}
        <div style={{ padding: '24px var(--spacing-lg)', backgroundColor: 'var(--bg-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                 <Building2 size={14} color="var(--primary-color)" strokeWidth={2.5} />
                 <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.developer}</span>
               </div>
               <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.8px', lineHeight: 1.1 }}>{project.name}</h1>
             </div>
             <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 900 }}>
                {project.tag}
             </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
            <MapPin size={16} color="var(--primary-color)" />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{project.loc}</span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
               <Star size={14} color="#F59E0B" fill="#F59E0B" />
               <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{project.rating}</span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Commission', val: project.commission, icon: <IndianRupee size={16} color="#10B981" />, bg: 'rgba(16, 185, 129, 0.05)' },
              { label: 'Possession', val: project.possession, icon: <CalendarDays size={16} color="#3B82F6" />, bg: 'rgba(59, 130, 246, 0.05)' },
              { label: 'RERA ID', val: project.rera, icon: <IndianRupee size={16} color="#F59E0B" />, bg: 'rgba(245, 158, 11, 0.05)' }, // Changed icon slightly
              { label: 'Status', val: project.status, icon: <Activity size={16} color="#8B5CF6" />, bg: 'rgba(139, 92, 246, 0.05)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '18px', backgroundColor: item.bg, border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                   {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div style={{ height: '8px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }} />

        {/* Description Section */}
        <div style={{ padding: '32px var(--spacing-lg)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 900 }}>Project Description</h3>
          <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: showFullDesc ? 'unset' : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          <button onClick={() => setShowFullDesc(!showFullDesc)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 800, fontSize: '14px', marginTop: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {showFullDesc ? 'Read Less' : 'Read More'} <ChevronDown size={16} style={{ transition: 'all 0.3s', transform: showFullDesc ? 'rotate(180deg)' : 'none' }} />
          </button>

          <button style={{ 
            width: '100%', marginTop: '24px', padding: '18px', borderRadius: '16px', 
            background: 'var(--surface-color)', border: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            color: 'var(--text-primary)', fontWeight: 800, fontSize: '15px'
          }}>
            <Download size={20} /> Download Brochure
          </button>
        </div>

        {/* Connectivity Section */}
        <div style={{ padding: '0 var(--spacing-lg) 32px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 900 }}>Connectivity</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {project.connectivity.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--primary-color)' }}>{item.icon}</div>
                <div>
                   <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</div>
                   <div style={{ fontSize: '11px', color: 'var(--text-disabled)', fontWeight: 600 }}>{item.dist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div style={{ padding: '0 var(--spacing-lg) 32px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 900 }}>40+ Amenities</h3>
             <button style={{ color: 'var(--primary-color)', fontSize: '13px', fontWeight: 800, background: 'none', border: 'none' }}>View All</button>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
             {project.amenities.map((item, i) => (
               <div key={i} style={{ textAlign: 'center' }}>
                 <div style={{ width: '100%', aspectRatio: '1', borderRadius: '18px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', color: 'var(--primary-color)' }}>
                   {item.icon}
                 </div>
                 <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>{item.name}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Layout Plans Section */}
        <div style={{ padding: '0 var(--spacing-lg) 32px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 900 }}>Layout Plans</h3>
          <div className="hide-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
             {project.layouts.map((plan, i) => (
               <div key={i} style={{ minWidth: '280px', background: 'var(--surface-color)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <img src={plan.img} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                       <div>
                         <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-disabled)' }}>Type</div>
                         <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>{plan.type}</div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-disabled)' }}>Area</div>
                         <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>{plan.size}</div>
                       </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                       <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary-color)' }}>{plan.price}</span>
                       <button style={{ padding: '8px 16px', borderRadius: '10px', background: 'var(--primary-gradient)', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 800 }}>Inquire</button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

         {/* Updates Timeline Section Snippet */}
         <div style={{ padding: '0 var(--spacing-lg) 32px' }}>
           <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 900 }}>Construction Updates</h3>
           <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed var(--border-color)' }}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                 <div style={{ position: 'absolute', top: '0', left: '-33px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--primary-color)', border: '4px solid var(--bg-color)' }} />
                 <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '4px' }}>SEP 24, 2023</div>
                 <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Tower A - 12th Floor Slab Cast</div>
                 <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>External plastering work in progress for Tower B.</div>
              </div>
              <button 
                onClick={() => navigate('/construction-updates')}
                style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View Full Timeline <ArrowRight size={16} />
              </button>
           </div>
         </div>

      </div>

      {/* --- PREMIUM ACTION BAR --- */}
      <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 'var(--max-width-app)', zIndex: 110,
          backgroundColor: 'var(--surface-color)', padding: '16px var(--spacing-lg) 32px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.1)', display: 'flex', gap: '14px',
          borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
          border: '1px solid var(--border-color)', borderBottom: 'none'
      }}>
          <button style={{
            width: '56px', height: '56px', borderRadius: '18px', backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <Phone size={24} color="var(--primary-color)" />
          </button>
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, height: '56px', borderRadius: '18px', fontWeight: 900, fontSize: '16px', boxShadow: '0 8px 24px rgba(157, 22, 128, 0.3)' }} 
            onClick={() => navigate('/book-appointment')}>
            Register Interest
          </button>
          <button style={{
            width: '56px', height: '56px', borderRadius: '18px', backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <MessageSquare size={24} color="var(--primary-color)" />
          </button>
       </div>

    </div>
  );
};

export default ProjectDetailScreen;
