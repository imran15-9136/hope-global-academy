import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface DestinationItem {
  _id?: string;
  name: string;
  slug: string;
  image?: string;
  intake?: string;
  tuitionRange?: string;
  shortDescription?: string;
}

const defaultDestinations = [
  {
    name: "United Kingdom",
    slug: "uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    intake: "Jan / Sep Intake",
    tuitionRange: "£12,000 - £25,000 / year",
  },
  {
    name: "United States",
    slug: "usa",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
    intake: "Fall / Spring Intake",
    tuitionRange: "$18,000 - $40,000 / year",
  },
  {
    name: "Australia",
    slug: "australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
    intake: "Feb / July Intake",
    tuitionRange: "AUD $20,000 - $38,000 / year",
  },
  {
    name: "Canada",
    slug: "canada",
    image: "https://images.unsplash.com/photo-1517935703635-27c737826572?q=80&w=800&auto=format&fit=crop",
    intake: "Jan / May / Sep Intake",
    tuitionRange: "CAD $15,000 - $32,000 / year",
  },
];

export function Destinations({ initialDestinations }: { initialDestinations?: DestinationItem[] }) {
  const displayDestinations =
    initialDestinations && initialDestinations.length > 0
      ? initialDestinations
      : defaultDestinations;

  return (
    <section id="destinations" className="py-20 bg-slate-50/50 border-y border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Top Global Destinations
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Choose Your Ideal Study Abroad Country
          </p>
          <p className="text-slate-600">
            Explore world-class academic institutions with flexible intakes and attractive post-study work opportunities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayDestinations.map((dest, idx) => (
            <div
              key={dest._id || dest.slug || idx}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-slate-200 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={
                    dest.image ||
                    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={`Study in ${dest.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                    <p className="flex justify-between">
                      <span>Intakes:</span>
                      <span className="font-semibold text-slate-700">{dest.intake || "Jan / Sep"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Tuition Range:</span>
                      <span className="font-semibold text-slate-700">{dest.tuitionRange || "Flexible"}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={`/study-in/${dest.slug}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-primary group-hover:text-white"
                  >
                    <span>Apply for {dest.name}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
