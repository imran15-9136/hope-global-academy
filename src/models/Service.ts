import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  icon?: string;
  features?: string[];
  order?: number;
  published?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    icon: { type: String, default: "Briefcase" },
    features: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Service: Model<IService> = models.Service || mongooseInstance.model("Service", ServiceSchema);
export default Service;
