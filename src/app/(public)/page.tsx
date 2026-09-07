import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { Hero } from "@/components/public/Hero";
import { Destinations } from "@/components/public/Destinations";
import { Courses } from "@/components/public/Courses";
import { WhyChooseUs } from "@/components/public/WhyChooseUs";
import { Institutes } from "@/components/public/Institutes";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { getDestinations } from "@/actions/destination";
import { getSettings } from "@/actions/setting";
import { getCourses } from "@/actions/course";
import { getInstitutes } from "@/actions/institute";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Study Abroad Consultancy & Higher Education Admissions",
  description:
    "Premier education consultancy in Bangladesh & UK. Access top universities in the UK, USA, Australia, and Canada with expert visa and scholarship guidance.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Study Abroad Consultancy & Higher Education Admissions | Hope Global Academy",
    description:
      "Premier education consultancy in Bangladesh & UK. Access top universities in the UK, USA, Australia, and Canada with expert visa and scholarship guidance.",
    url: SITE_URL,
    type: "website",
  },
};

export default async function Home() {
  let destinations: any[] = [];
  let courses: any[] = [];
  let institutes: any[] = [];
  let settings: any = null;

  try {
    destinations = await getDestinations();
    courses = await getCourses();
    institutes = await getInstitutes();
    settings = await getSettings();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <>
      <Hero settings={settings} />
      <WhyChooseUs settings={settings} />
      <Destinations initialDestinations={destinations} />
      <Courses initialCourses={courses} />
      <Institutes initialInstitutes={institutes} />
      <AppointmentForm />
    </>
  );
}
