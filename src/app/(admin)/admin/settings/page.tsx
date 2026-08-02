import { getSettings } from "@/actions/setting";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-sm text-slate-500">Configure global site details, contact info, and hero banner content</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
