"use client"

import { useEffect, useState, use } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApi } from "@/hooks/useApi"
import { getPostsByCategory, getCategoryBySlug, Post, Category } from "@/lib/api"

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()
  const { data: posts = [], loading: postsLoading, error: postsError, execute: executePosts } = useApi<Post[]>()
  const { data: category, loading: categoryLoading, error: categoryError, execute: executeCategory } = useApi<Category>()

  // Unwrap params if it's a Promise
  const resolvedParams = params instanceof Promise ? use(params) : params
  const slug = resolvedParams.slug

  useEffect(() => {
    if (slug) {
      // Handle posts by category
      getPostsByCategory(slug).then(postsData => {
        executePosts(Promise.resolve(postsData))
      })
      
      // Handle category by slug
      getCategoryBySlug(slug).then(categoryData => {
        if (categoryData) {
          executeCategory(Promise.resolve(categoryData))
        }
      })
    }
  }, [slug, executePosts, executeCategory])

  if (postsLoading || categoryLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white">Cargando...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (postsError || categoryError || !category) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Categoría no encontrada</h1>
            <Button onClick={() => router.push("/blog")} className="bg-purple-600 hover:bg-purple-700">
              Volver al blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Ensure posts is an array even if null or undefined
  const postsArray = posts || []
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 bg-gradient-to-b from-black via-purple-950/10 to-black relative">
        {/* Fondo más sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Botón Volver */}
          <Button
            variant="ghost"
            className="mb-8 text-white hover:text-white/80"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <span className="text-purple-500">&lt;</span> {category.name} <span className="text-purple-500">/&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            {category.description && (
              <p className="text-gray-300 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </motion.div>

          {postsArray.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {postsArray.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-black/80 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-purple-500" />
                          <span>{new Date(post.published_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-pink-500" />
                          <span>{post.reading_time} min</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`}>Leer Artículo</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 border border-purple-900/50 rounded-lg">
              <p className="text-gray-400">No hay artículos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
} 