"use client";

import { useState } from "react";
import { createInstitute, deleteInstitute, updateInstitute } from "@/actions/institute";
import { Plus, Trash2, Pencil, Building2, Award } from "lucide-react";

export function InstituteManager({ initialInstitutes }: { initialInstitutes: any[] }) {
  const [institutes, setInstitutes] = useState(initialInstitutes);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<any | null>(null);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [ranking, setRanking] = useState("");

  const resetForm = () => {
    setName("");
    setCountry("");
    setRanking("");
    setEditingInstitute(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (inst: any) => {
    setName(inst.name);
    setCountry(inst.country);
    setRanking(inst.ranking);
    setEditingInstitute(inst);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      country,
      ranking,
    };

    if (editingInstitute) {
      const res = await updateInstitute(editingInstitute._id, payload);
      if (res.success) {
        setInstitutes((prev) =>
          prev.map((i) => (i._id === editingInstitute._id ? { ...i, ...payload } : i))
        );
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createInstitute(payload);
      if (res.success) {
        if (res.data) {
          setInstitutes((prev) => [res.data, ...prev]);
        }
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this institute?")) return;
    const res = await deleteInstitute(id);
    if (res.success) {
      setInstitutes((prev) => prev.filter((i) => i._id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Partner Institutes ({institutes.length})</h2>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Institute</span>
        </button>
      </div>

      {institutes.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No partner institutes created yet. Click "Add Institute" to create one.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4 w-12">Icon</th>
                <th className="p-4">Name</th>
                <th className="p-4">Country</th>
                <th className="p-4">Ranking / Award</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {institutes.map((inst) => (
                <tr key={inst._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{inst.name}</td>
                  <td className="p-4 text-slate-600">{inst.country}</td>
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      <Award className="h-3.5 w-3.5" />
                      <span>{inst.ranking}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleOpenEdit(inst)}
                        className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(inst._id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {editingInstitute ? "Edit Institute" : "Add New Institute"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Institute Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. University of Oxford"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. UK"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Ranking / Highlight *</label>
                <input
                  type="text"
                  required
                  value={ranking}
                  onChange={(e) => setRanking(e.target.value)}
                  placeholder="e.g. Top 5 Global / #1 Modern Uni"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
                >
                  {loading ? "Saving..." : editingInstitute ? "Update Institute" : "Create Institute"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
