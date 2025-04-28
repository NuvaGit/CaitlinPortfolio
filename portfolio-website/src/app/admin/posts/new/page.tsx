'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import SimpleEditor from '@/components/blog/SimpleEditor';
import Head from 'next/head';
import Image from 'next/image';

export default function NewPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect non-admins
  useEffect(() => {
    if (status === 'unauthenticated' || ((session?.user as { role?: string })?.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-900">
        <svg
          className="animate-spin h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291
               A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await axios.post<{ url: string }>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        setError(axiosErr.response?.data?.error ?? 'Failed to upload image.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to upload image.');
      }
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const tagsArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      const finalExcerpt =
        excerpt.trim() ||
        content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

      await axios.post<{ id: string }>('/api/posts', {
        title,
        content,
        excerpt: finalExcerpt,
        tags: tagsArray,
        isPublished,
        featuredImage: imageUrl,
      });

      router.push('/admin');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        setError(axiosErr.response?.data?.error ?? 'Failed to create post.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create post.');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-white">
            Create New Article
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-900 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter article title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Excerpt (Optional)
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Short description (auto-generated if blank)"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Content
                </label>
                <SimpleEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your article content..."
                />
              </div>

              {/* Featured Image */}
              <div>
                <label
                  htmlFor="featured-image"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Featured Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="featured-image"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {imageFile ? 'Change Image' : 'Upload Image'}
                  </button>
                  {imageFile && (
                    <span className="ml-3 text-sm text-gray-900">
                      {imageFile.name}
                    </span>
                  )}
                </div>

                {imagePreview && (
                  <div className="mt-3">
                    <div className="relative w-full h-48 overflow-hidden rounded-md">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. legal, property, advice"
                />
              </div>

              {/* Publish */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is-published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="is-published"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Publish immediately
                </label>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 text-right">
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
