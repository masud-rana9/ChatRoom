import { z } from "zod";

const roomsSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Title is required!" }),
    coverUrl: z.string({ required_error: "Image URL is required!" }),
  }),
});

const roomUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomsUrl: z.string().optional(),
    messages: z
      .object({
        text: z.string().optional(),
      })
      .optional(),
  }),
});

export const RomsValidationSchemas = {
  roomsSchema,
  roomUpdateSchema,
};
