import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";
import { getSettings } from "@/actions/setting";

export const metadata = {
  title: "Admin Dashboard | Hope Global Academy",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error("Error loading settings in AdminLayout:", error);
  }

  const logoUrl = settings?.logo || "";

  return <AdminLayoutWrapper logoUrl={logoUrl}>{children}</AdminLayoutWrapper>;
}
