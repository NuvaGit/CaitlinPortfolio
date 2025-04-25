import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import BlogPreview from "@/components/BlogPreview";

export default async function Home() {
  const latestPosts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: true,
    },
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Caitlin O'Brien</h1>
            <h2 className="text-xl md:text-2xl mb-6">Law Student & Legal Researcher</h2>
            <p className="text-lg mb-8">
              Final-year undergraduate at UCD Sutherland School of Law, with
              experience in legal research, analysis, and a passion for property law and journalism.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="bg-white text-indigo-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
              >
                About Me
              </Link>
              <Link
                href="/blog"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-900 transition"
              >
                Read My Blog
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {/* Replace with your actual profile image */}
              <Image
                src="/placeholder-profile.jpg"
                alt="Caitlin O'Brien"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Legal Research & Analysis</h3>
              <p className="text-gray-600 text-center">
                Experience analyzing complex legal cases, including medical negligence, and identifying relevant precedents for ongoing matters.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Property Law</h3>
              <p className="text-gray-600 text-center">
                Practical experience in property management, tenant relations, and ensuring property compliance with regulations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Legal Writing & Journalism</h3>
              <p className="text-gray-600 text-center">
                Experience writing articles on current affairs for The College Tribune and co-hosting a radio show on Belfield FM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold mb-1">Legal Intern</h3>
              <p className="text-gray-600 mb-2">The Legal Aid Board, Medical Negligence Unit | Aug 2024</p>
              <p className="text-gray-700">
                Analyzed client cases, identified key issues, and presented findings for solicitors. Conducted legal research and took notes during client-solicitor consultations.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold mb-1">Property Management Assistant</h3>
              <p className="text-gray-600 mb-2">OBF Properties Ltd. | Aug 2023 - Sept 2024</p>
              <p className="text-gray-700">
                Conducted tenant interviews and property viewings. Informed prospective tenants about rent details and property rules. Coordinated with the fire officer to ensure property compliance.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold mb-1">Street Team Member</h3>
              <p className="text-gray-600 mb-2">Bauer Media Audio Ireland | Present</p>
              <p className="text-gray-700">
                Represent media channels (SPIN1038, 98FM, TodayFM, Off The Ball, Newstalk) at high-profile events. Create and upload engaging social media content while ensuring brand alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <BlogPreview key={post.id} post={post} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-lg text-gray-600">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Interested in working together or have a question about my experience? Feel free to reach out!
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-800 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition inline-block"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}