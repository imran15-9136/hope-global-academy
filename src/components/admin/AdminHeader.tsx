"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, User, ExternalLink } from "lucide-react";
import Link from "next/link";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50"
        >
          <span>View Live Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <a
          href="https://innovcrm.hopeglobalacademy.co.uk/auth/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 rounded-md px-3 py-1.5"
        >
          <span>Application CRM</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <User className="h-4 w-4" />
          </div>
          <span className="font-semibold">{session?.user?.email || "Admin User"}</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
