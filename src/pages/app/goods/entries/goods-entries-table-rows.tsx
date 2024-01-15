import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

// import { deleteMerchandise } from '@/requests/goods/deleteMerchandise'
// import { DialogFormEditMerchandise } from './form-edit-merchandise'
import { GoodsEntriesProps } from './goods-entries'

interface EntriesTableRowsProps {
  entry: GoodsEntriesProps
}

export function GoodsEntriesTableRows({ entry }: EntriesTableRowsProps) {
  const formattedDateTimeDate = format(
    new Date(entry.date),
    'dd/MM/yyyy - HH:mm',
  )
  //   async function handleMerchandiseDelete(token: string, id: string) {
  //     try {
  //       const response = await deleteMerchandise(token, id)
  //       console.log(response.status)
  //       if (response.status === 204) {
  //         toast.success(response.msg)
  //         setTimeout(() => window.location.reload(), 800)
  //       } else {
  //         toast.error(response.msg)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  return (
    <TableRow>
      <TableCell className="font-medium">{entry.id}</TableCell>
      <TableCell className="font-medium">
        {entry.goods_register_number} | {entry.goods_name}
      </TableCell>
      <TableCell className="font-medium">{entry.quantity}</TableCell>
      <TableCell className="font-medium">{formattedDateTimeDate}</TableCell>
      <TableCell className="font-medium">{entry.location}</TableCell>
      <TableCell className="font-medium">{entry.name_user_added}</TableCell>
    </TableRow>
  )
}
