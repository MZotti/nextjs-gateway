import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface HeaderProps {
  userName?: string
}

export async function logoutAction(){
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("apiKey");
  
  redirect("/login");
}

export async function Header({ userName = "usuário" }: HeaderProps) {

  const cookiesStore = await cookies()
  const isAuthPage = cookiesStore.get("apiKey")?.value !== undefined

  return (
    <header className="w-full bg-background py-4 px-6 flex justify-between items-center border-b border-border">
      <Link href="/dashboard" className="text-xl font-bold text-white">
        Full Cycle Gateway
      </Link>
      {
        isAuthPage && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Olá, {userName}</span>
            <form action={logoutAction}>
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <LogOut size={16} />
                Logout
              </Button>
            </form>
          </div>
        )
      }
    </header>
  )
}
