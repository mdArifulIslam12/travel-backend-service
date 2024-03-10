import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    details: z.string({
      required_error: 'Detils is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});
const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    details: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
