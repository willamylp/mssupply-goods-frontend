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
import { DialogFormCreateMerchandise } from '@/pages/app/goods/form-create-merchandise'
import { GoodsTableRows } from '@/pages/app/goods/goods-table-rows'
import { getAllGoods } from '@/requests/goods/getAllGoods'

export interface GoodsProps {
  id: number
  name: string
  manufacturer: string
  register_number: string
  type: string
  description: string
  date_added: string
  name_user_added: string
}

export function Goods() {
  const [goods, setGoods] = useState<GoodsProps[]>([])

  useEffect(() => {
    async function loadGoods() {
      setGoods(
        await getAllGoods(sessionStorage.getItem('accessToken') as string),
      )
    }
    loadGoods()
  }, [])

  return (
    <>
      <Helmet title="Mercadorias" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Mercadorias</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateMerchandise />
            <Separator />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome do Produto</TableHead>
                  <TableHead>Nº de Registro</TableHead>
                  <TableHead>Fabricante</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data de Registro</TableHead>
                  <TableHead>Usuário que Registrou</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goods &&
                  goods.map((merchandise) => (
                    <GoodsTableRows
                      merchandise={merchandise}
                      key={merchandise.id}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={goods.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
