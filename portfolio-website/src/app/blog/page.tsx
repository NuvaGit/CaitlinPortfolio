'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { Post } from '@/types/index';

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Find the post by slug
        const response = await axios.get(`/api/posts`);
        const posts = response.data;
        const foundPost = posts.find((p: Post) => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Article not found');
          setTimeout(() => {
            router.push('/blog');
          }, 3000);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router]);

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };
  
  // Format publication date
  const formatPublicationDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16">
          <svg className="animate-spin w-full h-full text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
              <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg font-semibold mb-2">{error}</p>
              <p className="mb-4">Redirecting to blog page...</p>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </Link>
          
          <article className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="w-full h-96 relative overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Article Header */}
            <div className="px-8 pt-8 pb-4">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/blog?tag=${tag}`}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">
                    {typeof post.author === 'string' ? post.author : post.author.name}
                  </span>
                </div>
                <span className="mx-3">•</span>
                <time className="text-gray-600" dateTime={post.createdAt}>
                  {formatPublicationDate(post.createdAt)}
                </time>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="px-8 py-6 prose prose-lg prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Article Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap justify-between items-center">
                <div className="text-sm text-gray-600">
                  Last updated {formatDate(post.updatedAt || post.createdAt)}
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => {
                      const url = `${window.location.origin}/blog/${post.slug}`;
                      navigator.clipboard.writeText(url);
                      alert('Article URL copied to clipboard!');
                    }}
                    className="inline-flex items-center text-gray-600 hover:text-blue-700"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>
          
          {/* Related Articles Section (Placeholder - you can implement the actual logic) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related articles */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <Link href="/blog" className="block p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
                    Browse all articles
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check out more research and insights on law, property, and professional development.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}