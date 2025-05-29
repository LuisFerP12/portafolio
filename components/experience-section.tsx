"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      position: "Practicante de Transformación Digital ",
      company: "Arca Continental",
      period: " Septiembre 2024 - Mayo 2025",
      description:
        "Apoyé en la automatización de procesos operativos, contribuyendo a la eficiencia y digitalización de flujos internos.",
      achievements: [
        "Implementé soluciones automatizadas con Python para optimizar y agilizar diversas tareas operativas, reduciendo significativamente el tiempo de ejecución",
        "Utilicé Alteryx para diseñar y generar reportes automatizados mediante consultas.",
        "Desarrollé aplicaciones con Power Apps y diseñé flujos de trabajo con Power Automate para automatizar y digitalizar distintos procesos de negocio.",
      ],
      color: "sky",
    },
    {
      position: "Desarrollador Full Stack (Medio Tiempo)",
      company: "Dilo en Señas",
      period: "Junio 2024 - Abril 2025",
      description:
        "Diseñé y desarrollé una app iOS centrada en salud mental, integrando IA, cifrado de datos y despliegue en la nube, con enfoque en seguridad, usabilidad y cumplimiento normativo.",
      achievements: [
        "Desarrollé la app \"Phil\" en Swift, publicada en la App Store utilizando SwiftUI.",
        "Implementé autenticación JWT y cifrado AES-256, asegurando el cumplimiento de estándares HIPAA y GDPR.",
        "Construí un chatbot utilizando APIs de OpenAI y un modelo de reconocimiento de emociones entrenado con TensorFlow y Keras, integrado en iOS mediante CoreML.",
        "Configuré y desplegué una instancia EC2 en AWS con salida HTTPS y acceso SSH, alojando un sitio web y una API en contenedores Docker separados."
      ],
      color: "blue",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case "sky":
        return {
          border: "border-sky-500/30 hover:border-sky-500",
          shadow: "hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]",
          icon: "text-sky-500",
          iconBorder: "border-sky-500/20",
          text: "text-sky-500",
          point: "bg-sky-500",
          calendar: "text-sky-500",
          date: "text-sky-400",
          award: "text-sky-400",
        }
      case "blue":
        return {
          border: "border-blue-500/30 hover:border-blue-500",
          shadow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
          icon: "text-blue-500",
          iconBorder: "border-blue-500/20",
          text: "text-blue-500",
          point: "bg-blue-500",
          calendar: "text-blue-500",
          date: "text-blue-400",
          award: "text-blue-400",
        }
      case "cyan":
        return {
          border: "border-cyan-500/30 hover:border-cyan-500",
          shadow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]",
          icon: "text-cyan-500",
          iconBorder: "border-cyan-500/20",
          text: "text-cyan-500",
          point: "bg-cyan-500",
          calendar: "text-cyan-500",
          date: "text-cyan-400",
          award: "text-cyan-400",
        }
      default:
        return {
          border: "border-sky-500/30 hover:border-sky-500",
          shadow: "hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]",
          icon: "text-sky-500",
          iconBorder: "border-sky-500/20",
          text: "text-sky-500",
          point: "bg-sky-500",
          calendar: "text-sky-500",
          date: "text-sky-400",
          award: "text-sky-400",
        }
    }
  }

  return (
    <section id="experience" className="py-20 bg-background/95 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/15 via-blue-900/10 to-transparent dark:to-black"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-sky-500">&lt;</span> Experiencia <span className="text-sky-500">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria profesional y los proyectos en los que he trabajado a lo largo de mi carrera.
          </p>
        </div>

        <div className="relative">
          {/* Línea de tiempo vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-sky-500/30 via-blue-500/30 to-cyan-500/30 hidden md:block"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => {
              const colors = getColorClasses(exp.color)
              return (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <div
                    className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
                  >
                    {/* Punto en la línea de tiempo */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${colors.point} border-4 border-background hidden md:block`}
                    ></div>

                    {/* Fecha */}
                    <div
                      className={`md:w-1/2 mb-4 md:mb-0 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          index % 2 === 0 ? "md:flex-row-reverse md:justify-start" : "md:flex-row"
                        } ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"} gap-2 md:px-2`}
                      >
                        <Calendar className={`h-5 w-5 ${colors.calendar} flex-shrink-0`} />
                        <span className={`${colors.date} font-mono whitespace-nowrap`}>{exp.period}</span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <Card
                      className={`md:w-1/2 bg-card/80 border ${colors.border} transition-all duration-300 ${colors.shadow}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full bg-background/80 border ${colors.iconBorder}`}>
                            <Briefcase className={`h-6 w-6 ${colors.icon}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{exp.position}</h3>
                            <p className={`${colors.text} mb-4`}>{exp.company}</p>
                            <p className="text-muted-foreground mb-4">{exp.description}</p>
                            <div>
                              <h4 className="flex items-center text-foreground font-medium mb-2">
                                <Award className={`h-4 w-4 ${colors.award} mr-2`} />
                                Logros
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-muted-foreground">
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
