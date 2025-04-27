'use client';

import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/index';

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Format the createdAt date safely
  const formatDate = (dateString: string) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (_error) {
      return 'recently';
    }
  };
  
  // Create a clean excerpt from content if needed
  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    // Remove HTML tags and get first 150 characters
    return post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {post.featuredImage && (
          <div className="md:w-1/3 h-56 md:h-auto relative">
            <Link
              href={`/blog/${post.slug}`}
              className="block w-full h-full"
            >
              <Image 
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </Link>
          </div>
        )}
        
        <div className={`p-6 ${post.featuredImage ? 'md:w-2/3' : 'w-full'}`}>
          <div className="mb-2">
            {(post.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags!.map((tag, i) => (
                  <Link 
                    key={i}
                    href={`/blog?tag=${tag}`} 
                    className="inline-block bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.createdAt)}
              </span>
              
              <span className="mx-2">•</span>
              
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {typeof post.author === 'string' ? post.author : post.author.name}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{getExcerpt()}</p>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
          >
            Continue Reading
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
