import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { CardSection } from "@/components/card-section"
import { InfoItem } from "@/components/info-item"
import { TimelineItem } from "@/components/timeline-item"
import { ArrowLeft, Download } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { cookies } from "next/headers"

export async function getInvoice(id: string) {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;

  const response = await fetch("http://localhost:8080/invoice/" + id, {
    headers: {
      "X-API-Key": apiKey as string
    }
  })

  return response.json();
}

export default async function InvoiceDetailsPage({params}: {params: Promise<{id: string}>}) {
  const { id } = await params
  const invoice = await getInvoice(id)

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Fatura {id}</h1>
          <StatusBadge status={invoice.status || "rejected"} />
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-6">Criada em {new Date(invoice.created_at).toLocaleDateString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSection title="Informações da Fatura">
          <div className="grid grid-cols-1 gap-2">
            <InfoItem label="ID da Fatura" value={id} />
            <InfoItem label="Valor" value={"R$ " + invoice.amount.toFixed(2).replace(".", ",")} />
            <InfoItem label="Data de Criação" value={new Date(invoice.created_at).toLocaleDateString()} />
            <InfoItem label="Descrição" value={invoice.description} />
          </div>
        </CardSection>

        {/* <CardSection title="Status da Transação">
          {invoice.timeline.map((item, index) => (
            <TimelineItem key={index} title={item.title} date={item.date} time={item.time} />
          ))}
        </CardSection> */}

        <CardSection title="Método de Pagamento">
          <div className="grid grid-cols-1 gap-2">
            <InfoItem label="Tipo" value="Cartão de Crédito" />
            <InfoItem label="Últimos Dígitos" value={invoice.card_last_digits} />
            {/* <InfoItem label="Titular" value={invoice.cardholder_name} /> */}
          </div>
        </CardSection>

        {/* <CardSection title="Dados Adicionais">
          <div className="grid grid-cols-1 gap-2">
            <InfoItem label="ID da Conta" value={invoice.additionalData.accountId} />
            <InfoItem label="IP do Cliente" value={invoice.additionalData.clientIp} />
            <InfoItem label="Dispositivo" value={invoice.additionalData.device} />
          </div>
        </CardSection> */}
      </div>
    </PageContainer>
  )
}
