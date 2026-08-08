"use client";

import { useState } from "react";
import { updateSettings } from "@/actions/setting";
import { Save, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { VideoUpload } from "./VideoUpload";

export function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState(initialSettings || {});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...(formData.whyChooseUsFeatures || [])];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, whyChooseUsFeatures: updatedFeatures }));
  };

  const addFeature = () => {
    const updatedFeatures = [
      ...(formData.whyChooseUsFeatures || []),
      { title: "", description: "", icon: "CheckCircle" },
    ];
    setFormData((prev: any) => ({ ...prev, whyChooseUsFeatures: updatedFeatures }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = (formData.whyChooseUsFeatures || []).filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev: any) => ({ ...prev, whyChooseUsFeatures: updatedFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await updateSettings(formData);
    if (res.success) {
      setMessage("Settings updated successfully!");
    } else {
      setMessage("Failed to update settings.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-card space-y-6">
      {message && (
        <div className="rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 border border-emerald-200">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider">
          General & Branding
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Site Title</label>
          <input
            type="text"
            name="siteName"
            value={formData.siteName || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <ImageUpload
            label="Company Logo"
            value={formData.logo || ""}
            onChange={(url) => setFormData((prev: any) => ({ ...prev, logo: url }))}
            folder="logos"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider">
          Hero Section & Stats
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
          <textarea
            name="heroSubtitle"
            value={formData.heroSubtitle || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Visa Success Rate Counter</label>
            <input
              type="text"
              name="visaSuccessRate"
              value={formData.visaSuccessRate || ""}
              onChange={handleChange}
              placeholder="98%"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Students Served Counter</label>
            <input
              type="text"
              name="studentsServed"
              value={formData.studentsServed || ""}
              onChange={handleChange}
              placeholder="10,000+"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider">
          Why Choose Us Section & Video
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
          <input
            type="text"
            name="whyChooseUsTitle"
            value={formData.whyChooseUsTitle || ""}
            onChange={handleChange}
            placeholder="Why Choose Hope Global Academy?"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Section Subtitle</label>
          <textarea
            name="whyChooseUsSubtitle"
            value={formData.whyChooseUsSubtitle || ""}
            onChange={handleChange}
            placeholder="We provide comprehensive, end-to-end guidance for ambitious students..."
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
            rows={2}
          />
        </div>

        <div>
          <VideoUpload
            label="Section Video (Cloudinary Upload or Direct URL)"
            value={formData.whyChooseUsVideo || ""}
            onChange={(url) => setFormData((prev: any) => ({ ...prev, whyChooseUsVideo: url }))}
            folder="hope-global-academy/videos"
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-semibold text-slate-700">Key Reasons & Highlights</label>
            <button
              type="button"
              onClick={addFeature}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Feature</span>
            </button>
          </div>

          {(formData.whyChooseUsFeatures || []).map((feature: any, index: number) => (
            <div key={index} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 space-y-2">
              <div className="flex justify-between items-center gap-2">
                <input
                  type="text"
                  value={feature.title || ""}
                  onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  placeholder="Feature Title (e.g. 98% Visa Success Rate)"
                  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={feature.description || ""}
                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                placeholder="Brief description of this highlight..."
                rows={2}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-600 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{loading ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>
    </form>
  );
}
