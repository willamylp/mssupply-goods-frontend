import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, PencilLine } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { FormGoodsSchema } from '@/pages/app/goods/form-goods-schema'
import { updateMerchandise } from '@/requests/goods/updateMerchandise'

import { GoodsProps } from './goods'

interface GoodsFormEditProps {
  merchandise: GoodsProps
}

const formSchema = FormGoodsSchema

export function DialogFormEditMerchandise({ merchandise }: GoodsFormEditProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: merchandise.name,
      register_number: merchandise.register_number,
      manufacturer: merchandise.manufacturer,
      type: merchandise.type,
      description: merchandise.description,
      user_id: sessionStorage.getItem('userId') as string,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateMerchandise(
        merchandise.id,
        values,
        sessionStorage.getItem('accessToken') as string,
      )
      if (response.status === 200) {
        toast.success(response.msg)
        setTimeout(() => window.location.reload(), 800)
      } else {
        toast.error(response.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Editar dados da Mercadoria Nº:{' '}
            <span className="text-blue-900 dark:text-blue-600">
              {merchandise.register_number}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Mercadoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Produto AB12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="register_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº de Registro</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: RN-123456789-AB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fabricante</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: MS Manufacturer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Mercadoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Eletrônicos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Mercadoria</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex.: Equipamento eletrônico de teste de qualidade de produtos."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />

            <Button
              type="submit"
              className="w-[200px] items-center justify-center bg-teal-700 hover:bg-teal-600"
            >
              <CheckCircle className="mr-2" />
              REGISTRAR
            </Button>
          </form>
        </Form>
        <Separator />
      </DialogContent>
    </Dialog>
  )
}
