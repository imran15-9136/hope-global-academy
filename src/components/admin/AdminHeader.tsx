"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, User, ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/consultations": "Consultation Leads",
  "/admin/destinations": "Manage Destinations",
  "/admin/blogs": "Manage Blogs & Articles",
  "/admin/settings": "Site Settings",
};

export function AdminHeader({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const currentTitle = routeTitles[pathname] || "Admin Portal";

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 md:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h2 className="hidden sm:block text-base font-bold text-slate-800 tracking-tight">
          {currentTitle}
        </h2>

        <div className="flex items-center gap-2">
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
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 rounded-md px-3 py-1.5"
          >
            <span>Application CRM</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden md:inline font-semibold text-xs text-slate-800">
            {session?.user?.email || "Admin User"}
          </span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
