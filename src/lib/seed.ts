import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Destination from "@/models/Destination";
import Course from "@/models/Course";
import Service from "@/models/Service";
import Office from "@/models/Office";
import FAQ from "@/models/FAQ";
import Blog from "@/models/Blog";
import Setting from "@/models/Setting";

export async function seedDatabase() {
  await connectToDatabase();

  // 1. Seed Admin User
  const existingUser = await User.findOne({ email: "admin@hopeglobal.com" });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@hopeglobal.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created (admin@hopeglobal.com / admin123)");
  }

  // 2. Seed Destinations
  const destinationsCount = await Destination.countDocuments();
  if (destinationsCount === 0) {
    await Destination.insertMany([
      {
        name: "United Kingdom",
        slug: "uk",
        shortDescription: "Study in top Russell Group universities with 1-year Master's options and 2-year PSW visa.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
        tuitionRange: "£12,000 - £25,000 / year",
        intake: "Jan / Sep Intake",
        featured: true,
        published: true,
      },
      {
        name: "United States",
        slug: "usa",
        shortDescription: "Access thousands of Ivy League and state universities with STEM OPT extensions up to 3 years.",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
        tuitionRange: "$18,000 - $40,000 / year",
        intake: "Fall / Spring Intake",
        featured: true,
        published: true,
      },
      {
        name: "Australia",
        slug: "australia",
        shortDescription: "High-quality education, vibrant student lifestyle, and post-study work rights up to 4 years.",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
        tuitionRange: "AUD $20,000 - $38,000 / year",
        intake: "Feb / July Intake",
        featured: true,
        published: true,
      },
      {
        name: "Canada",
        slug: "canada",
        shortDescription: "World-class education, safe environment, and direct permanent residency (PR) pathways.",
        image: "https://images.unsplash.com/photo-1517935703635-27c737826572?q=80&w=800&auto=format&fit=crop",
        tuitionRange: "CAD $15,000 - $32,000 / year",
        intake: "Jan / May / Sep Intake",
        featured: true,
        published: true,
      },
    ]);
  }

  // 3. Seed Courses
  const coursesCount = await Course.countDocuments();
  if (coursesCount === 0) {
    await Course.insertMany([
      { title: "Undergraduate Degrees", description: "BSc, BA, BBA, BEng 3-4 year degree programs", duration: "3 - 4 Years", level: "Undergraduate" },
      { title: "Postgraduate Degrees", description: "MSc, MA, MBA 1-2 year master programs", duration: "1 - 2 Years", level: "Postgraduate" },
      { title: "Diploma & Pathway Programs", description: "HND and foundation fast-track pathways", duration: "1 Year", level: "Diploma" },
    ]);
  }

  // 4. Seed Settings
  const settingCount = await Setting.countDocuments();
  if (settingCount === 0) {
    await Setting.create({
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

  return { success: true, message: "Database seeded successfully!" };
}
