import type { Metadata } from "next";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { SITE_URL } from "@/lib/constants";
import JsonLd from "@/components/shared/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Apply Online",
  description:
    "Submit your university application details directly to our admissions team for UK, USA, Australia, and Canada universities.",
  alternates: {
    canonical: `${SITE_URL}/apply`,
  },
  openGraph: {
    title: "Apply Online | Hope Global Academy",
    description:
      "Submit your university application details directly to our admissions team for UK, USA, Australia, and Canada universities.",
    url: `${SITE_URL}/apply`,
  },
};

export default function DedicatedApplyPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Apply Online", item: "/apply" },
  ];

  return (
    <div>
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbs)} />
      <header className="bg-slate-900 py-12 sm:py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Admissions Portal
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Apply Online for Global University Admissions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Submit your profile to our certified education specialists and receive personalized course options and scholarship evaluation.
          </p>
        </div>
      </header>
      <div className="py-8">
        <AppointmentForm noBackground />
      </div>
    </div>
  );
}

