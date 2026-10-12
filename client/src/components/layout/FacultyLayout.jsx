import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RanviLogo } from '../common/RanviLogo';
import {
  LayoutDashboard,
  Video,
  BookOpen,
  FileCheck2,
  Users,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Award,
} from 'lucide-react';

export const FacultyLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Faculty Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { name: 'Live Batches (Zoom)', path: '/admin/live-classes', icon: Video },
    { name: 'Video Lessons & Media', path: '/admin/lessons', icon: BookOpen },
    { name: 'Mock Tests & Papers', path: '/admin/mock-tests', icon: FileCheck2 },
    { name: 'Student Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Top Header */}
      <header className="h-20 shrink-0 bg-[#0B1E3D] text-white border-b border-blue-900/60 z-30 shadow-md">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center">
              <RanviLogo size="small" variant="light" />
              <span className="hidden sm:inline-block ml-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-[#F4B942] text-[#0B1E3D] uppercase tracking-wider">
                FACULTY PORTAL
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-bold text-white/90 hover:text-white px-3.5 py-2 rounded-xl bg-white/10 hidden md:inline-flex items-center gap-1.5 hover:bg-white/20 transition-colors"
            >
              Public Website <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-white/20">
              <div className="w-9 h-9 rounded-full bg-[#1769D2] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-white/20">
                {user?.name?.charAt(0) || 'F'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{user?.name}</p>
                <p className="text-[10px] text-[#F4B942] font-semibold">Faculty Mentor</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-rose-300 hover:bg-rose-900/50 hover:text-rose-100 transition-colors ml-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body: Fixed Left Sidebar + Scrollable Right Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Faculty Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header in Drawer */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 lg:hidden shrink-0">
            <RanviLogo size="small" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Nav Area inside Sidebar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#0B1E3D] via-[#12356B] to-[#1769D2] text-white shadow-md">
              <p className="text-[10px] text-[#F4B942] font-bold uppercase tracking-wider">Senior Teaching Faculty</p>
              <p className="text-sm font-bold truncate mt-0.5">{user?.name}</p>
              <p className="text-[11px] text-blue-200 font-semibold mt-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#F4B942]" /> Banking & Competitive Mentor
              </p>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#0B1E3D] text-white shadow-md shadow-[#0B1E3D]/20'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B1E3D]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer with Sign Out */}
          <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Faculty Content Outlet */}
        <main className="flex-1 overflow-y-auto min-w-0 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
