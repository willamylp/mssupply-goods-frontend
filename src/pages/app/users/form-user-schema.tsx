import { z } from 'zod'

export const FormUserSchema = z.object({
  username: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  password: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  name: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  email: z.string().email({
    message: 'Digite um e-mail válido.',
  }),
})
