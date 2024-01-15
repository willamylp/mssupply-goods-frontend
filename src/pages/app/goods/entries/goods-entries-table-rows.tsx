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
import { deleteEntry } from '@/requests/goods/entries/deleteEntry'

import { DialogFormEditEntryMerchandise } from './form-edit-entry-merchandise'
import { GoodsEntriesProps } from './goods-entries'

interface EntriesTableRowsProps {
  entry: GoodsEntriesProps
}

export function GoodsEntriesTableRows({ entry }: EntriesTableRowsProps) {
  const formattedDateTimeDate = format(
    new Date(entry.date),
    'dd/MM/yyyy - HH:mm',
  )
  async function handleMerchandiseDelete(token: string, id: string) {
    try {
      const response = await deleteEntry(token, id)
      console.log(response.status)
      if (response.status === 204) {
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
    <TableRow>
      <TableCell className="font-medium">{entry.id}</TableCell>
      <TableCell className="font-medium">
        {entry.goods_register_number} | {entry.goods_name}
      </TableCell>
      <TableCell className="font-medium">{entry.quantity}</TableCell>
      <TableCell className="font-medium">{formattedDateTimeDate}</TableCell>
      <TableCell className="font-medium">{entry.location}</TableCell>
      <TableCell className="font-medium">{entry.user_username}</TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="mr-2 bg-rose-700 text-white hover:bg-rose-600 hover:text-white"
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Entrada da Mercadoria</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a entrada desta mercadoria{' '}
              <span className="font-medium">
                {entry.goods_register_number} | {entry.goods_name}
              </span>
              ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  handleMerchandiseDelete(
                    sessionStorage.getItem('accessToken') as string,
                    String(entry.goods_id),
                  )
                }
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogFormEditEntryMerchandise entry={entry} key={entry.id} />
      </TableCell>
    </TableRow>
  )
}
