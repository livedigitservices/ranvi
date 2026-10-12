import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService, adminService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { BookOpen, Plus, Edit, Trash2, Eye, CheckCircle2, XCircle } from 'lucide-react';

export const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const fetchCourses = async () => {
    try {
      const res = await courseService.getCourses({ limit: 50 });
      if (res.success && res.data) {
        setCourses(res.data.courses || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to unpublish the course "${title}"?`)) return;
    try {
      const res = await adminService.deleteCourse(id);
      if (res.success) {
        success('Course unpublished successfully');
        fetchCourses();
      }
    } catch (err) {
      toastError(err.message || 'Failed to delete course');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
            Course Catalogue Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, publish, configure pricing, and manage syllabus modules for all programs.
          </p>
        </div>
        <Link
          to="/admin/courses/new"
          className="inline-flex items-center gap-1.5 bg-[#12356B] hover:bg-[#0e2a56] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading courses...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                  <th className="p-4 font-bold">Course Title</th>
                  <th className="p-4 font-bold">Division</th>
                  <th className="p-4 font-bold">Mode</th>
                  <th className="p-4 font-bold">Duration</th>
                  <th className="p-4 font-bold">Fee (INR)</th>
                  <th className="p-4 font-bold">Enrolled</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-[#12356B]">
                      {course.title}
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EAF3FF] text-[#1769D2] uppercase">
                        {course.division === 'BANKERS_PATH' ? "Banker's Path" : 'Competitive Exam'}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{course.mode}</td>
                    <td className="p-4">{course.duration}</td>
                    <td className="p-4 font-black text-[#12356B]">₹{course.fee}</td>
                    <td className="p-4 font-bold text-emerald-700">{course.enrolledStudentsCount || 0}</td>
                    <td className="p-4 text-right space-x-1.5">
                      <Link
                        to={`/courses/${course.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-[#1769D2] hover:bg-slate-100 rounded-lg inline-block transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/courses/${course.slug}/edit`}
                        className="p-1.5 text-[#1769D2] hover:text-[#0B1E3D] hover:bg-blue-50 rounded-lg inline-block transition-colors"
                        title="Edit Course Program"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course._id, course.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg inline-block transition-colors"
                        title="Delete Course Program"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
