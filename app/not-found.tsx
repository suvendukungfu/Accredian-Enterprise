import React from "react";
import Link from "next/link";
import { ShieldCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-6">
        <ShieldCheck className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">
        Page Not Found
      </h1>

      <p className="text-slate-400 text-base max-w-md mb-8 leading-relaxed">
        The enterprise resource or program page you are looking for does not exist or has been moved.
      </p>

      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="gradient" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
