"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Terminal, Database, BookOpen, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false)
  const homeMenuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleHomeSubmenu = () => {
    setShowHomeSubmenu(!showHomeSubmenu)
  }

  // Cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (homeMenuRef.current && !homeMenuRef.current.contains(event.target as Node)) {
        setShowHomeSubmenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Función para manejar la navegación a secciones específicas
  const navigateToSection = (sectionId: string) => {
    setIsOpen(false)
    setShowHomeSubmenu(false)

    // Si estamos en la página de inicio, hacemos scroll a la sección
    if (pathname === "/") {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si estamos en otra página, navegamos a la página de inicio con el hash
      router.push(`/#${sectionId}`)
    }
  }

  const homeSubmenuItems = [
    { name: "Sobre Mí", id: "about" },
    { name: "Proyectos", id: "projects" },
    { name: "Experiencia", id: "experience" },
    { name: "Certificaciones", id: "certifications" },
    { name: "Contacto", id: "contact" },
  ]

  const mainNavItems = [
    { name: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Terminal", href: "/terminal", icon: <Terminal className="h-4 w-4 mr-2" /> },
    { name: "Arquitectura", href: "/architecture", icon: <Database className="h-4 w-4 mr-2" /> },
  ]

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-indigo-600 dark:text-teal-400 font-bold text-xl">
                PORTFOLIO<span className="text-foreground">.TECH</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-4">
              {/* Menú desplegable de Inicio */}
              <div className="relative" ref={homeMenuRef}>
                <button
                  onClick={toggleHomeSubmenu}
                  className="text-foreground hover:text-indigo-600 dark:hover:text-teal-400 transition-colors duration-300 px-3 py-2 text-sm font-medium flex items-center h-8"
                >
                  Inicio
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showHomeSubmenu ? "rotate-180" : ""}`} />
                </button>

                {/* Submenú desplegable */}
                <div
                  className={cn(
                    "absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-card border border-border transition-all duration-200 ease-in-out",
                    showHomeSubmenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                  )}
                >
                  <div className="py-1">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-foreground hover:text-indigo-600 dark:hover:text-teal-400 hover:bg-accent"
                      onClick={() => {
                        setShowHomeSubmenu(false)
                        setIsOpen(false)
                      }}
                    >
                      Página Principal
                    </Link>
                    {homeSubmenuItems.map((item) => (
                      <button
                        key={item.name}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:text-indigo-600 dark:hover:text-teal-400 hover:bg-accent"
                        onClick={() => navigateToSection(item.id)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enlaces principales */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-foreground hover:text-indigo-600 dark:hover:text-teal-400 transition-colors duration-300 px-3 py-2 text-sm font-medium flex items-center h-8",
                    item.icon && "flex items-center",
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Botón de cambio de tema */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="ml-2 text-foreground hover:text-indigo-600 dark:hover:text-teal-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/90 backdrop-blur-md border-b border-border">
          {/* Menú móvil - Inicio con submenú */}
          <div>
            <button
              onClick={toggleHomeSubmenu}
              className="w-full text-left text-foreground hover:text-indigo-600 dark:hover:text-teal-400 block px-3 py-2 text-base font-medium flex items-center justify-between"
            >
              <span>Inicio</span>
              <ChevronRight className={`h-4 w-4 transition-transform ${showHomeSubmenu ? "rotate-90" : ""}`} />
            </button>

            {/* Submenú móvil */}
            <div
              className={cn(
                "pl-4 space-y-1 transition-all duration-200",
                showHomeSubmenu ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0 overflow-hidden",
              )}
            >
              <Link
                href="/"
                className="block px-3 py-2 text-sm text-foreground hover:text-indigo-600 dark:hover:text-teal-400"
                onClick={() => {
                  setIsOpen(false)
                  setShowHomeSubmenu(false)
                }}
              >
                Página Principal
              </Link>
              {homeSubmenuItems.map((item) => (
                <button
                  key={item.name}
                  className="block w-full text-left px-3 py-2 text-sm text-foreground hover:text-indigo-600 dark:hover:text-teal-400"
                  onClick={() => navigateToSection(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Enlaces principales móvil */}
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-foreground hover:text-indigo-600 dark:hover:text-teal-400 block px-3 py-2 text-base font-medium",
                item.icon && "flex items-center",
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
