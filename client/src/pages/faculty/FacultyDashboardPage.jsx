import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import {
  Video,
  BookOpen,
  FileCheck2,
  Users,
  Plus,
  Calendar,
  Clock,
  PlayCircle,
  ShieldCheck,
  ExternalLink,
  Award,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';

export const FacultyDashboardPage = () => {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [liveClasses, setLiveClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal for scheduling live Zoom class
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [submittingClass, setSubmittingClass] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    batchName: 'Evening Master Batch 2026',
    subject: 'Principles & Practices of Banking (PPB)',
    scheduledDate: new Date().toISOString().split('T')[0],
    startTime: '19:00',
    durationMinutes: 60,
    zoomMeetingUrl: 'https://zoom.us/j/9876543210',
    zoomMeetingId: '987 654 3210',
    zoomPasscode: 'RANVI2026',
    description: 'Interactive concept review and case studies with real bank problems.',
  });

  const fetchData = async () => {
    try {
      const [liveRes, courseRes] = await Promise.all([
        api.get('/live-classes'),
        api.get('/courses'),
      ]);

      if (liveRes.success && liveRes.data) {
        setLiveClasses(liveRes.data);
      }
      if (courseRes.success && courseRes.data) {
        setCourses(courseRes.data.courses || []);
        if (courseRes.data.courses && courseRes.data.courses.length > 0 && !formData.courseId) {
          setFormData((prev) => ({ ...prev, courseId: courseRes.data.courses[0]._id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setSubmittingClass(true);

    try {
      const res = await api.post('/live-classes', {
        ...formData,
        facultyName: user?.name || 'Senior Banking Faculty',
      });

      if (res.success) {
        success('Live Zoom Class scheduled successfully!');
        setShowScheduleModal(false);
        fetchData();
      }
    } catch (err) {
      toastError(err.message || 'Failed to schedule live class');
    } finally {
      setSubmittingClass(false);
    }
  };

  const handleCancelClass = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled live session?')) return;
    try {
      const res = await api.put(`/live-classes/${id}/cancel`);
      if (res.success) {
        success('Session status updated to CANCELLED');
        fetchData();
      }
    } catch (err) {
      toastError(err.message || 'Action failed');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-bold text-slate-500">Loading Faculty Teaching Portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Faculty Banner */}
      <div className="bg-gradient-to-r from-[#0B1E3D] via-[#12356B] to-[#1769D2] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#F4B942] text-[#0B1E3D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Faculty Academic Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Welcome, {user?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Manage your live Zoom batches, upload video lessons, and interact with enrolled banking aspirants.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Schedule Live Class
            </button>
            <Link
              to="/admin/lessons"
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Video className="w-4 h-4" /> Manage Lessons
            </Link>
          </div>
        </div>
      </div>

      {/* Faculty KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Scheduled Live Batches</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{liveClasses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Active Flagship Courses</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{courses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Enrolled Aspirants</span>
            <p className="text-2xl font-black text-[#0B1E3D]">340+</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Average Batch Pass Rate</span>
            <p className="text-2xl font-black text-[#0B1E3D]">89.4%</p>
          </div>
        </div>
      </div>

      {/* Scheduled Live Batches Table & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase text-[#1769D2] tracking-wider">Teaching Timetable</span>
            <h2 className="text-xl font-black text-[#0B1E3D] font-heading mt-0.5">
              My Live Zoom Batches
            </h2>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="text-xs font-bold bg-[#EAF3FF] hover:bg-blue-100 text-[#1769D2] px-3.5 py-2 rounded-xl transition-all flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Batch
          </button>
        </div>

        {liveClasses.length > 0 ? (
          <div className="space-y-3">
            {liveClasses.map((cls) => (
              <div
                key={cls._id}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-blue-100 text-[#1769D2] uppercase">
                      {cls.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-600">Batch: {cls.batchName}</span>
                    {cls.status === 'COMPLETED' ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-700">COMPLETED</span>
                    ) : cls.status === 'CANCELLED' ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-700">CANCELLED</span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">SCHEDULED</span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-[#0B1E3D]">{cls.title}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#1769D2] shrink-0" />
                      {new Date(cls.scheduledDate).toLocaleDateString()}
                    </span>
                    <span>at <strong>{cls.startTime}</strong> ({cls.durationMinutes} mins)</span>
                    <span>•</span>
                    <span>Passcode: <code className="bg-slate-200 px-1 py-0.5 rounded font-bold">{cls.zoomPasscode || 'None'}</code></span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={cls.zoomMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#1769D2] hover:bg-[#12356B] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4" /> Start Meeting as Host
                  </a>

                  {cls.status === 'SCHEDULED' && (
                    <button
                      onClick={() => handleCancelClass(cls._id)}
                      className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500 text-xs">
            <Video className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            No live classes scheduled. Click <strong>"Schedule Live Class"</strong> to add your next lecture.
          </div>
        )}
      </div>

      {/* Quick Access Grid for Faculty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769D2] flex items-center justify-center mb-3">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0B1E3D]">Lecture Video Library</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Upload recorded video classes, attach PDF handouts, and manage free demo preview lessons.
            </p>
          </div>
          <Link
            to="/admin/lessons"
            className="text-xs font-black text-[#1769D2] hover:text-[#0B1E3D] inline-flex items-center gap-1"
          >
            Manage Video Lessons <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0B1E3D]">Question Bank & Mock Tests</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Create model questions, provide step-by-step explanations, and set negative marks.
            </p>
          </div>
          <Link
            to="/admin/mock-tests"
            className="text-xs font-black text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
          >
            Manage Mock Exams <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0B1E3D]">Student Doubts & Enquiries</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Review course inquiries and academic guidance requests from enrolled students.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-black text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
          >
            Review Enquiries <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Schedule Live Class Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#1769D2]" />
                <h3 className="text-lg font-black text-[#0B1E3D]">Schedule Live Zoom Session</h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Topic / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. JAIIB PPB: Credit Policy & NPA Management"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Course *</label>
                  <select
                    required
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  >
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Module *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Accounting & Finance for Bankers"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time (24h) *</label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Mins) *</label>
                  <input
                    type="number"
                    required
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zoom Meeting Join URL *</label>
                <input
                  type="url"
                  required
                  value={formData.zoomMeetingUrl}
                  onChange={(e) => setFormData({ ...formData, zoomMeetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meeting ID</label>
                  <input
                    type="text"
                    value={formData.zoomMeetingId}
                    onChange={(e) => setFormData({ ...formData, zoomMeetingId: e.target.value })}
                    placeholder="987 654 3210"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Passcode</label>
                  <input
                    type="text"
                    value={formData.zoomPasscode}
                    onChange={(e) => setFormData({ ...formData, zoomPasscode: e.target.value })}
                    placeholder="RANVI2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingClass}
                  className="px-6 py-2.5 text-xs font-black bg-[#1769D2] hover:bg-[#12356B] text-white rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {submittingClass ? 'Scheduling...' : 'Save & Publish Live Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
