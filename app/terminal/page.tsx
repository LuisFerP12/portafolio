"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavbarTerminal } from "@/components/navbar-terminal"
import { motion } from "framer-motion"

type CommandResult = {
  id: number
  command: string
  output: React.ReactNode
}

export default function TerminalPage() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [results, setResults] = useState<CommandResult[]>([
    {
      id: 0,
      command: "",
      output: (
        <div className="text-green-500">
          <p className="mb-2">
            Bienvenido a la Terminal. Escribe <span className="text-green-400 font-bold">help</span> para ver los
            comandos disponibles.
          </p>
          <pre className="text-xs text-green-600 mb-4 overflow-x-auto">
            {`
 _______  _______  ______    _______  _______  _______  _______  ___      ___   _______ 
|       ||       ||    _ |  |       ||   _   ||       ||       ||   |    |   | |       |
|    _  ||   _   ||   | ||  |_     _||  | |  ||   ____||   _   ||   |    |   | |   _   |
|   |_| ||  | |  ||   |_||_   |   |  |  |_|  ||  |____ |  | |  ||   |    |   | |  | |  |
|    ___||  |_|  ||    __  |  |   |  |   _   ||       ||  |_|  ||   |___ |   | |  |_|  |
|   |    |       ||   |  | |  |   |  |  | |  ||   ____||       ||       ||   | |       |
|___|    |_______||___|  |_|  |___|  |__| |__||__|     |_______||_______||___| |_______|


                                                                               
`}
          </pre>
        </div>
      ),
    },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight
    }
  }, [results])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setInput("")
      setHistoryIndex(-1)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory("up")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory("down")
    } else if (e.key === "Tab") {
      e.preventDefault()
      autocompleteCommand()
    }
  }

  const navigateHistory = (direction: "up" | "down") => {
    if (commandHistory.length === 0) return

    if (direction === "up") {
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
      setHistoryIndex(newIndex)
      setInput(commandHistory[newIndex] || "")
    } else {
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1
      setHistoryIndex(newIndex)
      setInput(newIndex === -1 ? "" : commandHistory[newIndex] || "")
    }
  }

  const autocompleteCommand = () => {
    const commands = [
      "help",
      "about",
      "projects",
      "skills",
      "contact",
      "clear",
      "certifications",
      "social",
      "experience",
      "education",
      "hobbies"
    ]

    if (input) {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input.toLowerCase()))
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      } else if (matchingCommands.length > 1) {
        addResult({
          command: input,
          output: (
            <div>
              <p className="text-green-400 mb-1">Autocompletado disponible:</p>
              <div className="flex flex-wrap gap-2">
                {matchingCommands.map((cmd, i) => (
                  <span key={i} className="text-green-500">
                    {cmd}
                  </span>
                ))}
              </div>
            </div>
          ),
        })
      }
    }
  }

  const addResult = ({ command, output }: { command: string; output: React.ReactNode }) => {
    if (command.trim()) {
      setCommandHistory((prev) => [command, ...prev])
    }

    setResults((prev) => [
      ...prev,
      {
        id: prev.length,
        command,
        output,
      },
    ])
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const primaryCommand = args[0]

    switch (primaryCommand) {
      case "help":
        showHelp()
        break
      case "about":
        showAbout()
        break
      case "projects":
        showProjects()
        break
      case "project":
        if (args[1] && !isNaN(Number.parseInt(args[1]))) {
          showProjectDetails(Number.parseInt(args[1]))
        } else {
          addResult({
            command,
            output: <p className="text-red-400">Error: Uso correcto: project [id]</p>,
          })
        }
        break
      case "skills":
        showSkills()
        break
      case "certifications":
        showCertifications()
        break

      case "contact":
        showContact()
        break
      case "social":
        showSocial()
        break
      case "experience":
        showExperience()
        break
      case "education":
        showEducation()
        break
      case "hobbies":
        showHobbies()
        break

      case "clear":
        clearTerminal()
        break
      default:
        addResult({
          command,
          output: (
            <p className="text-red-400">
              Comando no reconocido: {command}. Escribe <span className="text-green-400">help</span> para ver los
              comandos disponibles.
            </p>
          ),
        })
    }
  }

  const showHelp = () => {
    addResult({
      command: "help",
      output: (
        <div className="space-y-2">
          <p className="text-green-400 font-bold">Comandos disponibles:</p>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-green-500 pr-4 font-mono">help</td>
                <td className="text-gray-400">Muestra esta lista de comandos</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">about</td>
                <td className="text-gray-400">Información sobre mí</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">projects</td>
                <td className="text-gray-400">Lista de proyectos</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">project [id]</td>
                <td className="text-gray-400">Detalles de un proyecto específico</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">skills</td>
                <td className="text-gray-400">Mis habilidades técnicas</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">certifications</td>
                <td className="text-gray-400">Mis certificaciones</td>
              </tr>

              <tr>
                <td className="text-green-500 pr-4 font-mono">contact</td>
                <td className="text-gray-400">Información de contacto</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">social</td>
                <td className="text-gray-400">Redes sociales</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">experience</td>
                <td className="text-gray-400">Experiencia profesional</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">education</td>
                <td className="text-gray-400">Formación académica</td>
              </tr>
              <tr>
                <td className="text-green-500 pr-4 font-mono">hobbies</td>
                <td className="text-gray-400">Mis pasatiempos e intereses</td>
              </tr>

              <tr>
                <td className="text-green-500 pr-4 font-mono">clear</td>
                <td className="text-gray-400">Limpia la terminal</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-400 text-sm mt-2">
            Consejo: Usa <span className="text-green-400">Tab</span> para autocompletar comandos y las flechas{" "}
            <span className="text-green-400">↑↓</span> para navegar por el historial.
          </p>
        </div>
      ),
    })
  }

  const showAbout = () => {
    addResult({
      command: "about",
      output: (
        <div className="space-y-3">
          <div className="text-green-400 font-bold text-lg">Sobre Mí</div>
          <p className="text-gray-300">
            Soy un desarrollador con una fuerte curiosidad por cómo la tecnología puede mejorar la vida de las personas. Me interesa construir productos que no solo funcionen bien, sino que también aporten valor real a quienes los usan. Disfruto transformar ideas complejas en soluciones simples, usables y con propósito.
          </p>
          <p className="text-gray-300">
            Me motiva explorar nuevas formas de automatizar procesos, resolver problemas con creatividad y entender a fondo las necesidades de los usuarios. Para mí, el desarrollo no se trata solo de código, sino de impacto. Siempre estoy en busca de nuevos retos que me permitan crecer, aprender y aportar en entornos colaborativos.
          </p>
          <p className="text-gray-300">
            Mi enfoque se centra en el aprendizaje continuo y la adaptación a nuevas tecnologías para mantenerme a la vanguardia en un campo en constante evolución.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Escribe <span className="text-green-400">skills</span> para ver mis habilidades técnicas o{" "}
            <span className="text-green-400">experience</span> para conocer mi trayectoria profesional.
          </p>
        </div>
      ),
    })
  }

  const projectsData = [
    {
      id: 1,
      title: "Phil App Salud Mental",
      description: "Phil es una app que combina tecnología e inteligencia emocional para ofrecer apoyo psicológico inmediato, recursos educativos y conexión con especialistas en salud mental.",
      fullDescription:"Phil es una app que combina tecnología e inteligencia emocional para ofrecer apoyo psicológico inmediato, recursos educativos y conexión con especialistas en salud mental. Desarrollada en Swift para iOS, la aplicación garantiza la seguridad de los datos mediante autenticación JWT y cifrado AES-256, cumpliendo con los estándares HIPAA y GDPR. Incluye un chatbot avanzado que utiliza APIs de OpenAI y un modelo de reconocimiento de emociones entrenado con TensorFlow y Keras, integrado en iOS a través de CoreML. La infraestructura backend se despliega en una instancia EC2 en AWS, con salida HTTPS y acceso SSH, alojando un sitio web y una API en contenedores Docker separados para mayor escalabilidad y seguridad.",
      technologies: ["Swift", "Express.js", "PostgreSQL", "AWS", "OpenAI API", "TensorFlow", "CoreML", "Docker"],
      features: [
        "Apoyo psicológico inmediato y recursos educativos.",
        "Conexión con especialistas en salud mental.",
        "Autenticación JWT y cifrado AES-256.",
        "Cumplimiento de HIPAA y GDPR.",
        "Chatbot con IA (OpenAI y TensorFlow/Keras).",
        "Despliegue en AWS EC2 con Docker."
      ],
      year: "2024", // Asumido, ya que no está en el original
      link: "https://apps.apple.com/mx/app/phil-dilo-en-se%C3%B1as/id6744261684",
      githubUrl: "#" // No disponible en el componente
    },
    {
      id: 2,
      title: "Cells QA",
      description: "Aplicación web para automatizar pruebas de código en entornos web, con funcionalidades de gestión de equipos y entornos. La plataforma incorpora capacidades de auto-healing que se adaptan automáticamente a cambios en los identificadores del código.",
      fullDescription: "Cells QA es una aplicación web diseñada para la automatización de pruebas de código en entornos web. Ofrece funcionalidades para la gestión de equipos y entornos de prueba. Una característica destacada es su capacidad de auto-healing, que permite a la plataforma adaptarse automáticamente a los cambios en los identificadores del código fuente, asegurando la robustez y continuidad de las pruebas. Construida con React en el frontend y Express.JS en el backend, utiliza MySQL para la gestión de datos y Selenium para la automatización de las interacciones con el navegador.",
      technologies: ["React", "Express.JS", "MySQL", "Selenium"],
      features: [
        "Automatización de pruebas de código web.",
        "Gestión de equipos y entornos de prueba.",
        "Capacidades de Auto-healing para adaptabilidad.",
        "Interfaz intuitiva para la creación y gestión de pruebas."
      ],
      year: "2024", // Asumido
      link: "#", // No disponible en el componente
      githubUrl: "https://github.com/LuisFerP12/Cells-QA"
    },
    {
      id: 3,
      title: "Byzapp",
      description: "Sistema completo para administrar inventario con seguimiento en tiempo real.",
      fullDescription: "Byzapp es un sistema integral de gestión de inventario que permite el seguimiento en tiempo real de productos y existencias. Desarrollado con Vue.js para el frontend y Express para el backend, utiliza PostgreSQL como base de datos. La aplicación facilita la administración eficiente del inventario, optimizando procesos y mejorando la toma de decisiones.",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      features: [
        "Seguimiento de inventario en tiempo real.",
        "Gestión de productos y existencias.",
        "Interfaz de usuario amigable.",
        "Reportes y análisis de inventario."
      ],
      year: "2023", // Asumido
      link: "#", // No disponible en el componente
      githubUrl: "https://github.com/LuisFerP12/byzapp"
    },
    {
      id: 4,
      title: "Portafolio Interactivo",
      description: "Portafolio personal con animaciones y experiencia interactiva.",
      fullDescription: "Un portafolio web personal diseñado para ofrecer una experiencia interactiva y atractiva, con animaciones fluidas y un diseño moderno. Desarrollado con Next.js, Tailwind CSS y TypeScript, este proyecto demuestra habilidades en el desarrollo frontend y la creación de interfaces de usuario dinámicas. Se despliega en AWS para garantizar alta disponibilidad y rendimiento.",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript" ,"AWS", "Framer Motion"],
       features: [
          "Terminal interactiva con comandos personalizados (la que estás usando).",
          "Diseño moderno y responsive.",
          "Animaciones y transiciones con Framer Motion.",
          "Despliegue en AWS."
      ],
      year: "2024", // Asumido
      link: "http://localhost:3000/", // Asumiendo que es el link de la demo
      githubUrl: "#" // No disponible en el componente como URL válida
    },
  ]

  const showProjects = () => {
    addResult({
      command: "projects",
      output: (
        <div className="space-y-3">
          <div className="text-green-400 font-bold text-lg">Proyectos</div>
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id} className="border border-green-900/50 p-3 rounded-md">
                <div className="text-green-500 font-bold">
                  {project.id}. {project.title}
                </div>
                <p className="text-gray-400 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Para ver detalles de un proyecto específico, escribe <span className="text-green-400">project [id]</span>
          </p>
        </div>
      ),
    })
  }

  const showProjectDetails = (id: number) => {
    const project = projectsData.find((p) => p.id === id)

    if (project) {
      addResult({
        command: `project ${id}`,
        output: (
          <div className="space-y-3">
            <div className="text-green-400 font-bold text-lg">{project.title}</div>
            <p className="text-gray-300">{project.fullDescription || project.description}</p>

            {project.features && project.features.length > 0 && (
                 <div>
                 <div className="text-green-500 font-bold mt-3 mb-1">Características:</div>
                 <ul className="list-disc pl-5 space-y-1">
                   {project.features.map((feature, index) => (
                     <li key={index} className="text-gray-300">
                       {feature}
                     </li>
                   ))}
                 </ul>
               </div>
            )}


            <div>
              <div className="text-green-500 font-bold mt-3 mb-1">Tecnologías:</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.year && (
                <div className="text-gray-400">
                    <span className="text-green-500 font-bold">Año:</span> {project.year}
                </div>
            )}
            
            <div className="flex space-x-4">
                {project.link && project.link !== "#" && (
                    <div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-400 underline hover:text-green-300">
                            Ver proyecto →
                        </a>
                    </div>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                     <div>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 underline hover:text-green-300">
                            Ver código en GitHub →
                        </a>
                    </div>
                )}
            </div>
          </div>
        ),
      })
    } else {
      addResult({
        command: `project ${id}`,
        output: <p className="text-red-400">Error: Proyecto con ID {id} no encontrado.</p>,
      })
    }
  }


  const showSkills = () => {
    const skills = [
      {
        category: "Lenguajes de Programación",
        items: ["Python", "C++", "C#", "Swift", "JavaScript", "PHP", "Java", "TypeScript", "Matlab", "R"],
      },
      {
        category: "Desarrollo Frontend",
        items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Bootstrap", "Vue.js", "Next.js"],
      },
      {
        category: "Desarrollo Backend",
        items: ["Node.js", "Express.js", "Flask", ".NET", "Laravel", "Django", "Prisma"],
      },
      {
        category: "Bases de Datos",
        items: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "RDS"],
      },
      {
        category: "Cloud & DevOps",
        items: ["AWS (Amazon Web Services)", "Docker", "Git", "Linux", "Selenium", "CI/CD"],
      },
      {
        category: "Desarrollo Móvil",
        items: ["Swift"],
      },
      {
        category: "Inteligencia Artificial / Machine Learning",
        items: ["TensorFlow"],
      },
      {
        category: "Otros (Herramientas y Plataformas)",
        items: ["Power Apps", "Power Automate"],
      },
    ];

    addResult({
      command: "skills",
      output: (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">Habilidades Técnicas</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skillGroup, index) => (
              <div key={index} className="border border-green-900/50 p-3 rounded-md">
                <div className="text-green-500 font-bold mb-2">{skillGroup.category}</div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

 const certificationsData = [
    {
      id: 1,
      title: "CyberOps Associate Networking Academy",
      issuer: "Cisco",
      date: "Noviembre 2024",
      url: "https://www.credly.com/badges/075a9412-ef1b-4553-92c6-d7da71fe7b53",
      unlocked: true,
    },
    {
      id: 2,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      date: "Febrero 2025",
      url: "https://www.credly.com/badges/0ecd8854-10a1-4b12-932c-cba431c63dc0",
      unlocked: true,
    },
    {
      id: 3,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Abril 2025",
      url: "https://www.credly.com/badges/b28a31c4-1e5d-4b80-b858-f5a0d4384616",
      unlocked: true,
    },
    {
      id: 4,
      title: "Próxima Certificación",
      issuer: "Por Desbloquear",
      date: "Futuro",
      url: "#",
      unlocked: false,
    },
  ]

  const showCertifications = () => {
    addResult({
      command: "certifications",
      output: (
        <div className="space-y-3">
          <div className="text-green-400 font-bold text-lg">Certificaciones</div>
          <div className="space-y-2">
            {certificationsData.filter(cert => cert.unlocked).map((cert, index) => (
              <div key={index} className="border border-green-900/50 p-3 rounded-md">
                <div className="text-green-500 font-bold">{cert.title}</div>
                <div className="text-gray-400 text-sm">
                  {cert.issuer} • {cert.date}
                </div>
                {cert.url && cert.url !== "#" && (
                   <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs mt-1 block">
                     Ver Certificado →
                   </a>
                )}
              </div>
            ))}
          </div>
          {certificationsData.some(cert => !cert.unlocked) && (
            <div className="border border-gray-800 p-3 rounded-md mt-2">
                <div className="text-gray-500 font-bold">Próximas Certificaciones</div>
                {certificationsData.filter(cert => !cert.unlocked).map((cert, index) => (
                    <div key={index} className="text-gray-600 text-sm mt-1">
                        {cert.title} ({cert.issuer}) - {cert.date}
                    </div>
                ))}
            </div>
          )}
        </div>
      ),
    })
  }


  const contactInfoData = [
    { title: "Email", value: "luisferp120504@gmail.com" },
    { title: "Teléfono", value: "+52 81 2352 5017" },
    { title: "Ubicación", value: "Monterrey, México" },
  ]

  const showContact = () => {
    addResult({
      command: "contact",
      output: (
        <div className="space-y-3">
          <div className="text-green-400 font-bold text-lg">Información de Contacto</div>
          <div className="space-y-2">
            {contactInfoData.map((info, index) => (
                 <div key={index} className="flex items-center">
                 <span className="text-green-500 font-bold w-24">{info.title}:</span>
                 <span className="text-gray-300">{info.value}</span>
               </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            También puedes contactarme a través de mis redes sociales. Escribe{" "}
            <span className="text-green-400">social</span> para verlas.
          </p>
        </div>
      ),
    })
  }

  const socialNetworksData = [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/luis-perez-robles-57933a279/" },
      { name: "GitHub", url: "https://github.com/LuisFerP12" },
    ]

  const showSocial = () => {
    addResult({
      command: "social",
      output: (
        <div className="space-y-3">
          <div className="text-green-400 font-bold text-lg">Redes Sociales</div>
          <div className="space-y-2">
            {socialNetworksData.map((social, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-500 font-bold w-24">{social.name}:</span>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {social.url.replace(/(https?:\/\/)/, "")}
                </a>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }

  const experiencesData = [
    {
      position: "Practicante de Transformación Digital",
      company: "Arca Continental",
      period: "Septiembre 2024 - Mayo 2025",
      description:
        "Apoyé en la automatización de procesos operativos, contribuyendo a la eficiencia y digitalización de flujos internos.",
      achievements: [
        "Implementé soluciones automatizadas con Python para optimizar y agilizar diversas tareas operativas, reduciendo significativamente el tiempo de ejecución",
        "Utilicé Alteryx para diseñar y generar reportes automatizados mediante consultas.",
        "Desarrollé aplicaciones con Power Apps y diseñé flujos de trabajo con Power Automate para automatizar y digitalizar distintos procesos de negocio.",
      ],
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
    },
  ]


  const showExperience = () => {
    addResult({
      command: "experience",
      output: (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">Experiencia Profesional</div>
          <div className="space-y-6">
            {experiencesData.map((exp, index) => (
              <div key={index} className="border border-green-900/50 p-4 rounded-md">
                <div className="text-green-500 font-bold">{exp.position}</div>
                <div className="text-gray-300 mb-2">
                  {exp.company} • <span className="text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-400 mb-3">{exp.description}</p>
                <div>
                  <div className="text-green-500 text-sm font-bold mb-1">Logros:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-400 text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }

  const showEducation = () => {
    const education = [
      {
        degree: "Maestría en Ciencias de la Computación",
        institution: "Universidad Tecnológica",
        period: "2014 - 2016",
        description:
          "Especialización en Inteligencia Artificial y Aprendizaje Automático. Tesis sobre implementación de algoritmos de aprendizaje profundo para procesamiento de lenguaje natural.",
      },
      {
        degree: "Licenciatura en Ingeniería Informática",
        institution: "Universidad Nacional",
        period: "2010 - 2014",
        description:
          "Formación en fundamentos de programación, estructuras de datos, algoritmos, bases de datos, redes y sistemas operativos. Proyecto final sobre desarrollo de aplicaciones web escalables.",
      },
      {
        degree: "Certificación en Desarrollo Web Avanzado",
        institution: "Tech Academy",
        period: "2013",
        description:
          "Curso intensivo de 6 meses sobre tecnologías web modernas, incluyendo HTML5, CSS3, JavaScript avanzado y frameworks frontend.",
      },
    ]

    addResult({
      command: "education",
      output: (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">Formación Académica</div>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border border-green-900/50 p-4 rounded-md">
                <div className="text-green-500 font-bold">{edu.degree}</div>
                <div className="text-gray-300 mb-2">
                  {edu.institution} • <span className="text-gray-400">{edu.period}</span>
                </div>
                <p className="text-gray-400">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }

  const showHobbies = () => {
    const hobbies = [
      {
        name: "Skate",
        description: "Me gusta el skate, aunque solo como hobbie sin arriesgarme mucho",
      },
      {
        name: "Futbol",
        description: "Desde niño me encanta tanto como jugar y ver futbol, aficionado de los Rayados desde los 4 años",
      },
      {
        name: "Videojuegos",
        description: "Fan de los videojuegos principalmete MOBAs, y seguidor de varias escenas de Esports",
      },
    ];

    addResult({
      command: "hobbies",
      output: (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">Pasatiempos e Intereses</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hobbies.map((hobby, index) => (
              <div key={index} className="border border-green-900/50 p-3 rounded-md">
                <div className="text-green-500 font-bold mb-1">{hobby.name}</div>
                <p className="text-gray-400 text-sm">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }



  const clearTerminal = () => {
    setResults([
      {
        id: 0,
        command: "",
        output: (
          <div className="text-green-500">
            <p>
              Terminal limpiada. Escribe <span className="text-green-400 font-bold">help</span> para ver los comandos
              disponibles.
            </p>
          </div>
        ),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarTerminal />
      <div className="flex-grow py-20 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-green-900/5 to-transparent dark:to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-green-500">&lt;</span> Terminal <span className="text-green-500">/&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactúa con mi portafolio a través de la terminal. Escribe comandos para descubrir más información.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/95 border border-green-500/30 rounded-lg overflow-hidden shadow-glow max-w-7xl mx-auto"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-green-900/50 bg-black">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-500 font-mono text-sm">terminal@portfolio:~</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand("help")}
                className="h-7 px-3 py-1.5 text-sm font-medium \
                           border border-green-500/50 text-green-500 \
                           bg-transparent hover:bg-green-900/30 hover:text-green-400 \
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <HelpCircle className="h-3 w-3 mr-2" />
                Comandos
              </Button>
            </div>

            {/* Terminal content */}
            <div 
              ref={resultsRef} 
              className="h-[60vh] overflow-y-auto p-4 font-mono text-sm terminal-scrollbar"
            >
              {results.map((result) => (
                <div key={result.id} className="mb-4">
                  {result.command && (
                    <div className="flex items-center text-gray-400 mb-1">
                      <span className="text-green-500 mr-2">$</span>
                      <span>{result.command}</span>
                    </div>
                  )}
                  <div>{result.output}</div>
                </div>
              ))}
            </div>

            {/* Terminal input */}
            <div className="border-t border-green-900/50 p-4 bg-black/80">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                  placeholder="Escribe un comando (help para ayuda)..."
                  aria-label="Terminal input"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <footer className="bg-background border-t border-border/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-green-500 font-bold text-xl">
                PORTFOLIO<span className="text-foreground">.TECH</span>
              </span>
            </div>
            <div className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Todos los derechos reservados</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
