"use client";

import { useState } from "react";
import { createDestination, deleteDestination } from "@/actions/destination";
import { Plus, Trash2, Globe, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function DestinationManager({ initialDestinations }: { initialDestinations: any[] }) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [tuitionRange, setTuitionRange] = useState("");
  const [intake, setIntake] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createDestination({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      image: image || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
      tuitionRange,
      intake,
      shortDescription,
    });

    if (res.success) {
      if (res.data) {
        setDestinations((prev) => [res.data, ...prev]);
      }
      setShowModal(false);
      setName("");
      setSlug("");
      setImage("");
      setTuitionRange("");
      setIntake("");
      setShortDescription("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    const res = await deleteDestination(id);
    if (res.success) {
      setDestinations((prev) => prev.filter((d) => d._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">All Destinations ({destinations.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Destination</span>
        </button>
      </div>

      {destinations.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No destinations created yet. Click "Add Destination" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-100">
                {dest.image ? (
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <Globe className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900">{dest.name}</h3>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    /{dest.slug}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{dest.shortDescription}</p>
                <div className="pt-2 text-xs text-slate-600 space-y-1">
                  <p>
                    <span className="font-semibold">Tuition:</span> {dest.tuitionRange || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Intakes:</span> {dest.intake || "N/A"}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleDelete(dest._id)}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevation space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New Destination</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Country Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. United Kingdom"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. uk"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Cover Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Tuition Range</label>
                  <input
                    type="text"
                    value={tuitionRange}
                    onChange={(e) => setTuitionRange(e.target.value)}
                    placeholder="£12,000 - £25,000"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Intakes</label>
                  <input
                    type="text"
                    value={intake}
                    onChange={(e) => setIntake(e.target.value)}
                    placeholder="Jan / Sep Intake"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Short Description</label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
                >
                  {loading ? "Saving..." : "Create Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
