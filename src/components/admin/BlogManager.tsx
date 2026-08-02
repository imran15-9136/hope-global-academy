"use client";

import { useState } from "react";
import { createBlog, deleteBlog } from "@/actions/blog";
import { Plus, Trash2, FileText } from "lucide-react";

export function BlogManager({ initialBlogs }: { initialBlogs: any[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createBlog({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      excerpt,
      content,
      coverImage: coverImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    });

    if (res.success) {
      if (res.data) {
        setBlogs((prev) => [res.data, ...prev]);
      }
      setShowModal(false);
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const res = await deleteBlog(id);
    if (res.success) {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Articles & Guides ({blogs.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No blog posts published yet.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{blog.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{blog.excerpt}</p>
                  </td>
                  <td className="p-4 font-mono text-xs text-primary">/{blog.slug}</td>
                  <td className="p-4 text-xs text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">Publish New Article</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ultimate Guide to Studying in the UK"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. ultimate-guide-uk"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Excerpt</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summary for post preview..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Content *</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write post content here..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
                >
                  {loading ? "Publishing..." : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
