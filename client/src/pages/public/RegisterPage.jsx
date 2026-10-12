import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, Lock, Mail, User, Phone, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    targetExam: 'JAIIB 2026',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await register(formData);
      success(`Welcome to Ranvi Institutions, ${data.user.name}!`);
      navigate('/student/dashboard');
    } catch (err) {
      toastError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#12356B] to-[#1769D2] text-white flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-8 h-8 text-[#F4B942]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12356B] font-heading">
            Create Student Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Enrol in courses, access live Zoom batches & attempt online model test papers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Examination</label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={formData.targetExam}
                  onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-white"
                >
                  <option value="JAIIB 2026">JAIIB Certification 2026</option>
                  <option value="CAIIB 2026">CAIIB Advanced Mastery</option>
                  <option value="DBF / DTM">DBF / DTM Certification</option>
                  <option value="IBPS PO / Clerk">IBPS PO / Clerk</option>
                  <option value="SBI PO / Clerk">SBI PO / Clerk</option>
                  <option value="SSC CGL / CHSL">SSC CGL / CHSL</option>
                  <option value="Railways RRB">Railways RRB Exams</option>
                  <option value="Other Competitive Exams">Other Competitive Exams</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Set Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-[#12356B]/20 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register & Enter Student Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1769D2] shrink-0 mt-0.5" />
            <span>
              By registering, your account will be linked to this browser session to ensure secure access to lectures and tests.
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="text-[#1769D2] font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};
