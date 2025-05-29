"use client"

import { motion } from "framer-motion"
import { Code, Cloud, Database, Globe, Shield, Terminal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  const skills = [
    { name: "Desarrollo Web", icon: <Globe className="h-6 w-6 text-blue-500" /> },
    { name: "Programación", icon: <Code className="h-6 w-6 text-purple-500" /> },
    { name: "Bases de Datos", icon: <Database className="h-6 w-6 text-amber-500" /> },
    { name: "DevOps", icon: <Terminal className="h-6 w-6 text-pink-500" /> },
    { name: "Cloud", icon: <Cloud className="h-6 w-6 text-green-500" /> },
    { name: "Ciberseguridad", icon: <Shield className="h-6 w-6 text-cyan-500" /> },
  ]

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

  return (
    <section id="about" className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent dark:to-black"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-blue-500">&lt;</span> Sobre Mí <span className="text-blue-500">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
            Soy un desarrollador con una fuerte curiosidad por cómo la tecnología puede mejorar la vida de las personas. Me interesa construir productos que no solo funcionen bien, sino que también aporten valor real a quienes los usan. Disfruto transformar ideas complejas en soluciones simples, usables y con propósito.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
            Me motiva explorar nuevas formas de automatizar procesos, resolver problemas con creatividad y entender a fondo las necesidades de los usuarios. Para mí, el desarrollo no se trata solo de código, sino de impacto. Siempre estoy en busca de nuevos retos que me permitan crecer, aprender y aportar en entornos colaborativos.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Mi enfoque se centra en el aprendizaje continuo y la adaptación a nuevas tecnologías para mantenerme a la
              vanguardia en un campo en constante evolución.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-background/80 border border-border">{skill.icon}</div>
                    <h3 className="text-foreground font-medium">{skill.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
