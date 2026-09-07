import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import Blog from "@/models/Blog";
import { SITE_URL } from "@/lib/constants";

interface SitemapItemLean {
  slug: string;
  updatedAt?: Date | string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    await connectToDatabase();

    const destinations = (await Destination.find({ published: true })
      .select("slug updatedAt")
      .lean()) as unknown as SitemapItemLean[];

    const blogs = (await Blog.find({ published: true })
      .select("slug updatedAt")
      .lean()) as unknown as SitemapItemLean[];

    const destinationUrls: MetadataRoute.Sitemap = destinations.map((d) => ({
      url: `${SITE_URL}/study-in/${d.slug}`,
      lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    const blogUrls: MetadataRoute.Sitemap = blogs.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...destinationUrls, ...blogUrls];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap entries:", error);
    return staticRoutes;
  }
}

