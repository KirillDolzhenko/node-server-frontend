import { z } from "zod";

export const schemaPutUser = z.object({
  email: z.string().email().optional(),
  description: z.string().max(500).nullable().optional(),
});

export type TSchemaPutUser = z.infer<typeof schemaPutUser>;
