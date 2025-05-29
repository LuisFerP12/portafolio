export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  published_at: string
  reading_time: number
  author: string
  category_slug: string
  category_name: string
  is_featured?: boolean
  is_highlighted?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

const API_BASE_URL = 'https://zc3mmuca32.execute-api.us-east-2.amazonaws.com/default';

// Helper function for API requests
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  return fetchApi<Post[]>('/posts');
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await fetchApi<Post>(`/posts/${slug}`);
    return post;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories');
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await fetchApi<Category>(`/categories/${slug}`);
    return category;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    return fetchApi<Post[]>(`/category/${categorySlug}`);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}