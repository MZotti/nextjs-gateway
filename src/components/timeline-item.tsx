import { CheckCircle } from "lucide-react"

interface TimelineItemProps {
  title: string
  date: string
  time: string
}

export function TimelineItem({ title, date, time }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="mt-1 bg-approved rounded-full p-1">
        <CheckCircle size={16} className="text-primary" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">
          {date} {time}
        </p>
      </div>
    </div>
  )
}
