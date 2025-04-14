import { z } from "zod"

export const createStepSchema = z.object({  
    step: z.array(z.string()).min(1, "Step must be at least 1 step"),
})