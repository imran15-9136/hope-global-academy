"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getBlogs() {
  await connectToDatabase();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export async function createBlog(formData: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  published?: boolean;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.title || !formData.slug || !formData.content) {
      return { success: false, message: "Title, Slug, and Content are required." };
    }

    await connectToDatabase();

    const existing = await Blog.findOne({ slug: formData.slug.toLowerCase() });
    if (existing) {
      return { success: false, message: "A blog post with this slug already exists." };
    }

    await Blog.create({
      title: formData.title,
      slug: formData.slug.toLowerCase().trim(),
      excerpt: formData.excerpt || "",
      content: formData.content,
      coverImage: formData.coverImage || "",
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.excerpt || "",
      tags: formData.tags || [],
      published: formData.published ?? true,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");

    return { success: true, message: "Blog post published successfully." };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, message: "Failed to create blog post." };
  }
}

export async function updateBlog(
  id: string,
  formData: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    seoTitle?: string;
    seoDescription?: string;
    tags?: string[];
    published?: boolean;
  }
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();

    await Blog.findByIdAndUpdate(id, {
      title: formData.title,
      slug: formData.slug.toLowerCase().trim(),
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage,
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      tags: formData.tags,
      published: formData.published,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");

    return { success: true, message: "Blog post updated." };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, message: "Failed to update blog post." };
  }
}

export async function deleteBlog(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Blog.findByIdAndDelete(id);

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");

    return { success: true, message: "Blog post deleted." };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, message: "Failed to delete blog post." };
  }
}
