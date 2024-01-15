import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { GoodsProps } from '../goods'

interface GoodsSelectProps {
  merchandise: GoodsProps
}

const goods = [
  { name: 'English', id: 'en' },
  { name: 'French', id: 'fr' },
  { name: 'German', id: 'de' },
  { name: 'Spanish', id: 'es' },
  { name: 'Portuguese', id: 'pt' },
  { name: 'Russian', id: 'ru' },
  { name: 'Japanese', id: 'ja' },
  { name: 'Korean', id: 'ko' },
  { name: 'Chinese', id: 'zh' },
] as const

const FormSchema = z.object({
  goods_id: z.string({
    required_error: 'Selecione uma Mercadoria',
  }),
})

export function ComboboxForm({ merchandise }: GoodsSelectProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="goods_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? goods.find(
                            (merchandise) => merchandise.id === field.value,
                          )?.name
                        : 'Selecionar Mercadoria'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar Mercadoria ..." />
                    <CommandEmpty>Nenhuma Mercadoria Cadastrada</CommandEmpty>
                    <CommandGroup>
                      {goods.map((merchandise) => (
                        <CommandItem
                          id={merchandise.name}
                          key={merchandise.id}
                          onSelect={() => {
                            form.setValue('goods_id', merchandise.id)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              merchandise.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {merchandise.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
