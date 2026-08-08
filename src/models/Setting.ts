import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWhyChooseUsFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ISetting extends Document {
  siteName: string;
  logo?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  visaSuccessRate?: string;
  studentsServed?: string;
  whyChooseUsTitle?: string;
  whyChooseUsSubtitle?: string;
  whyChooseUsVideo?: string;
  whyChooseUsFeatures?: IWhyChooseUsFeature[];
  servicesVideo?: string;
  servicesVideoTitle?: string;
  servicesVideoSubtitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WhyChooseUsFeatureSchema = new Schema<IWhyChooseUsFeature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "CheckCircle" },
});

const SettingSchema = new Schema<ISetting>(
  {
    siteName: { type: String, default: "Hope Global Academy" },
    logo: { type: String },
    phone: { type: String },
    email: { type: String },
    whatsapp: { type: String },
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    visaSuccessRate: { type: String, default: "98%" },
    studentsServed: { type: String, default: "10,000+" },
    whyChooseUsTitle: { type: String, default: "Why Choose Hope Global Academy?" },
    whyChooseUsSubtitle: {
      type: String,
      default: "We provide comprehensive, end-to-end guidance for ambitious students aiming to study at top global universities.",
    },
    whyChooseUsVideo: { type: String, default: "" },
    whyChooseUsFeatures: { type: [WhyChooseUsFeatureSchema], default: [] },
    servicesVideo: { type: String, default: "" },
    servicesVideoTitle: { type: String, default: "Watch Our Student Success & Counseling Overview" },
    servicesVideoSubtitle: { type: String, default: "Learn how Hope Global Academy empowers ambitious students with 1-on-1 guidance from application to arrival." },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;

// In development, prevent Mongoose from using the cached schema which lacks newly added fields
if (process.env.NODE_ENV !== "production" && mongooseInstance.models.Setting) {
  delete mongooseInstance.models.Setting;
}

const Setting: Model<ISetting> = mongooseInstance.model("Setting", SettingSchema);
export default Setting;
