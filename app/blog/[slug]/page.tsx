"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApi } from "@/hooks/useApi"
import { getPostBySlug, Post } from "@/lib/api"
import { use } from "react"

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const router = useRouter()
  const { data: post, loading, error, execute } = useApi<Post>()
  
  // Unwrap params if it's a Promise
  const resolvedParams = params instanceof Promise ? use(params) : params
  const slug = resolvedParams.slug

  useEffect(() => {
    if (slug) {
      // Handle the Promise<Post | null> by ensuring we only proceed with non-null values
      getPostBySlug(slug).then(postData => {
        if (postData) {
          execute(Promise.resolve(postData))
        }
      })
    }
  }, [slug, execute])

  if (loading) {
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
            <Button onClick={() => router.push("/blog")} className="bg-purple-600 hover:bg-purple-700">
              Volver al blog
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
        {/* Fondo más sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Botón Volver */}
          <Button
            variant="ghost"
            className="mb-8 text-foreground hover:text-foreground/80"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Button>

          {/* Imagen destacada */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent dark:from-background opacity-70"></div>
          </div>

          {/* Contenido del artículo */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-blockquote:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-pink-500" />
                <span>{post.reading_time} min de lectura</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-6">{post.title}</h1>
            
            <div className="text-muted-foreground mb-8">
              <p className="text-lg italic">{post.excerpt}</p>
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
} 