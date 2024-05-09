import { z } from "zod";
// export const BaseResponseSchema = z.object({
//   message: z.string().optional(),
//   statusCode: z.number().optional(),
//   success: z.boolean(),
// });
export const PinSchema = z.object({
  pin: z.string().min(6, "Please enter a valid pin"),
});

// export type PostContactResponseSchemaType = z.infer<
//   typeof PostContactResponseSchema
// >;

export type PinSchemType = z.infer<typeof PinSchema>;
