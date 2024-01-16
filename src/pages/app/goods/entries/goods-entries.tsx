import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FileDown } from 'lucide-react'
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
import { DialogFormCreateEntryMerchandise } from '@/pages/app/goods/entries/form-create-goods-entries'
import { GoodsEntriesTableRows } from '@/pages/app/goods/entries/goods-entries-table-rows'
import { getAllEntries } from '@/requests/goods/entries/getAllEntries'

export interface GoodsEntriesProps {
  id: number
  name_merchandise: string
  register_number_merchandise: number
  quantity: number
  date: string
  location: string
  name_user_added: string
  goods_id: number
  goods_register_number: string
  goods_name: string
  user_username: string
}

export function GoodsEntries() {
  const [entries, setEntries] = useState<GoodsEntriesProps[]>([])


  const loadGoodsEntries = useCallback(async () => {
    setEntries(
      await getAllEntries(sessionStorage.getItem('accessToken') as string),
    )
  }, [])

  useEffect(() => {
    loadGoodsEntries()
  }, [loadGoodsEntries])

  const downloadData = () => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('landscape', 'px', 'a4')
    autoTable(pdf, {
      html: '#table-entries',
    })
    pdf.save('Lista-Entrada-Mercadorias__MSSupplyChain.pdf')
  }

  return (
    <>
      <Helmet title="Entradas de Mercadorias" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Entradas de Mercadorias
        </h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateEntryMerchandise callback={loadGoodsEntries} />
            <Button variant="outline" onClick={downloadData}>
              <FileDown className="mr-2" />
              Exportar Relatóro
            </Button>
            <Separator />
            <Table id="table-entries">
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
                {entries &&
                  entries.map((entry) => (
                    <GoodsEntriesTableRows entry={entry} key={entry.id} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={entries?.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
