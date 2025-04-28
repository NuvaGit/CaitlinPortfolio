'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LatestBlog = () => {
  interface Post {
    excerpt?: string;
    content: string;
    _id?: string;
    slug?: string;
    title?: string;
    createdAt?: string;
  }
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [backgroundElements, setBackgroundElements] = useState<React.ReactElement[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Recently';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Recently';
    }
  };

  // Generate background elements client-side to avoid hydration issues
  useEffect(() => {
    const elements = Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white/5 blur-xl"
        style={{
          width: `${Math.random() * 300 + 50}px`,
          height: `${Math.random() * 300 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 10}s`,
        }}
      />
    ));
    setBackgroundElements(elements);
  }, []);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/posts?limit=3');
        setPosts(response.data);
        setErrorMessage(null);
      } catch (err) {
        console.error('Error fetching latest blog posts:', err);
        setErrorMessage('Failed to load latest blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Extract excerpt from content if needed
  const getExcerpt = (post: Post): string => {
    if (post.excerpt) return post.excerpt;
    // Strip HTML tags and limit to ~100 characters
    return post.content
      .replace(/<[^>]*>/g, '')
      .substring(0, 120)
      .trim() + '...';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">Latest Blog Posts</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-4"></div>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Thoughts and insights on law, property, and professional development.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12">
              <svg className="animate-spin w-full h-full text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-500/20 backdrop-blur-sm p-6 rounded-xl text-center mb-10">
            <p className="text-white">{errorMessage}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {posts.map(post => (
              <div
                key={post._id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/10 transition-all duration-300 hover:bg-white/20"
              >
                <div className="p-6">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-bold mb-2 text-white hover:text-blue-200 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-blue-200 mb-3">{formatDate(post.createdAt)}</p>
                  <p className="text-blue-100 mb-4">{getExcerpt(post)}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-blue-200 hover:text-blue-100 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center mb-10">
            <p className="text-white">No blog posts found. Check back soon!</p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-full font-medium transition-transform transform hover:scale-105"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;