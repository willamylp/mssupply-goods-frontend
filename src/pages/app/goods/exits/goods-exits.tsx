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
import { DialogFormCreateExitMerchandise } from '@/pages/app/goods/exits/form-create-goods-exits'
import { GoodsExitsTableRows } from '@/pages/app/goods/exits/goods-exits-table-rows'
import { getAllExits } from '@/requests/goods/exits/getAllExits'

export interface GoodsExitsProps {
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

export function GoodsExits() {
  const [exits, setExits] = useState<GoodsExitsProps[]>([])

  const loadGoodsExits = useCallback(async () => {
    setExits(await getAllExits(sessionStorage.getItem('accessToken') as string))
  }, [])

  useEffect(() => {
    loadGoodsExits()
  }, [loadGoodsExits])

  const downloadData = () => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('landscape', 'px', 'a4')
    autoTable(pdf, {
      html: '#table-exits',
    })
    pdf.save('Lista-Saidas-Mercadorias__MSSupplyChain.pdf')
  }

  return (
    <>
      <Helmet title="Saídas de Mercadorias" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Saídas de Mercadorias
        </h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <DialogFormCreateExitMerchandise callback={loadGoodsExits} />
            <Button variant="outline" onClick={downloadData}>
              <FileDown className="mr-2" />
              Exportar Relatóro
            </Button>
            <Separator />
            <Table id="table-exits">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nº | Nome da Mercadoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Data de Saída</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Usuário que Registrou</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exits &&
                  exits.map((exit) => (
                    <GoodsExitsTableRows exit={exit} key={exit.id} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={exits?.length} perPage={10} />
        </div>
      </div>
    </>
  )
}
