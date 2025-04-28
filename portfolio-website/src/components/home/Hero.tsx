"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [backgroundElements, setBackgroundElements] = useState<React.ReactNode[]>([]);

  // Generate background elements on the client-side only
  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => {
      return (
        <div
          key={i}
          className="absolute rounded-full bg-blue-200/5 blur-xl"
          style={{
            width: `${Math.random() * 300 + 80}px`,
            height: `${Math.random() * 300 + 80}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 12}s`,
          }}
        />
      );
    });
    
    setBackgroundElements(elements);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              Caitlin O&apos;Brien
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full mb-4 sm:mb-6 mx-auto lg:mx-0"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-6 text-blue-100">
              Law with Politics Graduate &amp; Legal Professional
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 text-blue-200 max-w-xl mx-auto lg:mx-0">
              A dedicated and motivated legal professional with experience in legal research,
              property management, and a passion for making positive societal change.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="#about"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-300 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-transform transform hover:scale-105"
              >
                About Me
              </Link>
              
              <a
                href="https://www.linkedin.com/in/caitlin-o-brien-a03818257/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition hover:bg-white/20"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Let&apos;s Connect
              </a>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/5 mb-8 lg:mb-0">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-xl transform transition-transform duration-500 md:rotate-3 hover:md:rotate-0">
              <Image
                src="/images/caitlin.jpeg"
                alt="Caitlin O&apos;Brien"
                width={500}
                height={600}
                className="w-full h-auto object-cover rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;