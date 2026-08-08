"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Service from "@/models/Service";
import Setting from "@/models/Setting";
import { ActionResponse } from "@/types/actions";
import { auth } from "@/lib/auth";

const INITIAL_SERVICES = [
  {
    title: "Profile Assessment",
    slug: "profile-assessment",
    icon: "UserCheck",
    shortDescription: "Comprehensive evaluation of your academic qualifications, GPA, budget, and career ambitions to match top-fit universities.",
    description: "Our certified educational consultants conduct an in-depth 1-on-1 profile evaluation. We analyze your academic achievements, English proficiency test scores (IELTS/PTE/TOEFL), financial capability, and career goals to build a personalized global university roadmap.",
    features: [
      "Academic transcript & GPA evaluation",
      "English test requirement analysis (IELTS/PTE/Duolingo)",
      "Financial budgeting & scholarship eligibility check",
      "Customized target country & university shortlist"
    ],
    order: 1,
    published: true,
  },
  {
    title: "Career Guidance",
    slug: "career-guidance",
    icon: "Compass",
    shortDescription: "Strategic career mapping aligning your chosen degree with high-demand international job markets and post-study work routes.",
    description: "Selecting the right course is essential for post-graduation career success. We provide expert counseling on global market trends, high-demand STEM and business degrees, post-study work visa rights, and long-term career pathways in the UK, USA, Australia, and Canada.",
    features: [
      "1-on-1 strategic career roadmap sessions",
      "Global industry & job growth insights",
      "Course alignment with post-study work visa policies",
      "Salary & employment outlook per destination"
    ],
    order: 2,
    published: true,
  },
  {
    title: "Visa Application",
    slug: "visa-application",
    icon: "FileCheck",
    shortDescription: "End-to-end student visa guidance with meticulous documentation check and mock embassy interview preparation.",
    description: "Achieve a stress-free visa approval with our 98%+ success rate guidance. Our experienced visa officers inspect financial proof, bank statements, relationship proof, CAS/I-20/COE documents, and conduct realistic mock embassy interviews.",
    features: [
      "Complete visa documentation auditing & checklist",
      "Financial proof & bank statement verification",
      "SOP & Genuine Student (GS/GTE) statement review",
      "1-on-1 mock embassy interview prep"
    ],
    order: 3,
    published: true,
  },
  {
    title: "University Application",
    slug: "university-application",
    icon: "GraduationCap",
    shortDescription: "Fast-track offer letter processing, professional Statement of Purpose (SOP) editing, and scholarship submittals.",
    description: "Direct university partner representation enables us to expedite your offer letter processing. Our team assists with document formatting, SOP review, recommendation letters, and applying for merit-based tuition fee scholarships.",
    features: [
      "Direct portal application to 500+ partner universities",
      "Professional SOP & Recommendation Letter (LOR) editing",
      "Tuition fee scholarship & waiver applications",
      "Conditional & Unconditional Offer Letter tracking"
    ],
    order: 4,
    published: true,
  },
  {
    title: "Interview Preparation",
    slug: "interview-preparation",
    icon: "Video",
    shortDescription: "Targeted mock interview sessions for university credibility interviews and visa officer queries.",
    description: "Boost your confidence with tailored interview preparation. We train students for UKVI Credibility Interviews, US F-1 Visa Officer interviews, and university admission panel interactions with real past questions.",
    features: [
      "Real question bank from recent embassy interviews",
      "Confidence building & body language coaching",
      "Course choice & financial reasoning practice",
      "Recorded mock session review with actionable feedback"
    ],
    order: 5,
    published: true,
  },
  {
    title: "Accommodation",
    slug: "accommodation",
    icon: "Home",
    shortDescription: "Safe, comfortable, and budget-friendly student housing assistance near university campuses.",
    description: "Finding safe housing abroad before landing is vital. We connect students with verified university dormitories, private student halls (PBSA), and shared apartments in prime locations close to campus and public transit.",
    features: [
      "Verified on-campus & off-campus housing listings",
      "PBSA & private student apartment booking support",
      "Lease agreement review & deposit guidance",
      "Roommate matching for international students"
    ],
    order: 6,
    published: true,
  },
  {
    title: "Pre and Post Departure",
    slug: "pre-post-departure",
    icon: "PlaneTakeoff",
    shortDescription: "Comprehensive travel briefing, currency exchange, flight booking support, and airport pickup coordination.",
    description: "We ensure you feel prepared from takeoff to touchdown. Our pre-departure briefing covers travel checklists, baggage rules, customs regulations, SIM cards, foreign exchange (Forex), and post-arrival airport pickup arrangement.",
    features: [
      "Interactive Pre-Departure Orientation briefing",
      "Student concession flight booking & luggage advice",
      "Forex card & international bank account opening guidance",
      "Airport pickup & arrival welcome pack support"
    ],
    order: 7,
    published: true,
  },
];

