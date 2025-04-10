import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthForm from "./AuthForm"

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Autenticação Gateway</CardTitle>
            <CardDescription>Insira sua API Key para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
