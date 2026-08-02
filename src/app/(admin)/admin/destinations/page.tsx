import { getDestinations } from "@/actions/destination";
import { DestinationManager } from "@/components/admin/DestinationManager";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Destinations</h1>
        <p className="text-sm text-slate-500">Add and edit study abroad country destinations</p>
      </div>

      <DestinationManager initialDestinations={destinations} />
    </div>
  );
}
