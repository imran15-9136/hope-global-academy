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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Consultation Leads", href: "/admin/consultations", icon: Users },
  { name: "Destinations", href: "/admin/destinations", icon: Globe },
  { name: "Blogs & Articles", href: "/admin/blogs", icon: FileText },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white leading-none">Hope Global</h1>
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
              Admin Portal
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white font-semibold"
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

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center space-y-1">
        <div>Hope Global Academy v1.0</div>
        <div>
          Developed by:{" "}
          <a
            href="https://innovtec.it.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-400 hover:underline transition-colors"
          >
            Innovtec
          </a>
        </div>
      </div>
    </aside>
  );
}
