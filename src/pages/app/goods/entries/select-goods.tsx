import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

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
import { getAllGoods } from '@/requests/goods/getAllGoods'
export interface GoodsSelectProps {
  id: number
  name: string
}

export function SelectMerchandise() {
  const [goods, setGoods] = useState<GoodsSelectProps[]>([])
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    async function loadGoods() {
      setGoods(
        await getAllGoods(sessionStorage.getItem('accessToken') as string),
      )
    }
    loadGoods()
  }, [])

  return (
    <Select
      options={goods}
      getOptionLabel={(merchandise) => merchandise.name}
      getOptionValue={(merchandise) => String(merchandise.id)}
      placeholder="Selecione uma mercadoria"
    />
  )
}
