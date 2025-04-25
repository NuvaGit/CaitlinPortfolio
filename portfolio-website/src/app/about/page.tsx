import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About Me</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gray-200 flex items-center justify-center p-4">
                {/* Placeholder for profile image */}
                <div className="w-full h-60 bg-gray-300 rounded flex items-center justify-center">
                  <p className="text-gray-500">Profile Photo</p>
                </div>
                {/* Uncomment when image ready */}
                {/* 
                <Image
                  src="/profile-photo.jpg"
                  alt="Caitlin O'Brien"
                  width={300}
                  height={300}
                  className="rounded"
                  priority
                />
                */}
              </div>
              
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Caitlin O'Brien</h2>
                <p className="text-gray-600 mb-4">Law with Politics Graduate | Legal Professional</p>
                
                <p className="text-gray-700 mb-4">
                  I am a recent Law with Politics graduate from University College Dublin, 
                  with a passion for legal research, property management, and making a positive 
                  impact on society through the legal profession.
                </p>
                
                <p className="text-gray-700 mb-4">
                  My academic background has provided me with a strong foundation in legal principles 
                  and political systems, which I have complemented with practical experience in 
                  property management and legal research.
                </p>
                
                <p className="text-gray-700">
                  I am currently seeking opportunities to further develop my legal career, with a 
                  particular interest in property law, medical negligence, and public policy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Bachelor of Law with Politics (BCL)</h3>
                <p className="text-gray-600">University College Dublin | 2020 - 2024</p>
                <div className="mt-3">
                  <p className="text-gray-700 mb-2">Relevant Coursework:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Constitutional Law</li>
                    <li>Property Law</li>
                    <li>Commercial Law</li>
                    <li>Medical Law and Ethics</li>
                    <li>Political Theory</li>
                    <li>Public Policy Analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Personal Interests</h2>
              
              <p className="text-gray-700 mb-4">
                Outside of my professional interests, I enjoy:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Reading legal and political literature</li>
                <li>Volunteering with local community legal aid programs</li>
                <li>Hiking and outdoor activities</li>
                <li>Attending legal seminars and workshops</li>
                <li>Writing about current legal issues and developments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}