import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { useToast } from '../../context/ToastContext';
import { MessageSquareQuote, Search, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('CONTACTED');
  const [counselorNote, setCounselorNote] = useState('');
  const { success, error: toastError } = useToast();

  const fetchEnquiries = async () => {
    try {
      const res = await adminService.getEnquiries({ limit: 50 });
      if (res.success && res.data) {
        setEnquiries(res.data.enquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    try {
      const res = await adminService.updateEnquiryStatus(selectedEnquiry._id, {
        status: statusUpdate,
        note: counselorNote,
      });
      if (res.success) {
        success('Enquiry lead updated successfully');
        setSelectedEnquiry(null);
        setCounselorNote('');
        fetchEnquiries();
      }
    } catch (err) {
      toastError(err.message || 'Failed to update enquiry');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
          Enquiry Leads & Demo Registrations
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Track incoming demo requests, admissions inquiries, counselor notes, and follow-ups.
        </p>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                <th className="p-4 font-bold">Applicant</th>
                <th className="p-4 font-bold">Division & Program</th>
                <th className="p-4 font-bold">Type</th>
                <th className="p-4 font-bold">Mode & Timing</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-[#12356B]">
                    <div>{enq.fullName}</div>
                    <span className="text-[11px] text-slate-400 font-normal">{enq.phone} • {enq.email}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold">{enq.courseInterest}</div>
                    <span className="text-[10px] text-slate-400">{enq.division}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-[#1769D2]">
                      {enq.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {enq.preferredMode} • {enq.preferredSchedule}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      enq.status === 'NEW'
                        ? 'bg-rose-100 text-rose-800'
                        : enq.status === 'CONTACTED'
                        ? 'bg-blue-100 text-blue-800'
                        : enq.status === 'CONVERTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setStatusUpdate(enq.status);
                      }}
                      className="bg-[#12356B] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0e2a56]"
                    >
                      Update Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Enquiry Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-xl font-bold text-[#12356B] font-heading">
              Update Lead: {selectedEnquiry.fullName}
            </h3>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <p><strong>Course:</strong> {selectedEnquiry.courseInterest}</p>
              <p><strong>Contact:</strong> {selectedEnquiry.phone} ({selectedEnquiry.email})</p>
              {selectedEnquiry.message && <p className="italic text-slate-500">"{selectedEnquiry.message}"</p>}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lead Status</label>
                <select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                  <option value="CONVERTED">CONVERTED (ADMITTED)</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Add Counselor Note</label>
                <textarea
                  rows={2}
                  value={counselorNote}
                  onChange={(e) => setCounselorNote(e.target.value)}
                  placeholder="e.g. Spoke to candidate. Shared Zoom demo invite for tomorrow 7:30 PM..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  className="py-2.5 px-4 rounded-xl bg-[#12356B] text-white font-bold shadow-md"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
