import { z } from "zod";

export const ScholarshipSchema = z.object({
    author: z.string().optional(),
    title: z.string().max(70, { message: "Title must not exceed 70 characters"}).min(10, {message: "Title must exceed 10 characters"}),
    content: z.string().min(20, { message: "Content must exceed 20 characters"}),
    tags: z.string(),
    image: z.custom(() => File)
})
