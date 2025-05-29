import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: number;
  reading_time: number;
  published_at: Date;
  created_at: Date;
}

export async function getAllPosts(): Promise<Post[]> {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.published_at DESC
  `;
  
  const result = await pool.query(query);
  return result.rows;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = $1
  `;
  
  const result = await pool.query(query, [slug]);
  return result.rows[0] || null;
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE c.slug = $1
    ORDER BY p.published_at DESC
  `;
  
  const result = await pool.query(query, [categorySlug]);
  return result.rows;
} 