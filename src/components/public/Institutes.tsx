import { Building2, Award } from "lucide-react";

interface InstituteItem {
  _id?: string;
  name: string;
  country: string;
  ranking: string;
}

const defaultInstitutes: InstituteItem[] = [
  { name: "University of Oxford", country: "UK", ranking: "Top 5 Global" },
  { name: "University of Cambridge", country: "UK", ranking: "Top 5 Global" },
  { name: "Harvard University", country: "USA", ranking: "Top 5 Global" },
  { name: "University of Toronto", country: "Canada", ranking: "#1 in Canada" },
  { name: "University of Sydney", country: "Australia", ranking: "Top 20 Global" },
  { name: "Monash University", country: "Australia", ranking: "Group of Eight" },
  { name: "Coventry University", country: "UK", ranking: "#1 Modern Uni" },
  { name: "Arizona State University", country: "USA", ranking: "#1 Innovation" },
];

export function Institutes({ initialInstitutes }: { initialInstitutes?: InstituteItem[] }) {
  const displayInstitutes =
    initialInstitutes && initialInstitutes.length > 0 ? initialInstitutes : defaultInstitutes;

  return (
    <section id="institutes" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow Effects using Primary & Accent Brand Tokens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/40 border border-primary/50 text-blue-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Award className="w-3.5 h-3.5 text-accent" />
            <span>Global Partner Network</span>
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight">
            Over 500+ World-Class Partner Universities
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Direct partnerships with premier institutions worldwide ensuring priority application processing and scholarship access.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {displayInstitutes.map((inst, idx) => (
            <div
              key={inst._id || idx}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/40 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-slate-800/80 hover:-translate-y-1 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/40 border border-primary/50 text-white mb-3 shadow-inner group-hover:bg-accent group-hover:border-accent transition-colors">
                <Building2 className="h-6 w-6 text-blue-200 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-base text-white transition-colors">
                {inst.name}
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-medium">{inst.country}</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-[11px] font-semibold text-accent">
                <Award className="h-3 w-3" />
                <span>{inst.ranking}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
