'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Post } from '@/types/index';
import SimpleEditor from '@/components/blog/SimpleEditor';
import Head from 'next/head';
import Image from 'next/image';

export default function EditPost({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const postId = params.id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchingPost, setFetchingPost] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch the post data
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }
    
    if (session?.user.role !== 'admin') {
      router.push('/');
      return;
    }
    
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`/api/posts/${postId}`);
        const post = response.data;
        
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt || '');
        
        // Handle tags as array
        if (Array.isArray(post.tags)) {
          setTags(post.tags.join(', '));
        }
        
        setIsPublished(post.isPublished);
        setCurrentImageUrl(post.featuredImage || null);
        
        if (post.featuredImage) {
          setImagePreview(post.featuredImage);
        }
        
        setFetchingPost(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post data. Please try again.');
        setFetchingPost(false);
      }
    };
    
    fetchPost();
  }, [postId, router, session, status]);

  if (status === 'loading' || fetchingPost) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-900">
        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (status === 'unauthenticated' || session?.user.role !== 'admin') {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return currentImageUrl;
    
    setImageUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.url) {
        return response.data.url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
      return currentImageUrl;
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = currentImageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl && imageFile) {
          setLoading(false);
          setError('Image upload failed. Please try again.');
          return;
        }
      }
      
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const finalExcerpt = excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
      
      await axios.put(`/api/posts/${postId}`, {
        title,
        content,
        excerpt: finalExcerpt,
        tags: tagsArray,
        isPublished,
        featuredImage: imageUrl,
      });
      
      router.push('/admin');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update post');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-white">Edit Article</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-900 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-900 mb-1">
                  Excerpt (Optional)
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="A brief summary of your article (if left blank, one will be generated automatically)"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-1">
                  Content
                </label>
                <SimpleEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your article content here..."
                />
              </div>
              
              <div>
                <label htmlFor="featured-image" className="block text-sm font-medium text-gray-900 mb-1">
                  Featured Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="featured-image"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {imageFile ? 'Change Image' : currentImageUrl ? 'Replace Image' : 'Upload Image'}
                  </button>
                  {imageFile && (
                    <span className="ml-3 text-sm text-gray-900">{imageFile.name}</span>
                  )}
                  {currentImageUrl && !imageFile && (
                    <span className="ml-3 text-sm text-gray-900">Current image</span>
                  )}
                </div>
                
                {imagePreview && (
                  <div className="mt-3">
                    <div className="relative w-full h-48 overflow-hidden rounded-md">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g. legal, property, advice"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-৪ w-৪ text-blue-৬ focus:ring-blue-৫ border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-২ block text-sm text-gray-900">
                  Published
                </label>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 text-right">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-৪ py-২ text-sm font-medium text-gray-৭ hover:text-gray-৫ mr-২"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="inline-flex justify-center py-২ px-৪ border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-৬ hover:bg-blue-৭ focus:outline-none focus:ring-২ focus:ring-offset-২ focus:ring-blue-৫ disabled:opacity-৭৫"
              >
                {(loading || imageUploading) ? (
                  <>
                    <svg className="animate-spin -ml-১ mr-২ h-৪ w-৪ text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ২৪ ২৪">
                      <circle className="opacity-২৫" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-৭৫" fill="currentColor" d="M৪ 12a8 8 0 018-8V০C5.373 0 0 5.373 0 12h৪zm২ 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {imageUploading ? 'Uploading Image...' : 'Updating Article...'}
                  </>
                ) : 'Update Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}