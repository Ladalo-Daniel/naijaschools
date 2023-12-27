import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("You have to provide a valid email address").readonly(),
  bio: z.string().optional(),
  institution: z.number(),
  dob: z.any().optional(),
  avatar: z.any().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional()
})
