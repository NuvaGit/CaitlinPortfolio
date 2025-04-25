"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function PostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(postId ? true : false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    published: false,
    categories: [""],
    tags: [""],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/blog/${postId}`);
          if (!response.ok) throw new Error("Failed to fetch post");
          const post = await response.json();
          
          setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content,
            featuredImage: post.featuredImage || "",
            published: post.published,
            categories: post.categories.map((c: any) => c.name),
            tags: post.tags.map((t: any) => t.name),
          });
        } catch (error) {
          console.error("Error fetching post:", error);
          setError("Failed to load post data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [postId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = value;
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  };

  const handleAddCategory = () => {
    setFormData((prev) => ({ ...prev, categories: [...prev.categories, ""] }));
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1);
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleAddTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-generate slug from title if user hasn't manually edited slug
      slug: prev.slug === "" || prev.slug === formatSlug(prev.title)
        ? formatSlug(title)
        : prev.slug,
    }));
  };

  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Filter out empty categories and tags
      const filteredData = {
        ...formData,
        categories: formData.categories.filter(Boolean),
        tags: formData.tags.filter(Boolean),
      };

      const response = await fetch(postId ? `/api/blog/${postId}` : "/api/blog", {
        method: postId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save post");
      }

      router.push("/admin");
    } catch (error: any) {
      console.error("Error saving post:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          URL friendly version of the title (auto-generated if left empty)
        </p>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <p className="text-sm text-gray-500 mt-1">
          A short summary of the post (optional)
        </p>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <div className="min-h-[300px]">
          {typeof window !== "undefined" && (
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              className="h-64"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "code-block"],
                  ["clean"],
                ],
              }}
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
          Featured Image URL
        </label>
        <input
          type="text"
          id="featuredImage"
          name="featuredImage"
          value={formData.featuredImage}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        {formData.categories.map((category, index) => (
          <div key={`category-${index}`} className="flex mb-2">
            <input
              type="text"
              value={category}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 mr-2"
              placeholder="Category name"
            />
            <button
              type="button"
              onClick={() => handleRemoveCategory(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          Add Category
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={`tag-${index}`} className="flex mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 mr-2"
              placeholder="Tag name"
            />
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          Add Tag
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSaving ? "Saving..." : postId ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}