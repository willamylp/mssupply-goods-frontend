import { z } from 'zod'

const goodsSchema = z.object({
  id: z.string(),
  name: z.string(),
  register_number: z.string(),
});

export const FormGoodsEntriesSchema = z.object({
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
  goods: z.array(goodsSchema),
})
