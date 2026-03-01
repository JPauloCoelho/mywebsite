import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
            <Lock size={28} className="text-teal-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Secure Area</h1>
          <p className="text-gray-500 text-sm">Authentication coming in Phase 2.</p>
        </div>

        {/* Placeholder form (visual only) */}
        <div className="space-y-3 text-left">
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-mono">Email</label>
            <div className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-600 text-sm cursor-not-allowed">
              ••••••••@••••••.•••
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-mono">Password</label>
            <div className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-600 text-sm cursor-not-allowed">
              ••••••••••••
            </div>
          </div>
          <button
            disabled
            className="w-full py-3 rounded-lg bg-teal-500/20 border border-teal-500/20 text-teal-600 font-bold text-sm cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-teal-400 transition-colors uppercase tracking-widest font-mono"
        >
          <ArrowLeft size={12} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
