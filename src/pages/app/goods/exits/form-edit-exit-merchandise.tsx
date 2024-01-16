import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { CheckCircle, PencilLine } from 'lucide-react'
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
import { FormGoodsExitsSchema } from '@/pages/app/goods/exits/form-goods-exits-schema'
import { updateExit } from '@/requests/goods/exits/updateExit'
import { getAllGoods } from '@/requests/goods/getAllGoods'

import { GoodsExitsProps } from './goods-exits'

const formSchema = FormGoodsExitsSchema
interface ExitsTableRowsProps {
  exit: GoodsExitsProps
}
export interface GoodsSelectProps {
  id: number
  name: string
}
export function DialogFormEditExitMerchandise({ exit }: ExitsTableRowsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goods_id: String(exit.goods_id),
      quantity: exit.quantity,
      location: exit.location,
      date: format(exit.date, 'yyyy-MM-ddThh:mm'),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.date = format(new Date(values.date), 'yyyy-MM-dd HH:mm:ss')
    try {
      const response = await updateExit(
        exit.id,
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
        <Button
          variant="outline"
          className="border-none bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px]">
        <DialogTitle>Registro de Saída</DialogTitle>
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
                      defaultInputValue={exit.goods_name}
                      defaultValue={exit.goods_id}
                      defaultMenuIsOpen={true}
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
                      defaultValue={exit.quantity}
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
                  <FormLabel>Local de Saída</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: Filial do RJ"
                      {...field}
                      defaultValue={exit.location}
                    />
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
                  <FormLabel>Data de Saída</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      defaultValue={format(exit.date, 'yyyy-MM-ddThh:mm:ss')}
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
