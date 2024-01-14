import {
  PencilLine,
  Trash2,
  User,
  UserCheck,
  UserRoundCog,
  UserX,
} from 'lucide-react'
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
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { deleteUser } from '@/requests/users/deleteUser'

import { DialogFormEditUser } from './form-edit-user'
import { UserProps } from './users'

interface UsersTableRowsProps {
  user: UserProps
}

export function UsersTableRows({ user }: UsersTableRowsProps) {
  async function handleUserDelete(token: string, id: string) {
    try {
      const response = await deleteUser(token, id)
      console.log(response.status)
      if (response.status === 201) {
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
          {user.is_active ? 'Ativo' : 'Inativo'}
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
              <AlertDialogAction
                onClick={() => {
                  return handleUserDelete(
                    sessionStorage.getItem('accessToken') as string,
                    user.id.toString(),
                  )
                }}
              >
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogFormEditUser user={user} key={user.id} />
      </TableCell>
    </TableRow>
  )
}
