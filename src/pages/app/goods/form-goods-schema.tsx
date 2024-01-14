import { z } from 'zod'

export const FormGoodsSchema = z.object({
  name: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  register_number: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  manufacturer: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  type: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  description: z.string().min(1, {
    message: 'Este campo é obrigatório.',
  }),
  user_id: z.string(),
})
