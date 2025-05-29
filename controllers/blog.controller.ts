import { Request, Response } from 'express';
import { pool } from '../db';

export class BlogController {
  // Obtener todos los posts
  async getPosts(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, category } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      let query = `
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM posts p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.published_at IS NOT NULL
      `;
      
      const queryParams = [];
      
      if (category) {
        query += ' AND c.slug = $1';
        queryParams.push(category);
      }
      
      query += ' ORDER BY p.published_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
      queryParams.push(limit, offset);

      const { rows: posts } = await pool.query(query, queryParams);
      
      // Obtener el total de posts para la paginación
      const { rows: [{ count }] } = await pool.query(
        'SELECT COUNT(*) FROM posts WHERE published_at IS NOT NULL' + (category ? ' AND category_id = (SELECT id FROM categories WHERE slug = $1)' : ''),
        category ? [category] : []
      );

      res.json({
        posts,
        pagination: {
          total: Number(count),
          page: Number(page),
          per_page: Number(limit),
          total_pages: Math.ceil(Number(count) / Number(limit))
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  }

  // Obtener un post por su slug
  async getPostBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      
      const { rows: [post] } = await pool.query(
        `SELECT p.*, c.name as category_name, c.slug as category_slug
         FROM posts p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.slug = $1 AND p.published_at IS NOT NULL`,
        [slug]
      );

      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }

      res.json({ post });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el post' });
    }
  }

  // Obtener todas las categorías
  async getCategories(req: Request, res: Response) {
    try {
      const { rows: categories } = await pool.query(
        `SELECT c.*, COUNT(p.id) as post_count
         FROM categories c
         LEFT JOIN posts p ON c.id = p.category_id
         GROUP BY c.id
         ORDER BY c.name`
      );

      res.json({ categories });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }
} 