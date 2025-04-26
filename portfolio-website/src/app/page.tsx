import React from 'react';
import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import LatestBlog from '@/components/home/LatestBlog';
import About from '@/components/home/About';

export default function Home() {
  return (
    <main className="pt-16"> {/* Add padding top to account for fixed navbar */}
      <section id="hero">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="experience">
        <Experience />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="blog-preview">
        <LatestBlog />
      </section>
    </main>
  );
}