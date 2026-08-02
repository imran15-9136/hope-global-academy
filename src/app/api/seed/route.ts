import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Seed API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || String(error),
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
