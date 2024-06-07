import { z } from "zod";

const userProfileSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

const userProfileUpdateSchema = z.object({
  body: z.object({
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
  }),
});

const userSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
  }),
});

const userUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
  }),
});

export const userValidationSchemas = {
  userSchema,
  userUpdateSchema,
  userProfileSchema,
  userProfileUpdateSchema,
};
