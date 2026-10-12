import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services';
import { User, Phone, Mail, BookOpen, Lock, ShieldCheck, Save, KeyRound } from 'lucide-react';

export const StudentProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    targetExam: user?.targetExam || '',
  });
  const [profileUpdating, setProfileUpdating] = useState(false);

  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwUpdating, setPwUpdating] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdating(true);
    try {
      await updateProfile(profileForm);
      success('Profile updated successfully');
    } catch (err) {
      toastError(err.message || 'Profile update failed');
    } finally {
      setProfileUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toastError('New password and confirm password do not match');
      return;
    }
    setPwUpdating(true);
    try {
      const res = await authService.changePassword(pwForm.currentPassword, pwForm.newPassword);
      if (res.success) {
        success('Password updated successfully');
        setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      toastError(err.message || 'Password update failed');
    } finally {
      setPwUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
          Student Profile & Device Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal information, examination target, and secure single-device login.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-[#12356B] font-heading flex items-center gap-2">
              <User className="w-5 h-5 text-[#1769D2]" /> Personal Details
            </h3>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Examination</label>
              <input
                type="text"
                value={profileForm.targetExam}
                onChange={(e) => setProfileForm({ ...profileForm, targetExam: e.target.value })}
                placeholder="e.g. JAIIB 2026 / SBI PO"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <button
              type="submit"
              disabled={profileUpdating}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {profileUpdating ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-[#12356B] font-heading flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#1769D2]" /> Change Password
            </h3>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
              />
            </div>

            <button
              type="submit"
              disabled={pwUpdating}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1769D2] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md disabled:opacity-50"
            >
              <Lock className="w-4 h-4" /> {pwUpdating ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Single Device Session Info */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#12356B]">Single-Active-Device Account Protection</h3>
            <p className="text-xs text-slate-500">Your account is bound to one active session to secure your classes and test history.</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          If you switch to a new phone or computer, signing in there will seamlessly transfer your session and log out the previous device. If you ever face device lock issues, institute administrators can reset your registration instantly.
        </p>
      </div>
    </div>
  );
};
