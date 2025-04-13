import { z } from "zod";

export const createFoodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    origin: z.string().min(2, "Origin must be at least 2 characters"),
    ingredient: z.array(z.string()).min(1, "Please provide at least one ingredients"),
    username: z.string().min(2, "username should be at least two characters").optional()
})

export const updateFoodSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters").optional(),
    origin: z.string().min(5, "Origin must be at least 5 characters").optional(),
    ingredient: z.array(z.string()).min(1, "Please provide at least one ingredients").optional(),
})