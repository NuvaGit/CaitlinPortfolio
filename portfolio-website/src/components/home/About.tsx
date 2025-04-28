import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                transform: `scale(${Math.random() * 0.8 + 0.2})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header with white text */}
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-4xl font-extrabold text-white tracking-tight">
              About Me
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
            <p className="max-w-2xl mx-auto text-blue-100 text-lg">
              A passionate legal professional with a background in Law and Politics.
            </p>
          </div>
          
          {/* Profile Card with Glass Morphism Effect */}
          <div className="mb-16 overflow-hidden bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-8">
                {/* Profile Image Container without blur effects */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/images/caitlin.jpeg"
                    alt="Caitlin O&apos;Brien"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
              
              <div className="p-8 md:w-2/3">
                <h2 className="mb-4 text-3xl font-bold text-blue-50">Caitlin O&apos;Brien</h2>
                <p className="mb-6 font-medium text-blue-200">Law with Politics Graduate | Legal Professional</p>
                
                <div className="space-y-4">
                  <p className="leading-relaxed text-blue-100">
                    I am a recent Law with Politics graduate from University College Dublin, 
                    with a passion for legal research, property management, and making a positive 
                    impact on society through the legal profession.
                  </p>
                  
                  <p className="leading-relaxed text-blue-100">
                    My academic background has provided me with a strong foundation in legal principles 
                    and political systems, which I have complemented with practical experience in 
                    property management and legal research.
                  </p>
                  
                  <p className="leading-relaxed text-blue-100">
                    I am currently seeking opportunities to further develop my legal career, with a 
                    particular interest in property law, medical negligence, and public policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education and Personal Interests Cards with Hover Animations */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Education Card */}
            <div className="group">
              <div className="h-full p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 
                          group-hover:shadow-xl group-hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                <div className="flex items-center mb-6">
                  <div className="p-2 mr-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z">
                      </path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors duration-300">Education</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="mb-1 text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    Bachelor of Law with Politics (BCL)
                  </h4>
                  <p className="mb-4 text-gray-600">University College Dublin | 2020 - 2024</p>
                  
                  <div className="p-4 mt-4 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                    <p className="mb-3 font-medium text-gray-700">Relevant Coursework:</p>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        "Constitutional Law",
                        "Property Law",
                        "Commercial Law",
                        "Medical Law and Ethics",
                        "Political Theory",
                        "Public Policy Analysis"
                      ].map((course, index) => (
                        <li key={index} className="flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 mr-3 text-white bg-blue-500 rounded-full 
                                        group-hover:bg-blue-600 transition-colors duration-300 transform group-hover:scale-110">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </span>
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Interests Card */}
            <div className="group">
              <div className="h-full p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 
                          group-hover:shadow-xl group-hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-indigo-50">
                <div className="flex items-center mb-6">
                  <div className="p-2 mr-4 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                      </path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors duration-300">
                    Personal Interests
                  </h3>
                </div>
                
                <p className="mb-6 text-gray-700">
                  Outside of my professional interests, I enjoy:
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Reading legal and political literature",
                    "Volunteering with local community legal aid programs",
                    "Hiking and outdoor activities",
                    "Attending legal seminars and workshops",
                    "Writing about current legal issues and developments"
                  ].map((interest, index) => (
                    <li key={index} className="flex p-3 transition-all duration-300 transform bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm">
                      <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 bg-indigo-500 rounded-full 
                                    group-hover:bg-indigo-600 transition-colors duration-300 transform group-hover:scale-110">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* LinkedIn CTA */}
          <div className="p-8 mt-12 text-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/15">
            <h3 className="mb-4 text-2xl font-bold text-white">Let&apos;s Connect</h3>
            <p className="mb-6 text-blue-100">
              Interested in discussing legal opportunities or collaborations? Feel free to reach out.
            </p>
            <a 
              href="https://www.linkedin.com/in/caitlin-o-brien-a03818257/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;