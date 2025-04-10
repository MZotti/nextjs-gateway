import { cn } from "@/lib/utils"

type StatusType = "approved" | "pending" | "rejected"

interface StatusBadgeProps {
  status: StatusType
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "approved":
        return {
          label: "Aprovado",
          className: "bg-[#1a4731] text-[#4ade80] border-[#2f6e4a]",
        }
      case "pending":
        return {
          label: "Pendente",
          className: "bg-[#422006] text-[#fbbf24] border-[#6f4a1f]",
        }
      case "rejected":
        return {
          label: "Rejeitado",
          className: "bg-[#4c0519] text-[#f43f5e] border-[#6e1a2f]",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", config.className)}>{config.label}</span>
  )
}
