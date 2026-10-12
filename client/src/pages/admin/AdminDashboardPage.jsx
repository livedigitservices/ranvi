import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services';
import {
  Users,
  BookOpen,
  Video,
  FileCheck2,
  CreditCard,
  TrendingUp,
  Award,
  ShieldAlert,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-semibold text-slate-500">Loading admin operations metrics...</p>
      </div>
    );
  }

  const metrics = stats?.metrics || {};
  const recentStudents = stats?.recentStudents || [];
  const recentOrders = stats?.recentOrders || [];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
            Ranvi Institutions Admin Portal
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational dashboard for course catalog, Zoom live classes, student access, payments, and mock exams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/courses/new"
            className="inline-flex items-center gap-1.5 bg-[#12356B] hover:bg-[#0e2a56] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Course
          </Link>
          <Link
            to="/admin/live-classes"
            className="inline-flex items-center gap-1.5 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Video className="w-4 h-4" /> Schedule Zoom Class
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Total Students</span>
            <p className="text-2xl font-black text-[#12356B]">{metrics.totalStudents || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Verified Revenue</span>
            <p className="text-2xl font-black text-emerald-700">₹{metrics.totalRevenue?.toLocaleString('en-IN') || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Published Courses</span>
            <p className="text-2xl font-black text-[#12356B]">{metrics.totalCourses || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Model Papers</span>
            <p className="text-2xl font-black text-[#12356B]">{metrics.totalMockTests || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-[#12356B] font-heading flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1769D2]" /> Recent Student Registrations
            </h3>
            <Link to="/admin/students" className="text-xs font-bold text-[#1769D2] hover:underline">
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentStudents.map((s) => (
              <div key={s._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#12356B]">{s.name}</p>
                  <p className="text-slate-400">{s.email} • {s.phone}</p>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-[#12356B] font-heading flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" /> Recent Verified Orders
            </h3>
            <Link to="/admin/payments" className="text-xs font-bold text-[#1769D2] hover:underline">
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentOrders.map((o) => (
              <div key={o._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#12356B]">{o.studentId?.name || 'Student'}</p>
                  <p className="text-slate-400 font-mono text-[10px]">{o.receiptNumber || o.razorpayOrderId}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-emerald-700">₹{o.amount}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
