import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Study Abroad News, Guides & Visa Updates",
  description:
    "Read expert guides on visas, university entry requirements, student life, and scholarships for UK, USA, Australia, and Canada.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Study Abroad News, Guides & Visa Updates | Hope Global Academy",
    description:
      "Read expert guides on visas, university entry requirements, student life, and scholarships for UK, USA, Australia, and Canada.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default async function BlogListingPage() {
  await connectToDatabase();
  const rawBlogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(rawBlogs));

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ];

  return (
    <div className="py-16">
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbs)} />
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
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
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
    </div>
  );
}
