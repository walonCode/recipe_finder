import {z} from "zod"

export const createVoteSchema = z.object({
    foodId: z.string().min(5, "Food id must be at least 5 characters"),
    voteType: z.enum(["like", "dislike"]),
})