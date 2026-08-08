"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  GraduationCap,
  UserCheck,
  HeartHandshake,
  Award,
  Sparkles,
  CheckCircle,
  Play,
  Video,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface SettingsProps {
  whyChooseUsTitle?: string;
  whyChooseUsSubtitle?: string;
  whyChooseUsVideo?: string;
  whyChooseUsFeatures?: Feature[];
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  GraduationCap,
  UserCheck,
  HeartHandshake,
  Award,
  Sparkles,
  CheckCircle,
};

export function WhyChooseUs({ settings }: { settings?: SettingsProps }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const title = settings?.whyChooseUsTitle || "Why Choose Hope Global Academy?";
  const subtitle =
    settings?.whyChooseUsSubtitle ||
    "We provide comprehensive, end-to-end guidance for ambitious students aiming to study at top global universities.";
  const videoUrl = settings?.whyChooseUsVideo || "";
  const features = settings?.whyChooseUsFeatures?.length
    ? settings.whyChooseUsFeatures
    : [
        {
          title: "98% Visa Success Rate",
          description:
            "Proven track record with certified counselors assisting step-by-step with student visa applications.",
          icon: "ShieldCheck",
        },
        {
          title: "500+ Partner Universities",
          description:
            "Direct partnerships with leading institutions in the UK, USA, Australia, and Canada.",
          icon: "GraduationCap",
        },
        {
          title: "Personalized Counseling",
          description:
            "1-on-1 profile evaluation and course matching tailored to your academic background and goals.",
          icon: "UserCheck",
        },
        {
          title: "End-to-End Support",
          description:
            "From university application and scholarship search to accommodation and post-arrival assistance.",
          icon: "HeartHandshake",
        },
      ];

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  return (
    <section className="relative py-20 bg-slate-900 text-white overflow-hidden" id="why-choose-us">
      {/* Background Decorative Glow Effects using Primary & Accent Brand Tokens */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/40 border border-primary/50 text-blue-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Excellence In Overseas Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid Content: Video Presentation + Features List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Video Player Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-elevation group">
              {videoUrl ? (
                isYouTubeUrl(videoUrl) ? (
                  <div className="relative aspect-video w-full">
                    {isPlaying ? (
                      <iframe
                        src={getYouTubeEmbedUrl(videoUrl)}
                        title="Hope Global Academy Video"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div
                        onClick={() => setIsPlaying(true)}
                        className="relative w-full h-full min-h-[300px] flex items-center justify-center cursor-pointer bg-slate-950 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent-hover transition-all duration-300">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </div>
                          <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                            Click To Watch Video
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-video w-full bg-slate-950">
                    <video
                      src={videoUrl}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                )
              ) : (
                /* Fallback frame when no video has been uploaded yet */
                <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-slate-950 to-primary/40 flex flex-col items-center justify-center p-8 text-center border border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-primary/40 border border-primary/50 flex items-center justify-center mb-4 text-white">
                    <Video className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Hope Global Academy Story
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Watch how we help thousands of international students fulfill their dreams of studying abroad.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upload your video from Admin Settings</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => {
                const IconComponent =
                  (feature.icon && iconMap[feature.icon]) || CheckCircle;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-accent/40 transition-all duration-200 space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/40 border border-primary/50 text-blue-200 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

