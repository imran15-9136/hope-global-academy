import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestinationHighlight {
  title: string;
  description: string;
}

export interface IDestination extends Document {
  name: string;
  slug: string;
  shortDescription?: string;
  content?: string;
  image?: string;
  tuitionRange?: string;
  intake?: string;
  postStudyWork?: string;
  visaSuccessRate?: string;
  highlights?: IDestinationHighlight[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationHighlightSchema = new Schema<IDestinationHighlight>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const DestinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    shortDescription: { type: String },
    content: { type: String },
    image: { type: String },
    tuitionRange: { type: String },
    intake: { type: String },
    postStudyWork: { type: String, default: "2 - 3 Years Work Permit" },
    visaSuccessRate: { type: String, default: "98% Success Rate" },
    highlights: { type: [DestinationHighlightSchema], default: [] },
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
