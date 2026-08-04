import { getCourses } from "@/actions/course";
import { CourseManager } from "@/components/admin/CourseManager";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Academic Programs</h1>
        <p className="text-sm text-slate-500">Configure degree levels, foundation pathways, and program durations</p>
      </div>

      <CourseManager initialCourses={courses} />
    </div>
  );
}
