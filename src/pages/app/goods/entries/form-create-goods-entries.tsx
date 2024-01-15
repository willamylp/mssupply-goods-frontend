import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CheckCircle, PackagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
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
import { FormGoodsEntriesSchema } from '@/pages/app/goods/entries/form-goods-entries-schema'
import { createEntry } from '@/requests/goods/entries/createEntry'
import { getAllGoods } from '@/requests/goods/getAllGoods'

const formSchema = FormGoodsEntriesSchema
export interface GoodsSelectProps {
  id: number
  name: string
}
export function DialogFormCreateEntryMerchandise({
  callback,
}: {
  callback: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.date = format(new Date(values.date), 'yyyy-MM-dd HH:mm:ss')
    try {
      const response = await createEntry(
        values,
        sessionStorage.getItem('accessToken') as string,
      )
      if (response.status === 200) {
        toast.success(response.msg)
        callback()
        setSelected(undefined)
        form.setValue('quantity', '')
        form.setValue('location', '')
        form.setValue('date', '')
      } else {
        toast.error(response.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [goods, setGoods] = useState<GoodsSelectProps[]>([])
  const [selected, setSelected] = useState()

  useEffect(() => {
    async function loadGoods() {
      setGoods(
        await getAllGoods(sessionStorage.getItem('accessToken') as string),
      )
    }
    loadGoods()
  }, [])

  if (selected) {
    form.setValue('goods_id', String(selected))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-50 mx-3 my-3 bg-indigo-800 hover:bg-indigo-700">
          <PackagePlus className="mr-2" />
          Registrar Entrada de Mercadoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px]">
        <DialogTitle>Registro de Entrada</DialogTitle>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              name="goods_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Mercadoria</FormLabel>
                  <FormControl>
                    <Select
                      options={goods}
                      getOptionLabel={(merchandise) => merchandise.name}
                      getOptionValue={(merchandise) => String(merchandise.id)}
                      placeholder="Selecione uma mercadoria"
                      onChange={(merchandise) => setSelected(merchandise.id)}
                      className="font-normal text-slate-950"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Somente números"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local de Entrada</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Filial do RJ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Entrada</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" />
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
