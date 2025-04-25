import Link from 'next/link';

const LatestBlog = () => {
  // Sample blog posts - you'll replace these with actual data from your API
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Property Law in Ireland",
      excerpt: "An overview of key legal considerations for property investors in the Irish market.",
      date: "April 20, 2025",
      slug: "understanding-property-law"
    },
    {
      id: 2,
      title: "My Experience at The Legal Aid Board",
      excerpt: "Reflections on my internship with the Medical Negligence Unit and key lessons learned.",
      date: "April 15, 2025",
      slug: "legal-aid-board-experience"
    },
    {
      id: 3,
      title: "The Intersection of Law and Politics",
      excerpt: "How my academic background shapes my approach to legal practice and analysis.",
      date: "April 10, 2025",
      slug: "law-and-politics-intersection"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Latest Blog Posts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thoughts and insights on law, property, and professional development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="no-underline">
                  <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition">{post.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/blog" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;