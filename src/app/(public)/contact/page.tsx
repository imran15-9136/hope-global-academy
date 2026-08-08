import { Metadata } from "next";
import { getOffices } from "@/actions/office";
import { getSettings } from "@/actions/setting";
import { BranchList } from "@/components/public/BranchList";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Globe } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings?.siteName || "Hope Global Academy";

  return {
    title: `Contact Us & Global Branch Offices | ${siteName}`,
    description:
      "Connect with Hope Global Academy's branch offices in Bangladesh, UK, and worldwide. Get personalized counseling, university application support, and visa guidance.",
    openGraph: {
      title: `Contact Us & Global Branch Offices | ${siteName}`,
      description:
        "Visit or contact our global branch offices for expert guidance on studying abroad.",
      type: "website",
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function ContactPage() {
  const offices = await getOffices();
  const settings = await getSettings();

  const primaryPhone = settings?.phone || "+880 1700-000000";
  const primaryEmail = settings?.email || "info@hopeglobalacademy.com";

  // Generate JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Hope Global Academy",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hopeglobalacademy.com",
    contactPoint: offices.map((o: any) => ({
      "@type": "ContactPoint",
      telephone: o.phone || primaryPhone,
      email: o.email || primaryEmail,
      contactType: "customer service",
      areaServed: o.country,
      availableLanguage: ["English", "Bengali"],
    })),
    address: offices.map((o: any) => ({
      "@type": "PostalAddress",
      streetAddress: o.address,
      addressCountry: o.country,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50/50 pb-20">
        {/* Contact Hero */}
        <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-1.5 text-xs font-semibold text-accent">
              <Globe className="h-4 w-4" />
              <span>Worldwide Presence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Get in Touch with Our Global Branch Offices
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Have questions about university admissions, scholarships, or student visas? Visit our branch offices or send us a message below.
            </p>
          </div>
        </section>

        {/* Global Branch Offices Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-10">
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-slate-200/80">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Branch Locations</h2>
              <p className="text-sm text-slate-600">
                Explore our offices across Bangladesh and internationally for personalized 1-on-1 counseling.
              </p>
            </div>

            <BranchList offices={offices} />
          </div>
        </section>

        {/* Quick Contact Info Cards */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Direct Helpline</h3>
                <p className="text-xs text-slate-500">Call us for instant counseling assistance</p>
                <a
                  href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
                  className="block text-sm font-semibold text-primary hover:underline pt-1"
                >
                  {primaryPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Email Inquiries</h3>
                <p className="text-xs text-slate-500">Send your official documents & queries</p>
                <a
                  href={`mailto:${primaryEmail}`}
                  className="block text-sm font-semibold text-primary hover:underline pt-1 break-all"
                >
                  {primaryEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Office Hours</h3>
                <p className="text-xs text-slate-500">Saturday – Thursday</p>
                <p className="text-sm font-semibold text-slate-800 pt-1">
                  10:00 AM – 6:30 PM (BDT)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Consultation Form Section */}
        <section className="mt-12">
          <AppointmentForm noBackground />
        </section>
      </main>
    </>
  );
}
