"use client";

import { useState } from "react";
import { updateSettings } from "@/actions/setting";
import { Save } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

export function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState(initialSettings || {});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
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

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary-hover transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{loading ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>
    </form>
  );
}
