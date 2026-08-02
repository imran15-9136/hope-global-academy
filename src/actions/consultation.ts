"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Consultation from "@/models/Consultation";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function createConsultation(formData: {
  name: string;
  phone: string;
  email: string;
  preferredCountry: string;
  interestedCourse?: string;
  intake?: string;
  message?: string;
}): Promise<ActionResponse> {
  try {
    if (!formData.name || !formData.phone || !formData.email || !formData.preferredCountry) {
      return {
        success: false,
        message: "Please fill in all required fields (Name, Email, Phone, Country).",
      };
    }

    await connectToDatabase();

    await Consultation.create({
      name: formData.name,
      phone: formData.phone,
      email: formData.email.toLowerCase(),
      preferredCountry: formData.preferredCountry,
      interestedCourse: formData.interestedCourse || "",
      intake: formData.intake || "",
      message: formData.message || "",
      status: "new",
    });

    revalidatePath("/admin/consultations");

    return {
      success: true,
      message: "Your appointment request has been submitted successfully! We will contact you soon.",
    };
  } catch (error) {
    console.error("Error creating consultation:", error);
    return {
      success: false,
      message: "Failed to submit appointment. Please try again.",
    };
  }
}

export async function updateConsultationStatus(
  id: string,
  status: "new" | "contacted" | "resolved" | "cancelled"
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Consultation.findByIdAndUpdate(id, { status });

    revalidatePath("/admin/consultations");
    revalidatePath("/admin");

    return { success: true, message: "Status updated successfully." };
  } catch (error) {
    console.error("Error updating consultation status:", error);
    return { success: false, message: "Failed to update status." };
  }
}

export async function deleteConsultation(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Consultation.findByIdAndDelete(id);

    revalidatePath("/admin/consultations");
    revalidatePath("/admin");

    return { success: true, message: "Consultation entry deleted." };
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return { success: false, message: "Failed to delete entry." };
  }
}
