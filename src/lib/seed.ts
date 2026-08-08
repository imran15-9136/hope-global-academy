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
    console.log("✅ Admin user created (admin@hopeglobal.com / admin123)");
  }

  // 2. Seed Destinations
  const initialDestinations = [
    {
      name: "United Kingdom",
      slug: "uk",
      shortDescription:
        "Study in top Russell Group universities in the UK with 1-year Master's options and 2-year Post-Study Work (PSW) Graduate visa.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
      tuitionRange: "£12,000 - £25,000 / year",
      intake: "Jan / Sep Intake",
      postStudyWork: "2 Years Graduate Route Visa",
      visaSuccessRate: "98% High Success Rate",
      featured: true,
      published: true,
      highlights: [
        { title: "Internationally Accredited Degrees", description: "Degrees awarded by Russell Group and UK universities are globally respected by top employers." },
        { title: "2-Year Post-Study Work Permit", description: "Graduate Route visa allows international students to work in the UK for 2 years after graduation." },
        { title: "1-Year Master's Programs", description: "Save time and living costs with intensive 12-month master's degree options." },
      ],
    },
    {
      name: "United States",
      slug: "usa",
      shortDescription:
        "Access thousands of Ivy League and state universities in the US with STEM OPT extension permits up to 3 years.",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
      tuitionRange: "$18,000 - $40,000 / year",
      intake: "Fall / Spring Intake",
      postStudyWork: "1 to 3 Years STEM OPT",
      visaSuccessRate: "97% Success Rate",
      featured: true,
      published: true,
      highlights: [
        { title: "Ivy League & World Rankings", description: "Home to the world's highest ranked academic institutions and cutting-edge research facilities." },
        { title: "3-Year STEM OPT Extension", description: "STEM graduates can work in the United States for up to 36 months after graduation." },
        { title: "Generous Merit Scholarships", description: "Scholarships and tuition assistantships available for qualified undergraduate and graduate applicants." },
      ],
    },
    {
      name: "Australia",
      slug: "australia",
      shortDescription:
        "High-quality Group of Eight education, vibrant student lifestyle, and post-study work rights up to 4 years.",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
      tuitionRange: "AUD $20,000 - $38,000 / year",
      intake: "Feb / July Intake",
      postStudyWork: "2 to 4 Years Work Visa",
      visaSuccessRate: "98% Success Rate",
      featured: true,
      published: true,
      highlights: [
        { title: "Group of Eight Universities", description: "Study in leading research-intensive Australian universities ranked in global top 50." },
        { title: "Extended Post-Study Work Rights", description: "Qualify for up to 4 years post-study work visa upon graduation in regional areas." },
        { title: "High Quality of Life", description: "Enjoy safe, multicultural cities rated among the top liveable student cities in the world." },
      ],
    },
    {
      name: "Canada",
      slug: "canada",
      shortDescription:
        "World-class education, safe environment, PGWP work permits, and direct Permanent Residency (PR) pathways.",
      image: "https://images.unsplash.com/photo-1517935703635-27c737826572?q=80&w=800&auto=format&fit=crop",
      tuitionRange: "CAD $15,000 - $32,000 / year",
      intake: "Jan / May / Sep Intake",
      postStudyWork: "Up to 3 Years PGWP",
      visaSuccessRate: "98% Success Rate",
      featured: true,
      published: true,
      highlights: [
        { title: "Direct Immigration & PR Pathways", description: "Express Entry and Provincial Nominee Programs (PNP) offer clear pathways to Canadian PR." },
        { title: "Post-Graduation Work Permit (PGWP)", description: "Open work permit up to 3 years allowing graduates to work for any employer in Canada." },
        { title: "Safe & Welcoming Nation", description: "Known for world-class healthcare, safety, and vibrant international student communities." },
      ],
    },
    {
      name: "New Zealand",
      slug: "new-zealand",
      shortDescription:
        "Study in New Zealand for world-class research universities, safe English-speaking environment, and generous post-study work rights up to 3 years.",
      image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800&auto=format&fit=crop",
      tuitionRange: "NZD $22,000 - $35,000 / year",
      intake: "Feb / July Intake",
      postStudyWork: "Up to 3 Years Open Work Visa",
      visaSuccessRate: "98% Success Rate",
      featured: true,
      published: true,
      highlights: [
        { title: "All 8 Universities Top 3% Globally", description: "Every public university in New Zealand ranks in the top 3% of universities worldwide." },
        { title: "Up to 3-Year Open Work Visa", description: "Graduate open work rights allowing you to work for any employer upon completing your degree." },
        { title: "Safe & Peaceful Environment", description: "Ranked among the peaceful and safest English-speaking countries with exceptional quality of living." },
      ],
    },
  ];

  for (const item of initialDestinations) {
    await Destination.findOneAndUpdate(
      { slug: item.slug },
      { $setOnInsert: item },
      { upsert: true, new: true }
    );
  }
  console.log("✅ Destinations seeded/upserted into MongoDB.");

  // 3. Seed Courses
  const coursesCount = await Course.countDocuments();
  if (coursesCount === 0) {
    await Course.insertMany([
      { title: "Undergraduate Degrees", description: "BSc, BA, BBA, BEng 3-4 year degree programs", duration: "3 - 4 Years", level: "Undergraduate" },
      { title: "Postgraduate Degrees", description: "MSc, MA, MBA 1-2 year master programs", duration: "1 - 2 Years", level: "Postgraduate" },
      { title: "Diploma & Pathway Programs", description: "HND and foundation fast-track pathways", duration: "1 Year", level: "Diploma" },
    ]);
    console.log("✅ Courses seeded.");
  }

  // 4. Seed Services
  const servicesCount = await Service.countDocuments();
  if (servicesCount === 0) {
    await Service.insertMany([
      { title: "Free Student Counseling", description: "Personalized 1-on-1 expert guidance to select the best course and university for your career goals.", icon: "GraduationCap" },
      { title: "University Application Support", description: "Complete assistance with document preparation, SOP review, and fast-track offer letter processing.", icon: "FileText" },
      { title: "Visa Processing Guidance", description: "Comprehensive assistance with visa application forms, financial documentation, and mock interview prep.", icon: "Passport" },
      { title: "Test Preparation & Training", description: "Expert coaching for IELTS, PTE, TOEFL, and GRE/GMAT with proven high score strategies.", icon: "BookOpen" },
      { title: "Scholarship & Financial Aid", description: "Identification of merit-based scholarships and partial tuition fee waivers at partner institutions.", icon: "Award" },
    ]);
    console.log("✅ Services seeded.");
  }

  // 5. Seed Offices
  const officesCount = await Office.countDocuments();
  if (officesCount === 0) {
    await Office.insertMany([
      { country: "Bangladesh (Dhaka HQ)", address: "House 45, Road 11, Block D, Banani, Dhaka 1213", phone: "+880 1700-000000", email: "dhaka@hopeglobalacademy.com" },
      { country: "Bangladesh (Chattogram)", address: "Level 4, Hotel Agrabad Commercial Area, Chattogram", phone: "+880 1800-000000", email: "ctg@hopeglobalacademy.com" },
      { country: "Bangladesh (Sylhet)", address: "Zindabazar Commercial Complex, 3rd Floor, Sylhet", phone: "+880 1900-000000", email: "sylhet@hopeglobalacademy.com" },
      { country: "United Kingdom (London)", address: "120 Baker Street, Marylebone, London W1U 6TU", phone: "+44 20 7946 0912", email: "uk@hopeglobalacademy.com" },
    ]);
    console.log("✅ Offices seeded.");
  }

  // 6. Seed FAQs
  const faqsCount = await FAQ.countDocuments();
  if (faqsCount === 0) {
    await FAQ.insertMany([
      { question: "What are the entry requirements for studying in the UK?", answer: "For undergraduate courses, you need minimum GPA 3.5+ in HSC/A-Levels and IELTS 6.0 overall. For Master's programs, a Bachelor degree with 55%+ and IELTS 6.5 is typically required.", category: "Admissions" },
      { question: "Can I study abroad without IELTS?", answer: "Yes! Many universities accept alternative English tests such as PTE, TOEFL, Duolingo, or Medium of Instruction (MOI) certificates from qualifying universities.", category: "Requirements" },
      { question: "How long does student visa processing take?", answer: "UK student visas usually take 3 to 4 weeks. USA F-1 visas depend on interview date availability. Australian student visas take 4 to 6 weeks.", category: "Visa" },
      { question: "Are scholarships available for international students?", answer: "Yes, merit-based scholarships ranging from £1,000 to £5,000 or partial tuition fee waivers (10%-50%) are available for qualified applicants.", category: "Scholarships" },
    ]);
    console.log("✅ FAQs seeded.");
  }

  // 7. Seed Blogs
  const blogsCount = await Blog.countDocuments();
  if (blogsCount === 0) {
    await Blog.insertMany([
      {
        title: "Ultimate Guide to Studying in the UK for International Students",
        slug: "guide-to-studying-in-uk",
        excerpt: "Everything you need to know about top universities, tuition fees, post-study work visas, and living costs in the UK.",
        content: "The United Kingdom remains one of the premier destinations for higher education worldwide. Offering world-renowned academic excellence...",
        coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
        seoTitle: "Study in UK Guide 2026 | Hope Global Academy",
        seoDescription: "Comprehensive 2026 guide for international students planning to study in the United Kingdom.",
        tags: ["UK", "Higher Education", "Visa"],
        published: true,
      },
      {
        title: "How to Prepare for IELTS and Score Band 7.5+",
        slug: "how-to-prepare-for-ielts-band-7-5",
        excerpt: "Proven strategies and practice tips to boost your Listening, Reading, Writing, and Speaking scores on your first attempt.",
        content: "Achieving a high band score in IELTS requires systematic preparation, targeted practice, and effective exam strategies...",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
        seoTitle: "IELTS Preparation Tips | Hope Global Academy",
        seoDescription: "Learn proven strategies to score Band 7.5+ in your IELTS exam.",
        tags: ["IELTS", "Test Prep", "Study Tips"],
        published: true,
      },
    ]);
    console.log("✅ Blogs seeded.");
  }

  // 8. Seed Settings
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
    console.log("✅ Settings seeded.");
  }

  return { success: true, message: "Database seeded successfully!" };
}
