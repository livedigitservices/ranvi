import React from 'react';
import { Video, ExternalLink, ShieldCheck, Key, Hash, AlertTriangle } from 'lucide-react';

export const ZoomJoinButton = ({ liveClass }) => {
  const isCancelled = liveClass.status === 'CANCELLED';
  const isCompleted = liveClass.status === 'COMPLETED';
  const isLive = liveClass.status === 'LIVE';

  const handleJoin = () => {
    if (liveClass.zoomMeetingUrl) {
      window.open(liveClass.zoomMeetingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isCancelled) {
    return (
      <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold">
        <AlertTriangle className="w-4 h-4" /> Class Cancelled
      </div>
    );
  }

  if (isCompleted) {
    return (
      <span className="text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold">
        Session Completed
      </span>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Zoom Credentials */}
      {(liveClass.zoomMeetingId || liveClass.zoomPasscode) && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          {liveClass.zoomMeetingId && (
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3 text-[#1769D2]" /> ID: <strong>{liveClass.zoomMeetingId}</strong>
            </span>
          )}
          {liveClass.zoomPasscode && (
            <span className="flex items-center gap-1 pl-2 border-l border-slate-300">
              <Key className="w-3 h-3 text-[#F4B942]" /> Passcode: <strong>{liveClass.zoomPasscode}</strong>
            </span>
          )}
        </div>
      )}

      {/* Join Button */}
      <button
        onClick={handleJoin}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
          isLive
            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse shadow-rose-600/30'
            : 'bg-[#12356B] hover:bg-[#0e2a56] text-white shadow-[#12356B]/20'
        }`}
      >
        <Video className="w-4 h-4 text-[#F4B942]" />
        <span>{isLive ? 'Join Live Class Now' : 'Join Zoom Meeting'}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
      </button>
    </div>
  );
};
