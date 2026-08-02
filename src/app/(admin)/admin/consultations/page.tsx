import { connectToDatabase } from "@/lib/db";
import Consultation from "@/models/Consultation";
import { ConsultationTable } from "@/components/admin/ConsultationTable";

export const dynamic = "force-dynamic";

export default async function AdminConsultationsPage() {
  await connectToDatabase();
  const rawLeads = await Consultation.find().sort({ createdAt: -1 }).lean();
  const leads = JSON.parse(JSON.stringify(rawLeads));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Consultation Appointments</h1>
        <p className="text-sm text-slate-500">Manage and track student consultation lead inquiries</p>
      </div>

      <ConsultationTable initialLeads={leads} />
    </div>
  );
}
