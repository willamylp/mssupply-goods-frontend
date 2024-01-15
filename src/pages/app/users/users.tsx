import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DialogFormCreateUser } from '@/pages/app/users/form-create-user'
import { UsersTableRows } from '@/pages/app/users/users-table-rows'
import { getAllUsers } from '@/requests/users/getAllUsers'

export interface UserProps {
  id: number
  name: string
  email: string
  username: string
  is_admin: boolean
  is_active: boolean
}

export function Users() {
  const [users, setUsers] = useState<UserProps[]>([])

  useEffect(() => {
    async function loadUsers() {
      setUsers(
        await getAllUsers(sessionStorage.getItem('accessToken') as string),
      )
    }
    loadUsers()
  }, [])
  return (
    <>
      <Helmet title="Usuários" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateUser />
            <Separator />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Tipo de Usuário</TableHead>
                  <TableHead>Usuário Ativo?</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.length &&
                  users.map((user) => (
                    <UsersTableRows user={user} key={user.id} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={users.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
