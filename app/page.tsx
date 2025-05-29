"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Certifications } from "@/components/certifications"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ExperienceSection } from "@/components/experience-section"

export default function Home() {
  // Referencia para las animaciones
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Efecto para animaciones al hacer scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll")

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-active")
          // Opcional: dejar de observar después de animar
          // observer.unobserve(entry.target)
        } else {
          // Opcional: quitar la clase si sale del viewport
          // entry.target.classList.remove('animate-active')
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersect, options)

    animatedElements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Modificar la función Home para usar una paleta de colores más variada
  // Actualizar las clases de fondo y efectos para reducir el verde neón

  // Cambiar el efecto de partículas para usar colores más variados
  useEffect(() => {
    const initParticles = () => {
      const particleContainer = document.getElementById("particles-container")
      if (!particleContainer) return

      const particleCount = 50
      // Usar una paleta de colores más variada
      const colors = ["#22c55e", "#3b82f6", "#ec4899", "#f59e0b", "#8b5cf6"]

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Posición aleatoria
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Tamaño aleatorio
        const size = Math.random() * 5 + 1

        // Velocidad aleatoria
        const speedX = (Math.random() - 0.5) * 0.2
        const speedY = (Math.random() - 0.5) * 0.2

        // Color aleatorio de la paleta
        const color = colors[Math.floor(Math.random() * colors.length)]

        // Aplicar estilos
        particle.style.position = "absolute"
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.backgroundColor = color
        particle.style.borderRadius = "50%"
        particle.style.opacity = (Math.random() * 0.5 + 0.3).toString()

        // Guardar velocidad como atributos de datos
        particle.dataset.speedX = speedX.toString()
        particle.dataset.speedY = speedY.toString()

        particleContainer.appendChild(particle)
      }

      // Animar partículas
      const animateParticles = () => {
        const particles = document.querySelectorAll(".particle")

        particles.forEach((p) => {
          const element = p as HTMLElement
          const rect = particleContainer.getBoundingClientRect()

          // Obtener posición actual
          let posX = Number.parseFloat(element.style.left)
          let posY = Number.parseFloat(element.style.top)

          // Obtener velocidad
          const speedX = Number.parseFloat(element.dataset.speedX || "0")
          const speedY = Number.parseFloat(element.dataset.speedY || "0")

          // Actualizar posición
          posX += speedX
          posY += speedY

          // Comprobar límites
          if (posX > 100) posX = 0
          if (posX < 0) posX = 100
          if (posY > 100) posY = 0
          if (posY < 0) posY = 100

          // Aplicar nueva posición
          element.style.left = `${posX}%`
          element.style.top = `${posY}%`
        })

        requestAnimationFrame(animateParticles)
      }

      animateParticles()
    }

    initParticles()

    return () => {
      const container = document.getElementById("particles-container")
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Contenedor de partículas */}
      <div id="particles-container" className="fixed inset-0 pointer-events-none z-0" aria-hidden="true"></div>

      <main>
        <Hero />

        <div id="about" className="animate-on-scroll fade-up">
          <About />
        </div>

        <div id="projects" className="animate-on-scroll fade-in-right">
          <Projects />
        </div>

        <div id="experience" className="animate-on-scroll fade-in-left">
          <ExperienceSection />
        </div>

        <div id="certifications" className="animate-on-scroll zoom-in">
          <Certifications />
        </div>

        <div id="blog-section" className="animate-on-scroll fade-up">
          <Blog />
        </div>

        <div id="contact" className="animate-on-scroll fade-in">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
