"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getDestinations() {
  await connectToDatabase();
  const destinations = await Destination.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(destinations));
}

export async function createDestination(formData: {
  name: string;
  slug: string;
  shortDescription?: string;
  content?: string;
  image?: string;
  tuitionRange?: string;
  intake?: string;
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

    const existing = await Destination.findOne({ slug: formData.slug.toLowerCase() });
    if (existing) {
      return { success: false, message: "A destination with this slug already exists." };
    }

    const createdDest = await Destination.create({
      name: formData.name,
      slug: formData.slug.toLowerCase().trim(),
      shortDescription: formData.shortDescription || "",
      content: formData.content || "",
      image: formData.image || "",
      tuitionRange: formData.tuitionRange || "",
      intake: formData.intake || "",
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

    await Destination.findByIdAndUpdate(id, {
      name: formData.name,
      slug: formData.slug.toLowerCase().trim(),
      shortDescription: formData.shortDescription,
      content: formData.content,
      image: formData.image,
      tuitionRange: formData.tuitionRange,
      intake: formData.intake,
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
