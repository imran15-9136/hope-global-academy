"use client";

import { useState } from "react";
import { createCourse, deleteCourse, updateCourse } from "@/actions/course";
import { Plus, Trash2, Pencil, GraduationCap, BookOpen, Award, Compass } from "lucide-react";

// Map icon string name to Component
const iconMap: Record<string, any> = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Award: Award,
  Compass: Compass,
};

export function CourseManager({ initialCourses }: { initialCourses: any[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("GraduationCap");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("GraduationCap");
    setDuration("");
    setLevel("");
    setEditingCourse(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (course: any) => {
    setTitle(course.title);
    setDescription(course.description);
    setIcon(course.icon || "GraduationCap");
    setDuration(course.duration || "");
    setLevel(course.level || "");
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      description,
      icon,
      duration,
      level,
    };

    if (editingCourse) {
      const res = await updateCourse(editingCourse._id, payload);
      if (res.success) {
        setCourses((prev) =>
          prev.map((c) => (c._id === editingCourse._id ? { ...c, ...payload } : c))
        );
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createCourse(payload);
      if (res.success) {
        if (res.data) {
          setCourses((prev) => [res.data, ...prev]);
        }
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    const res = await deleteCourse(id);
    if (res.success) {
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Academic Programs ({courses.length})</h2>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No courses created yet. Click "Add Course" to create one.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4 w-12">Icon</th>
                <th className="p-4">Title & Description</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Level/Popularity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => {
                const IconComponent = iconMap[course.icon || "GraduationCap"] || GraduationCap;
                return (
                  <tr key={course._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{course.description}</p>
                    </td>
                    <td className="p-4 text-xs font-semibold text-slate-700">{course.duration || "N/A"}</td>
                    <td className="p-4">
                      {course.level ? (
                        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          {course.level}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleOpenEdit(course)}
                          className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Course Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Undergraduate Degrees"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Description *</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the academic path..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 - 4 Years"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Level / Tag</label>
                  <input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="e.g. High Demand / Top Choice"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Display Icon</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="GraduationCap">Graduation Cap (Default)</option>
                  <option value="BookOpen">Book Open</option>
                  <option value="Award">Award Badge</option>
                  <option value="Compass">Compass</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
                >
                  {loading ? "Saving..." : editingCourse ? "Update Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
