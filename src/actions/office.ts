"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Office from "@/models/Office";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getOffices() {
  try {
    await connectToDatabase();
    const offices = await Office.find().sort({ isHeadOffice: -1, order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(offices));
  } catch (error) {
    console.error("Error fetching offices:", error);
    return [];
  }
}

export async function getOfficeById(id: string) {
  try {
    await connectToDatabase();
    const office = await Office.findById(id).lean();
    if (!office) return null;
    return JSON.parse(JSON.stringify(office));
  } catch (error) {
    console.error("Error fetching office by id:", error);
    return null;
  }
}

export interface OfficeInput {
  title?: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  isHeadOffice?: boolean;
  order?: number;
}

export async function createOffice(formData: OfficeInput): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.country || !formData.address) {
      return { success: false, message: "Country and Address are required fields." };
    }

    await connectToDatabase();

    const newOffice = await Office.create({
      title: formData.title?.trim() || "",
      country: formData.country.trim(),
      address: formData.address.trim(),
      phone: formData.phone?.trim() || "",
      email: formData.email?.trim() || "",
      mapUrl: formData.mapUrl?.trim() || "",
      isHeadOffice: formData.isHeadOffice ?? false,
      order: formData.order ?? 0,
    });

    revalidatePath("/admin/offices");
    revalidatePath("/contact");
    revalidatePath("/");

    return {
      success: true,
      message: "Branch office created successfully.",
      data: JSON.parse(JSON.stringify(newOffice)),
    };
  } catch (error) {
    console.error("Error creating office:", error);
    return { success: false, message: "Failed to create branch office." };
  }
}

export async function updateOffice(
  id: string,
  formData: OfficeInput
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.country || !formData.address) {
      return { success: false, message: "Country and Address are required fields." };
    }

    await connectToDatabase();

    await Office.findByIdAndUpdate(id, {
      title: formData.title?.trim() || "",
      country: formData.country.trim(),
      address: formData.address.trim(),
      phone: formData.phone?.trim() || "",
      email: formData.email?.trim() || "",
      mapUrl: formData.mapUrl?.trim() || "",
      isHeadOffice: formData.isHeadOffice ?? false,
      order: formData.order ?? 0,
    });

    revalidatePath("/admin/offices");
    revalidatePath("/contact");
    revalidatePath("/");

    return { success: true, message: "Branch office updated successfully." };
  } catch (error) {
    console.error("Error updating office:", error);
    return { success: false, message: "Failed to update branch office." };
  }
}

export async function deleteOffice(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Office.findByIdAndDelete(id);

    revalidatePath("/admin/offices");
    revalidatePath("/contact");
    revalidatePath("/");

    return { success: true, message: "Branch office deleted." };
  } catch (error) {
    console.error("Error deleting office:", error);
    return { success: false, message: "Failed to delete branch office." };
  }
}
