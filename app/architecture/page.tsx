"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Cloud,
  Server,
  Database,
  Shield,
  Code,
  Settings,
  BookOpen,
  Terminal,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

function NavbarOrange() {
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

  const homeSubmenuItems = [
    { name: "Sobre Mí", href: "/#about" },
    { name: "Proyectos", href: "/#projects" },
    { name: "Experiencia", href: "/#experience" },
    { name: "Certificaciones", href: "/#certifications" },
    { name: "Contacto", href: "/#contact" },
  ]

  const mainNavItems = [
    { name: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Terminal", href: "/terminal", icon: <Terminal className="h-4 w-4 mr-2" /> },
    {
      name: "Arquitectura",
      href: "/architecture",
      icon: <Database className="h-4 w-4 mr-2 text-orange-500 dark:text-orange-400" />,
    },
  ]

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-orange-500/20 dark:border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px:8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-orange-500 dark:text-orange-400 font-bold text-xl">
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
                  className="text-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 px-3 py-2 text-sm font-medium flex items-center h-8"
                >
                  Inicio
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showHomeSubmenu ? "rotate-180" : ""}`} />
                </button>

                {/* Submenú desplegable */}
                <div
                  className={cn(
                    "absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-card border border-orange-500/20 dark:border-orange-500/20 transition-all duration-200 ease-in-out",
                    showHomeSubmenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                  )}
                >
                  <div className="py-1">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-foreground hover:text-orange-500 dark:hover:text-orange-400 hover:bg-accent"
                      onClick={() => setShowHomeSubmenu(false)}
                    >
                      Página Principal
                    </Link>
                    {homeSubmenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-orange-500 dark:hover:text-orange-400 hover:bg-accent"
                        onClick={() => setShowHomeSubmenu(false)}
                      >
                        {item.name}
                      </Link>
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
                    "text-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 px-3 py-2 text-sm font-medium flex items-center h-8",
                    item.icon && "flex items-center",
                    item.name === "Arquitectura" && "text-orange-500 dark:text-orange-400",
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
              className="ml-2 text-foreground hover:text-orange-500 dark:hover:text-orange-400"
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/90 backdrop-blur-md border-b border-orange-500/20 dark:border-orange-500/20">
          {/* Menú móvil - Inicio con submenú */}
          <div>
            <button
              onClick={toggleHomeSubmenu}
              className="w-full text-left text-foreground hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 text-base font-medium flex items-center justify-between"
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
                className="block px-3 py-2 text-sm text-foreground hover:text-orange-500 dark:hover:text-orange-400"
                onClick={() => {
                  setIsOpen(false)
                  setShowHomeSubmenu(false)
                }}
              >
                Página Principal
              </Link>
              {homeSubmenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-foreground hover:text-orange-500 dark:hover:text-orange-400"
                  onClick={() => {
                    setIsOpen(false)
                    setShowHomeSubmenu(false)
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Enlaces principales móvil */}
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-foreground hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 text-base font-medium",
                item.icon && "flex items-center",
                item.name === "Arquitectura" && "text-orange-500 dark:text-orange-400",
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

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const architectureComponents = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <Code className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "La interfaz de usuario está construida con Next.js y desplegada como un sitio estático en Amazon S3. Utiliza Tailwind CSS para estilos y Framer Motion para animaciones.",
      services: [
        {
          name: "Amazon S3",
          description: "Alojamiento del sitio estático construido con Next.js (exportado como HTML/CSS/JS)",
        },
        {
          name: "CloudFront",
          description: "CDN para distribución global con baja latencia y certificado SSL",
        },
        {
          name: "Route 53",
          description: "Gestión de DNS para el dominio personalizado",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      icon: <Server className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "Arquitectura serverless basada en AWS Lambda y API Gateway para manejar las funcionalidades dinámicas como el formulario de contacto y la gestión del blog.",
      services: [
        {
          name: "API Gateway",
          description: "Endpoints RESTful para funcionalidades dinámicas",
        },
        {
          name: "Lambda",
          description: "Funciones serverless para lógica de negocio (contacto, blog, etc.)",
        },
        {
          name: "SES",
          description: "Servicio de email para notificaciones y formulario de contacto",
        },
      ],
    },
    {
      id: "database",
      title: "Base de Datos",
      icon: <Database className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "DynamoDB como base de datos NoSQL para almacenar información de proyectos, mensajes de contacto y entradas del blog, con alta disponibilidad y escalabilidad automática.",
      services: [
        {
          name: "DynamoDB",
          description: "Base de datos NoSQL para almacenar mensajes, proyectos y contenido del blog",
        },
        {
          name: "S3 (Almacenamiento)",
          description: "Almacenamiento de archivos estáticos como imágenes y documentos",
        },
      ],
    },
    {
      id: "security",
      title: "Seguridad",
      icon: <Shield className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "Implementación de múltiples capas de seguridad para proteger la aplicación contra amenazas comunes y garantizar la privacidad de los datos.",
      services: [
        {
          name: "WAF",
          description: "Protección contra ataques web",
        },
        {
          name: "IAM",
          description: "Gestión de permisos y roles",
        },
        {
          name: "CloudTrail",
          description: "Registro de actividad y auditoría",
        },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      icon: <Settings className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "Pipeline de CI/CD automatizado para pruebas y despliegue continuo, garantizando calidad y rapidez en las actualizaciones del sitio.",
      services: [
        {
          name: "CodePipeline",
          description: "Automatización del despliegue",
        },
        {
          name: "CodeBuild",
          description: "Construcción y pruebas automatizadas",
        },
        {
          name: "GitHub Actions",
          description: "Integración con repositorio de código",
        },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoreo",
      icon: <Cloud className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
      description:
        "Monitoreo en tiempo real del rendimiento y disponibilidad del sitio, con alertas automáticas para responder rápidamente a cualquier incidencia.",
      services: [
        {
          name: "CloudWatch",
          description: "Monitoreo y alertas",
        },
        {
          name: "X-Ray",
          description: "Análisis y depuración de aplicaciones",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarOrange />
      <div className="flex-grow py-20 bg-background relative">
        {/* Fondo único para la página de arquitectura */}
        <div className="absolute inset-0 bg-gradient-to-br dark:from-orange-900/10 dark:via-amber-900/5 dark:to-black from-orange-100/10 via-amber-100/5 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-orange-500 dark:text-orange-400">&lt;</span> Arquitectura AWS{" "}
              <span className="text-orange-500 dark:text-orange-400">/&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Este portafolio está implementado en AWS utilizando una arquitectura moderna y escalable. Explora los
              diferentes componentes y servicios utilizados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList className="bg-background/50 border border-orange-500/30">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400"
                  >
                    Vista General
                  </TabsTrigger>
                  {architectureComponents.map((component) => (
                    <TabsTrigger
                      key={component.id}
                      value={component.id}
                      className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400"
                    >
                      {component.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-4">Diagrama de Arquitectura</h3>
                        <div className="border border-orange-900/50 p-4 rounded-md">
                          <pre className="text-xs text-orange-500 dark:text-orange-400 overflow-x-auto">
                            {`
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         CloudFront Distribution                         │
│                                                                         │
└───────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                               S3 Bucket                                 │
│                         (Static Web Hosting)                            │
│                                                                         │
└───────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                              API Gateway                                │
│                                                                         │
└───────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                            Lambda Functions                             │
│                                                                         │
└───────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                             DynamoDB Tables                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
`}
                          </pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {architectureComponents.map((component) => (
                          <motion.div
                            key={component.id}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer"
                            onClick={() => setActiveTab(component.id)}
                          >
                            <Card className="bg-card/50 border border-orange-500/30 hover:border-orange-500 h-full">
                              <CardContent className="p-4 flex flex-col items-center text-center">
                                <div className="mb-4 p-3 rounded-full bg-card/80 border border-orange-500/20">
                                  {component.icon}
                                </div>
                                <h4 className="text-foreground font-medium mb-2">{component.title}</h4>
                                <p className="text-muted-foreground text-sm">
                                  {component.description.substring(0, 100)}...
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 border border-orange-900/50 rounded-md bg-card/50">
                        <h4 className="text-orange-500 dark:text-orange-400 font-medium mb-2">
                          Beneficios de esta arquitectura:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Alta disponibilidad y escalabilidad automática</li>
                          <li>Bajo costo de mantenimiento (pago por uso)</li>
                          <li>Seguridad integrada en múltiples capas</li>
                          <li>Despliegue automatizado y continuo</li>
                          <li>Rendimiento global optimizado con CDN</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {architectureComponents.map((component) => (
                <TabsContent key={component.id} value={component.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-card border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="p-3 rounded-full bg-card/80 border border-orange-500/20">
                            {component.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{component.title}</h3>
                            <p className="text-muted-foreground">{component.description}</p>
                          </div>
                        </div>

                        <div className="space-y-4 mt-6">
                          <h4 className="text-orange-500 dark:text-orange-400 font-medium">
                            Servicios AWS utilizados:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {component.services.map((service, index) => (
                              <div key={index} className="border border-orange-900/50 p-4 rounded-md">
                                <h5 className="text-foreground font-medium mb-2">{service.name}</h5>
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 p-4 border border-orange-900/50 rounded-md bg-card/50">
                          <h4 className="text-orange-500 dark:text-orange-400 font-medium mb-2">Implementación:</h4>
                          <p className="text-muted-foreground mb-4">
                            Este componente se implementa utilizando Infrastructure as Code (IaC) con AWS CloudFormation
                            y Terraform, lo que permite una gestión consistente y reproducible de la infraestructura.
                          </p>
                          <div className="bg-card/80 p-3 rounded-md">
                            <pre className="text-xs text-orange-400 overflow-x-auto">
                              {`# Ejemplo de código Terraform para ${component.title}
resource "aws_${component.id.toLowerCase()}_example" {
  name        = "portfolio-${component.id.toLowerCase()}"
  description = "${component.title} para el portafolio"
  
  # Configuración específica del servicio
  # ...
  
  tags = {
    Environment = "production"
    Project     = "portfolio"
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
      <footer className="bg-background border-t border-orange-500/20 dark:border-orange-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-orange-500 dark:text-orange-400 font-bold text-xl">
                PORTFOLIO<span className="text-foreground">.TECH</span>
              </span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Todos los derechos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
