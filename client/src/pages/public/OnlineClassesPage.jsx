import React from 'react';
import { PageBanner } from '../../components/common/PageBanner';
import { Video, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OnlineClassesPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <PageBanner
        title="Live Interactive Online Classes via Zoom"
        subtitle="Experience high-definition live streaming lectures led by senior ex-bank executives. Ask doubts in real-time, review digital whiteboard notes, and access instant recordings."
        breadcrumbs={[{ label: 'Online Classes' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] text-[#1769D2] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12356B] font-heading">Live Zoom Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enrolled students can join secure live Zoom batches with a single click from their personalized student portal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12356B] font-heading">Flexible Daily Timings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Early morning (6:30 AM) and evening (7:30 PM & 8:30 PM) batches designed specially to suit working banking professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12356B] font-heading">Recorded Backup Available</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Missed a live session due to bank branch work? High-definition recorded backups are automatically added within 2 hours.
            </p>
          </div>
        </div>

        {/* Live Batch Timetable Overview */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-[#1769D2] tracking-wider">Weekly Schedule</span>
              <h2 className="text-2xl font-extrabold text-[#12356B] font-heading mt-1">
                Upcoming Live Class Batches
              </h2>
            </div>
            <Link
              to="/student/live-classes"
              className="inline-flex items-center gap-2 bg-[#12356B] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#0e2a56] transition-colors"
            >
              Access Live Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                  <th className="p-3.5 font-bold">Program</th>
                  <th className="p-3.5 font-bold">Batch Type</th>
                  <th className="p-3.5 font-bold">Timings (IST)</th>
                  <th className="p-3.5 font-bold">Faculty Lead</th>
                  <th className="p-3.5 font-bold">Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3.5 font-bold text-[#12356B]">JAIIB Master Batch 2026</td>
                  <td className="p-3.5">Evening Regular</td>
                  <td className="p-3.5 font-semibold">7:30 PM - 9:00 PM (Daily)</td>
                  <td className="p-3.5">Prof. Rajesh Sharma (Ex-AGM SBI)</td>
                  <td className="p-3.5"><span className="bg-blue-50 text-[#1769D2] font-bold px-2 py-1 rounded">Zoom Live</span></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#12356B]">CAIIB Executive Batch</td>
                  <td className="p-3.5">Late Evening</td>
                  <td className="p-3.5 font-semibold">8:30 PM - 10:00 PM (Mon-Sat)</td>
                  <td className="p-3.5">Shri Arvind Narayanan (Ex-Chief Mgr PNB)</td>
                  <td className="p-3.5"><span className="bg-blue-50 text-[#1769D2] font-bold px-2 py-1 rounded">Zoom Live</span></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#12356B]">IBPS & SBI PO Foundation</td>
                  <td className="p-3.5">Morning Intensive</td>
                  <td className="p-3.5 font-semibold">9:00 AM - 12:00 PM (Mon-Fri)</td>
                  <td className="p-3.5">Kavita Iyer & Anurag Mishra</td>
                  <td className="p-3.5"><span className="bg-blue-50 text-[#1769D2] font-bold px-2 py-1 rounded">Zoom Live</span></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#12356B]">SSC CGL / CHSL Selection Batch</td>
                  <td className="p-3.5">Daytime Batch</td>
                  <td className="p-3.5 font-semibold">10:00 AM - 1:00 PM (Daily)</td>
                  <td className="p-3.5">Deepak Saxena</td>
                  <td className="p-3.5"><span className="bg-blue-50 text-[#1769D2] font-bold px-2 py-1 rounded">Zoom Live</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
