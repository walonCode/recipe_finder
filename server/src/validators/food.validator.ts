import { z } from "zod";

export const createFoodSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    origin: z.string().min(5, "Origin must be at least 5 characters"),
    ingredient: z.string().array().min(4, "Please provide ingredients"),
    userId: z.string().min(5, "User id must be at least 5 character"),
    username: z.string().min(2, "username should be at least two characters").optional()
})