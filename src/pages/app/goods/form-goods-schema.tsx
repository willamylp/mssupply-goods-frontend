import { z } from 'zod'

export const FormGoodsSchema = z.object({
  name: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  register_number: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  manufacturer: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  type: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  description: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
})
