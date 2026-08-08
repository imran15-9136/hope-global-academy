import { Metadata } from "next";
import { getServices, getServicesVideo } from "@/actions/service";
import { getSettings } from "@/actions/setting";
import { ServiceArtwork } from "@/components/public/ServiceArtwork";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { Sparkles, CheckCircle2, Video, ArrowRight, ShieldCheck, GraduationCap, HeartHandshake } from "lucide-react";
import Link from "next/link";

import { ServiceVideoPlayer } from "@/components/public/ServiceVideoPlayer";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings?.siteName || "Hope Global Academy";

  return {
    title: `Our Higher Education Services | ${siteName}`,
    description:
      "Explore Hope Global Academy's 7 core services: Profile Assessment, Career Guidance, Visa Application, University Application, Interview Prep, Accommodation, and Pre/Post Departure briefing.",
    openGraph: {
      title: `Our Higher Education Services | ${siteName}`,
      description:
        "Comprehensive, end-to-end guidance for studying in top universities in the UK, USA, Australia, and Canada.",
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();
  const videoData = await getServicesVideo();
  const settings = await getSettings();

  // Generate JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Hope Global Academy",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hopeglobalacademy.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Higher Education Consulting Services",
      itemListElement: services.map((s: any, idx: number) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50/50 pb-20">
        {/* Services Hero Header */}
        <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-4 w-4" />
              <span>Full-Spectrum Student Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              End-to-End Higher Education Services
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              From your initial profile evaluation and university selection to visa approval and pre-departure orientation, we guide you every step of the way.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>98% Visa Success Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <span>500+ Partner Universities</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                <HeartHandshake className="h-4 w-4 text-emerald-400" />
                <span>100% Free Counseling</span>
              </div>
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <ServiceVideoPlayer
          videoUrl={videoData.videoUrl}
          title={videoData.title}
          subtitle={videoData.subtitle}
        />

        {/* 7 Core Services Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Our 7 Specialized Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Customized support tailored for international students pursuing undergraduate & postgraduate degrees abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => {
              return (
                <div
                  key={service._id || index}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-200/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-300"
                >
                  <div className="space-y-6">
                    {/* Header Artwork & Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                        <ServiceArtwork name={service.title || service.icon} className="h-20 w-20" />
                      </div>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 font-bold text-xs text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Service Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      {service.shortDescription && (
                        <p className="text-xs font-medium text-accent uppercase tracking-wider">
                          {service.shortDescription}
                        </p>
                      )}
                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Bullet List */}
                    {service.features && service.features.length > 0 && (
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Key Deliverables:
                        </p>
                        <ul className="space-y-2 text-xs text-slate-600">
                          {service.features.map((feat: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Embedded Direct Consultation Form */}
        <section className="mt-20">
          <AppointmentForm noBackground />
        </section>
      </main>
    </>
  );
}
