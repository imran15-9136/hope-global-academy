"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getCourses() {
  await connectToDatabase();
  const courses = await Course.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(courses));
}

export async function createCourse(formData: {
  title: string;
  description: string;
  icon?: string;
  duration?: string;
  level?: string;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.title || !formData.description) {
      return { success: false, message: "Title and Description are required." };
    }

    await connectToDatabase();

    const createdCourse = await Course.create({
      title: formData.title,
      description: formData.description,
      icon: formData.icon || "GraduationCap",
      duration: formData.duration || "",
      level: formData.level || "",
    });

    revalidatePath("/admin/courses");
    revalidatePath("/");

    return {
      success: true,
      message: "Course created successfully.",
      data: JSON.parse(JSON.stringify(createdCourse)),
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, message: "Failed to create course." };
  }
}

export async function updateCourse(
  id: string,
  formData: {
    title: string;
    description: string;
    icon?: string;
    duration?: string;
    level?: string;
  }
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.title || !formData.description) {
      return { success: false, message: "Title and Description are required." };
    }

    await connectToDatabase();

    await Course.findByIdAndUpdate(id, {
      title: formData.title,
      description: formData.description,
      icon: formData.icon || "GraduationCap",
      duration: formData.duration || "",
      level: formData.level || "",
    });

    revalidatePath("/admin/courses");
    revalidatePath("/");

    return { success: true, message: "Course updated successfully." };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, message: "Failed to update course." };
  }
}

export async function deleteCourse(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Course.findByIdAndDelete(id);

    revalidatePath("/admin/courses");
    revalidatePath("/");

    return { success: true, message: "Course deleted successfully." };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, message: "Failed to delete course." };
  }
}
