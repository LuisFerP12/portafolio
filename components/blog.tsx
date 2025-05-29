"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Post, getAllPosts } from "@/lib/api"

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const allPosts = await getAllPosts()
        
        // Ordenar posts: primero los destacados, luego los normales
        const sortedPosts = [...allPosts].sort((a, b) => {
          // Priorizar los destacados (is_featured)
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          
          // Si ambos son destacados o ambos no lo son, ordenar por fecha de publicación
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        })
        
        // Tomar solo los primeros 3 artículos
        setPosts(sortedPosts.slice(0, 3))
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

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
    <section id="blog" className="py-20 bg-background/95 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-transparent dark:to-black"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-purple-500">&lt;</span> Blog <span className="text-purple-500">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cosas que me pasan, cosas que me cuestan, y cosas que me emocionan del mundo tech.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="bg-card/80 border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  {post.is_featured && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-2 py-1 z-10 rounded-bl-md">
                      Destacado
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 dark:from-background"></div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-purple-500" />
                        <span>{new Date(post.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-pink-500" />
                        <span>{post.reading_time} min</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1 text-blue-500" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted/10" asChild>
                      <Link href={`/blog/${post.slug}`}>Leer Artículo</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
            asChild
          >
            <Link href="/blog">Ver Todos los Artículos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
