import Link from "next/link";
import Image from "next/image";

type BlogPreviewProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    publishedAt: Date | null;
    author: {
      name: string | null;
    };
    categories: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
};

export default function BlogPreview({ post }: BlogPreviewProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48 w-full">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
            {post.title}
          </Link>
        </h3>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.author.name}</span>
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}