"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Award, Lock, Calendar, ExternalLink, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Certifications() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const certifications = [
    {
      id: 1,
      title: "CyberOps Associate Networking Academy",
      issuer: "Cisco",
      date: "Noviembre 2024",
      image: "https://images.credly.com/images/53f37f83-04a1-4935-9b1e-21a99cc6e1b2/CyberOpsAssoc.png",
      url: "https://www.credly.com/badges/075a9412-ef1b-4553-92c6-d7da71fe7b53",
      unlocked: true,
    },
    {
      id: 2,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      date: "Febrero 2025",
      image: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/twitter_thumb_201604_CCNAITN__1_.png",
      url: "https://www.credly.com/badges/0ecd8854-10a1-4b12-932c-cba431c63dc0",
      unlocked: true,
    },
    {
      id: 3,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Abril 2025",
      image: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png",
      url: "https://www.credly.com/badges/b28a31c4-1e5d-4b80-b858-f5a0d4384616",
      unlocked: true,
    },
    {
      id: 4,
      title: "Próxima Certificación",
      issuer: "Por Desbloquear",
      date: "Futuro",
      image: "/placeholder.svg?height=200&width=200",
      url: "#",
      unlocked: false,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % certifications.length)
      }, 4000)
    }
  }, [autoplay, certifications.length])

  useEffect(() => {
    startAutoplay()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplay, startAutoplay])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1))
    startAutoplay()
  }, [certifications.length, startAutoplay])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % certifications.length)
    startAutoplay()
  }, [certifications.length, startAutoplay])

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index)
    startAutoplay()
  }, [startAutoplay])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  const getPositionClass = (index: number) => {
    const diff = (index - activeIndex + certifications.length) % certifications.length
    if (diff === 0) return "active"
    if (diff === 1 || diff === certifications.length - 1) return "adjacent"
    return "distant"
  }

  return (
    <section id="certifications" className="py-20 bg-background relative overflow-hidden">
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br to-transparent",
        isDark 
          ? "from-gray-900/20 via-slate-900/10 dark:to-black" 
          : "from-blue-600/10 via-blue-500/5"
      )}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-blue-600">&lt;</span> Certificaciones <span className="text-blue-600">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desbloquea logros y mejora tus habilidades con cada nueva certificación.
          </p>
        </div>

        <div className="relative h-[500px] md:h-[600px]">
          {/* Trofeos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {certifications.map((cert, index) => {
                const isActive = getPositionClass(index) === "active"

                return (
                  <motion.div
                    key={cert.id}
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500 ${getPositionClass(
                      index,
                    )}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity:
                        getPositionClass(index) === "active" ? 1 : getPositionClass(index) === "adjacent" ? 0.5 : 0.2,
                      scale:
                        getPositionClass(index) === "active" ? 1 : getPositionClass(index) === "adjacent" ? 0.8 : 0.6,
                      x:
                        getPositionClass(index) === "active"
                          ? 0
                          : getPositionClass(index) === "adjacent" &&
                              (index - activeIndex + certifications.length) % certifications.length === 1
                            ? "30%"
                            : getPositionClass(index) === "adjacent"
                              ? "-30%"
                              : (index - activeIndex + certifications.length) % certifications.length >
                                  certifications.length / 2
                                ? "-50%"
                                : "50%",
                      zIndex:
                        getPositionClass(index) === "active" ? 30 : getPositionClass(index) === "adjacent" ? 20 : 10,
                      filter: getPositionClass(index) === "active" ? "brightness(1)" : "brightness(0.5)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`relative w-64 md:w-80 h-80 md:h-96 flex flex-col items-center justify-center rounded-lg p-6 ${
                        isActive ? "shadow-[0_0_25px_rgba(30,58,138,0.2)]" : ""
                      } ${
                        cert.unlocked
                          ? "bg-card border border-border/40"
                          : "bg-card/80 border border-border/30"
                      }`}
                    >
                      {/* Efecto de brillo para el activo */}
                      {isActive && cert.unlocked && (
                        <div className={cn(
                          "absolute inset-0 rounded-lg animate-pulse",
                          isDark ? "bg-gray-800/5" : "bg-blue-500/10"
                        )}></div>
                      )}

                      {/* Contenido del trofeo */}
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div
                          className={cn(
                            "w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden border-2",
                            cert.unlocked
                              ? (isDark ? "bg-gray-900 border-blue-800/20" : "bg-blue-50/50 border-blue-500/30")
                              : (isDark ? "bg-gray-800/50 border-gray-700/30" : "bg-gray-200/50 border-gray-400/30")
                          )}
                          style={{
                            boxSizing: 'border-box',
                          }}
                        >
                          {cert.unlocked ? (
                            <div className="relative w-5/6 h-5/6 flex items-center justify-center">
                              {/* Contenedor del tamaño adecuado para la insignia */}
                              <div 
                                className="w-full h-full relative flex items-center justify-center"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {/* Imagen */}
                                <img 
                                  src={cert.image} 
                                  alt={`${cert.title} badge`} 
                                  className="max-w-full max-h-full w-auto h-auto object-contain p-1"
                                  style={{ 
                                    display: 'block', 
                                    maxWidth: '100%', 
                                    maxHeight: '100%',
                                  }}
                                  loading="eager"
                                  onError={(e) => {
                                    // Fallback en caso de error al cargar la imagen
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg?height=100&width=100";
                                    target.onerror = null;
                                  }}
                                />
                              </div>
                              
                              {/* Efecto de brillo para insignias activas */}
                              {isActive && (
                                <motion.div
                                  className={cn(
                                    "absolute inset-0 flex items-center justify-center pointer-events-none",
                                    isDark ? "bg-blue-500/10" : "bg-blue-500/10"
                                  )}
                                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <div className={cn("w-full h-full rounded-full blur-sm", isDark ? "bg-blue-500/10" : "bg-blue-400/20")} />
                                </motion.div>
                              )}
                            </div>
                          ) : (
                            <div className="relative">
                              <Lock className={`h-16 w-16 ${isActive ? "text-gray-500" : "text-gray-700"}`} />
                              {isActive && (
                                <motion.div
                                  className={cn(
                                    "absolute inset-0 flex items-center justify-center pointer-events-none",
                                    isDark ? "bg-blue-500/10" : "bg-blue-500/10"
                                  )}
                                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <Lock className="h-16 w-16 text-gray-500 blur-sm" />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>

                        <h3
                          className={`text-xl font-bold mb-2 ${
                            cert.unlocked ? (isActive ? "text-white" : "text-gray-400") : "text-gray-500"
                          }`}
                        >
                          {cert.title}
                        </h3>

                        <div
                          className={`flex items-center justify-center mb-2 ${
                            cert.unlocked ? (isDark ? "text-blue-400" : "text-blue-500") : "text-muted-foreground"
                          }`}
                        >
                          <span>{cert.issuer}</span>
                        </div>

                        <div className="flex items-center justify-center text-muted-foreground mb-4">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{cert.date}</span>
                        </div>

                        {isActive && cert.unlocked && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "border-blue-700/40 text-blue-500",
                                isDark ? "hover:bg-gray-800/50" : "hover:bg-blue-500/10"
                              )}
                              asChild
                            >
                              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-2" />
                                Ver Certificado
                              </a>
                            </Button>
                          </motion.div>
                        )}

                        {isActive && !cert.unlocked && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-sm mt-2"
                          >
                            Próximamente...
                          </motion.div>
                        )}
                      </div>

                      {/* Efecto de partículas para el activo */}
                      {isActive && cert.unlocked && (
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                          <div className="absolute top-0 left-1/2 w-px h-10 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                          <div className="absolute bottom-0 left-1/2 w-px h-10 bg-gradient-to-t from-transparent via-primary/30 to-transparent"></div>
                          <div className="absolute top-1/2 left-0 h-px w-10 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>
                          <div className="absolute top-1/2 right-0 h-px w-10 bg-gradient-to-l from-transparent via-gray-400/30 to-transparent"></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Controles - Reorganizados para mejorar alineación */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4 z-50">
            {/* Botón de pausa/play arriba */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAutoplay(!autoplay)}
              className={cn(
                "rounded-full w-7 h-7 border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isDark
                  ? "bg-gray-800/70 border-gray-700/50 text-gray-300 hover:bg-gray-700/70 hover:text-white focus-visible:ring-blue-600 focus-visible:ring-offset-black"
                  : "bg-blue-500/10 border-blue-500/30 text-blue-700 hover:bg-blue-500/20 hover:text-blue-800 focus-visible:ring-blue-500 focus-visible:ring-offset-background",
                "mb-3 shadow-md relative",
                autoplay ? "overflow-visible" : ""
              )}
              aria-label={autoplay ? "Pausar reproducción automática" : "Activar reproducción automática"}
            >
              {autoplay && (
                <motion.div
                  className={cn("absolute inset-0 rounded-full border", isDark ? "border-blue-500/50" : "border-blue-500/70")}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {autoplay ? <Pause className="h-3.5 w-3.5 relative z-10" /> : <Play className="h-3.5 w-3.5 ml-0.5 relative z-10" />}
            </Button>
            
            {/* Controles de navegación y marcadores en una fila */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className={cn(
                  "rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isDark
                    ? "border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300 focus-visible:ring-blue-600 focus-visible:ring-offset-black"
                    : "border-blue-500/30 text-blue-700 hover:bg-blue-500/10 hover:text-blue-800 focus-visible:ring-blue-500 focus-visible:ring-offset-background"
                )}
                aria-label="Anterior certificación"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Anterior</span>
              </Button>
              
              <div className="flex items-center gap-2">
                {certifications.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={cn(
                      "w-2 h-2 rounded-full transition-all focus:outline-none",
                      index === activeIndex
                        ? (isDark ? "bg-blue-600 w-4" : "bg-blue-500 w-4")
                        : (isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-200 hover:bg-blue-300")
                    )}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Ir a certificación ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : "false"}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className={cn(
                  "rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isDark
                    ? "border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300 focus-visible:ring-blue-600 focus-visible:ring-offset-black"
                    : "border-blue-500/30 text-blue-700 hover:bg-blue-500/10 hover:text-blue-800 focus-visible:ring-blue-500 focus-visible:ring-offset-background"
                )}
                aria-label="Siguiente certificación"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Siguiente</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Texto de estilo videojuego */}
        <div className="text-center mt-8">
          <p className={cn(
            "text-sm uppercase tracking-wider font-mono",
            isDark ? "text-blue-500" : "text-blue-600"
            )}>
            {certifications[activeIndex].unlocked
              ? "Logro Desbloqueado"
              : "Completa más cursos para desbloquear este logro"}
          </p>
        </div>
      </div>
    </section>
  )
}
