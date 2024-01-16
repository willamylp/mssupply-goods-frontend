import { z } from 'zod'

export const FormGoodsExitsSchema = z.object({
  quantity: z.coerce
    .number({
      invalid_type_error: 'Informe somente números',
      required_error: 'Este campo é obrigatório.',
    })
    .positive(),
  location: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
  date: z.coerce.date({
    required_error: 'Este campo é obrigatório.',
    invalid_type_error: 'Informe uma data válida.',
  }),
  goods_id: z.string({
    required_error: 'Este campo é obrigatório.',
  }),
})
