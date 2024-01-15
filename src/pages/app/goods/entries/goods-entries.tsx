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
import { DialogFormCreateEntryMerchandise } from '@/pages/app/goods/entries/form-create-goods-entries'
import { GoodsEntriesTableRows } from '@/pages/app/goods/entries/goods-entries-table-rows'
import { getAllEntries } from '@/requests/goods/entries/getAllEntries'

export interface GoodsEntriesProps {
  goods_register_number: ReactNode
  goods_name: ReactNode
  id: number
  name_merchandise: string
  register_number_merchandise: number
  quantity: number
  date: string
  location: string
  name_user_added: string
  goods_id: number
}

export function GoodsEntries() {
  const [entries, setEntries] = useState<GoodsEntriesProps[]>([])

  useEffect(() => {
    async function loadGoodsEntries() {
      setEntries(
        await getAllEntries(sessionStorage.getItem('accessToken') as string),
      )
    }
    loadGoodsEntries()
  }, [])

  return (
    <>
      <Helmet title="Entradas de Mercadorias" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Entradas de Mercadorias
        </h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateEntryMerchandise />
            <Separator />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nº | Nome da Mercadoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Data de Entrada</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Usuário que Registrou</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <GoodsEntriesTableRows entry={entry} key={entry.id} />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={entries.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
