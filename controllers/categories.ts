import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: Date;
}

export async function getAllCategories(): Promise<Category[]> {
  const query = `
    SELECT * FROM categories
    ORDER BY name ASC
  `;
  
  const result = await pool.query(query);
  return result.rows;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const query = `
    SELECT * FROM categories
    WHERE slug = $1
  `;
  
  const result = await pool.query(query, [slug]);
  return result.rows[0] || null;
} 