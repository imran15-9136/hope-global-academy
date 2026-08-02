import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestination extends Document {
  name: string;
  slug: string;
  shortDescription?: string;
  content?: string;
  image?: string;
  tuitionRange?: string;
  intake?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    shortDescription: { type: String },
    content: { type: String },
    image: { type: String },
    tuitionRange: { type: String },
    intake: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const mongooseInstance = mongoose?.models ? mongoose : (mongoose as any)?.default || mongoose;
const models = mongooseInstance?.models || {};

const Destination: Model<IDestination> =
  models.Destination || mongooseInstance.model("Destination", DestinationSchema);
export default Destination;
