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
import { deleteExit } from '@/requests/goods/exits/deleteExit'

import { DialogFormEditExitMerchandise } from './form-edit-exit-merchandise'
import { GoodsExitsProps } from './goods-exits'

interface ExitsTableRowsProps {
  exit: GoodsExitsProps
}

export function GoodsExitsTableRows({ exit }: ExitsTableRowsProps) {
  const formattedDateTimeDate = format(
    new Date(exit.date),
    'dd/MM/yyyy - HH:mm',
  )
  async function handleMerchandiseDelete(token: string, id: string) {
    try {
      const response = await deleteExit(token, id)
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
      <TableCell className="font-medium">{exit.id}</TableCell>
      <TableCell className="font-medium">
        {exit.goods_register_number} | {exit.goods_name}
      </TableCell>
      <TableCell className="font-medium">{exit.quantity}</TableCell>
      <TableCell className="font-medium">{formattedDateTimeDate}</TableCell>
      <TableCell className="font-medium">{exit.location}</TableCell>
      <TableCell className="font-medium">{exit.user_username}</TableCell>
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
              <AlertDialogTitle>Excluir Saída da Mercadoria</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a entrada desta mercadoria{' '}
              <span className="font-medium">
                {exit.goods_register_number} | {exit.goods_name}
              </span>
              ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  handleMerchandiseDelete(
                    sessionStorage.getItem('accessToken') as string,
                    String(exit.goods_id),
                  )
                }
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogFormEditExitMerchandise exit={exit} key={exit.id} />
      </TableCell>
    </TableRow>
  )
}
