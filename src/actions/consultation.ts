"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Consultation from "@/models/Consultation";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";
import { COURSE_LEVEL_OPTIONS } from "@/lib/constants";

export async function createConsultation(formData: {
  name: string;
  phone: string;
  email: string;
  preferredCountry: string;
  courseLevelId: number;
  message?: string;
}): Promise<ActionResponse> {
  try {
    if (!formData.name || !formData.phone || !formData.email || !formData.preferredCountry || !formData.courseLevelId) {
      return {
        success: false,
        message: "Please fill in all required fields (Name, Email, Phone, Country, Course Level).",
      };
    }

    await connectToDatabase();

    const matchedCourse = COURSE_LEVEL_OPTIONS.find(c => c.id === formData.courseLevelId);
    const courseName = matchedCourse ? matchedCourse.name : `Course level ID: ${formData.courseLevelId}`;

    await Consultation.create({
      name: formData.name,
      phone: formData.phone,
      email: formData.email.toLowerCase(),
      preferredCountry: formData.preferredCountry,
      interestedCourse: courseName,
      intake: "",
      message: formData.message || "",
      status: "new",
    });

    revalidatePath("/admin/consultations");

    // Forward lead payload to external CRM URL
    const crmUrl = "https://crmapi.hopeglobalacademy.co.uk/api/Lead/website";
    const apiKey = process.env.INNOVCRM_KEY || "Innovtec2023";

    const crmPayload = {
      firstName: formData.name,
      lastName: "",
      phone: formData.phone,
      email: formData.email.toLowerCase(),
      courseLevelId: Number(formData.courseLevelId),
      leadSourseId: 7,
      leadSourceId: 7,
      citizenshipStatus: "",
      subject: "Study Abroad Inquiry",
      location: formData.preferredCountry,
      note: formData.message || "",
      educationQualification: "",
      languageProficiency: "",
      campaingName: "",
      campaignName: "",
      isInterested: false,
      isDead: false,
    };

    try {
      const crmRes = await fetch(crmUrl, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "x-api-key": apiKey,
          "branchid": "11",
          "selectedregiontype": "2",
          "BranchId": "11",
        },
        body: JSON.stringify(crmPayload),
      });

      const responseText = await crmRes.text();

      if (!crmRes.ok) {
        console.error("CRM submission failed with status:", crmRes.status, responseText);
      } else {
        console.log("CRM submission successful:", responseText);
      }
    } catch (crmError) {
      console.error("Error submitting lead to external CRM:", crmError);
    }

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
