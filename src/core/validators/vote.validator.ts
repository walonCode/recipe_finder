import {z} from "zod"

export const createVoteSchema = z.object({
    voteType: z.enum(["like", "dislike"]),
})