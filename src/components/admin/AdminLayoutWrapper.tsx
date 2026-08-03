"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SessionProviderWrapper } from "@/components/shared/SessionProviderWrapper";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoginPage) {
    return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
  }

  return (
    <SessionProviderWrapper>
      <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased text-slate-900">
        <AdminSidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminHeader onToggleMobileMenu={() => setSidebarOpen((prev) => !prev)} />
          <div className="flex-1 overflow-y-auto flex flex-col justify-between">
            <main className="p-4 md:p-8 max-w-7xl w-full mx-auto flex-1">{children}</main>
            <footer className="py-3 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500 shrink-0">
              <span>© {new Date().getFullYear()} Hope Global Academy. All rights reserved. </span>
              <span className="mx-1">|</span>
              <span>
                Developed by:{" "}
                <a
                  href="https://innovtec.it.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Innovtec
                </a>
              </span>
            </footer>
          </div>
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
