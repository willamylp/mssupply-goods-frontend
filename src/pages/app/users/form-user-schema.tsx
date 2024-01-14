import { z } from 'zod'

export const FormUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  email: z.string().email(),
  is_admin: z.boolean().default(false),
  is_active: z.boolean().default(true),
})
