import { loadEnvConfig } from "@next/env";
import { seedDatabase } from "../src/lib/seed";

// Load environment variables using Next.js env helper (.env, .env.local, etc.)
loadEnvConfig(process.cwd());

async function runSeed() {
  console.log("🌱 Hope Global Academy - Executing Database Seed...");

  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ Warning: MONGODB_URI is not defined in environment. Skipping database seeding.");
    process.exit(0);
  }

  try {
    const result = await seedDatabase();
    console.log(`✨ Success: ${result.message}`);
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Database Seeding Error:", error?.message || error);
    process.exit(1);
  }
}

runSeed();
