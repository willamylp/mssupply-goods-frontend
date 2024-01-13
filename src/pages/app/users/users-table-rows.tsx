import {
  PencilLine,
  Trash2,
  User,
  UserCheck,
  UserRoundCog,
  UserX,
} from 'lucide-react'

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

import { UserProps } from './users'

interface UsersTableRowsProps {
  user: UserProps
}

export function UsersTableRows({ user }: UsersTableRowsProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="font-medium">{user.email}</TableCell>
      <TableCell className="font-medium ">
        <Badge
          className={
            user.is_admin
              ? 'bg-blue-800 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }
        >
          {user.is_admin ? (
            <UserRoundCog className="mr-2" />
          ) : (
            <User className="mr-1" />
          )}{' '}
          {user.is_admin ? 'Admin' : 'Usuário'}
        </Badge>
      </TableCell>
      <TableCell className="font-medium ">
        <Badge
          className={
            user.is_active
              ? 'bg-teal-600 hover:bg-teal-500'
              : 'bg-red-600 hover:bg-red-500'
          }
        >
          {user.is_active ? (
            <UserCheck className="mr-2" />
          ) : (
            <UserX className="mr-1" />
          )}{' '}
          {user.is_admin ? 'Ativo' : 'Inativo'}
        </Badge>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-50 mr-2 bg-rose-700 text-white hover:bg-rose-600 hover:text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Deletar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
              <AlertDialogDescription>
                Você tem certeza? Esta ação não poderá ser revertida.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Deletar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="outline"
          className="w-50 bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          <PencilLine className="mr-2 h-4 w-4" />
          <span className="font-semibold">Editar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
