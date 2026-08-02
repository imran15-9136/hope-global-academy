"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Setting from "@/models/Setting";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getSettings() {
  await connectToDatabase();
  let setting = await Setting.findOne().lean();
  if (!setting) {
    setting = await Setting.create({
      siteName: "Hope Global Academy",
      phone: "+880 1700-000000",
      email: "info@hopeglobalacademy.com",
      whatsapp: "+8801700000000",
      heroTitle: "Your Global Future Starts At Hope Global",
      heroSubtitle: "We guide ambitious students to study in top universities across the UK, USA, Australia, and Canada.",
      visaSuccessRate: "98%",
      studentsServed: "10,000+",
    });
  }
  return JSON.parse(JSON.stringify(setting));
}

export async function updateSettings(formData: {
  siteName?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  visaSuccessRate?: string;
  studentsServed?: string;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();

    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting(formData);
    } else {
      Object.assign(setting, formData);
    }

    await setting.save();

    revalidatePath("/admin/settings");
    revalidatePath("/");

    return { success: true, message: "Settings updated successfully." };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Failed to update settings." };
  }
}
