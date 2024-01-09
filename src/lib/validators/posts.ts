import { z } from "zod";

export const PostSchema = z.object({
    content: z.string().max(2511, { message: "Your post has gone beyond the maximum characters."}),
    faculty: z.string().optional(),
    image: z.any().optional(),
    institution: z.string().optional(),
    location: z.string().optional(),
    user: z.string(),
    parent_post_id: z.string().optional(),
    is_reply: z.boolean().optional(),
})