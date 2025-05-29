export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold text-xl">
              PORTFOLIO<span className="text-foreground">.TECH</span>
            </span>
          </div>
          <div className="text-muted-foreground text-sm">&copy; {currentYear} Todos los derechos reservados</div>
        </div>
      </div>
    </footer>
  )
}
