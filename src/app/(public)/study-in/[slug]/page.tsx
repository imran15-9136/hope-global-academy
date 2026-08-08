import { AppointmentForm } from "@/components/public/AppointmentForm";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DollarSign, Calendar, ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const normalizedSlug = decoded.toLowerCase().trim().replace(/\s+/g, "-");

  await connectToDatabase();
  const dbDest = await Destination.findOne({
    $or: [{ slug: normalizedSlug }, { slug: decoded }, { slug: slug }],
    published: true,
  }).lean();

  if (!dbDest) {
    return {
      title: "Destination Not Found | Hope Global Academy",
    };
  }

  const name = decodeURIComponent(dbDest.name).replace(/%20/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description =
    dbDest.shortDescription ||
    `Complete guide to higher education, tuition fees, entry requirements, and visas in ${name}.`;

  return {
    title: `Study in ${name} | Hope Global Academy`,
    description,
  };
}

export default async function StudyInCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const normalizedSlug = decoded.toLowerCase().trim().replace(/\s+/g, "-");

  await connectToDatabase();
  const rawDest = await Destination.findOne({
    $or: [{ slug: normalizedSlug }, { slug: decoded }, { slug: slug }],
    published: true,
  }).lean();

  if (!rawDest) {
    notFound();
  }

  const dest: any = JSON.parse(JSON.stringify(rawDest));

  // Ensure country name never has %20 or raw encoded text
  dest.name = decodeURIComponent(dest.name)
    .replace(/%20/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Default highlights fallback if highlights array is empty
  const displayHighlights =
    dest.highlights && dest.highlights.length > 0
      ? dest.highlights
      : [
          {
            title: "Internationally Accredited Degrees",
            description: `Degrees awarded by institutions in ${dest.name} are globally respected by top employers.`,
          },
          {
            title: "Part-time Work Rights",
            description: "Students can work part-time during term time and full-time during official university holidays.",
          },
          {
            title: "Merit Scholarships & Financial Grants",
            description: "Multiple partial tuition fee waivers and academic grants available for qualified candidates.",
          },
          {
            title: "Post-Graduation Work Permits",
            description: "Pathway to stay and gain invaluable international work experience post-graduation.",
          },
        ];

  return (
    <>
      {/* Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {dest.image && (
            <Image
              src={dest.image}
              alt={`Study in ${dest.name}`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl space-y-5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/#destinations" className="hover:text-white transition-colors">
                Destinations
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-amber-400">{dest.name}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 px-3.5 py-1 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-accent" />
              <span>Official Destination Guide</span>
            </span>

            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              Study in {dest.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {dest.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#appointment"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-accent-hover transition-colors"
              >
                <span>Apply for {dest.name}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                <span>Entry & Visa Info</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Average Tuition
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {dest.tuitionRange || "Flexible / Contact Counselor"}
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Key Intakes
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {dest.intake || "January / September"}
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Post-Study Work
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {dest.postStudyWork || "2 - 3 Years Work Permit"}
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Award className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Visa Success Rate
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {dest.visaSuccessRate || "98% Success Rate"}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Content Section */}
      <section id="overview" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              {dest.content ? (
                <div className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h3:text-lg prose-h3:font-bold prose-h3:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                  <div dangerouslySetInnerHTML={{ __html: dest.content }} />
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Why Choose Higher Education in {dest.name}?
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {dest.shortDescription ||
                        `${dest.name} is one of the premier global study destinations for international students. Recognized globally for innovative teaching methodologies, state-of-the-art research laboratories, and diverse cultural student communities.`}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      Key Highlights for International Students:
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      {displayHighlights.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{item.title}:</strong> {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-5">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                  Quick Application Summary
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-bold text-slate-900">{dest.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Tuition Range:</span>
                    <span className="font-bold text-slate-900">{dest.tuitionRange || "Flexible"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Primary Intakes:</span>
                    <span className="font-bold text-slate-900">{dest.intake || "Jan / Sep"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Counseling Fee:</span>
                    <span className="font-bold text-emerald-600">100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Lead Form */}
      <AppointmentForm initialCountry={dest.name} />
    </>
  );
}
