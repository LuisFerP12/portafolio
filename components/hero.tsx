"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 10)
      // Usar una paleta de colores más variada
      const colors = [
        "rgba(34, 197, 94, 0.6)", // verde
        "rgba(59, 130, 246, 0.6)", // azul
        "rgba(236, 72, 153, 0.6)", // rosa
        "rgba(245, 158, 11, 0.6)", // ámbar
        "rgba(139, 92, 246, 0.6)", // púrpura
      ]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect particles
        particles.forEach((particle2, index2) => {
          if (index !== index2) {
            const dx = particle.x - particle2.x
            const dy = particle.y - particle2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              // Usar un color que combine con ambas partículas
              // Use HSL value from theme's border color for particle lines
              const themeBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
              ctx.strokeStyle = `hsla(${themeBorderColor}, ${0.1 - distance / 1000})`
              ctx.lineWidth = 0.2
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particle2.x, particle2.y)
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.length = 0
      createParticles()
    }

    createParticles()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Actualizar el botón principal para usar un estilo más sutil
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none mb-4">
          <span className="block text-foreground">Bienvenido a mi</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mt-2 pb-2 leading-[1.15]">
            Portafolio Digital
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Desarrollador apasionado por crear soluciones tecnológicas innovadoras y experiencias digitales únicas.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-primary-foreground border-none"
            asChild
          >
            <a href="#projects">Ver Proyectos</a>
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted/10" asChild>
            <a href="#contact">Contactar</a>
          </Button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-foreground" />
        </div>
      </div>
    </section>
  )
}
