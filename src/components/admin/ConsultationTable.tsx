"use client";

import { useState } from "react";
import { updateConsultationStatus, deleteConsultation } from "@/actions/consultation";
import { Trash2, CheckCircle, Clock, CheckCheck, XCircle } from "lucide-react";

export function ConsultationTable({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState("all");

  const handleStatusChange = async (id: string, status: any) => {
    const res = await updateConsultationStatus(id, status);
    if (res.success) {
      setLeads((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const res = await deleteConsultation(id);
    if (res.success) {
      setLeads((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const filteredLeads = leads.filter((item) =>
    filter === "all" ? true : item.status === filter
  );

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {["all", "new", "contacted", "resolved", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase transition-colors ${
              filter === f
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f} ({f === "all" ? leads.length : leads.filter((l) => l.status === f).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No consultation appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-4">Student Info</th>
                  <th className="p-4">Destination & Course</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-600">{lead.email}</p>
                      <p className="text-xs text-slate-500 font-mono">{lead.phone}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-primary">{lead.preferredCountry}</p>
                      <p className="text-xs text-slate-500">{lead.interestedCourse || "General"}</p>
                    </td>
                    <td className="p-4 text-xs text-slate-500 max-w-xs truncate">
                      {lead.message || "No notes"}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 focus:border-primary focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
