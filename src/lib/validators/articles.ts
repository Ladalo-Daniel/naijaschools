import { z } from "zod";

export const ArticleSchema = z.object({
    author: z.string(),
    title: z.string().max(70, { message: "Title must not exceed 70 characters"}).min(10, {message: "Title must exceed 10 characters"}),
    minutes_read: z.string(),
    content: z.string().min(20, { message: "Content must exceed 20 characters"}),
    tags: z.string(),
    image: z.custom(() => File)
})
