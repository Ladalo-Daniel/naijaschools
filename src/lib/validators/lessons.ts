import { z } from "zod";

export const LessonSchema = z.object({
    title: z.string(),
    content: z.string().min(20, { message: "The lesson content is just too little. Please fret!"}),
    institution: z.string().optional(),
    faculty: z.string().optional(),
    course: z.string().optional(),
    image_url: z.any().optional(),
    summary: z.string().optional(),
})