export async function getServices() {
  try {
    await connectToDatabase();
    let services = await Service.find().sort({ order: 1, createdAt: 1 }).lean();

    // Auto-seed initial 7 core services if none exist
    if (!services || services.length === 0) {
      console.log("Seeding 7 core services into MongoDB...");
      await Service.insertMany(INITIAL_SERVICES);
      services = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    }

    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServicesVideo() {
  try {
    await connectToDatabase();
    const setting = await Setting.findOne().lean();
    return {
      videoUrl: setting?.servicesVideo || "",
      title: setting?.servicesVideoTitle || "Watch Our Student Success & Counseling Overview",
      subtitle: setting?.servicesVideoSubtitle || "Learn how Hope Global Academy empowers ambitious students with 1-on-1 guidance from application to arrival.",
    };
  } catch (error) {
    console.error("Error fetching services video:", error);
    return { videoUrl: "", title: "", subtitle: "" };
  }
}

export async function updateServicesVideo(data: {
  videoUrl: string;
  title?: string;
  subtitle?: string;
}): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();

    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting({
        servicesVideo: data.videoUrl,
        servicesVideoTitle: data.title || "Watch Our Student Success & Counseling Overview",
        servicesVideoSubtitle: data.subtitle || "Learn how Hope Global Academy empowers ambitious students with 1-on-1 guidance from application to arrival.",
      });
    } else {
      setting.servicesVideo = data.videoUrl;
      if (data.title !== undefined) setting.servicesVideoTitle = data.title;
      if (data.subtitle !== undefined) setting.servicesVideoSubtitle = data.subtitle;
    }

    await setting.save();

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Services video updated successfully." };
  } catch (error) {
    console.error("Error updating services video:", error);
    return { success: false, message: "Failed to update services video." };
  }
}

export interface ServiceInput {
  title: string;
  description: string;
  shortDescription?: string;
  icon?: string;
  features?: string[];
  order?: number;
  published?: boolean;
}

export async function createService(formData: ServiceInput): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    if (!formData.title || !formData.description) {
      return { success: false, message: "Title and Description are required." };
    }

    await connectToDatabase();

    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newService = await Service.create({
      title: formData.title.trim(),
      slug,
      description: formData.description.trim(),
      shortDescription: formData.shortDescription?.trim() || "",
      icon: formData.icon || "Briefcase",
      features: formData.features || [],
      order: formData.order ?? 0,
      published: formData.published ?? true,
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return {
      success: true,
      message: "Service created successfully.",
      data: JSON.parse(JSON.stringify(newService)),
    };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, message: "Failed to create service." };
  }
}

export async function updateService(
  id: string,
  formData: ServiceInput
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

    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    await Service.findByIdAndUpdate(id, {
      title: formData.title.trim(),
      slug,
      description: formData.description.trim(),
      shortDescription: formData.shortDescription?.trim() || "",
      icon: formData.icon,
      features: formData.features || [],
      order: formData.order ?? 0,
      published: formData.published ?? true,
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Service updated successfully." };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, message: "Failed to update service." };
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    await connectToDatabase();
    await Service.findByIdAndDelete(id);

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Service deleted." };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: "Failed to delete service." };
  }
}
