import { z } from "zod";

const blogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required!" }),
    description: z.string({ required_error: "Description is required!" }),
    imageUrl: z.string({ required_error: "Image URL is required!" }),
  }),
});

const blogUpdateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});

export const BlogValidationSchemas = {
  blogSchema,
  blogUpdateSchema,
};
