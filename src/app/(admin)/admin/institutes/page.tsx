import { getInstitutes } from "@/actions/institute";
import { InstituteManager } from "@/components/admin/InstituteManager";

export const dynamic = "force-dynamic";

export default async function AdminInstitutesPage() {
  const institutes = await getInstitutes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Partner Universities</h1>
        <p className="text-sm text-slate-500">Configure global partner network, countries, and university rankings</p>
      </div>

      <InstituteManager initialInstitutes={institutes} />
    </div>
  );
}
