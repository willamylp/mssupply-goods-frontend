import { z } from 'zod'

export const FormUserSchema = z.object({
  username: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  password: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  name: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  email: z
    .string()
    .email({
      message: 'Digite um e-mail válido.',
    })
    .min(1, {
      message: 'Este campo é obrigatório.',
    }),
  is_admin: z.boolean().default(false),
  is_active: z.boolean().default(true),
})
