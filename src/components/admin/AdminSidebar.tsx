"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  FileText,
  Settings,
  GraduationCap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Consultation Leads", href: "/admin/consultations", icon: Users },
  { name: "Destinations", href: "/admin/destinations", icon: Globe },
  { name: "Blogs & Articles", href: "/admin/blogs", icon: FileText },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-slate-900 text-slate-300 transition-transform duration-300 md:static md:translate-x-0 h-screen flex flex-col justify-between shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col min-h-0 flex-1">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-6">
            <Link
              href="/admin"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen?.(false)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white leading-none">Hope Global</h1>
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen?.(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 space-y-1 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen?.(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center space-y-1 shrink-0">
          <div>Hope Global Academy v1.0</div>
          <div>
            Developed by:{" "}
            <a
              href="https://innovtec.it.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline transition-colors"
            >
              Innovtec
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
