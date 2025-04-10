export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-4 px-6 text-center text-sm text-gray-400 bg-background">
      © {currentYear} Full Cycle Gateway. Todos os direitos reservados.
    </footer>
  )
}
