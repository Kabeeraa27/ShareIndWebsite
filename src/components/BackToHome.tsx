"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Consistent "return to the cube" affordance for every page that isn't
 *  the homepage — the cube's click-to-navigate flow needs an equally
 *  obvious way back. */
export function BackToHome() {
  return (
    <Link
      href="/"
      className="glass group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/75 transition-colors duration-200 hover:text-white"
    >
      <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
      Back to Home
    </Link>
  );
}
