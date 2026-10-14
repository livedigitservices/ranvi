import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PageBanner } from '../../components/common/PageBanner';
import { enquiryService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { PlayCircle, CheckCircle2, ShieldCheck, Video, Sparkles, Send } from 'lucide-react';

export const EnquiryDemoPage = () => {
  const [searchParams] = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: 'BANKERS_PATH',
    courseInterest: initialCourse || 'JAIIB Master Certification 2026',
    type: 'DEMO_CLASS',
    preferredMode: 'ONLINE',
    preferredSchedule: 'Evening (7:30 PM)',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, courseInterest: initialCourse }));
    }
  }, [initialCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await enquiryService.submitEnquiry(formData);
      if (res.success) {
        success('Free Demo Registered! Check your email and SMS for joining details.');
        setSubmitted(true);
      }
    } catch (err) {
      toastError(err.message || 'Submission failed. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <PageBanner
        title="Book a Free Live Demo Class"
        subtitle="Experience our interactive teaching pedagogy, digital notes, and live doubt solving with senior faculty before enrolling."
        breadcrumbs={[{ label: 'Book Free Demo' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border border-slate-200 shadow-lg">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#12356B] font-heading">
                Demo Registration Confirmed!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our academic team has registered your seat for the upcoming live Zoom demonstration session for <strong>{formData.courseInterest}</strong>.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  to="/student/dashboard"
                  className="bg-[#12356B] text-white px-6 py-3 rounded-xl font-bold text-xs"
                >
                  Go to Student Portal
                </Link>
                <Link
                  to="/bankers-path"
                  className="bg-[#EAF3FF] text-[#1769D2] border border-[#1769D2]/20 px-6 py-3 rounded-xl font-bold text-xs"
                >
                  Explore All Programs
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-extrabold text-[#1769D2] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F4B942]" /> Instant Seat Booking
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#12356B] font-heading mt-1">
                  Register for Upcoming Live Demo Batch
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Vikas Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikas@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Coaching Division</label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-white"
                  >
                    <option value="BANKERS_PATH">Banker's Path (JAIIB / CAIIB / DBF / Treasury)</option>
                    <option value="COMPETITIVE_EXAMS">Competitive Exams (IBPS / SBI / SSC / Railways)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program of Interest</label>
                  <input
                    type="text"
                    required
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                    placeholder="e.g. JAIIB Master Program"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Learning Mode</label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-white"
                  >
                    <option value="ONLINE">Live Online Zoom Batches</option>
                    <option value="OFFLINE">Offline Classroom Coaching</option>
                    <option value="BOTH">Both (Hybrid Mode)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                <select
                  value={formData.preferredSchedule}
                  onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-white"
                >
                  <option value="Morning (6:30 AM - 8:00 AM)">Early Morning (6:30 AM - 8:00 AM)</option>
                  <option value="Evening (7:30 PM - 9:00 PM)">Evening (7:30 PM - 9:00 PM)</option>
                  <option value="Late Evening (8:30 PM - 10:00 PM)">Late Evening (8:30 PM - 10:00 PM)</option>
                  <option value="Weekend Marathon">Weekend Special Marathon</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Any Specific Queries / Current Bank Post</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Currently working as Clerk in Canara Bank preparing for Scale-1 promotion..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-[#12356B]/20 disabled:opacity-50"
              >
                <PlayCircle className="w-5 h-5 text-[#F4B942]" />
                {submitting ? 'Confirming Demo Seat...' : 'Confirm Free Demo Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
