"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Institute from "@/models/Institute";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getInstitutes() {
  await connectToDatabase();
  const institutes = await Institute.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(institutes));
}

export async function createInstitute(formData: {
  name: string;
  country: string;
  ranking: string;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.name || !formData.country || !formData.ranking) {
      return { success: false, message: "All fields are required." };
    }

    await connectToDatabase();

    const createdInst = await Institute.create({
      name: formData.name,
      country: formData.country,
      ranking: formData.ranking,
    });

    revalidatePath("/admin/institutes");
    revalidatePath("/");

    return {
      success: true,
      message: "Institute added successfully.",
      data: JSON.parse(JSON.stringify(createdInst)),
    };
  } catch (error) {
    console.error("Error creating institute:", error);
    return { success: false, message: "Failed to add institute." };
  }
}

export async function updateInstitute(
  id: string,
  formData: {
    name: string;
    country: string;
    ranking: string;
  }
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.name || !formData.country || !formData.ranking) {
      return { success: false, message: "All fields are required." };
    }

    await connectToDatabase();

    await Institute.findByIdAndUpdate(id, {
      name: formData.name,
      country: formData.country,
      ranking: formData.ranking,
    });

    revalidatePath("/admin/institutes");
    revalidatePath("/");

    return { success: true, message: "Institute updated successfully." };
  } catch (error) {
    console.error("Error updating institute:", error);
    return { success: false, message: "Failed to update institute." };
  }
}

export async function deleteInstitute(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Institute.findByIdAndDelete(id);

    revalidatePath("/admin/institutes");
    revalidatePath("/");

    return { success: true, message: "Institute deleted successfully." };
  } catch (error) {
    console.error("Error deleting institute:", error);
    return { success: false, message: "Failed to delete institute." };
  }
}
