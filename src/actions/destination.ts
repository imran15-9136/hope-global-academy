"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function getDestinations() {
  await connectToDatabase();
  const destinations = await Destination.find().sort({ createdAt: -1 }).lean();
  
  // Clean up any legacy slugs with spaces or %20
  const cleaned = destinations.map((dest: any) => {
    const cleanSlug = slugify(dest.slug || dest.name);
    return {
      ...dest,
      slug: cleanSlug,
    };
  });

  return JSON.parse(JSON.stringify(cleaned));
}

export async function getDestinationById(id: string) {
  try {
    await connectToDatabase();
    const dest = await Destination.findById(id).lean();
    if (!dest) return null;
    return JSON.parse(JSON.stringify(dest));
  } catch (error) {
    console.error("Error fetching destination by id:", error);
    return null;
  }
}

export async function createDestination(formData: {
  name: string;
  slug: string;
  shortDescription?: string;
  content?: string;
  image?: string;
  tuitionRange?: string;
  intake?: string;
  postStudyWork?: string;
  visaSuccessRate?: string;
  highlights?: Array<{ title: string; description: string }>;
  featured?: boolean;
  published?: boolean;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.name || !formData.slug) {
      return { success: false, message: "Name and Slug are required." };
    }

    await connectToDatabase();

    const cleanSlug = slugify(formData.slug || formData.name);

    const existing = await Destination.findOne({
      $or: [{ slug: cleanSlug }, { slug: formData.slug.toLowerCase().trim() }],
    });
    if (existing) {
      return { success: false, message: "A destination with this slug already exists." };
    }

    const createdDest = await Destination.create({
      name: formData.name.trim(),
      slug: cleanSlug,
      shortDescription: formData.shortDescription || "",
      content: formData.content || "",
      image: formData.image || "",
      tuitionRange: formData.tuitionRange || "",
      intake: formData.intake || "",
      postStudyWork: formData.postStudyWork || "2 - 3 Years Work Permit",
      visaSuccessRate: formData.visaSuccessRate || "98% Success Rate",
      highlights: formData.highlights || [],
      featured: formData.featured ?? false,
      published: formData.published ?? true,
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/");

    return {
      success: true,
      message: "Destination created successfully.",
      data: JSON.parse(JSON.stringify(createdDest)),
    };
  } catch (error) {
    console.error("Error creating destination:", error);
    return { success: false, message: "Failed to create destination." };
  }
}

export async function updateDestination(
  id: string,
  formData: {
    name: string;
    slug: string;
    shortDescription?: string;
    content?: string;
    image?: string;
    tuitionRange?: string;
    intake?: string;
    postStudyWork?: string;
    visaSuccessRate?: string;
    highlights?: Array<{ title: string; description: string }>;
    featured?: boolean;
    published?: boolean;
  }
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();

    const cleanSlug = slugify(formData.slug || formData.name);

    await Destination.findByIdAndUpdate(id, {
      name: formData.name.trim(),
      slug: cleanSlug,
      shortDescription: formData.shortDescription,
      content: formData.content,
      image: formData.image,
      tuitionRange: formData.tuitionRange,
      intake: formData.intake,
      postStudyWork: formData.postStudyWork,
      visaSuccessRate: formData.visaSuccessRate,
      highlights: formData.highlights,
      featured: formData.featured,
      published: formData.published,
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/");

    return { success: true, message: "Destination updated successfully." };
  } catch (error) {
    console.error("Error updating destination:", error);
    return { success: false, message: "Failed to update destination." };
  }
}

export async function deleteDestination(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Destination.findByIdAndDelete(id);

    revalidatePath("/admin/destinations");
    revalidatePath("/");

    return { success: true, message: "Destination deleted." };
  } catch (error) {
    console.error("Error deleting destination:", error);
    return { success: false, message: "Failed to delete destination." };
  }
}
