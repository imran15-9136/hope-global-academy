import mongoose from "mongoose";
import Setting from "@/models/Setting";
import { connectToDatabase } from "@/lib/db";

async function main() {
  await connectToDatabase();
  const setting = await Setting.findOne();
  if (setting && !setting.servicesVideo) {
    // I don't know the exact URL they just uploaded, but I can clear it so it's ready.
    // Wait, let's just let the user save the URL again in the UI now that it's fixed.
    console.log("Setting found.");
  }
}
main();
