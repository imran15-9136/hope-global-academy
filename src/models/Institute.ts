import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInstitute extends Document {
  name: string;
  country: string;
  ranking: string;
  createdAt: Date;
  updatedAt: Date;
}

const InstituteSchema = new Schema<IInstitute>(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    ranking: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Institute: Model<IInstitute> = models.Institute || mongooseInstance.model("Institute", InstituteSchema);
export default Institute;
