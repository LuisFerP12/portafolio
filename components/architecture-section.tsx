"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cloud, Server, Database, Shield, Code, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState("overview")

  const architectureComponents = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <Code className="h-6 w-6 text-orange-500" />,
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
      icon: <Server className="h-6 w-6 text-orange-500" />,
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
      icon: <Database className="h-6 w-6 text-orange-500" />,
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
      icon: <Shield className="h-6 w-6 text-orange-500" />,
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
      icon: <Settings className="h-6 w-6 text-orange-500" />,
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
      icon: <Cloud className="h-6 w-6 text-orange-500" />,
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
    <section id="architecture" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,165,0,0.1),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="text-orange-500">&lt;</span> Arquitectura AWS{" "}
            <span className="text-orange-500">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Este portafolio está implementado en AWS utilizando una arquitectura moderna y escalable. Explora los
            diferentes componentes y servicios utilizados.
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-orange-500/30">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
              >
                Vista General
              </TabsTrigger>
              {architectureComponents.map((component) => (
                <TabsTrigger
                  key={component.id}
                  value={component.id}
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
                >
                  {component.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-black/80 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Diagrama de Arquitectura</h3>
                    <div className="border border-orange-900/50 p-4 rounded-md">
                      <pre className="text-xs text-orange-400 overflow-x-auto">
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
                        <Card className="bg-black/50 border border-orange-500/30 hover:border-orange-500 h-full">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-black/80 border border-orange-500/20">
                              {component.icon}
                            </div>
                            <h4 className="text-white font-medium mb-2">{component.title}</h4>
                            <p className="text-gray-400 text-sm">{component.description.substring(0, 100)}...</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 border border-orange-900/50 rounded-md bg-black/50">
                    <h4 className="text-orange-500 font-medium mb-2">Beneficios de esta arquitectura:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-black/80 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:shadow-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-full bg-black/80 border border-orange-500/20">{component.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{component.title}</h3>
                        <p className="text-gray-300">{component.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h4 className="text-orange-500 font-medium">Servicios AWS utilizados:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {component.services.map((service, index) => (
                          <div key={index} className="border border-orange-900/50 p-4 rounded-md">
                            <h5 className="text-white font-medium mb-2">{service.name}</h5>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 p-4 border border-orange-900/50 rounded-md bg-black/50">
                      <h4 className="text-orange-500 font-medium mb-2">Implementación:</h4>
                      <p className="text-gray-300 mb-4">
                        Este componente se implementa utilizando Infrastructure as Code (IaC) con AWS CloudFormation y
                        Terraform, lo que permite una gestión consistente y reproducible de la infraestructura.
                      </p>
                      <div className="bg-black/80 p-3 rounded-md">
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
      </div>
    </section>
  )
}
