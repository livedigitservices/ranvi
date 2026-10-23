import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { useRealtimeEvent } from '../../context/SocketContext';
import { Users, Search, ShieldCheck, RotateCcw, Ban, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [resetModalStudent, setResetModalStudent] = useState(null);
  const [resetReason, setResetReason] = useState('Legitimate student phone/laptop replacement');
  const { success, error: toastError } = useToast();

  const fetchStudents = async () => {
    try {
      const res = await adminService.getStudents({ search, limit: 50 });
      if (res.success && res.data) {
        setStudents(res.data.students || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  // Real-time synchronization for student registrations and status updates
  useRealtimeEvent('student:registered', useCallback(() => {
    fetchStudents();
  }, [search]));

  useRealtimeEvent('admin:student_updated', useCallback(() => {
    fetchStudents();
  }, [search]));

  const handleResetDevice = async () => {
    if (!resetModalStudent) return;
    try {
      const res = await adminService.resetStudentDevice(resetModalStudent._id, resetReason);
      if (res.success) {
        success(res.message);
        setResetModalStudent(null);
        fetchStudents();
      }
    } catch (err) {
      toastError(err.message || 'Failed to reset device session');
    }
  };

  const handleToggleStatus = async (student) => {
    if (!window.confirm(`${student.isActive ? 'Suspend' : 'Reactivate'} student account ${student.name}?`)) return;
    try {
      const res = await adminService.toggleStudentStatus(student._id);
      if (res.success) {
        success(res.message);
        fetchStudents();
      }
    } catch (err) {
      toastError(err.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
            Student Accounts & Single-Device Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor registered active device sessions, perform auditable device resets, and manage account statuses.
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769D2]"
          />
        </div>
      </div>

      {/* Student Accounts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                <th className="p-4 font-bold">Student Name</th>
                <th className="p-4 font-bold">Contact Info</th>
                <th className="p-4 font-bold">Target Exam</th>
                <th className="p-4 font-bold">Active Device Status</th>
                <th className="p-4 font-bold">Account State</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-[#12356B]">
                    {student.name}
                  </td>
                  <td className="p-4">
                    <div>{student.email}</div>
                    <span className="text-[11px] text-slate-400">{student.phone}</span>
                  </td>
                  <td className="p-4 font-medium text-slate-600">
                    {student.targetExam || 'General'}
                  </td>
                  <td className="p-4">
                    {student.activeDevice ? (
                      <div className="text-emerald-700 flex items-center gap-1.5 font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{student.activeDevice.deviceInfo}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-medium">No Active Device</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      student.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {student.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setResetModalStudent(student)}
                      className="inline-flex items-center gap-1 bg-[#EAF3FF] hover:bg-[#d8e9ff] text-[#1769D2] px-2.5 py-1.5 rounded-lg font-bold text-xs"
                      title="Reset Device Session"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Device
                    </button>
                    <button
                      onClick={() => handleToggleStatus(student)}
                      className={`px-2.5 py-1.5 rounded-lg font-bold text-xs ${
                        student.isActive
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {student.isActive ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Reset Modal */}
      {resetModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1769D2] flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#12356B] font-heading">
                Reset Device Session
              </h3>
              <p className="text-xs text-slate-600">
                Resetting will clear registered device sessions for <strong>{resetModalStudent.name}</strong>, allowing them to bind their new phone or laptop upon next login.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Administrative Audit Reason *</label>
                <input
                  type="text"
                  required
                  value={resetReason}
                  onChange={(e) => setResetReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalStudent(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetDevice}
                  className="py-2.5 px-4 rounded-xl bg-[#12356B] text-white font-bold shadow-md"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
