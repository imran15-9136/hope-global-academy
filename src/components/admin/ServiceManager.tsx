"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createService, deleteService, updateService, updateServicesVideo } from "@/actions/service";
import { VideoUpload } from "./VideoUpload";
import { Plus, Trash2, Pencil, Briefcase, Video, Save, CheckCircle, ArrowUpDown, Sparkles } from "lucide-react";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  icon: z.string().default("Briefcase"),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export function ServiceManager({
  initialServices,
  initialVideoData,
}: {
  initialServices: any[];
  initialVideoData: { videoUrl: string; title: string; subtitle: string };
}) {
  const [services, setServices] = useState(initialServices);
  const [videoData, setVideoData] = useState(initialVideoData);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoMsg, setVideoMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  // Features list state for service items
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      icon: "Briefcase",
      order: 0,
      published: true,
    },
  });

  // Handle Video Form Submit
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoLoading(true);
    setVideoMsg("");

    const res = await updateServicesVideo(videoData);
    if (res.success) {
      setVideoMsg("Services video & section title updated successfully!");
    } else {
      setVideoMsg(res.message || "Failed to update services video.");
    }
    setVideoLoading(false);
  };

  const resetForm = () => {
    reset({
      title: "",
      shortDescription: "",
      description: "",
      icon: "Briefcase",
      order: 0,
      published: true,
    });
    setFeatures([]);
    setFeatureInput("");
    setEditingService(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (service: any) => {
    setEditingService(service);
    reset({
      title: service.title || "",
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      icon: service.icon || "Briefcase",
      order: service.order ?? 0,
      published: service.published ?? true,
    });
    setFeatures(service.features || []);
    setShowModal(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures((prev) => [...prev, featureInput.trim()]);
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: ServiceFormValues) => {
    setLoading(true);

    const payload = {
      ...values,
      features,
    };

    if (editingService) {
      const res = await updateService(editingService._id, payload);
      if (res.success) {
        setServices((prev) =>
          prev.map((item) => (item._id === editingService._id ? { ...item, ...payload } : item))
        );
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createService(payload);
      if (res.success) {
        if (res.data) {
          setServices((prev) => [...prev, res.data]);
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
    if (!confirm("Are you sure you want to delete this service?")) return;
    const res = await deleteService(id);
    if (res.success) {
      setServices((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Services Video Upload & Overview Settings */}
      <form
        onSubmit={handleSaveVideo}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-slate-900">
              Services Page Promotional Video
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Video & Intro Section</span>
        </div>

        {videoMsg && (
          <div className="rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 border border-emerald-200 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{videoMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Video Showcase Title
            </label>
            <input
              type="text"
              value={videoData.title}
              onChange={(e) => setVideoData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Watch Our Student Success & Counseling Overview"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Video Subtitle / Caption
            </label>
            <input
              type="text"
              value={videoData.subtitle}
              onChange={(e) => setVideoData((prev) => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Learn how Hope Global Academy empowers ambitious students..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <VideoUpload
            label="Upload Counseling Video (MP4 / WebM or direct Cloudinary link)"
            value={videoData.videoUrl || ""}
            onChange={async (url) => {
              const updatedData = { ...videoData, videoUrl: url };
              setVideoData(updatedData);
              setVideoLoading(true);
              setVideoMsg("");
              const res = await updateServicesVideo(updatedData);
              if (res.success) {
                setVideoMsg("Services video link saved to database successfully!");
              } else {
                setVideoMsg(res.message || "Failed to save video URL.");
              }
              setVideoLoading(false);
            }}
            folder="hope-global-academy/services-video"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={videoLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{videoLoading ? "Saving Video Settings..." : "Save Video Settings"}</span>
          </button>
        </div>
      </form>

      {/* 2. Services Management List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Services Offered ({services.length})</h3>
            <p className="text-sm text-slate-500">
              Manage the 7 core services displayed on the public Services page.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </button>
        </div>

        {services.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500 space-y-3">
            <Briefcase className="h-10 w-10 text-slate-400 mx-auto" />
            <p className="text-base font-medium text-slate-700">No services found.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-4 w-12">#</th>
                    <th className="p-4">Service Name</th>
                    <th className="p-4">Short Description</th>
                    <th className="p-4">Features Count</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((svc, idx) => (
                    <tr key={svc._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-slate-400">{idx + 1}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{svc.title}</div>
                        <div className="text-xs text-slate-400">{svc.slug}</div>
                      </td>
                      <td className="p-4 max-w-sm">
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {svc.shortDescription || svc.description}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          <Sparkles className="h-3 w-3" />
                          {(svc.features || []).length} Features
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleOpenEdit(svc)}
                            className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(svc._id)}
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
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <p className="text-xs text-slate-500">
                Enter title, description, and feature list for this higher education service.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="e.g. Profile Assessment"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500">{errors.title.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Icon / Artwork Key
                  </label>
                  <select
                    {...register("icon")}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="UserCheck">Profile Assessment (UserCheck)</option>
                    <option value="Compass">Career Guidance (Compass)</option>
                    <option value="FileCheck">Visa Application (FileCheck)</option>
                    <option value="GraduationCap">University Application (GraduationCap)</option>
                    <option value="Video">Interview Preparation (Video)</option>
                    <option value="Home">Accommodation (Home)</option>
                    <option value="PlaneTakeoff">Pre & Post Departure (PlaneTakeoff)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Tagline / Summary
                </label>
                <input
                  type="text"
                  {...register("shortDescription")}
                  placeholder="e.g. Strategic career mapping aligning your chosen degree..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Service Description *
                </label>
                <textarea
                  rows={4}
                  {...register("description")}
                  placeholder="Detailed description of what this service includes..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
                {errors.description && (
                  <span className="text-xs text-red-500">{errors.description.message}</span>
                )}
              </div>

              {/* Dynamic Feature Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">
                  Key Features & Highlights
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Add a bullet point feature..."
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1 pt-1">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-700 border border-slate-200"
                    >
                      <span className="truncate">• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm"
                >
                  {loading ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
