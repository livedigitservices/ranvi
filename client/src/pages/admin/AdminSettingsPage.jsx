import React, { useState, useEffect } from 'react';
import { adminService, uploadService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import {
  Settings,
  Save,
  Sparkles,
  Layers,
  GraduationCap,
  Video,
  FileCheck2,
  MapPin,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { success, error: toastError } = useToast();
  const { refreshSettings } = useSiteSettings();

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadingHeroImg, setUploadingHeroImg] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminService.getSiteSettings();
        if (res.success && res.data) {
          const data = { ...res.data };
          data.heroBanner = {
            badgeText: "India's Premier Coaching for Banking & Government Exams",
            headline: 'Build Your Banking & Government Career with Us',
            highlightWord: 'Banking & Government',
            subheadline:
              'expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
            primaryCtaText: "Explore Banker's Path",
            primaryCtaLink: '/bankers-path',
            secondaryCtaText: 'Book Free Demo',
            secondaryCtaLink: '/enquiry',
            heroImage:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
            ...(data.heroBanner || {}),
          };
          if (!data.heroBanner.headline && data.heroBanner.headlinePrefix) {
            data.heroBanner.headline = `${data.heroBanner.headlinePrefix} ${data.heroBanner.headlineHighlight || ''} ${data.heroBanner.headlineSuffix || ''}`.trim();
          }
          if (!data.heroBanner.heroImage && data.heroBanner.heroImageUrl) {
            data.heroBanner.heroImage = data.heroBanner.heroImageUrl;
          }
          setSettings(data);
        }
      } catch (err) {
        console.error(err);
        toastError('Failed to load website settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingHeroImg(true);
      const res = await uploadService.uploadImage(file);
      if (res.success && res.data?.url) {
        setSettings((prev) => ({
          ...prev,
          heroBanner: { ...prev.heroBanner, heroImage: res.data.url },
        }));
        success('Hero image uploaded successfully!');
      }
    } catch (err) {
      toastError(err.message || 'Image upload failed');
    } finally {
      setUploadingHeroImg(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await adminService.updateSiteSettings(settings);
      if (res.success) {
        success('All website settings updated & synchronized successfully!');
        if (refreshSettings) refreshSettings();
      }
    } catch (err) {
      toastError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  // Helper to add/remove dynamic array items
  const addTestimonial = () => {
    setSettings((prev) => ({
      ...prev,
      testimonials: [
        ...(prev.testimonials || []),
        {
          name: 'New Student',
          designation: 'Assistant Manager, SBI',
          exam: 'Cleared JAIIB 2026',
          quote: 'Excellent coaching and practice tests provided by Ranvi Institutions.',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
          rating: 5,
        },
      ],
    }));
  };

  const removeTestimonial = (index) => {
    setSettings((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  const addFaq = () => {
    setSettings((prev) => ({
      ...prev,
      faqs: [
        ...(prev.faqs || []),
        {
          question: 'New Question?',
          answer: 'Answer to the question goes here.',
          category: 'GENERAL',
        },
      ],
    }));
  };

  const removeFaq = (index) => {
    setSettings((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const tabs = [
    { id: 'hero', label: 'Hero & Banner', icon: Sparkles },
    { id: 'bankers', label: "Banker's Path", icon: Layers },
    { id: 'competitive', label: 'Competitive Exams', icon: GraduationCap },
    { id: 'hubs', label: '4 Action Hubs', icon: BookOpen },
    { id: 'zoom', label: 'Live Zoom & Tests', icon: Video },
    { id: 'roadmap', label: 'Roadmap & About', icon: Award },
    { id: 'testimonials', label: 'Student Reviews', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs & Help', icon: HelpCircle },
    { id: 'contact', label: 'Contact & Policies', icon: PhoneCall },
  ];

  if (loading || !settings) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-bold text-slate-500">Loading website configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-24">
      {/* Header Bar with Action Button */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-2xl font-extrabold text-[#0B1E3D] font-heading">
              100% Dynamic Website Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify any text, image, banner, course tile, testimonial, FAQ or contact detail. All changes reflect live instantly.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Publishing Changes...' : 'Save & Publish Live'}
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#12356B] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* TAB 1: HERO & BANNER */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Hero Banner & Brand Taglines</h2>
              <p className="text-xs text-slate-500">Configure the top hero visual, main headline, and subtexts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="md:col-span-2">
                <label className="block font-extrabold text-slate-700 mb-1">Top Badge Pill Text</label>
                <input
                  type="text"
                  value={settings.heroBanner?.badgeText || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, badgeText: e.target.value },
                    })
                  }
                  placeholder="India's Premier Coaching for Banking & Government Exams"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Main Headline</label>
                <input
                  type="text"
                  value={settings.heroBanner?.headline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, headline: e.target.value },
                    })
                  }
                  placeholder="Build Your Banking & Government Career with Us"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Highlight Word in Headline</label>
                <input
                  type="text"
                  value={settings.heroBanner?.highlightWord || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, highlightWord: e.target.value },
                    })
                  }
                  placeholder="Banking & Government"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-extrabold text-slate-700 mb-1">Subheadline Description</label>
                <textarea
                  rows={2}
                  value={settings.heroBanner?.subheadline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, subheadline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={settings.heroBanner?.primaryCtaText || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, primaryCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Primary CTA Link</label>
                <input
                  type="text"
                  value={settings.heroBanner?.primaryCtaLink || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroBanner: { ...settings.heroBanner, primaryCtaLink: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              {/* Hero Image Picker & Uploader */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block font-extrabold text-slate-800">Hero Student Visual (Photo)</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {settings.heroBanner?.heroImage && (
                    <img
                      src={settings.heroBanner.heroImage}
                      alt="Hero Preview"
                      className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={settings.heroBanner?.heroImage || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          heroBanner: { ...settings.heroBanner, heroImage: e.target.value },
                        })
                      }
                      placeholder="Image URL..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-[11px]"
                    />
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12356B] text-white font-bold cursor-pointer hover:bg-[#0e2a56] shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingHeroImg ? 'Uploading...' : 'Upload Image from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Gold Ribbon Tagline */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <label className="block font-extrabold text-amber-900">Gold Banner Strip Tagline (Below Hero)</label>
                <input
                  type="text"
                  value={settings.bannerStrip?.tagline || 'Learn • Excel • Achieve'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bannerStrip: { ...settings.bannerStrip, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 font-black text-amber-900 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANKER'S PATH */}
        {activeTab === 'bankers' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Banker's Path Section & Color Tiles</h2>
              <p className="text-xs text-slate-500">Configure title, description, and the 8 course tiles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={settings.bankersPathSection?.title || "Banker's Path"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bankersPathSection: { ...settings.bankersPathSection, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={settings.bankersPathSection?.subtitle || 'Banking • Insurance • Finance Career Programs'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bankersPathSection: { ...settings.bankersPathSection, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-extrabold text-slate-700 mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={settings.bankersPathSection?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bankersPathSection: { ...settings.bankersPathSection, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Banker's Path Tiles List */}
            <div className="space-y-3 pt-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                8 Banker's Path Course Tiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {settings.bankersPathSection?.tiles?.map((tile, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400">TILE #{idx + 1}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {tile.name}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={tile.name}
                      onChange={(e) => {
                        const updated = [...settings.bankersPathSection.tiles];
                        updated[idx].name = e.target.value;
                        setSettings({
                          ...settings,
                          bankersPathSection: { ...settings.bankersPathSection, tiles: updated },
                        });
                      }}
                      placeholder="Course Name (e.g. JAIIB)"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      value={tile.subtitle || ''}
                      onChange={(e) => {
                        const updated = [...settings.bankersPathSection.tiles];
                        updated[idx].subtitle = e.target.value;
                        setSettings({
                          ...settings,
                          bankersPathSection: { ...settings.bankersPathSection, tiles: updated },
                        });
                      }}
                      placeholder="Subtitle (e.g. IE&IFS • PPB)"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                    />
                    <input
                      type="text"
                      value={tile.path || ''}
                      onChange={(e) => {
                        const updated = [...settings.bankersPathSection.tiles];
                        updated[idx].path = e.target.value;
                        setSettings({
                          ...settings,
                          bankersPathSection: { ...settings.bankersPathSection, tiles: updated },
                        });
                      }}
                      placeholder="Target Link / Route"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPETITIVE EXAMS */}
        {activeTab === 'competitive' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Competitive Exams Coaching</h2>
              <p className="text-xs text-slate-500">Configure title, subtitle, and the 11 recruitment categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={settings.competitiveSection?.title || 'Competitive Exams Coaching'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      competitiveSection: { ...settings.competitiveSection, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={settings.competitiveSection?.subtitle || 'Build Your Career. Prepare with Confidence.'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      competitiveSection: { ...settings.competitiveSection, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-extrabold text-slate-700 mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={settings.competitiveSection?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      competitiveSection: { ...settings.competitiveSection, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Competitive Exam Tiles */}
            <div className="space-y-3 pt-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                11 Competitive Exam Recruitment Badges
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {settings.competitiveSection?.tiles?.map((tile, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <input
                      type="text"
                      value={tile.name}
                      onChange={(e) => {
                        const updated = [...settings.competitiveSection.tiles];
                        updated[idx].name = e.target.value;
                        setSettings({
                          ...settings,
                          competitiveSection: { ...settings.competitiveSection, tiles: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      value={tile.path || ''}
                      onChange={(e) => {
                        const updated = [...settings.competitiveSection.tiles];
                        updated[idx].path = e.target.value;
                        setSettings({
                          ...settings,
                          competitiveSection: { ...settings.competitiveSection, tiles: updated },
                        });
                      }}
                      placeholder="Route link..."
                      className="w-full px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[10px] font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 4 ACTION HUBS */}
        {activeTab === 'hubs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">4 Quick Action Learning Hubs</h2>
              <p className="text-xs text-slate-500">Live Zoom Classes, Recorded Video Bank, Exam Room, and Mentorship cards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.quickActionHubs?.map((hub, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#1769D2]">CARD #{idx + 1}</span>
                    <input
                      type="text"
                      value={hub.badge || ''}
                      onChange={(e) => {
                        const updated = [...settings.quickActionHubs];
                        updated[idx].badge = e.target.value;
                        setSettings({ ...settings, quickActionHubs: updated });
                      }}
                      placeholder="Badge (e.g. Daily Live)"
                      className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={hub.title || ''}
                      onChange={(e) => {
                        const updated = [...settings.quickActionHubs];
                        updated[idx].title = e.target.value;
                        setSettings({ ...settings, quickActionHubs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={hub.description || ''}
                      onChange={(e) => {
                        const updated = [...settings.quickActionHubs];
                        updated[idx].description = e.target.value;
                        setSettings({ ...settings, quickActionHubs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5">Button Label</label>
                      <input
                        type="text"
                        value={hub.buttonText || ''}
                        onChange={(e) => {
                          const updated = [...settings.quickActionHubs];
                          updated[idx].buttonText = e.target.value;
                          setSettings({ ...settings, quickActionHubs: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5">Link Path</label>
                      <input
                        type="text"
                        value={hub.link || ''}
                        onChange={(e) => {
                          const updated = [...settings.quickActionHubs];
                          updated[idx].link = e.target.value;
                          setSettings({ ...settings, quickActionHubs: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ZOOM & MOCK TESTS */}
        {activeTab === 'zoom' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Zoom Classroom & Mock Test Banners</h2>
              <p className="text-xs text-slate-500">Configure interactive banners for live batches and exam practice.</p>
            </div>

            {/* Zoom Banner */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3 text-xs">
              <h3 className="font-extrabold text-[#0B1E3D] text-sm">Interactive Zoom Classroom Banner</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headline</label>
                  <input
                    type="text"
                    value={settings.zoomSection?.headline || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        zoomSection: { ...settings.zoomSection, headline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Schedule Text</label>
                  <input
                    type="text"
                    value={settings.zoomSection?.schedule || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        zoomSection: { ...settings.zoomSection, schedule: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={settings.zoomSection?.description || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        zoomSection: { ...settings.zoomSection, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Mock Test Callout */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h3 className="font-extrabold text-[#0B1E3D] text-sm">Online Mock Tests Callout</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headline</label>
                  <input
                    type="text"
                    value={settings.modelTestSection?.headline || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        modelTestSection: { ...settings.modelTestSection, headline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Paper Count Badge</label>
                  <input
                    type="text"
                    value={settings.modelTestSection?.paperCountText || '10 to 20 Full-Length Mock Papers'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        modelTestSection: { ...settings.modelTestSection, paperCountText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={settings.modelTestSection?.description || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        modelTestSection: { ...settings.modelTestSection, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ROADMAP & ABOUT STATS */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Career Roadmap & About Platform Stats</h2>
              <p className="text-xs text-slate-500">Configure the 6 milestone steps and high-impact achievement counters.</p>
            </div>

            {/* Stats Counters */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Hero & About Platform Statistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {settings.aboutSection?.stats?.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...settings.aboutSection.stats];
                        updated[idx].value = e.target.value;
                        setSettings({
                          ...settings,
                          aboutSection: { ...settings.aboutSection, stats: updated },
                        });
                      }}
                      placeholder="e.g. 15,000+"
                      className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-extrabold text-sm text-[#12356B]"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...settings.aboutSection.stats];
                        updated[idx].label = e.target.value;
                        setSettings({
                          ...settings,
                          aboutSection: { ...settings.aboutSection, stats: updated },
                        });
                      }}
                      placeholder="Label"
                      className="w-full px-2 py-1 rounded border border-slate-200 bg-white text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 6-Step Roadmap */}
            <div className="space-y-3 pt-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                6-Step Preparation Roadmap
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {settings.roadmapSection?.steps?.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-black text-[#1769D2]">STEP 0{idx + 1}</span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...settings.roadmapSection.steps];
                        updated[idx].title = e.target.value;
                        setSettings({
                          ...settings,
                          roadmapSection: { ...settings.roadmapSection, steps: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold"
                    />
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...settings.roadmapSection.steps];
                        updated[idx].description = e.target.value;
                        setSettings({
                          ...settings,
                          roadmapSection: { ...settings.roadmapSection, steps: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-[#0B1E3D]">Student Success Stories</h2>
                <p className="text-xs text-slate-500">Manage real bank officer and aspirant reviews with photos and ranks.</p>
              </div>
              <button
                type="button"
                onClick={addTestimonial}
                className="inline-flex items-center gap-1.5 bg-[#1769D2] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.testimonials?.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#12356B]">REVIEW #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5">Student Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => {
                          const updated = [...settings.testimonials];
                          updated[idx].name = e.target.value;
                          setSettings({ ...settings, testimonials: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5">Bank / Designation</label>
                      <input
                        type="text"
                        value={t.designation}
                        onChange={(e) => {
                          const updated = [...settings.testimonials];
                          updated[idx].designation = e.target.value;
                          setSettings({ ...settings, testimonials: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Exam Cleared (e.g. JAIIB 84%)</label>
                    <input
                      type="text"
                      value={t.exam}
                      onChange={(e) => {
                        const updated = [...settings.testimonials];
                        updated[idx].exam = e.target.value;
                        setSettings({ ...settings, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-emerald-700 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Student Quote / Feedback</label>
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...settings.testimonials];
                        updated[idx].quote = e.target.value;
                        setSettings({ ...settings, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Avatar / Photo URL</label>
                    <input
                      type="text"
                      value={t.image}
                      onChange={(e) => {
                        const updated = [...settings.testimonials];
                        updated[idx].image = e.target.value;
                        setSettings({ ...settings, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-[10px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-[#0B1E3D]">Frequently Asked Questions</h2>
                <p className="text-xs text-slate-500">Manage FAQs displayed across homepage and the dedicated FAQ page.</p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-1.5 bg-[#1769D2] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="space-y-3">
              {settings.faqs?.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#1769D2]">QUESTION #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...settings.faqs];
                      updated[idx].question = e.target.value;
                      setSettings({ ...settings, faqs: updated });
                    }}
                    placeholder="Enter question here..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-bold"
                  />

                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...settings.faqs];
                      updated[idx].answer = e.target.value;
                      setSettings({ ...settings, faqs: updated });
                    }}
                    placeholder="Enter comprehensive answer..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CONTACT & POLICIES */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-[#0B1E3D]">Contact Information & Free Demo Quota</h2>
              <p className="text-xs text-slate-500">Phone numbers, emails, physical branch address, and student demo allowances.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={settings.contactInfo?.phone || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: { ...settings.contactInfo, phone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp Hotline</label>
                <input
                  type="text"
                  value={settings.contactInfo?.whatsapp || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: { ...settings.contactInfo, whatsapp: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={settings.contactInfo?.email || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: { ...settings.contactInfo, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Working Hours</label>
                <input
                  type="text"
                  value={settings.contactInfo?.workingHours || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: { ...settings.contactInfo, workingHours: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Office / Branch Address</label>
                <input
                  type="text"
                  value={settings.contactInfo?.address || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: { ...settings.contactInfo, address: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Demo Policy */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
                Student Free Demo Policy & Quotas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Free Demo Recorded Lessons Allowed</label>
                  <input
                    type="number"
                    min={1}
                    value={settings.demoPolicy?.freeRecordedLessonsLimit || 2}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        demoPolicy: {
                          ...settings.demoPolicy,
                          freeRecordedLessonsLimit: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Free Demo Mock Tests Allowed</label>
                  <input
                    type="number"
                    min={1}
                    value={settings.demoPolicy?.freeMockTestsLimit || 1}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        demoPolicy: {
                          ...settings.demoPolicy,
                          freeMockTestsLimit: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Floating/Bottom Bar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white text-sm font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Publishing Changes...' : 'Save & Synchronize All Settings'}
        </button>
      </div>
    </div>
  );
};
