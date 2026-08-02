---
name: mongoose-schema-design
description: Standardized Mongoose model definitions, TypeScript interfaces, index strategies, and connection handling for Hope Global Academy.
---

# Skill: Mongoose Schema Design

This skill provides schema definitions and patterns for all 9 collections required by Hope Global Academy.

## Connection Singleton Pattern (`src/lib/db.ts`)

Must reuse cached Mongoose connection across serverless invocations:

```ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```

## Schema Requirements

Every model must have `timestamps: true` enabled and include clean TypeScript interfaces.

1. **User Model (`src/models/User.ts`)**:
   - `name`: string (required)
   - `email`: string (required, unique, lowercase)
   - `password`: string (required, hashed)
   - `role`: `'admin' | 'staff'` (default `'admin'`)

2. **Destination Model (`src/models/Destination.ts`)**:
   - `name`: string (required)
   - `slug`: string (required, unique, indexed)
   - `shortDescription`: string
   - `content`: string (HTML/Markdown content)
   - `image`: string (Cloudinary URL)
   - `tuitionRange`: string
   - `intake`: string
   - `featured`: boolean (default false)
   - `published`: boolean (default true)

3. **Course Model (`src/models/Course.ts`)**:
   - `title`: string (required)
   - `description`: string (required)
   - `icon`: string (Lucide icon name)

4. **Service Model (`src/models/Service.ts`)**:
   - `title`: string (required)
   - `description`: string (required)
   - `icon`: string (Lucide icon name)

5. **Office Model (`src/models/Office.ts`)**:
   - `country`: string (required)
   - `address`: string (required)
   - `mapUrl`: string

6. **FAQ Model (`src/models/FAQ.ts`)**:
   - `question`: string (required)
   - `answer`: string (required)

7. **Blog Model (`src/models/Blog.ts`)**:
   - `title`: string (required)
   - `slug`: string (required, unique, indexed)
   - `excerpt`: string
   - `content`: string (required)
   - `coverImage`: string (Cloudinary URL)
   - `seoTitle`: string
   - `seoDescription`: string
   - `tags`: string[]
   - `published`: boolean (default true)

8. **Consultation Model (`src/models/Consultation.ts`)**:
   - `name`: string (required)
   - `phone`: string (required)
   - `email`: string (required)
   - `preferredCountry`: string (required)
   - `intake`: string (required)
   - `message`: string
   - `status`: `'new' | 'contacted' | 'resolved' | 'cancelled'` (default `'new'`)

9. **Setting Model (`src/models/Setting.ts`)**:
   - `siteName`: string
   - `logo`: string (Cloudinary URL)
   - `phone`: string
   - `email`: string
   - `whatsapp`: string
   - `heroTitle`: string
   - `heroSubtitle`: string
   - `visaSuccessRate`: string
   - `studentsServed`: string
