import { NextRequest, NextResponse } from "next/server";
import { uploadVideoToCloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized action." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: "No valid video file uploaded." }, { status: 400 });
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json({ success: false, message: "Only video files are allowed." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const folder = (formData.get("folder") as string) || "hope-global-academy/videos";

    const secureUrl = await uploadVideoToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully.",
      data: secureUrl,
    });
  } catch (error: any) {
    console.error("Error in video upload route handler:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to upload video.",
      },
      { status: 500 }
    );
  }
}
