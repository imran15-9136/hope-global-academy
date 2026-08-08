import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import Blog from "@/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hopeglobalacademy.com";

  await connectToDatabase();

  const destinations = await Destination.find({ published: true }).select("slug updatedAt").lean();
  const blogs = await Blog.find({ published: true }).select("slug updatedAt").lean();

  const destinationUrls = destinations.map((d: any) => ({
    url: `${baseUrl}/study-in/${d.slug}`,
    lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((b: any) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...destinationUrls,
    ...blogUrls,
  ];
}
