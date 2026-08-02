import { connectToDatabase } from "@/lib/db";
import Consultation from "@/models/Consultation";
import Destination from "@/models/Destination";
import Blog from "@/models/Blog";
import { Users, UserCheck, Globe, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectToDatabase();

  const totalConsultations = await Consultation.countDocuments();
  const newConsultations = await Consultation.countDocuments({ status: "new" });
  const totalDestinations = await Destination.countDocuments();
  const totalBlogs = await Blog.countDocuments();

  const recentLeads = await Consultation.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Welcome to Hope Global Academy Admin Control Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">New Appointments</p>
            <p className="text-3xl font-extrabold text-amber-500 mt-1">{newConsultations}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Leads</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalConsultations}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Countries</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalDestinations}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Globe className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Blog Posts</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalBlogs}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Recent Lead Submissions</h2>
          <Link
            href="/admin/consultations"
            className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No consultation appointments recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id.toString()} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">{lead.name}</td>
                    <td className="p-4">
                      <p className="text-xs text-slate-900">{lead.email}</p>
                      <p className="text-xs text-slate-500">{lead.phone}</p>
                    </td>
                    <td className="p-4 font-medium">{lead.preferredCountry}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                          lead.status === "new"
                            ? "bg-amber-100 text-amber-700"
                            : lead.status === "contacted"
                            ? "bg-blue-100 text-blue-700"
                            : lead.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
