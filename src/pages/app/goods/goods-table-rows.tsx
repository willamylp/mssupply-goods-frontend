import { format } from 'date-fns';
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

// import { deleteMerchandise } from '@/requests/goods/deleteMerchandise'
// import { DialogFormEditMerchandise } from './form-edit-merchandise'
import { GoodsProps } from './goods'

interface GoodsTableRowsProps {
  merchandise: GoodsProps
}

export function GoodsTableRows({ merchandise }: GoodsTableRowsProps) {
  const formattedDateTimeAdded = format(
    new Date(merchandise.date_added),
    'dd/MM/yyyy - HH:mm',
  )
  //   async function handleMerchandiseDelete(token: string, id: string) {
  //     try {
  //       const response = await deleteMerchandise(token, id)
  //       console.log(response.status)
  //       if (response.status === 201) {
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
      <TableCell className="font-medium">{merchandise.id}</TableCell>
      <TableCell className="font-medium">{merchandise.name}</TableCell>
      <TableCell className="font-medium">
        {merchandise.register_number}
      </TableCell>
      <TableCell className="font-medium">{merchandise.manufacturer}</TableCell>
      <TableCell className="font-medium">{merchandise.type}</TableCell>
      <TableCell className="font-medium">{merchandise.description}</TableCell>
      <TableCell className="font-medium">{formattedDateTimeAdded}</TableCell>
      <TableCell className="font-medium">
        {merchandise.name_user_added}
      </TableCell>
    </TableRow>
  )
}
