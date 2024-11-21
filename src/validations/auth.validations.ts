import { z } from "zod";

export const schemaAuth = z.object({
  email: z.string().email(),
  password: z.string().min(7).max(50),
});

export type TSchemaAuth = z.infer<typeof schemaAuth>;
