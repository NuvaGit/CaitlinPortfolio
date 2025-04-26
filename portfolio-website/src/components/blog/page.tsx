'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '@/components/blog/BlogCard';
import { Post } from '@/types/index';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // Load liked posts from session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const liked = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
      setLikedPosts(liked);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        
        // Extract all unique tags
        const allTags = response.data.flatMap((post: Post) => 
          Array.isArray(post.tags) ? post.tags : []
        );
        setTags([...new Set(allTags)] as string[]);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Track liked posts in session storage
  const hasLikedPost = (postId: string): boolean => {
    return likedPosts.includes(postId);
  };

  // Updated handleLike function
  const handleLike = async (id: string) => {
    // Check if post is already liked in this session
    if (hasLikedPost(id)) {
      alert("You've already liked this post!");
      return;
    }

    try {
      const response = await axios.put(`/api/posts/${id}/like`);
      
      // Update the posts state with the updated like count
      setPosts(posts.map(post => 
        post._id === id ? { ...post, likes: response.data.likes } : post
      ));
      
      // Save post ID to session storage
      const updatedLikedPosts = [...likedPosts, id];
      sessionStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      setLikedPosts(updatedLikedPosts);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (id: string, content: string, author: string) => {
    try {
      const response = await axios.post(`/api/posts/${id}/comment`, {
        content,
        author,
      });
      
      // Update the posts state with the new comment
      setPosts(posts.map(post => 
        post._id === id ? { 
          ...post, 
          comments: [...post.comments, response.data] 
        } : post
      ));
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleShare = (id: string) => {
    // Get the current URL and selected post slug
    const post = posts.find(post => post._id === id);
    if (!post) return;
    
    const url = `${window.location.origin}/blog/${post.slug}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Blog post URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy URL:', err);
      });
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts and insights on law, property, and professional development.
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
                    All Posts
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
              <p className="text-lg text-gray-600">Loading blog posts...</p>
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
                    Showing posts tagged with <span className="font-semibold text-blue-600">{activeTag}</span>
                  </p>
                </div>
              )}
              
              {filteredPosts.map(post => (
                <BlogCard 
                  key={post._id} 
                  post={post} 
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  isLiked={hasLikedPost(post._id)}
                />
              ))}
            </>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-12 text-center">
              {activeTag ? (
                <>
                  <p className="text-xl text-gray-600 mb-4">No blog posts found with the tag <span className="font-semibold text-blue-600">{activeTag}</span>.</p>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View all posts
                  </button>
                </>
              ) : (
                <p className="text-xl text-gray-600">No blog posts found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}