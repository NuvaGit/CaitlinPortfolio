'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Post } from '@/types/index';
import { formatDistance } from 'date-fns';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const response = await axios.get<Post[]>('/api/posts');
        setPosts(response.data);
        
        // Extract all unique tags
        const allTags = response.data.flatMap((post: Post) => 
          Array.isArray(post.tags) ? post.tags : []
        );
        setTags([...new Set(allTags)]);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format the createdAt date safely
  const formatDate = (dateString: string) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (_) {
      return 'recently';
    }
  };

  // Filter posts by tag if a tag is selected
  const filteredPosts = activeTag 
    ? posts.filter(post => Array.isArray(post.tags) && post.tags.includes(activeTag))
    : posts;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Research and insights on law, property, and professional development.
            </p>
            
            {/* Tags filter */}
            {tags.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setActiveTag(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTag === null 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    All Articles
                  </button>
                  
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTag === tag 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="animate-spin w-full h-full text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-lg text-gray-600">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center my-8">
              <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg font-semibold mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh page
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              {activeTag && (
                <div className="mb-8 text-center">
                  <p className="text-lg text-gray-600">
                    Showing articles tagged with <span className="font-semibold text-blue-600">{activeTag}</span>
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Link 
                    key={post._id} 
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row">
                      {post.featuredImage && (
                        <div className="md:w-1/4 h-48 md:h-auto">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className={`p-6 ${post.featuredImage ? 'md:w-3/4' : 'w-full'}`}>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(post.createdAt)}
                          </span>
                          
                          <span className="mx-2">•</span>
                          
                          <span className="flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            PDF Article
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600">{post.title}</h3>
                        
                        {post.content && (
                          <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                        )}
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-12 text-center">
              {activeTag ? (
                <>
                  <p className="text-xl text-gray-600 mb-4">No articles found with the tag <span className="font-semibold text-blue-600">{activeTag}</span>.</p>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View all articles
                  </button>
                </>
              ) : (
                <p className="text-xl text-gray-600">No articles found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}