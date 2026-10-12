import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { ShieldAlert, Clock, User } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await adminService.getAuditLogs({ limit: 50 });
        if (res.success && res.data) {
          setLogs(res.data.logs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
          Security & Operations Audit Trail
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable audit records of user logins, device resets, course grants, and payment verifications.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading audit trail...</p>
        </div>
      ) : logs.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                  <th className="p-4 font-bold">Timestamp</th>
                  <th className="p-4 font-bold">Action</th>
                  <th className="p-4 font-bold">User / Initiator</th>
                  <th className="p-4 font-bold">Resource</th>
                  <th className="p-4 font-bold">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-[#12356B] uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#12356B]">
                      {log.userEmail || 'System'}
                    </td>
                    <td className="p-4 font-medium text-slate-600">
                      {log.resource} ({log.resourceId || 'N/A'})
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-500">
          No audit logs recorded yet.
        </div>
      )}
    </div>
  );
};
