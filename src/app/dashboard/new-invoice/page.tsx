
import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import InvoiceForm from "./InvoiceForm"

export default function NewInvoicePage() {
  return (
    <PageContainer>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Criar Nova Fatura</CardTitle>
          <CardDescription>Preencha os dados abaixo para processar um novo pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceForm />
        </CardContent>
      </Card>
    </PageContainer>
  )
}
