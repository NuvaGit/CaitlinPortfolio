'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '@/components/blog/BlogCard';
import { Post } from '@/types/index';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id: string) => {
    try {
      const response = await axios.put(`/api/posts/${id}/like`);
      
      // Update the posts state with the updated like count
      setPosts(posts.map(post => 
        post._id === id ? { ...post, likes: response.data.likes } : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
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
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = (id: string) => {
    // Get the current URL
    const url = window.location.origin + '/blog/' + posts.find(post => post._id === id)?.slug;
    
    // Copy to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Blog post URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy URL: ', err);
      });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Blog</h1>
          
          {loading ? (
            <div className="text-center py-8">
              <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-600">Loading blog posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <BlogCard 
                key={post._id} 
                post={post} 
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}