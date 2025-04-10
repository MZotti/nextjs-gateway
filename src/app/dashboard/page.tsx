import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { Eye, Download, Plus } from "lucide-react"
import { cookies } from "next/headers"

export async function getInvoices() {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;

  const response = await fetch("http://localhost:8080/invoice", {
    headers: {
      "X-API-Key": apiKey as string
    }
  })

  return response.json();
}

export default async function DashboardPage() {
  const invoices = await getInvoices();
  return (
    <PageContainer>
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Faturas</CardTitle>
              <CardDescription>Gerencie suas faturas e acompanhe os pagamentos</CardDescription>
            </div>
            <Link href="/dashboard/new-invoice">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus size={16} className="mr-1" />
                Nova Fatura
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="status" className="text-sm font-medium block mb-2">
                Status
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="status" className="bg-muted">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="rejected">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="startDate" className="text-sm font-medium block mb-2">
                Data Inicial
              </label>
              <Input id="startDate" type="date" placeholder="dd/mm/aaaa" className="bg-muted" />
            </div>
            <div>
              <label htmlFor="endDate" className="text-sm font-medium block mb-2">
                Data Final
              </label>
              <Input id="endDate" type="date" placeholder="dd/mm/aaaa" className="bg-muted" />
            </div>
            <div>
              <label htmlFor="search" className="text-sm font-medium block mb-2">
                Buscar
              </label>
              <Input id="search" placeholder="ID ou descrição" className="bg-muted" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">DATA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">DESCRIÇÃO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">VALOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">STATUS</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {
                  invoices.map((invoice: any) => (
                    <tr className="border-b border-muted" key={invoice.id}>
                      <td className="py-4 px-4">{invoice.id}</td>
                      <td className="py-4 px-4">{new Date(invoice.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-4">{invoice.description}</td>
                      <td className="py-4 px-4">R$ {invoice.amount.toFixed(2).replace(".", ",")}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye size={18} />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                }
                {/* <tr className="border-b border-muted">
                  <td className="py-4 px-4">#INV-002</td>
                  <td className="py-4 px-4">29/03/2025</td>
                  <td className="py-4 px-4">Serviço Premium</td>
                  <td className="py-4 px-4">R$ 15.000,00</td>
                  <td className="py-4 px-4">
                    <StatusBadge status="pending" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href="/dashboard/invoices/INV-002">
                        <Button variant="ghost" size="icon">
                          <Eye size={18} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-muted">
                  <td className="py-4 px-4">#INV-003</td>
                  <td className="py-4 px-4">28/03/2025</td>
                  <td className="py-4 px-4">Assinatura Mensal</td>
                  <td className="py-4 px-4">R$ 99,90</td>
                  <td className="py-4 px-4">
                    <StatusBadge status="rejected" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href="/dashboard/invoices/INV-003">
                        <Button variant="ghost" size="icon">
                          <Eye size={18} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">Mostrando 1 - 3 de 50 resultados</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </Button>
              <Button variant="outline" className="bg-indigo-600 text-white border-indigo-600">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
