import * as z from "zod"

export const groupChatSchema = z.object({
  name: z.string().regex(/^[a-z ,.'-]+$/i, "Invalid name:"),
  members: z.string().array()
})