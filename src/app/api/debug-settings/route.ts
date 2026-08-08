import { NextRequest, NextResponse } from "next/server";
import Setting from "@/models/Setting";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const setting = await Setting.findOne().lean();
  return NextResponse.json({ setting });
}
