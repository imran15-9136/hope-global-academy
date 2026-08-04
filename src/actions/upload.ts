"use server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/actions";

export async function uploadImage(formData: FormData): Promise<ActionResponse<string>> {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized action." };
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return { success: false, message: "No valid file uploaded." };
    }

    // Validate that it's an image
    if (!file.type.startsWith("image/")) {
      return { success: false, message: "Only image files are allowed." };
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract folder if specified
    const folder = (formData.get("folder") as string) || "hope-global-academy";

    const secureUrl = await uploadImageToCloudinary(buffer, folder);

    return {
      success: true,
      message: "Image uploaded successfully.",
      data: secureUrl,
    };
  } catch (error: any) {
    console.error("Error in uploadImage server action:", error);
    let errorMessage = "Failed to upload image.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = String(error.message);
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
