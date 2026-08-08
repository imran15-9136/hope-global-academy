import { getOffices } from "@/actions/office";
import { OfficeManager } from "@/components/admin/OfficeManager";

export const dynamic = "force-dynamic";

export default async function AdminOfficesPage() {
  const offices = await getOffices();

  return (
    <div className="space-y-6">
      <OfficeManager initialOffices={offices} />
    </div>
  );
}
