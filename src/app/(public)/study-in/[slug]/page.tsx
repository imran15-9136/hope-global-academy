import { AppointmentForm } from "@/components/public/AppointmentForm";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import { notFound } from "next/navigation";
import Image from "next/image";
import { DollarSign, Calendar, ShieldCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const dest = await Destination.findOne({ slug, published: true }).lean();
  if (!dest) return { title: "Destination Not Found" };

  return {
    title: `Study in ${dest.name} | Hope Global Academy`,
    description: dest.shortDescription || `Complete guide to higher education, tuition fees, and visas in ${dest.name}.`,
  };
}

export default async function StudyInCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const rawDest = await Destination.findOne({ slug, published: true }).lean();

  if (!rawDest) {
    notFound();
  }

  const dest = JSON.parse(JSON.stringify(rawDest));

  return (
    <>
      {/* Banner */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {dest.image && (
            <Image src={dest.image} alt={dest.name} fill className="object-cover" />
          )}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Study Abroad Destination
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Study in {dest.name}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{dest.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">Tuition Range</h3>
              <p className="text-sm text-slate-600">{dest.tuitionRange || "Contact Counselor"}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">Intake Months</h3>
              <p className="text-sm text-slate-600">{dest.intake || "January / September"}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">Post Study Work Visa</h3>
              <p className="text-sm text-slate-600">2 - 3 Years Work Permit Available</p>
            </div>
          </div>

          {dest.content && (
            <div className="mt-12 prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: dest.content }} />
            </div>
          )}
        </div>
      </section>

      <AppointmentForm />
    </>
  );
}
