import { z } from "zod"

export const createStepSchema = z.object({  
    foodId: z.string().min(5, "Food id must be at least 5 characters"),
    step: z.string().min(5, "Step must be at least 5 characters"),
})