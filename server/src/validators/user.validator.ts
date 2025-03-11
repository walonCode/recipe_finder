import { z } from 'zod'

export const loginUserSchema = z.object({
    username: z.string().min(2, "username must be at least 2 characters long"),
    password: z.string().min(8, "password must be at least 8 characters long"),
})

export const registeUserSchema = z.object({
    fullname: z.string().min(2, "fullname must be at least 2 characters long"),
    username: z.string().min(2, "username must be at least 2 characters long"),
    password: z.string().min(8, "password must be at least 8 characters long"),
    email: z.string().email("please provide a valid email"),
    bio: z.string().min(2, "Bio must be at least 2 character long"),
    address: z.string().min(2, "Adddress must be at least 2 character long"),
})