import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOffice extends Document {
  country: string;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OfficeSchema = new Schema<IOffice>(
  {
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    mapUrl: { type: String },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Office: Model<IOffice> = models.Office || mongooseInstance.model("Office", OfficeSchema);
export default Office;
