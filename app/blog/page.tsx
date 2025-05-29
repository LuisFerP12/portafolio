"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Search, Tag } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useApi } from "@/hooks/useApi"
import { getAllPosts, getAllCategories, Post, Category } from "@/lib/api"
import { useEffect } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const { data: posts = [], loading: postsLoading, error: postsError, execute: executePosts } = useApi<Post[]>()
  const { data: categories = [], loading: categoriesLoading, error: categoriesError, execute: executeCategories } = useApi<Category[]>()

  useEffect(() => {
    executePosts(getAllPosts())
    executeCategories(getAllCategories())
  }, [])

  const filteredPosts = (posts || []).filter((post) => {
    // Filtrar por categoría
    if (activeCategory !== "all" && post.category_slug !== activeCategory) {
      return false
    }

    // Filtrar por búsqueda
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category_name.toLowerCase().includes(query)
      )
    }

    return true
  })

  const featuredPosts = filteredPosts.filter((post) => post.is_highlighted === 1)
  const regularPosts = filteredPosts.filter((post) => post.is_highlighted === 0 || post.is_highlighted === undefined)

  if (postsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-foreground">Cargando...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (postsError || categoriesError) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Error al cargar los datos</h2>
            <p className="text-muted-foreground mb-4">
              {postsError ? `Error en posts: ${postsError.message}` : ''}
              {categoriesError ? `Error en categorías: ${categoriesError.message}` : ''}
            </p>
            <Button
              onClick={() => {
                executePosts(getAllPosts())
                executeCategories(getAllCategories())
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Reintentar
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 bg-gradient-to-b from-background via-purple-950/10 to-background relative">
        {/* Fondo más sutil para la página de blog */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <span className="text-purple-500">&lt;</span> Blog <span className="text-purple-500">/&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Artículos, tutoriales y reflexiones sobre tecnología, desarrollo y tendencias de la industria.
            </p>
          </motion.div>

          {/* Filtros y búsqueda con animación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border focus:border-purple-500 text-foreground"
                />
              </div>

              <div className="flex overflow-x-auto pb-2 w-full md:w-auto">
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                  <TabsList className="bg-card/50 border border-border">
                    <TabsTrigger
                      value="all"
                      className="text-muted-foreground hover:text-purple-600 hover:bg-purple-500/10 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:hover:bg-purple-600"
                    >
                      Todos
                    </TabsTrigger>
                    {(categories || []).map((category) => (
                      <TabsTrigger
                        key={category.slug}
                        value={category.slug}
                        className="text-muted-foreground hover:text-purple-600 hover:bg-purple-500/10 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:hover:bg-purple-600"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </motion.div>

          {/* Artículos destacados */}
          {featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="text-purple-500 mr-2">
                  <Tag className="h-5 w-5" />
                </span>
                Artículos Destacados
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="bg-card/80 border border-border hover:border-border/70 transition-all duration-300 overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent dark:from-background opacity-70"></div>
                        <Badge className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700">Destacado</Badge>
                      </div>
                      <CardContent className="p-6 flex-grow">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-purple-500" />
                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
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
                        <h3 className="text-2xl font-bold text-foreground mb-3">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button
                          variant="outline"
                          className="w-full border-border text-foreground hover:bg-muted/10"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`}>Leer Artículo</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Todos los artículos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Todos los Artículos</h3>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-card/80 border border-border hover:border-border/70 transition-all duration-300 overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent dark:from-background opacity-70"></div>
                      </div>
                      <CardContent className="p-6 flex-grow">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-purple-500" />
                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-pink-500" />
                            <span>{post.reading_time} min</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button
                          variant="outline"
                          className="w-full border-border text-foreground hover:bg-muted/10"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`}>Leer Artículo</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-purple-900/50 rounded-lg">
                <p className="text-muted-foreground">No se encontraron artículos que coincidan con tu búsqueda.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-purple-500/50 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Mostrar todos los artículos
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
