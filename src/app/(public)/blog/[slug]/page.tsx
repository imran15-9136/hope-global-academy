import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug, published: true }).lean();
  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.seoTitle || blog.title} | Hope Global Academy`,
    description: blog.seoDescription || blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const rawBlog = await Blog.findOne({ slug, published: true }).lean();

  if (!rawBlog) {
    notFound();
  }

  const blog = JSON.parse(JSON.stringify(rawBlog));

  return (
    <div className="py-16">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {blog.title}
          </h1>
          {blog.excerpt && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{blog.excerpt}</p>}
        </div>

        {blog.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-elevation">
            <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-6">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-8 border-t border-slate-200 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
