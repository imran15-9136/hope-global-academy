"use client";

import React, { useState } from "react";
import { uploadImage } from "@/actions/upload";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ label, value, onChange, folder = "hope-global-academy" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await uploadImage(formData);
      if (response.success && response.data) {
        onChange(response.data);
        setManualUrl(response.data);
      } else {
        setError(response.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setManualUrl("");
    setError(null);
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(manualUrl);
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => {
            setShowUrlInput(!showUrlInput);
            setError(null);
          }}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          {showUrlInput ? (
            <>
              <ImageIcon className="h-3 w-3" />
              <span>Use File Upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="h-3 w-3" />
              <span>Enter Image URL</span>
            </>
          )}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onChange(manualUrl);
              setShowUrlInput(false);
            }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Apply
          </button>
        </div>
      ) : (
        <div>
          {value ? (
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center gap-4">
              <div className="relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-white">
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  className="object-contain"
                  unoptimized={value.startsWith("http")}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-mono truncate">{value}</p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-1 text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  <span>Remove Image</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-primary rounded-xl p-6 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all duration-150">
                <div className="space-y-1.5 text-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      <p className="text-xs font-semibold text-slate-600">Uploading to Cloudinary...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-primary hover:underline">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, or SVG (max 5MB)</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
