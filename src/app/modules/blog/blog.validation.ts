import { z } from "zod";

const createBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isPublished: z.boolean().default(true),
});

const updateBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
