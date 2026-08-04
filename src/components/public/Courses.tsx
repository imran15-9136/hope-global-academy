import * as LucideIcons from "lucide-react";

interface CourseItem {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
  level?: string;
}

const defaultCourses: CourseItem[] = [
  {
    title: "Undergraduate Degrees",
    description: "Bachelor of Science (BSc), Bachelor of Arts (BA), Bachelor of Business Administration (BBA) with placement years.",
    duration: "3 - 4 Years",
    icon: "GraduationCap",
    level: "High Demand",
  },
  {
    title: "Postgraduate Degrees",
    description: "Master of Science (MSc), MBA, Master of Arts (MA) with 1-year intensive options and work placements.",
    duration: "1 - 2 Years",
    icon: "BookOpen",
    level: "Top Choice",
  },
  {
    title: "Diploma & Advanced Pathways",
    description: "HND, International Year One, and Vocational diplomas for fast-track career entry.",
    duration: "1 - 2 Years",
    icon: "Award",
    level: "Fast Track",
  },
  {
    title: "Foundation & Pre-Master's",
    description: "Preparatory pathway courses designed to bridge academic and English language entry requirements.",
    duration: "6 - 12 Months",
    icon: "Compass",
    level: "Guaranteed Entry",
  },
];

export function Courses({ initialCourses }: { initialCourses?: CourseItem[] }) {
  const displayCourses = initialCourses && initialCourses.length > 0 ? initialCourses : defaultCourses;

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Academic Programs
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Find Your Preferred Degree Level
          </p>
          <p className="text-slate-600">
            Discover tailored study pathways across medicine, engineering, business, IT, and creative arts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayCourses.map((course, idx) => {
            const Icon = (LucideIcons as any)[course.icon || "GraduationCap"] || LucideIcons.GraduationCap;
            return (
              <div
                key={course._id || idx}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-elevation"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    {course.duration && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {course.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">
                    {course.level || ""}
                  </span>
                  <a
                    href="#appointment"
                    className="text-xs font-bold text-slate-700 hover:text-primary transition-colors"
                  >
                    Select Course →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
