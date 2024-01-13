import {
  ArrowRight,
  ChevronDown,
  PencilLine,
  Trash2,
  User,
  UserCheck,
  UserRoundCog,
  UserX,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
        <Badge className={user.is_admin ? 'bg-blue-900' : 'bg-gray-700'}>
          {user.is_admin ? (
            <UserRoundCog className="mr-2" />
          ) : (
            <User className="mr-1" />
          )}{' '}
          {user.is_admin ? 'Admin' : 'Comum'}
        </Badge>
      </TableCell>
      <TableCell className="font-medium ">
        <Badge className={user.is_active ? 'bg-teal-700' : 'bg-rose-700'}>
          {user.is_active ? (
            <UserCheck className="mr-2" />
          ) : (
            <UserX className="mr-1" />
          )}{' '}
          {user.is_admin ? 'Ativo' : 'Inativo'}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex select-none items-center gap-2"
            >
              Opções
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <PencilLine className="mr-2 h-4 w-4" />
              <span className="font-semibold">Editar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="font-semibold">Deletar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
