import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, SlidersHorizontal, Menu,
  Heart, ChevronDown, Check, IndianRupee, Star, Building2, MapPin, BedDouble, Maximize2, ArrowRight,
  X, LayoutGrid, List
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';

const ProjectListingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPopupOpen, setShowSideMenu } = useUI();
  const [activeArea, setActiveArea] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('Relevance');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

  // Filter state
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
  const priceOptions = ['Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹3Cr', '₹3Cr - ₹5Cr', '₹5Cr+'];
  const statusOptions = ['New Launch', 'Trending', 'Premium', 'Ultra Luxury', 'Best Seller', 'Hot Deal'];

  const activeFilterCount = selectedBHK.length + selectedPrice.length + selectedStatus.length;
  const hasFilters = activeFilterCount > 0;

  const resetFilters = () => {
    setSelectedBHK([]);
    setSelectedPrice([]);
    setSelectedStatus([]);
  };

  const toggleChip = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const trendingAreas = [
    { label: 'All', emoji: '🌐' },
    { label: 'Wakad', emoji: '🔥' },
    { label: 'Bandra', emoji: '🏙️' },
    { label: 'Hinjewadi', emoji: '💻' },
    { label: 'Cyber City', emoji: '⚡' },
    { label: 'Andheri', emoji: '🚉' },
    { label: 'Whitefield', emoji: '🏢' },
    { label: 'Kharadi', emoji: '🏭' }
  ];

  const projects = [
    { id: 1, name: 'Aurora Sky Residences', developer: 'ACX Developers', loc: 'Wakad, Pune', conf: '2 & 3 BHK', price: '85L', priceRange: '₹85L - ₹1.2Cr', area: '980 - 1450', unitType: 'sq.ft', rating: 4.8, units: 128, commission: '2.5%', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop', tag: 'New Launch', tagColor: '#10B981' },
    { id: 2, name: 'Oceana Ridge', developer: 'Lodha Group', loc: 'Bandra, Mumbai', conf: '3 & 4 BHK', price: '4.2Cr', priceRange: '₹4.2Cr - ₹7.8Cr', area: '1800 - 3200', unitType: 'sq.ft', rating: 4.9, units: 64, commission: '3%', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop', tag: 'Premium', tagColor: '#F59E0B' },
    { id: 3, name: 'The Zenith Tower', developer: 'DLF Ltd', loc: 'Cyber City, Gurgaon', conf: '4 BHK Luxury', price: '7.5Cr', priceRange: '₹7.5Cr - ₹12Cr', area: '3500 - 5200', unitType: 'sq.ft', rating: 4.9, units: 32, commission: '4%', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', tag: 'Ultra Luxury', tagColor: '#8B5CF6' },
    { id: 4, name: 'Skyline Greens', developer: 'Godrej Properties', loc: 'Hinjewadi, Pune', conf: '1 & 2 BHK', price: '45L', priceRange: '₹45L - ₹78L', area: '550 - 980', unitType: 'sq.ft', rating: 4.6, units: 256, commission: '2%', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop', tag: 'Trending', tagColor: '#EF4444' },
    { id: 5, name: 'Emerald Bay', developer: 'Piramal Realty', loc: 'Andheri, Mumbai', conf: '2 & 3 BHK', price: '1.8Cr', priceRange: '₹1.8Cr - ₹3.5Cr', area: '1100 - 1800', unitType: 'sq.ft', rating: 4.7, units: 96, commission: '2.8%', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop', tag: 'Best Seller', tagColor: '#3B82F6' },
  ];

  const toggleLike = (id: number) => {
    setLikedProjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredProjects = projects.filter(p => {
    if (activeArea !== 'All' && !p.loc.toLowerCase().includes(activeArea.toLowerCase())) return false;
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.loc.toLowerCase().includes(q) && !p.developer.toLowerCase().includes(q)) return false;
    }
    if (selectedBHK.length > 0) {
      const matchesBHK = selectedBHK.some(bhk => p.conf.toLowerCase().includes(bhk.replace(' BHK', '').replace('+', '')));
      if (!matchesBHK) return false;
    }
    if (selectedStatus.length > 0 && !selectedStatus.includes(p.tag)) return false;
    return true;
  });

  const parsePrice = (p: string) => {
    const num = parseFloat(p.replace(/[^0-9.]/g, ''));
    return p.includes('Cr') ? num * 100 : num;
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High': return parsePrice(a.price) - parsePrice(b.price);
      case 'Price: High to Low': return parsePrice(b.price) - parsePrice(a.price);
      case 'Rating': return b.rating - a.rating;
      case 'Newest': return b.id - a.id;
      default: return 0;
    }
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

      {/* --- TOP BAR --- */}
      <div style={{
        padding: '16px var(--spacing-lg) 12px',
        backgroundColor: 'var(--surface-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative', zIndex: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px',
            borderRadius: '14px', cursor: 'pointer', display: 'flex', flexShrink: 0,
          }}>
            <ArrowLeft size={20} strokeWidth={2.5} color="var(--text-primary)" />
          </button>

          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '16px', padding: '0 16px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s'
          }}>
            <Search size={18} color="var(--text-disabled)" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search projects, realtors..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                padding: '14px 0', fontSize: '14px', fontWeight: 600,
                backgroundColor: 'transparent', color: 'var(--text-primary)',
              }}
            />
          </div>

          <button onClick={openSideMenu} style={{
            background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '10px',
            borderRadius: '14px', cursor: 'pointer', display: 'flex', flexShrink: 0,
          }}>
             <Menu size={20} color="var(--text-primary)" strokeWidth={2.5} />
          </button>

          <button onClick={() => toggleFilter(true)} style={{
            background: hasFilters ? 'var(--primary-gradient)' : 'var(--bg-color)',
            border: hasFilters ? 'none' : '1px solid var(--border-color)', 
            padding: '10px',
            borderRadius: '14px', cursor: 'pointer', display: 'flex', flexShrink: 0,
            boxShadow: hasFilters ? '0 4px 14px rgba(157, 22, 128, 0.25)' : 'none',
            position: 'relative',
          }}>
            <SlidersHorizontal size={20} color={hasFilters ? '#fff' : 'var(--text-primary)'} strokeWidth={2.5} />
            {hasFilters && (
              <div style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '18px', height: '18px', borderRadius: '50%',
                backgroundColor: '#EF4444', color: '#fff',
                fontSize: '10px', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--surface-color)',
              }}>{activeFilterCount}</div>
            )}
          </button>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="hide-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>

        {/* Trending Areas Tags */}
        <div style={{ padding: '16px 0 10px 0' }}>
          <div className="hide-scroll" style={{
            display: 'flex', gap: '10px', overflowX: 'auto',
            paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)',
          }}>
            {trendingAreas.map((area) => {
              const isActive = activeArea === area.label;
              return (
                <button key={area.label} onClick={() => setActiveArea(area.label)} style={{
                  padding: '10px 20px', borderRadius: '100px',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  background: isActive ? 'var(--primary-gradient)' : 'var(--surface-color)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 6px 16px rgba(157, 22, 128, 0.3)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <span style={{ fontSize: '15px' }}>{area.emoji}</span>
                  {area.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div style={{ padding: '12px var(--spacing-lg) 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Featured Projects</h2>
            <div style={{ height: '6px', width: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', background: 'var(--surface-color)', borderRadius: '10px', border: '1px solid var(--border-color)', padding: '2px' }}>
              <button 
                onClick={() => setViewType('list')}
                style={{ background: viewType === 'list' ? 'var(--bg-color)' : 'transparent', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: viewType === 'list' ? 'var(--primary-color)' : 'var(--text-disabled)' }}>
                <List size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setViewType('grid')}
                style={{ background: viewType === 'grid' ? 'var(--bg-color)' : 'transparent', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: viewType === 'grid' ? 'var(--primary-color)' : 'var(--text-disabled)' }}>
                <LayoutGrid size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '4px var(--spacing-lg) 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Showing <span style={{ fontWeight: 800, color: 'var(--primary-color)' }}>{sortedProjects.length}</span> results in Pune
          </p>
          <button onClick={() => setShowSortDropdown(!showSortDropdown)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>{sortBy}</span>
            <ChevronDown size={14} color="var(--text-disabled)" strokeWidth={2.5} />
          </button>
          
          {showSortDropdown && (
            <div style={{ position: 'absolute', top: '100%', right: 'var(--spacing-lg)', backgroundColor: 'var(--surface-color)', borderRadius: '16px', padding: '8px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', zIndex: 100, minWidth: '180px' }}>
              {sortOptions.map(opt => (
                <button key={opt} onClick={() => { setSortBy(opt); setShowSortDropdown(false); }} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '10px', background: sortBy === opt ? 'rgba(157, 22, 128, 0.06)' : 'transparent', color: sortBy === opt ? 'var(--primary-color)' : 'var(--text-primary)', fontSize: '13px', fontWeight: sortBy === opt ? 800 : 500, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {opt}
                  {sortBy === opt && <Check size={14} strokeWidth={3} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- VERTICAL PROJECT CARDS --- */}
        <div style={{ 
          padding: '8px var(--spacing-lg)', 
          display: viewType === 'grid' ? 'grid' : 'flex', 
          gridTemplateColumns: '1fr 1fr',
          flexDirection: 'column', 
          gap: '20px' 
        }}>
          {sortedProjects.map((proj, idx) => (
            <div key={proj.id} className="slide-up" onClick={() => navigate(`/project/${proj.id}`)} style={{
              animationDelay: `${idx * 0.1}s`,
              backgroundColor: 'var(--surface-color)',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              position: 'relative'
            }}>

              {/* Image Section */}
              <div style={{ position: 'relative', height: viewType === 'grid' ? '140px' : '220px', overflow: 'hidden' }}>
                <img src={proj.img} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

                {/* Rating Badge */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#1e293b' }}>{proj.rating}</span>
                </div>

                {/* Like Button */}
                <button onClick={(e) => { e.stopPropagation(); toggleLike(proj.id); }} style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Heart size={16} strokeWidth={2.5} color={likedProjects.includes(proj.id) ? '#EF4444' : '#fff'} fill={likedProjects.includes(proj.id) ? '#EF4444' : 'none'} />
                </button>

                {/* Project Status Chip */}
                <div style={{ position: 'absolute', bottom: '14px', right: '14px', backgroundColor: proj.tagColor, color: '#fff', padding: '5px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {proj.tag}
                </div>

                {/* Commission Chip */}
                <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(16, 185, 129, 0.95)', padding: '5px 10px', borderRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                   <IndianRupee size={12} strokeWidth={3} />
                   <span style={{ fontSize: '11px', fontWeight: 900 }}>{proj.commission}</span>
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Building2 size={13} color="var(--primary-color)" strokeWidth={2.5} />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{proj.developer}</span>
                </div>

                <h3 style={{ margin: '0 0 6px 0', fontSize: viewType === 'grid' ? '16px' : '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>{proj.name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '16px' }}>
                  <MapPin size={14} color="var(--text-disabled)" strokeWidth={2.5} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{proj.loc}</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-color)', padding: '8px 12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <BedDouble size={14} color="var(--primary-color)" />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>{proj.conf}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-color)', padding: '8px 12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <Maximize2 size={14} color="var(--primary-color)" />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>{proj.area} <span style={{ fontSize: '10px', opacity: 0.7 }}>{proj.unitType}</span></span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-disabled)', display: 'block', marginBottom: '2px', textTransform: 'uppercase' }}>Asking Price</span>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary-color)', letterSpacing: '-0.5px' }}>₹{proj.price} <span style={{ fontSize: '14px', fontWeight: 700 }}>Cr+</span></span>
                  </div>
                  <button style={{ height: '48px', width: '48px', borderRadius: '14px', background: 'var(--primary-gradient)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(157, 22, 128, 0.3)', cursor: 'pointer' }}>
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>Filters</h2>
              <button onClick={() => toggleFilter(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}>
                <X size={22} color="var(--text-primary)" />
              </button>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>BHK Type</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {bhkOptions.map(opt => {
                  const active = selectedBHK.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleChip(opt, selectedBHK, setSelectedBHK)} style={{ padding: '12px 18px', borderRadius: '14px', border: active ? 'none' : '1px solid var(--border-color)', background: active ? 'var(--primary-gradient)' : 'var(--bg-color)', color: active ? '#fff' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: active ? '0 4px 12px rgba(157, 22, 128, 0.25)' : 'none' }}>{opt}</button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Price Range</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {priceOptions.map(opt => {
                  const active = selectedPrice.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleChip(opt, selectedPrice, setSelectedPrice)} style={{ padding: '12px 18px', borderRadius: '14px', border: active ? 'none' : '1px solid var(--border-color)', background: active ? 'var(--primary-gradient)' : 'var(--bg-color)', color: active ? '#fff' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: active ? '0 4px 12px rgba(157, 22, 128, 0.25)' : 'none' }}>{opt}</button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Project Status</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {statusOptions.map(opt => {
                  const active = selectedStatus.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleChip(opt, selectedStatus, setSelectedStatus)} style={{ padding: '12px 18px', borderRadius: '14px', border: active ? 'none' : '1px solid var(--border-color)', background: active ? 'var(--primary-gradient)' : 'var(--bg-color)', color: active ? '#fff' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: active ? '0 4px 12px rgba(157, 22, 128, 0.25)' : 'none' }}>{opt}</button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button onClick={() => { resetFilters(); toggleFilter(false); }} style={{ flex: 1, padding: '16px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontWeight: 800, cursor: 'pointer' }}>
                Clear All
              </button>
              <button onClick={() => toggleFilter(false)} style={{ flex: 2, padding: '16px', borderRadius: '18px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 24px rgba(157, 22, 128, 0.3)' }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectListingScreen;
