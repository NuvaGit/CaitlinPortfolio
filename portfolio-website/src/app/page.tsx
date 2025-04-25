import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import LatestBlog from '@/components/home/LatestBlog';

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <LatestBlog />
    </main>
  );
}