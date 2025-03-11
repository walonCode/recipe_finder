import { z } from "zod"

export const createRatingSchema = z.object({
    foodId: z.string().min(5, "Food id must be at least 5 characters"),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    username: z.string().min(2, "username should be at least two characters")
})