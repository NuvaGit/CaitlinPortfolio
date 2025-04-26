'use client';

import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Post } from '@/types/index';

interface BlogCardProps {
  post: Post;
  onLike: (id: string) => void;
  onComment: (id: string, comment: string, author: string) => Promise<void>;
  onShare: (id: string) => void;
}

const BlogCard = ({ post, onLike, onComment, onShare }: BlogCardProps) => {
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if post is already liked in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
      setIsLiked(likedPosts.includes(post._id));
    }
  }, [post._id]);
  
  const handleLike = () => {
    if (isLiked) return; // Prevent multiple likes
    
    onLike(post._id);
    
    // Update local state and session storage
    setIsLiked(true);
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
    sessionStorage.setItem('likedPosts', JSON.stringify([...likedPosts, post._id]));
  };
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && authorName.trim()) {
      setIsSubmitting(true);
      
      try {
        await onComment(post._id, comment, authorName);
        setComment('');
        // Keep the author name for subsequent comments
      } catch (error) {
        console.error('Failed to submit comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Format the createdAt date safely
  const formatDate = (dateString: string) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };
  
  // Safely truncate content for preview
  const previewContent = post.content.length > 300 
    ? `${post.content.substring(0, 300)}...` 
    : post.content;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl border border-gray-100 transform hover:-translate-y-1">
      {post.featuredImage && (
        <div className="h-56 w-full overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition duration-300">{post.title}</h3>
        </Link>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(post.createdAt)}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="ml-4 flex flex-wrap gap-2">
              {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">{previewContent}</p>
        
        {/* PDF download link if available */}
        {post.pdfUrl && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <a 
              href={post.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
            >
              Download PDF Document
            </a>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-6">
            <button 
              onClick={handleLike} 
              disabled={isLiked}
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                isLiked 
                  ? 'text-pink-500 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}</span>
            </button>
            
            <button 
              onClick={() => onShare(post._id)} 
              className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {showComments && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-lg text-gray-800 mb-4">Comments</h4>
            
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-4 mb-6">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
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
                <p className="text-sm">No comments yet. Be the first to comment!</p>
              </div>
            )}
            
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
                <div className="flex">
                  <input
                    id="comment-content"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Post'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;