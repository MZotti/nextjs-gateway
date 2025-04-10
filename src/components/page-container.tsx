import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-6 flex justify-center">
        <div className="w-full max-w-7xl">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
