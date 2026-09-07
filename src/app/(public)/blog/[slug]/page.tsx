import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { getBlogPostingJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ published: true }).select("slug").lean();
    return (blogs as Array<{ slug: string }>).map((b) => ({
      slug: b.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const blog: any = await Blog.findOne({ slug, published: true }).lean();

  if (!blog) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seoTitle || blog.title;
  const description = blog.seoDescription || blog.excerpt || blog.title;
  const canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Hope Global Academy`,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
      modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
      images: blog.coverImage
        ? [
            {
              url: blog.coverImage,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Hope Global Academy`,
      description,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
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

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: blog.title, item: `/blog/${blog.slug}` },
  ];

  const blogPostSchema = getBlogPostingJsonLd({
    title: blog.title,
    description: blog.excerpt || blog.title,
    url: `${SITE_URL}/blog/${blog.slug}`,
    image: blog.coverImage,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
    authorName: blog.author || "Hope Global Academy",
  });

  const schemas = [getBreadcrumbJsonLd(breadcrumbs), blogPostSchema];

  return (
    <div className="py-16">
      <JsonLd data={schemas} />
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Visual Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 truncate max-w-xs">{blog.title}</span>
        </nav>

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
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
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

