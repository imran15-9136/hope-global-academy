import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Latest News & Study Abroad Guides | Hope Global Academy",
  description: "Read expert guides on visas, university entry requirements, and scholarships.",
};

export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
  await connectToDatabase();
  const rawBlogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(rawBlogs));

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900">Study Abroad News & Guides</h1>
            <p className="text-slate-600">
              Stay updated with essential information on university admissions, visa policy updates, and student life.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              No blog posts published yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog: any) => (
                <article
                  key={blog._id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:shadow-elevation hover:-translate-y-1"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {blog.coverImage && (
                      <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-3">{blog.excerpt}</p>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover pt-2 border-t border-slate-100"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
