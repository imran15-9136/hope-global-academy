import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const duplicateFolder = path.join(process.cwd(), "src", "app", "admin");
    if (fs.existsSync(duplicateFolder)) {
      fs.rmSync(duplicateFolder, { recursive: true, force: true });
      return NextResponse.json({ success: true, message: "Deleted duplicate src/app/admin directory!" });
    }
    return NextResponse.json({ success: true, message: "Directory src/app/admin does not exist." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
