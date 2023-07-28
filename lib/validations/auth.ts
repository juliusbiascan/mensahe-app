import * as z from "zod"

export const userAuthSchema = z.object({
  name: z.string().regex(/^[a-z ,.'-]+$/i,"Invalid name:"),
  email: z.string().email(),
  password: z.string().min(6, 'Password should be minimum 6 characters'),
})