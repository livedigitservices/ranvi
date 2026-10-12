import React, { useState, useEffect } from 'react';
import { adminService, courseService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { CreditCard, Plus, ShieldCheck, UserPlus, CheckCircle2 } from 'lucide-react';

export const AdminPaymentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const { success, error: toastError } = useToast();

  const [grantForm, setGrantForm] = useState({
    studentId: '',
    itemType: 'COURSE',
    itemId: '',
    durationDays: 180,
    reason: 'Offline desk admission fee receipt verified',
  });

  const fetchData = async () => {
    try {
      const [payRes, courseRes, studentRes] = await Promise.all([
        adminService.getAllPayments({ limit: 50 }),
        courseService.getCourses({ limit: 50 }),
        adminService.getStudents({ limit: 100 }),
      ]);
      if (payRes.success && payRes.data) setOrders(payRes.data.orders || []);
      if (courseRes.success && courseRes.data) {
        setCourses(courseRes.data.courses || []);
        if (courseRes.data.courses?.length > 0 && !grantForm.itemId) {
          setGrantForm(prev => ({ ...prev, itemId: courseRes.data.courses[0]._id }));
        }
      }
      if (studentRes.success && studentRes.data) {
        setStudents(studentRes.data.students || []);
        if (studentRes.data.students?.length > 0 && !grantForm.studentId) {
          setGrantForm(prev => ({ ...prev, studentId: studentRes.data.students[0]._id }));
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

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.grantManualAccess(grantForm);
      if (res.success) {
        success('Course access granted manually to student!');
        setShowGrantModal(false);
        fetchData();
      }
    } catch (err) {
      toastError(err.message || 'Failed to grant access');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
            Payments Ledger & Access Grants
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review verified Razorpay transactions and grant manual course access for offline desk enrolments.
          </p>
        </div>
        <button
          onClick={() => setShowGrantModal(true)}
          className="inline-flex items-center gap-1.5 bg-[#12356B] hover:bg-[#0e2a56] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
        >
          <UserPlus className="w-4 h-4" /> Grant Manual Access
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                <th className="p-4 font-bold">Student</th>
                <th className="p-4 font-bold">Receipt / Order ID</th>
                <th className="p-4 font-bold">Program</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-[#12356B]">
                    <div>{order.studentId?.name || 'Student'}</div>
                    <span className="text-[11px] text-slate-400 font-normal">{order.studentId?.email}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-600">
                    {order.receiptNumber || order.razorpayOrderId}
                  </td>
                  <td className="p-4 font-semibold text-slate-600">
                    {order.itemId?.title || order.itemType}
                  </td>
                  <td className="p-4 font-black text-emerald-700">₹{order.amount}</td>
                  <td className="p-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      order.status === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Grant Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-xl font-bold text-[#12356B] font-heading">
              Grant Manual Course Entitlement
            </h3>

            <form onSubmit={handleGrantAccess} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student *</label>
                <select
                  value={grantForm.studentId}
                  onChange={(e) => setGrantForm({ ...grantForm, studentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Program *</label>
                <select
                  value={grantForm.itemId}
                  onChange={(e) => setGrantForm({ ...grantForm, itemId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  {courses.map(c => (
                    <option key={c._id} value={c._id}>{c.title} (₹{c.fee})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Access Duration (Days)</label>
                <input
                  type="number"
                  value={grantForm.durationDays}
                  onChange={(e) => setGrantForm({ ...grantForm, durationDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Audit Trail Reason *</label>
                <input
                  type="text"
                  required
                  value={grantForm.reason}
                  onChange={(e) => setGrantForm({ ...grantForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#12356B] text-white font-bold shadow-md"
                >
                  Grant Enrolment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
