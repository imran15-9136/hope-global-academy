"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Setting from "@/models/Setting";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

export async function getSettings() {
  await connectToDatabase();
  const existingSetting = await Setting.findOne().lean();
  if (existingSetting) {
    const parsed = JSON.parse(JSON.stringify(existingSetting));
    // Fallback defaults for whyChooseUs if missing
    if (!parsed.whyChooseUsTitle) {
      parsed.whyChooseUsTitle = "Why Choose Hope Global Academy?";
    }
    if (!parsed.whyChooseUsSubtitle) {
      parsed.whyChooseUsSubtitle =
        "We provide comprehensive, end-to-end guidance for ambitious students aiming to study at top global universities.";
    }
    if (!parsed.whyChooseUsFeatures || parsed.whyChooseUsFeatures.length === 0) {
      parsed.whyChooseUsFeatures = [
        {
          title: "98% Visa Success Rate",
          description: "Proven track record with certified counselors assisting step-by-step with student visa applications.",
          icon: "ShieldCheck",
        },
        {
          title: "500+ Partner Universities",
          description: "Direct partnerships with leading institutions in the UK, USA, Australia, and Canada.",
          icon: "GraduationCap",
        },
        {
          title: "Personalized Counseling",
          description: "1-on-1 profile evaluation and course matching tailored to your academic background and goals.",
          icon: "UserCheck",
        },
        {
          title: "End-to-End Support",
          description: "From university application and scholarship search to accommodation and post-arrival assistance.",
          icon: "HeartHandshake",
        },
      ];
    }
    return parsed;
  }

  const defaultFeatures = [
    {
      title: "98% Visa Success Rate",
      description: "Proven track record with certified counselors assisting step-by-step with student visa applications.",
      icon: "ShieldCheck",
    },
    {
      title: "500+ Partner Universities",
      description: "Direct partnerships with leading institutions in the UK, USA, Australia, and Canada.",
      icon: "GraduationCap",
    },
    {
      title: "Personalized Counseling",
      description: "1-on-1 profile evaluation and course matching tailored to your academic background and goals.",
      icon: "UserCheck",
    },
    {
      title: "End-to-End Support",
      description: "From university application and scholarship search to accommodation and post-arrival assistance.",
      icon: "HeartHandshake",
    },
  ];

  const newSetting = await Setting.create({
    siteName: "Hope Global Academy",
    phone: "+880 1700-000000",
    email: "info@hopeglobalacademy.com",
    whatsapp: "+8801700000000",
    heroTitle: "Your Global Future Starts At Hope Global",
    heroSubtitle: "We guide ambitious students to study in top universities across the UK, USA, Australia, and Canada.",
    visaSuccessRate: "98%",
    studentsServed: "10,000+",
    whyChooseUsTitle: "Why Choose Hope Global Academy?",
    whyChooseUsSubtitle: "We provide comprehensive, end-to-end guidance for ambitious students aiming to study at top global universities.",
    whyChooseUsVideo: "",
    whyChooseUsFeatures: defaultFeatures,
  });

  return JSON.parse(JSON.stringify(newSetting));
}

export async function updateSettings(formData: {
  siteName?: string;
  logo?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  visaSuccessRate?: string;
  studentsServed?: string;
  whyChooseUsTitle?: string;
  whyChooseUsSubtitle?: string;
  whyChooseUsVideo?: string;
  whyChooseUsFeatures?: Array<{ title: string; description: string; icon?: string }>;
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
