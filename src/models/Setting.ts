import mongoose, { Schema, Document, Model } from "mongoose";

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
  createdAt: Date;
  updatedAt: Date;
}

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
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Setting: Model<ISetting> =
  models.Setting || mongooseInstance.model("Setting", SettingSchema);
export default Setting;
