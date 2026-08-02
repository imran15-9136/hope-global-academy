---
name: cloudinary-shadcn-forms
description: Guidance on using shadcn/ui components with React Hook Form, Zod schemas, and Cloudinary image upload integration for Hope Global Academy.
---

# Skill: Cloudinary & shadcn/ui Forms Integration

This skill covers building modular admin forms and client submission flows using shadcn/ui, React Hook Form, Zod, and Cloudinary.

## 1. Cloudinary Integration Utility (`src/lib/cloudinary.ts`)

- Provide server action or API handler to upload images to Cloudinary.
- Store only the secure returned URL string (`secure_url`) in MongoDB.
- Cloudinary credentials configured via environment variables:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

## 2. Form Architecture Principles

- **Single Responsibility**: Create dedicated form components in `src/components/admin/forms/` (e.g. `DestinationForm.tsx`, `BlogForm.tsx`, `ConsultationForm.tsx`).
- **Zod Schemas**: Store validation schemas in matching action or type files (e.g., `destinationSchema = zod.object({...})`).
- **No Inline Styles**: Style all input elements, buttons, cards, sheets, and dialogs using Tailwind CSS utility classes.
- **shadcn Components**: Use installed components:
  - `Button`, `Card`, `Dialog`, `Sheet`, `DropdownMenu`, `Form`, `Input`, `Textarea`, `Select`, `Switch`, `Table`, `Tabs`, `Badge`, `Separator`, `Skeleton`, `Toast`.

## 3. Standard Form Submission Pattern

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ExampleForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(myZodSchema),
    defaultValues: { ... },
  });

  async function onSubmit(values: MyFormValues) {
    const res = await myServerAction(values);
    if (res.success) {
      toast({ title: 'Success', description: res.message });
      form.reset();
    } else {
      toast({ title: 'Error', description: res.message, variant: 'destructive' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields styled with Tailwind classes */}
      </form>
    </Form>
  );
}
```
