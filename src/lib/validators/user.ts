import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }).regex(/^/g, {message: "Username must start with a valid character."}).regex(/[a-zA-Z0-9_.]$/g, { message: "Username must contain 3-20 characters of letters, numbers, underscores, or periods."}).regex(/$/g, {message: "Username must end with a valid character."}),
  email: z.string().email("You have to provide a valid email address").readonly(),
  bio: z.string().optional(),
  institution: z.number(),
  dob: z.any().optional(),
  avatar: z.any().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  faculty: z.string().optional(),
})
