"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])

  const projects = [
    {
      id: 1,
      title: "Phil App Salud Mental",
      description: "Phil es una app que combina tecnología e inteligencia emocional para ofrecer apoyo psicológico inmediato, recursos educativos y conexión con especialistas en salud mental.",
      image: "https://mis-fotos-portfolio.s3.us-east-2.amazonaws.com/1024x1024bb.png",
      category: "Mobile",
      technologies: ["Swift", "Express.js", "PostgreSQL", "AWS"],
      liveUrl: "https://apps.apple.com/mx/app/phil-dilo-en-se%C3%B1as/id6744261684",
    },
    {
      id: 2,
      title: "Cells QA",
      description: "Aplicación web para automatizar pruebas de código en entornos web, con funcionalidades de gestión de equipos y entornos. La plataforma incorpora capacidades de auto-healing que se adaptan automáticamente a cambios en los identificadores del código",
      image: "https://mis-fotos-portfolio.s3.us-east-2.amazonaws.com/cellsqa.png",
      category: "Web",
      technologies: ["React", "Express.JS", "MySQL", "Selenium"],
      githubUrl: "https://github.com/LuisFerP12/Cells-QA",
    },
    {
      id: 3,
      title: "Byzapp",
      description: "Sistema completo para administrar inventario con seguimiento en tiempo real.",
      image: "https://mis-fotos-portfolio.s3.us-east-2.amazonaws.com/logobyzap.png",
      category: "Web",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/LuisFerP12/byzapp",
    },
    {
      id: 4,
      title: "Portafolio Interactivo",
      description: "Portafolio personal con animaciones y experiencia interactiva.",
      image: "https://mis-fotos-portfolio.s3.us-east-2.amazonaws.com/sspagina.png",
      category: "Web",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript" ,"AWS"],
      githubUrl: "#",
      liveUrl: "http://localhost:3000/",
    },
  ]

  // Actualizar los proyectos filtrados cuando cambie el filtro
  useEffect(() => {
    const filtered =
      activeFilter === "Todos" ? projects : projects.filter((project) => project.category === activeFilter)

    setFilteredProjects(filtered)
  }, [activeFilter])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const filters = ["Todos", "Web", "Mobile"]

  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.05),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-indigo-600 dark:text-purple-400">&lt;</span> Proyectos{" "}
            <span className="text-indigo-600 dark:text-purple-400">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-purple-500 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora algunos de mis proyectos más destacados. Cada proyecto representa un desafío único y una oportunidad
            para aplicar diferentes tecnologías y soluciones.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`
                ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-none dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-white"
                    : "border-border text-foreground hover:bg-accent"
                }
              `}
            >
              {filter}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout>
                <Card className="bg-card border-border hover:border-accent-foreground transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full flex flex-wrap gap-2">
                        {/* Si no hay botones, mostrar un mensaje alternativo */}
                        {(!project.githubUrl || project.githubUrl === "#") && 
                         (!project.liveUrl || project.liveUrl === "#") && (
                          <span className="text-white/70 text-sm italic w-full text-center">
                            Proyecto en desarrollo
                          </span>
                        )}
                        
                        {/* Contenedor flexible para botones */}
                        <div className="flex justify-between w-full">
                          {/* Mostrar botón de Código solo si existe githubUrl y no es "#" */}
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                              asChild
                            >
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Código
                              </a>
                            </Button>
                          )}
                          
                          {/* Mostrar botón de Demo solo si existe liveUrl y no es "#" */}
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
                              asChild
                            >
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-2">
                      <Badge variant="outline" className="border-border text-foreground">
                        {project.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech: string, index: number) => {
                        // Asignar colores diferentes a cada tecnología
                        const colors = [
                          "text-blue-600 border-blue-500/30 dark:text-blue-300 dark:border-blue-500/30",
                          "text-indigo-600 border-indigo-500/30 dark:text-purple-300 dark:border-purple-500/30",
                          "text-sky-600 border-sky-500/30 dark:text-pink-300 dark:border-pink-500/30",
                          "text-amber-600 border-amber-500/30 dark:text-amber-300 dark:border-amber-500/30",
                          "text-emerald-600 border-emerald-500/30 dark:text-green-300 dark:border-green-500/30",
                          "text-cyan-600 border-cyan-500/30 dark:text-cyan-300 dark:border-cyan-500/30",
                        ]
                        const colorClass = colors[index % colors.length]

                        return (
                          <span key={index} className={`text-xs bg-card/80 px-2 py-1 rounded border ${colorClass}`}>
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
