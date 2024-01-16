import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FileDown, UserPlus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
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

  const loadUsers = useCallback(async () => {
    setUsers(await getAllUsers(sessionStorage.getItem('accessToken') as string))
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const downloadData = () => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('landscape', 'px', 'a4')
    autoTable(pdf, {
      html: '#table-users',
    })
    pdf.save('Lista-Usuarios__MSSupplyChain.pdf')
  }

  return (
    <>
      <Helmet title="Usuários" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateUser callback={loadUsers} />
            <Button variant="outline" onClick={downloadData}>
              <FileDown className="mr-2" />
              Exportar Relatóro
            </Button>
            <Separator />
            <Table id="table-users">
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
          <Pagination pageIndex={0} totalCount={users?.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
