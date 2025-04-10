interface InfoItemProps {
  label: string
  value: string | number
  className?: string
}

export function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  )
}
