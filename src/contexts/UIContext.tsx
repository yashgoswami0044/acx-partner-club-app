import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  isPopupOpen: boolean;
  setPopupOpen: (isOpen: boolean) => void;
  showSideMenu: boolean;
  setShowSideMenu: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    const result = stored === 'dark';
    console.log('UIContext INIT: localStorage theme=', stored, ', isDarkMode=', result);
    return result;
  });

  // Helper to handle body scroll lock when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPopupOpen]);

  // Handle theme application
  useEffect(() => {
    console.log('UIContext EFFECT: isDarkMode=', isDarkMode, ', setting data-theme=', isDarkMode ? 'dark' : '(removed)');
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    console.log('UIContext EFFECT DONE: html data-theme=', document.documentElement.getAttribute('data-theme'));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('UIContext toggleDarkMode called, current isDarkMode:', isDarkMode);
    setIsDarkMode(prev => {
      console.log('setIsDarkMode: prev=', prev, '→ next=', !prev);
      return !prev;
    });
  };

  return (
    <UIContext.Provider value={{ 
      isPopupOpen, setPopupOpen: setIsPopupOpen, 
      showSideMenu, setShowSideMenu,
      isDarkMode, toggleDarkMode 
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
