"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SessionProviderWrapper } from "@/components/shared/SessionProviderWrapper";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
  }

  return (
    <SessionProviderWrapper>
      <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
