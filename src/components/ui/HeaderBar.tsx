"use client";

import Image from "next/image";
import { Shield, BarChart3 } from "lucide-react";

export default function HeaderBar({
  title,
  passingScore,
}: {
  title: string;
  passingScore: number;
}) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-3d.png"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 shadow-md"
          />
          <div>
            <div className="text-sm text-white/60">
              Passing score: {passingScore}
            </div>
            <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white/70 text-sm">
          <span className="inline-flex items-center gap-1">
            <Shield className="h-4 w-4" /> Proctoring ready
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChart3 className="h-4 w-4" /> Rich analytics
          </span>
        </div>
      </div>
    </header>
  );
}
