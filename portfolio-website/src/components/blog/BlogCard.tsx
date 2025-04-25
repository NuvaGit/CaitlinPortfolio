'use client';

import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
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
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && authorName.trim()) {
      setIsSubmitting(true);
      
      onComment(post._id, comment, authorName)
        .then(() => {
          setComment('');
          // Keep the author name for subsequent comments
        })
        .catch((error) => {
          console.error('Failed to submit comment:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition">{post.title}</h3>
        </Link>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{formatDate(post.createdAt)}</span>
        </div>
        
        <p className="text-gray-700 mb-4">{previewContent}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            <button 
              onClick={() => onLike(post._id)} 
              className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="flex items-center space-x-1 text-gray-500 hover:text-primary transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}</span>
            </button>
            
            <button 
              onClick={() => onShare(post._id)} 
              className="flex items-center space-x-1 text-gray-500 hover:text-primary transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
        
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-3">Comments</h4>
            
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-3 mb-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {typeof comment.author === 'string' ? comment.author : comment.author.name} - 
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
            )}
            
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Post'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;