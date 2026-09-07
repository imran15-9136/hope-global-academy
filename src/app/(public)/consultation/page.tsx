import type { Metadata } from "next";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { SITE_URL } from "@/lib/constants";
import JsonLd from "@/components/shared/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book Free Consultation",
  description:
    "Schedule a 1-on-1 counseling session with our expert study abroad counselors for admissions in UK, USA, Australia, and Canada.",
  alternates: {
    canonical: `${SITE_URL}/consultation`,
  },
  openGraph: {
    title: "Book Free Consultation | Hope Global Academy",
    description:
      "Schedule a 1-on-1 counseling session with our expert study abroad counselors for admissions in UK, USA, Australia, and Canada.",
    url: `${SITE_URL}/consultation`,
  },
};

export default function DedicatedConsultationPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Book Consultation", item: "/consultation" },
  ];

  return (
    <div>
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbs)} />
      <header className="bg-slate-900 py-12 sm:py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Admissions Counseling
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Book a Free 1-on-1 Study Abroad Consultation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Get personalized guidance from qualified counselors on visa requirements, country selection, scholarships, and university admissions.
          </p>
        </div>
      </header>
      <div className="py-8">
        <AppointmentForm noBackground />
      </div>
    </div>
  );
}

