import React from 'react';

const About = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A passionate legal professional with a background in Law and Politics.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-6">
                {/* Placeholder for profile image */}
                <div className="w-full h-60 bg-white/20 rounded-lg flex items-center justify-center">
                  <p className="text-white">Profile Photo</p>
                </div>
                {/* Uncomment when image ready */}
                {/* 
                <Image
                  src="/profile-photo.jpg"
                  alt="Caitlin O'Brien"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                  priority
                />
                */}
              </div>
              
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Caitlin O'Brien</h2>
                <p className="text-gray-600 mb-6 font-medium">Law with Politics Graduate | Legal Professional</p>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  I am a recent Law with Politics graduate from University College Dublin, 
                  with a passion for legal research, property management, and making a positive 
                  impact on society through the legal profession.
                </p>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  My academic background has provided me with a strong foundation in legal principles 
                  and political systems, which I have complemented with practical experience in 
                  property management and legal research.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  I am currently seeking opportunities to further develop my legal career, with a 
                  particular interest in property law, medical negligence, and public policy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Education</h3>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Bachelor of Law with Politics (BCL)</h4>
                <p className="text-gray-600 mb-2">University College Dublin | 2020 - 2024</p>
                <div className="mt-3">
                  <p className="text-gray-700 mb-2">Relevant Coursework:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Constitutional Law
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Property Law
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Commercial Law
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Medical Law and Ethics
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Political Theory
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Public Policy Analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Personal Interests</h3>
              <p className="text-gray-700 mb-4">
                Outside of my professional interests, I enjoy:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Reading legal and political literature
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Volunteering with local community legal aid programs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Hiking and outdoor activities
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Attending legal seminars and workshops
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Writing about current legal issues and developments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;