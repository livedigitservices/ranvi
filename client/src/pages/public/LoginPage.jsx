import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RanviLogo } from '../../components/common/RanviLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectPath = location.state?.from || '/student/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await login(email, password);
      success(`Welcome back, ${data.user.name}!`);

      if (['SUPER_ADMIN', 'ADMIN'].includes(data.user.role)) {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'FACULTY') {
        navigate('/faculty/dashboard');
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials');
      toastError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill credentials for reviewers
  const handleQuickFill = (demoEmail, demoPw) => {
    setEmail(demoEmail);
    setPassword(demoPw);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-[#EAF3FF]/40">
      <div className="max-w-md w-full space-y-6">
        {/* Crest Brand Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <RanviLogo size="default" showTagline={true} />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading mt-2">
            Student & Faculty Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
            Enter your registered credentials to access your courses, live Zoom batches, and mock exams.
          </p>
        </div>

        {/* Luxury Login Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5 relative">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@ranviinstitutions.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1E3D] hover:bg-[#12356B] text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-md hover:scale-102 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              <ArrowRight className="w-4 h-4 text-[#F4B942]" />
            </button>
          </form>

          {/* Single-Device Information notice */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 text-[11px] text-blue-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#1769D2] shrink-0 mt-0.5" />
            <span>
              <strong>Single-Device Concurrency:</strong> Only one active device session is permitted per student account. New logins automatically revoke prior sessions.
            </span>
          </div>

          {/* Quick Fill Test Accounts */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">
              Quick Test Credentials (1-Click)
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('student@ranviinstitutions.com', 'RanviStudent@2026!')}
                className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-center"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('faculty.rajesh@ranviinstitutions.com', 'RanviFaculty@2026!')}
                className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-center"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@ranviinstitutions.com', 'RanviAdmin@2026!')}
                className="py-2 px-2 rounded-xl bg-[#EAF3FF] hover:bg-blue-100 text-[#1769D2] font-black transition-all text-center"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-600 font-semibold">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#1769D2] font-black hover:underline">
            Register as a Student
          </Link>
        </p>
      </div>
    </div>
  );
};
