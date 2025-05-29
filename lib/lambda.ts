import { getAllPosts, getPostBySlug, getPostsByCategory } from '../controllers/posts';
import { getAllCategories, getCategoryBySlug } from '../controllers/categories';

export async function getPosts() {
  try {
    const posts = await getAllPosts();
    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los posts' })
    };
  }
}

export async function getPost(event: { pathParameters: { slug: string } }) {
  try {
    const { slug } = event.pathParameters;
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Post no encontrado' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(post)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener el post' })
    };
  }
}

export async function getCategories() {
  try {
    const categories = await getAllCategories();
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener las categorías' })
    };
  }
}

export async function getCategoryPosts(event: { pathParameters: { slug: string } }) {
  try {
    const { slug } = event.pathParameters;
    const posts = await getPostsByCategory(slug);
    
    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los posts de la categoría' })
    };
  }
} 