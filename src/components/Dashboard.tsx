"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    // Implementation for toggling publish status would go here
    // This would involve making an API call to update the post
  };

  const handleDeletePost = async (id: string) => {
    // Implementation for deleting a post would go here
    // This would involve making an API call to delete the post
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
        <Link 
          href="/admin/posts/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No posts found. Create your first post!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">/blog/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => router.push(`/admin/posts/edit/${post.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublishToggle(post.id, post.published)}
                      className={`${
                        post.published ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"
                      } mr-4`}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}