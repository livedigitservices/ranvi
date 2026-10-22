import React, { useState } from 'react';
import { PageBanner } from '../../components/common/PageBanner';
import { enquiryService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { WhatsAppIcon, Instagram, Facebook, Youtube, Linkedin } from '../../components/common/SocialIcons';

export const ContactPage = () => {
  const { settings } = useSiteSettings();
  const { success, error: toastError } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: 'GENERAL',
    courseInterest: 'General Coaching Enquiry',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contact = settings?.contactInfo || {
    phone: '+91 98765 43210',
    email: 'admissions@ranviinstitutions.com',
    address: 'Ranvi Knowledge Tower, MG Road, Educational District, India',
    workingHours: 'Monday - Saturday: 8:00 AM – 8:00 PM IST',
    whatsapp: '+91 98765 43210',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await enquiryService.submitEnquiry({ ...formData, type: 'GENERAL' });
      if (res.success) {
        success('Thank you! Your message has been sent successfully.');
        setSubmitted(true);
      }
    } catch (err) {
      toastError(err.message || 'Failed to submit enquiry. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <PageBanner
        title="Contact Ranvi Institutions"
        subtitle="Have questions regarding upcoming batches, fee structures, or demo sessions? Reach out to our admissions team."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-extrabold text-[#12356B] font-heading">
              Institute Contact Details
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#1769D2] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#12356B]">Campus Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#12356B]">Admissions Hotline</h4>
                  <a href={`tel:${contact.phone}`} className="text-xs text-[#1769D2] font-bold block mt-0.5 hover:underline">
                    {contact.phone}
                  </a>
                  <span className="text-[11px] text-slate-500">Available Mon-Sat: 8 AM - 8 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#12356B]">Email Support</h4>
                  <a href={`mailto:${contact.email}`} className="text-xs text-[#1769D2] font-bold block mt-0.5 hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#12356B]">Counseling Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {contact.workingHours}
                  </p>
                </div>
              </div>

              {/* Connect On Social Media */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs text-[#12356B] uppercase tracking-wider">
                  Connect With Our Admissions Desk
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '') || '919876543210'}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#25D366]/20 text-[#25D366] border border-slate-200 hover:border-[#25D366]/40 transition-all shadow-xs group"
                  >
                    <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Subscribe on YouTube"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-[#FF0000] border border-slate-200 hover:border-red-300 transition-all shadow-xs group"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Follow on Instagram"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-pink-600 border border-slate-200 hover:border-pink-300 transition-all shadow-xs group"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Follow on Facebook"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-[#1877F2] border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Connect on LinkedIn"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-[#0A66C2] border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#12356B]">Thank You for Reaching Out!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your enquiry has been assigned to our counseling desk. An advisor will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#1769D2] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#12356B] font-heading mb-4">
                  Send a Message or Query
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
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
                      placeholder="ramesh@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Coaching Division</label>
                    <select
                      value={formData.division}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2] bg-white"
                    >
                      <option value="GENERAL">General Coaching Enquiry</option>
                      <option value="BANKERS_PATH">Banker's Path (JAIIB / CAIIB / DBF)</option>
                      <option value="COMPETITIVE_EXAMS">Competitive Exams (Banking / SSC / RRB)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course or Certification of Interest</label>
                  <input
                    type="text"
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                    placeholder="e.g. JAIIB 2026 or SBI PO Batch"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Specific Questions</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your batch timing preferences or queries..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending Enquiry...' : 'Submit Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
