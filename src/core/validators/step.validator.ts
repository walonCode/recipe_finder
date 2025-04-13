import { z } from "zod"

export const createStepSchema = z.object({  
    foodId: z.string().min(5, "Food id must be at least 5 characters"),
    step: z.array(z.string()).min(1, "Step must be at least 1 step"),
})