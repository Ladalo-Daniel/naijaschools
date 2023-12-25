import { z } from "zod";


export const QuestionSchema = z.object({
    course: z.number().readonly(),
    question: z.string().min(2, { message: "Question should exceed at least two characters"}),
    option1: z.string(),
    option2: z.string(),
    option3: z.string(),
    option4: z.string(),
    answer: z.string(),
    explanation: z.string().optional()
})