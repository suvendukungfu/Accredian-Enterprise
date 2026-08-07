import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 animate-ping absolute" />
        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/50 relative z-10">
          <ShieldCheck className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xl font-black tracking-tight">
          accredian<span className="text-blue-500">.</span>
        </span>
        <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
          Loading Enterprise OS...
        </span>
      </div>
    </div>
  );
}
