import Link from 'next/link';
import React from 'react';

const LatestBlog = () => {
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
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">Latest Blog Posts</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-4"></div>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Thoughts and insights on law, property, and professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {blogPosts.map(post => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/10 transition-all duration-300 hover:bg-white/20"
            >
              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-bold mb-2 text-white hover:text-blue-200 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-blue-200 mb-3">{post.date}</p>
                <p className="text-blue-100 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-blue-200 hover:text-blue-100 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-full font-medium transition-transform transform hover:scale-105"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
