import { getBlogs } from "@/actions/blog";
import { BlogManager } from "@/components/admin/BlogManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Blog & Articles</h1>
        <p className="text-sm text-slate-500">Publish guides, study abroad tips, and news articles</p>
      </div>

      <BlogManager initialBlogs={blogs} />
    </div>
  );
}
