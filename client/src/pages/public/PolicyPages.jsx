import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../../components/common/PageBanner';
import { HelpCircle, ChevronDown, ChevronUp, Shield, AlertTriangle, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage = () => (
  <div className="space-y-10 pb-20">
    <PageBanner title="Privacy Policy" subtitle="How Ranvi Institutions collects, secures, and handles student data." breadcrumbs={[{ label: 'Privacy Policy' }]} />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
      <h3 className="text-lg font-bold text-[#12356B]">1. Information We Collect</h3>
      <p>Ranvi Institutions collects personal details (such as full name, email, phone number, examination category) strictly for educational enrolment, live Zoom class attendance, mock test performance evaluations, and single-device login security.</p>

      <h3 className="text-lg font-bold text-[#12356B]">2. Device and Session Security</h3>
      <p>To protect course content and prevent account sharing, our server tracks active device sessions. Only one active browser or device session is allowed per registered student account at any given time.</p>

      <h3 className="text-lg font-bold text-[#12356B]">3. Payment Processing</h3>
      <p>All online payments are securely processed through Razorpay. We do not store sensitive credit/debit card credentials or UPI PINs on our servers.</p>
    </div>
  </div>
);

export const TermsPage = () => (
  <div className="space-y-10 pb-20">
    <PageBanner title="Terms and Conditions" subtitle="Guidelines and terms governing enrolment and portal usage at Ranvi Institutions." breadcrumbs={[{ label: 'Terms & Conditions' }]} />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
      <h3 className="text-lg font-bold text-[#12356B]">1. Course Enrolment & Account Use</h3>
      <p>Course enrolments are personal to the student and non-transferable. Sharing student credentials or Zoom live class meeting links with unauthorized third parties will result in immediate session suspension without refund.</p>

      <h3 className="text-lg font-bold text-[#12356B]">2. Intellectual Property</h3>
      <p>All study materials, video recordings, mock questions, and formula sheets are the exclusive intellectual property of Ranvi Institutions. Unauthorized recording, reproduction, or distribution is strictly prohibited.</p>
    </div>
  </div>
);

export const RefundPolicyPage = () => (
  <div className="space-y-10 pb-20">
    <PageBanner title="Refund and Cancellation Policy" subtitle="Details on course cancellations, batch adjustments, and refund terms." breadcrumbs={[{ label: 'Refund Policy' }]} />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
      <h3 className="text-lg font-bold text-[#12356B]">1. Free Demo Opportunity</h3>
      <p>Ranvi Institutions provides free live demo classes and free model test papers for all flagship courses so students can evaluate pedagogy before purchasing.</p>

      <h3 className="text-lg font-bold text-[#12356B]">2. Refund Requests</h3>
      <p>Refund requests submitted within 48 hours of purchase will be reviewed by the administration. In cases where batch rescheduling or device changes are needed, our academic team facilitates smooth transitions.</p>
    </div>
  </div>
);

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    {
      q: 'How do live online classes on Zoom work?',
      a: 'Once enrolled, your personalized student portal shows your live timetable. 10 minutes prior to class, the "Join Live Class" button becomes active, opening the Zoom session directly.',
    },
    {
      q: 'Can I access the course on both mobile and laptop?',
      a: 'Yes, you can use our responsive portal on any device. However, to prevent unauthorized sharing, only one active device session is permitted at a time. When you log in on your laptop, your phone session will safely log out.',
    },
    {
      q: 'What if I miss a live class due to bank duty?',
      a: 'Every live class is recorded and uploaded to your student portal within 2 hours, along with the faculty’s PDF notes.',
    },
    {
      q: 'How many model test papers are included?',
      a: 'Each major course includes 10 to 20 full-length online model test papers with timer countdown, negative marking, and detailed answer explanations.',
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      <PageBanner title="Frequently Asked Questions" subtitle="Find quick answers regarding batches, access, mock tests, and admissions." breadcrumbs={[{ label: 'FAQ' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#12356B] bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#1769D2] shrink-0" /> {faq.q}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
              </button>
              {isOpen && (
                <div className="p-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NotFoundPage = () => (
  <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
    <div className="max-w-md space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-[#EAF3FF] text-[#1769D2] flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-[#12356B] font-heading">404</h1>
      <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
      <p className="text-xs text-slate-600">The page you are looking for might have been moved or does not exist.</p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  </div>
);
