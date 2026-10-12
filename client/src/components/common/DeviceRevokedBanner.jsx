import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, LogIn, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DeviceRevokedBanner = () => {
  const { sessionRevokedMessage, clearRevokedMessage } = useAuth();

  if (!sessionRevokedMessage) return null;

  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-900 px-4 py-3 sticky top-20 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>{sessionRevokedMessage}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            onClick={clearRevokedMessage}
            className="inline-flex items-center gap-1.5 bg-[#12356B] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg hover:bg-[#0e2a56] transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" /> Log In Again
          </Link>
          <button
            onClick={clearRevokedMessage}
            className="text-amber-800 hover:text-amber-950 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
