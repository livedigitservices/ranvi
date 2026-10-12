import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { RanviLogo } from './RanviLogo';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  PhoneCall,
  LayoutDashboard,
  Sparkles,
  BookOpen,
  PlayCircle,
  GraduationCap,
  Video,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, isFaculty, logout } = useAuth();
  const { settings } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const topAnnouncement = settings?.topAnnouncement || {
    badgeText: 'Admissions Open 2026',
    message: 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!',
    phone: '+91 98765 43210',
    isActive: true,
  };
  const stripText = settings?.bannerStripText || settings?.supportingMessage || 'Learn • Excel • Achieve';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: "Banker's Path", path: '/bankers-path' },
    { name: 'Competitive Exams', path: '/competitive-exams' },
    { name: 'Online Classes', path: '/online-classes' },
    { name: 'Recorded Classes', path: '/recorded-classes' },
    { name: 'Mock Tests', path: '/mock-tests' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notification Announcement Bar */}
      {topAnnouncement.isActive !== false && (
        <div className="bg-[#0B1E3D] text-white text-xs py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
            <div className="flex items-center gap-2">
              <span className="bg-[#F4B942] text-[#0B1E3D] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                {topAnnouncement.badgeText || 'Admissions Open 2026'}
              </span>
              <span className="text-slate-200">
                {topAnnouncement.message || 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!'}
              </span>
            </div>
            <div className="flex items-center gap-6">
              {topAnnouncement.phone && (
                <a
                  href={`tel:${topAnnouncement.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 hover:text-[#F4B942] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F4B942]" />
                  <span className="font-bold">{topAnnouncement.phone}</span>
                </a>
              )}
              <span className="text-white/40">•</span>
              <span className="text-[#F4B942] font-extrabold tracking-wider">
                {stripText}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand Logo & Academic Crest Emblem */}
          <Link to="/" className="flex items-center group">
            <RanviLogo size="default" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-bold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-[#1769D2] bg-[#EAF3FF]'
                      : 'text-[#17243A] hover:text-[#12356B] hover:bg-slate-100/80'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#12356B] bg-[#EAF3FF] hover:bg-[#d5e7ff] border border-[#1769D2]/25 px-4 py-2.5 rounded-xl transition-all duration-150 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#1769D2]" />
              Enquire Now
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 bg-[#0B1E3D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#12356B] transition-all shadow-md"
                >
                  <User className="w-4 h-4 text-[#F4B942]" />
                  <span>{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-white/70" />
                </button>

                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-[#0B1E3D] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-[#EAF3FF] text-[#1769D2]">
                        {user?.role}
                      </span>
                    </div>

                    {isFaculty ? (
                      <Link
                        to="/faculty/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#EAF3FF] hover:text-[#1769D2]"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#1769D2]" />
                        Faculty Dashboard
                      </Link>
                    ) : isAdmin ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#EAF3FF] hover:text-[#1769D2]"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#1769D2]" />
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/student/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#EAF3FF] hover:text-[#1769D2]"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#1769D2]" />
                        Student Portal
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-[#0B1E3D] hover:bg-[#12356B] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
              >
                <User className="w-4 h-4 text-[#F4B942]" />
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/enquiry"
              className="text-xs font-black bg-[#EAF3FF] text-[#12356B] px-3 py-1.5 rounded-lg border border-[#1769D2]/20"
            >
              Enquire
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B1E3D] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-bold ${
                  isActive
                    ? 'bg-[#EAF3FF] text-[#1769D2]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to={isFaculty ? '/faculty/dashboard' : isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#0B1E3D] text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Go to {isFaculty ? 'Faculty Portal' : isAdmin ? 'Admin Dashboard' : 'Student Portal'}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2.5 text-rose-600 font-bold text-sm hover:bg-rose-50 rounded-xl"
                >
                  Logout ({user?.name})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#0B1E3D] text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#1769D2] text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
