"use client";

import { useState } from "react";
import { createDestination, deleteDestination, updateDestination, getDestinationById } from "@/actions/destination";
import { Plus, Trash2, Globe, Pencil } from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "./ImageUpload";

export function DestinationManager({ initialDestinations }: { initialDestinations: any[] }) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [editingDestination, setEditingDestination] = useState<any | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [tuitionRange, setTuitionRange] = useState("");
  const [intake, setIntake] = useState("");
  const [postStudyWork, setPostStudyWork] = useState("");
  const [visaSuccessRate, setVisaSuccessRate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [highlights, setHighlights] = useState<Array<{ title: string; description: string }>>([]);

  const resetForm = () => {
    setName("");
    setSlug("");
    setImage("");
    setTuitionRange("");
    setIntake("");
    setPostStudyWork("");
    setVisaSuccessRate("");
    setShortDescription("");
    setContent("");
    setHighlights([]);
    setEditingDestination(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = async (dest: any) => {
    setEditingDestination(dest);
    setName(dest.name || "");
    setSlug(dest.slug || "");
    setImage(dest.image || "");
    setTuitionRange(dest.tuitionRange || "");
    setIntake(dest.intake || "");
    setPostStudyWork(dest.postStudyWork || "");
    setVisaSuccessRate(dest.visaSuccessRate || "");
    setShortDescription(dest.shortDescription || "");
    setContent(dest.content || "");
    setHighlights(dest.highlights || []);
    setShowModal(true);

    // Fetch latest fresh content directly from MongoDB
    setFetchingDetails(true);
    const fresh = await getDestinationById(dest._id);
    if (fresh) {
      setName(fresh.name || "");
      setSlug(fresh.slug || "");
      setImage(fresh.image || "");
      setTuitionRange(fresh.tuitionRange || "");
      setIntake(fresh.intake || "");
      setPostStudyWork(fresh.postStudyWork || "");
      setVisaSuccessRate(fresh.visaSuccessRate || "");
      setShortDescription(fresh.shortDescription || "");
      setContent(fresh.content || "");
      setHighlights(fresh.highlights || []);
    }
    setFetchingDetails(false);
  };

  const addHighlight = () => {
    setHighlights((prev) => [...prev, { title: "", description: "" }]);
  };

  const updateHighlight = (index: number, field: string, val: string) => {
    setHighlights((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const removeHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanSlug = slugify(slug || name);

    const payload = {
      name: name.trim(),
      slug: cleanSlug,
      image: image || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
      tuitionRange,
      intake,
      postStudyWork: postStudyWork || "2 - 3 Years Work Permit",
      visaSuccessRate: visaSuccessRate || "98% Success Rate",
      shortDescription,
      content,
      highlights,
    };

    if (editingDestination) {
      const res = await updateDestination(editingDestination._id, payload);
      if (res.success) {
        setDestinations((prev) =>
          prev.map((d) => (d._id === editingDestination._id ? { ...d, ...payload } : d))
        );
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createDestination(payload);
      if (res.success) {
        if (res.data) {
          setDestinations((prev) => [res.data, ...prev]);
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
          onClick={handleOpenCreate}
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
                  <p>
                    <span className="font-semibold">Work Permit:</span> {dest.postStudyWork || "N/A"}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                <button
                  onClick={() => handleOpenEdit(dest)}
                  className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
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
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">
                {editingDestination ? "Edit Destination" : "Add New Destination"}
              </h3>
              {fetchingDetails && (
                <span className="text-xs text-blue-600 font-semibold animate-pulse">
                  Loading latest data...
                </span>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Country Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. New Zealand"
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
                    placeholder="e.g. new-zealand"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Cover Image"
                  value={image}
                  onChange={setImage}
                  folder="destinations"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Tuition Range</label>
                  <input
                    type="text"
                    value={tuitionRange}
                    onChange={(e) => setTuitionRange(e.target.value)}
                    placeholder="NZD $22,000 - $35,000 / year"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Primary Intakes</label>
                  <input
                    type="text"
                    value={intake}
                    onChange={(e) => setIntake(e.target.value)}
                    placeholder="Feb / July Intake"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Post-Study Work Permit</label>
                  <input
                    type="text"
                    value={postStudyWork}
                    onChange={(e) => setPostStudyWork(e.target.value)}
                    placeholder="Up to 3 Years Open Work Visa"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Visa Success Rate</label>
                  <input
                    type="text"
                    value={visaSuccessRate}
                    onChange={(e) => setVisaSuccessRate(e.target.value)}
                    placeholder="98% Success Rate"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Short Description</label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary for cards & hero banner..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-slate-700">Key Highlights Bullet Points</label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Highlight</span>
                  </button>
                </div>

                {highlights.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-200 p-3 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateHighlight(idx, "title", e.target.value)}
                        placeholder="Highlight Title (e.g. Work While Studying)"
                        className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(idx)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateHighlight(idx, "description", e.target.value)}
                      placeholder="Brief description of this benefit..."
                      rows={2}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Custom HTML Overview Content (Optional)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<p>Custom detailed HTML guide content...</p>"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-mono focus:border-primary focus:outline-none"
                  rows={4}
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
                  {loading ? "Saving..." : editingDestination ? "Update Destination" : "Create Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
