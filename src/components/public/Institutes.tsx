import { Building2, Award } from "lucide-react";

const institutes = [
  { name: "University of Oxford", country: "UK", ranking: "Top 5 Global" },
  { name: "University of Cambridge", country: "UK", ranking: "Top 5 Global" },
  { name: "Harvard University", country: "USA", ranking: "Top 5 Global" },
  { name: "University of Toronto", country: "Canada", ranking: "#1 in Canada" },
  { name: "University of Sydney", country: "Australia", ranking: "Top 20 Global" },
  { name: "Monash University", country: "Australia", ranking: "Group of Eight" },
  { name: "Coventry University", country: "UK", ranking: "#1 Modern Uni" },
  { name: "Arizona State University", country: "USA", ranking: "#1 Innovation" },
];

export function Institutes() {
  return (
    <section id="institutes" className="py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">
            Global Partner Network
          </h2>
          <p className="text-3xl font-extrabold sm:text-4xl text-white">
            Over 500+ World-Class Partner Universities
          </p>
          <p className="text-slate-400">
            Direct partnerships with premier institutions worldwide ensuring priority application processing and scholarship access.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {institutes.map((inst, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-slate-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/60 text-accent mb-3">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-white">{inst.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{inst.country}</p>
              <div className="mt-3 flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
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
