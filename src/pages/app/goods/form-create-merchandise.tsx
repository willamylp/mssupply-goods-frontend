import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, PackageCheckIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { createMerchandise } from '@/requests/goods/createMerchandise'

const formSchema = FormGoodsSchema

export function DialogFormCreateMerchandise({
  callback,
}: {
  callback: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createMerchandise(
        values,
        sessionStorage.getItem('accessToken') as string,
      )
      if (response.status === 200) {
        toast.success(response.msg)
        callback()
        form.setValue('name', '')
        form.setValue('register_number', '')
        form.setValue('manufacturer', '')
        form.setValue('type', '')
        form.setValue('description', '')
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
        <Button className="w-50 mx-3 my-3 bg-indigo-800 hover:bg-indigo-700">
          <PackageCheckIcon className="mr-2" />
          Cadastrar Mercadoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px]">
        <DialogTitle>Cadastro de Usuário</DialogTitle>
        <Separator />
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
      </DialogContent>
    </Dialog>
  )
}
