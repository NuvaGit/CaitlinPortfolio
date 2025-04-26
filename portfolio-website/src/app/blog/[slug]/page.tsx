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
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // Load liked posts from session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const liked = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
      setLikedPosts(liked);
    }
  }, []);

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
          setError('Post not found');
          setTimeout(() => {
            router.push('/blog');
          }, 3000);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
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
  
  const handleLike = async () => {
    if (!post) return;
    
    // Check if post is already liked in this session
    if (likedPosts.includes(post._id)) {
      alert("You've already liked this post!");
      return;
    }

    try {
      const response = await axios.put(`/api/posts/${post._id}/like`);
      
      // Update post with new like count
      setPost({
        ...post,
        likes: response.data.likes
      });
      
      // Save post ID to session storage
      const updatedLikedPosts = [...likedPosts, post._id];
      sessionStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      setLikedPosts(updatedLikedPosts);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !comment.trim() || !authorName.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`/api/posts/${post._id}/comment`, {
        content: comment,
        author: authorName,
      });
      
      // Update post with new comment
      setPost({
        ...post,
        comments: [...post.comments, response.data]
      });
      
      // Clear comment field but keep author name
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
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
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
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
            Back to Blog
          </Link>
          
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
              <span className="flex items-center mr-4">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.createdAt)}
              </span>
              
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {typeof post.author === 'string' ? post.author : post.author.name}
              </span>
            </div>
            
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
          </div>
          
          {/* Post Content */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="prose prose-blue max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
              ))}
            </div>
          </div>
          
          {/* Post Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                <button 
                  onClick={handleLike} 
                  disabled={likedPosts.includes(post._id)}
                  className={`flex items-center space-x-1 transition-colors duration-300 ${
                    likedPosts.includes(post._id) 
                      ? 'text-pink-500 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-pink-500'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill={likedPosts.includes(post._id) ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
                
                <button 
                  onClick={handleShare} 
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({post.comments.length})</h2>
            
            {post.comments.length > 0 ? (
              <div className="space-y-6 mb-8">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        {typeof comment.author === 'string' ? comment.author : comment.author.name}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-6">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
            
            {/* Comment Form */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add a Comment</h3>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="author-name"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment-content"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}