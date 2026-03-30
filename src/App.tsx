import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUI } from './contexts/UIContext';
import SideMenu from './components/SideMenu';
import BottomNavigation from './components/BottomNavigation';

// Pages
import DashboardScreen from './pages/DashboardScreen';
import LeadScreen from './pages/LeadScreen';
import ProjectListingScreen from './pages/ProjectListingScreen';
import ProjectDetailScreen from './pages/ProjectDetailScreen';
import EarningsScreen from './pages/EarningsScreen';
import LoginScreen from './pages/LoginScreen';
import SelectActionScreen from './pages/SelectActionScreen';
import RegisterCompanyScreen from './pages/RegisterCompanyScreen';
import CreateProfileScreen from './pages/CreateProfileScreen';
import SuccessScreen from './pages/SuccessScreen';
import AddInvoiceScreen from './pages/AddInvoiceScreen';
import ViewInvoiceScreen from './pages/ViewInvoiceScreen';
import POCDetailScreen from './pages/POCDetailScreen';
import NotificationScreen from './pages/NotificationScreen';
import CheckRegistrationScreen from './pages/CheckRegistrationScreen';
import ConstructionUpdatesScreen from './pages/ConstructionUpdatesScreen';
import ScheduleSiteVisitScreen from './pages/ScheduleSiteVisitScreen';
import ContactDetailScreen from './pages/ContactDetailScreen';

const AppContent: React.FC = () => {
  const { showSideMenu, setShowSideMenu, isPopupOpen, setPopupOpen } = useUI();
  const location = useLocation();
  
  // Hide bottom nav on specific pages if needed
  const hideBottomNav = ['/login', '/', '/select-action', '/success'].includes(location.pathname);

  const closeSideMenu = () => {
    setShowSideMenu(false);
    setPopupOpen(false);
  };

  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', maxWidth: 'var(--max-width-app)', margin: '0 auto', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/select-action" element={<SelectActionScreen />} />
        <Route path="/register-company" element={<RegisterCompanyScreen />} />
        <Route path="/create-profile" element={<CreateProfileScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/projects" element={<ProjectListingScreen />} />
        <Route path="/project/:id" element={<ProjectDetailScreen />} />
        <Route path="/leads" element={<LeadScreen />} />
        <Route path="/earnings" element={<EarningsScreen />} />
        <Route path="/add-invoice/:id" element={<AddInvoiceScreen />} />
        <Route path="/view-invoice/:id" element={<ViewInvoiceScreen />} />
        <Route path="/poc-detail" element={<POCDetailScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route path="/check-registration" element={<CheckRegistrationScreen />} />
        <Route path="/construction-updates" element={<ConstructionUpdatesScreen />} />
        <Route path="/schedule-site-visit" element={<ScheduleSiteVisitScreen />} />
        <Route path="/contact-detail" element={<ContactDetailScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/book-now" element={<ScheduleSiteVisitScreen />} />
        <Route path="/book-appointment" element={<ScheduleSiteVisitScreen />} />
      </Routes>

      {/* Global Side Menu Overlay */}
      {showSideMenu && <SideMenu onClose={closeSideMenu} />}
      
      {/* Global Bottom Navigation */}
      {!hideBottomNav && !isPopupOpen && !showSideMenu && <BottomNavigation />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/yash/acx-pc">
      <AppContent />
    </Router>
  );
};

export default App;
