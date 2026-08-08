"use client";

import React, { useState } from "react";
import { uploadVideo } from "@/actions/upload";
import { Upload, X, Video as VideoIcon, Link as LinkIcon, Loader2 } from "lucide-react";

interface VideoUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function VideoUpload({
  label,
  value,
  onChange,
  folder = "hope-global-academy/videos",
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file (e.g. MP4, WebM, MOV).");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      // Try API route upload first
      const res = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();

      if (response.success && response.data) {
        onChange(response.data);
        setManualUrl(response.data);
      } else {
        // Fallback to server action
        const actionResponse = await uploadVideo(formData);
        if (actionResponse.success && actionResponse.data) {
          onChange(actionResponse.data);
          setManualUrl(actionResponse.data);
        } else {
          setError(actionResponse.message || response.message || "Failed to upload video.");
        }
      }
    } catch (err) {
      console.error(err);
      // Try fallback to server action on network error
      try {
        const actionResponse = await uploadVideo(formData);
        if (actionResponse.success && actionResponse.data) {
          onChange(actionResponse.data);
          setManualUrl(actionResponse.data);
        } else {
          setError(actionResponse.message || "Failed to upload video.");
        }
      } catch (fallbackErr) {
        setError("An error occurred during video upload. You can also paste a direct Cloudinary or YouTube video URL.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setManualUrl("");
    setError(null);
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
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          {showUrlInput ? (
            <>
              <VideoIcon className="h-3 w-3" />
              <span>Use File Upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="h-3 w-3" />
              <span>Enter Video URL</span>
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
            placeholder="https://res.cloudinary.com/.../video.mp4 or direct video URL"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
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
            <div className="relative rounded-xl border border-slate-200 bg-slate-900 p-3 flex flex-col gap-3">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={value}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 font-mono truncate max-w-md">{value}</p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Remove Video</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-xl p-6 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all duration-150">
                <div className="space-y-1.5 text-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      <p className="text-xs font-semibold text-slate-600">Uploading Video to Cloudinary...</p>
                      <p className="text-[10px] text-slate-400">Please wait while the video processes</p>
                    </div>
                  ) : (
                    <>
                      <VideoIcon className="mx-auto h-8 w-8 text-slate-400 transition-colors" />
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-blue-600 hover:underline">Click to upload video</span> or drag & drop
                      </div>
                      <p className="text-[10px] text-slate-400">MP4, WebM, MOV, or OGG (max 100MB)</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="video/*"
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
