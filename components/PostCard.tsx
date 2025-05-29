import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <Link href={`/blog/${post.slug}`} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900 hover:text-blue-600">
              {post.title}
            </p>
            <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
              {post.category_name}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {post.author}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString()}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 