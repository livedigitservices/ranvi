import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services';

const defaultSiteSettings = {
  institutionName: 'RANVI INSTITUTIONS',
  tagline: 'Your Next Career Milestones',
  supportingMessage: 'Learn • Excel • Achieve',
  bannerStripText: 'Learn • Excel • Achieve',
  topAnnouncement: {
    badgeText: 'Admissions Open 2026',
    message: 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!',
    phone: '+91 98765 43210',
    isActive: true,
  },
  contactInfo: {
    address: 'Ranvi Knowledge Tower, MG Road Coaching Hub, India',
    phone: '+91 98765 43210',
    email: 'admissions@ranviinstitutions.com',
    workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    whatsapp: '+91 98765 43210',
  },
};

const SiteSettingsContext = createContext(null);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await adminService.getSiteSettings();
      if (res.success && res.data) {
        setSettings({ ...defaultSiteSettings, ...res.data });
      }
    } catch (err) {
      console.error('Failed to load global site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateGlobalSettings = async (newData) => {
    try {
      const res = await adminService.updateSiteSettings(newData);
      if (res.success && res.data) {
        setSettings({ ...defaultSiteSettings, ...res.data });
        return res.data;
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
        updateGlobalSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
