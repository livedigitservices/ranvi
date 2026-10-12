import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { ZoomJoinButton } from '../../components/live/ZoomJoinButton';
import {
  BookOpen,
  Video,
  FileCheck2,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Calendar,
  Zap,
} from 'lucide-react';

export const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/students/dashboard');
        if (res.success && res.data) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-bold text-slate-500">Loading Student Learning Dashboard...</p>
      </div>
    );
  }

  const enrolledCourses = dashboardData?.enrolledCourses || [];
  const upcomingClasses = dashboardData?.upcomingLiveClasses || [];
  const recentAttempts = dashboardData?.recentAttempts || [];
  const stats = dashboardData?.performanceStats || { totalAttemptsCount: 0, averageAccuracy: 0, averageScore: 0 };
  const activeDevice = dashboardData?.activeDevice;

  return (
    <div className="space-y-8">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B1E3D] via-[#12356B] to-[#1769D2] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#F4B942] text-[#0B1E3D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Target: {user?.targetExam || 'Banking & Competitive Exams'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Welcome Back, {user?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Continue your preparation. You have <strong>{enrolledCourses.length} active course(s)</strong> and <strong>{upcomingClasses.length} live session(s) scheduled</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/student/mock-tests"
              className="bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105"
            >
              <Zap className="w-4 h-4" /> Take Mock Test
            </Link>
            <Link
              to="/student/my-courses"
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> My Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Student Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Enrolled Programs</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{enrolledCourses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Live Zoom Sessions</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{upcomingClasses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Mock Tests Completed</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{stats.totalAttemptsCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Average Accuracy</span>
            <p className="text-2xl font-black text-[#0B1E3D]">{stats.averageAccuracy}%</p>
          </div>
        </div>
      </div>

      {/* Upcoming Live Classes (Zoom) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase text-[#1769D2] tracking-wider">Live Timetable</span>
            <h2 className="text-xl font-black text-[#0B1E3D] font-heading mt-0.5">
              Upcoming Live Zoom Classes
            </h2>
          </div>
          <Link
            to="/student/live-classes"
            className="text-xs font-bold text-[#1769D2] hover:text-[#0B1E3D] flex items-center gap-1"
          >
            Full Timetable <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {upcomingClasses.length > 0 ? (
          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div
                key={cls._id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#EAF3FF]/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-blue-100 text-[#1769D2] uppercase">
                      {cls.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-600">Batch: {cls.batchName}</span>
                  </div>
                  <h3 className="text-base font-black text-[#0B1E3D]">{cls.title}</h3>
                  <p className="text-xs text-slate-600">
                    Faculty: <strong>{cls.facultyName}</strong> • 📅 {new Date(cls.scheduledDate).toLocaleDateString()} at <strong>{cls.startTime}</strong> ({cls.durationMinutes} mins)
                  </p>
                </div>

                <ZoomJoinButton liveClass={cls} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            <Video className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            No live classes scheduled for today. Check your course video library for recorded lessons!
          </div>
        )}
      </div>

      {/* Enrolled Courses Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase text-[#1769D2] tracking-wider">My Programs</span>
            <h2 className="text-xl font-black text-[#0B1E3D] font-heading mt-0.5">
              Enrolled Courses & Video Lessons
            </h2>
          </div>
          <Link to="/student/my-courses" className="text-xs font-bold text-[#1769D2] flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map(({ entitlementId, course, validUntil }) => (
              <div
                key={entitlementId}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-[10px] font-black text-[#1769D2] uppercase tracking-wider">
                    {course?.division === 'BANKERS_PATH' ? "Banker's Path" : "Competitive Exam"}
                  </span>
                  <h3 className="text-base font-black text-[#0B1E3D] mt-0.5 leading-snug">
                    {course?.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Valid until: <strong>{new Date(validUntil).toLocaleDateString()}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                    Active Enrolment
                  </span>
                  <Link
                    to={`/student/courses/${course?._id}/player`}
                    className="inline-flex items-center gap-1.5 bg-[#0B1E3D] hover:bg-[#12356B] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md hover:scale-102"
                  >
                    <PlayCircle className="w-4 h-4 text-[#F4B942]" /> Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#0B1E3D]">No Enrolled Courses Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore our Banker's Path certifications and competitive exam batches to begin learning.
            </p>
            <Link
              to="/bankers-path"
              className="inline-block bg-[#0B1E3D] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:scale-102"
            >
              Explore Course Catalogue
            </Link>
          </div>
        )}
      </div>

      {/* Active Device & Security Card */}
      {activeDevice && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-[#0B1E3D]">Active Registered Device</p>
              <p className="text-[11px] text-slate-500">{activeDevice.deviceInfo} • IP: {activeDevice.ipAddress || 'Protected'}</p>
            </div>
          </div>
          <span className="text-slate-400 text-[11px]">Last active: {new Date(activeDevice.lastActiveAt).toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
};
