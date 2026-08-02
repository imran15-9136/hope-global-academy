import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsultation extends Document {
  name: string;
  phone: string;
  email: string;
  preferredCountry: string;
  intake?: string;
  interestedCourse?: string;
  message?: string;
  status: "new" | "contacted" | "resolved" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    preferredCountry: { type: String, required: true, trim: true },
    intake: { type: String },
    interestedCourse: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "resolved", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Consultation: Model<IConsultation> =
  models.Consultation || mongooseInstance.model("Consultation", ConsultationSchema);
export default Consultation;
