"use client";

import React, { useState } from "react";
import { Play, Video as VideoIcon, Sparkles } from "lucide-react";

interface ServiceVideoPlayerProps {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

export function ServiceVideoPlayer({ videoUrl, title, subtitle }: ServiceVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback demo video if no custom video is uploaded yet
  const DEFAULT_DEMO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const rawUrl = (videoUrl || "").trim();
  const activeUrl = rawUrl || DEFAULT_DEMO_VIDEO;

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const isVimeoUrl = (url: string) => {
    return url.includes("vimeo.com");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/;
    const match = url.match(regExp);
    return match && match[3]
      ? `https://player.vimeo.com/video/${match[3]}?autoplay=1`
      : url;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-primary">
          <VideoIcon className="h-3.5 w-3.5" />
          <span>Student Success Video</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          {title || "Watch Our Student Success & Counseling Overview"}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {subtitle || "Learn how Hope Global Academy empowers ambitious students with 1-on-1 guidance from application to arrival."}
        </p>
      </div>

      {/* Video Box Container */}
      <div className="relative mx-auto max-w-4xl aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
        {isYouTubeUrl(activeUrl) ? (
          <div className="relative w-full h-full">
            {isPlaying ? (
              <iframe
                src={getYouTubeEmbedUrl(activeUrl)}
                title="Counseling Overview Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white group p-6"
              >
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent text-slate-900 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-extrabold text-white uppercase tracking-widest bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700">
                    Click to Play Showcase Video
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : isVimeoUrl(activeUrl) ? (
          <iframe
            src={getVimeoEmbedUrl(activeUrl)}
            title="Counseling Overview Video"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={activeUrl}
            controls
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
