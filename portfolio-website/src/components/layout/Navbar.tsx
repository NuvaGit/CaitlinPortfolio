'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Caitlin O'Brien
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-accent transition">
              About
            </Link>
            <Link href="/experience" className="hover:text-accent transition">
              Experience
            </Link>
            <Link href="/blog" className="hover:text-accent transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-accent transition">
              Contact
            </Link>
            {session?.user.role === 'admin' && (
              <Link href="/admin" className="hover:text-accent transition">
                Admin
              </Link>
            )}
            {session?.user && (
              <button 
                onClick={() => signOut()} 
                className="hover:text-accent transition"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-3">
            <Link href="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-accent transition">
              About
            </Link>
            <Link href="/experience" className="hover:text-accent transition">
              Experience
            </Link>
            <Link href="/blog" className="hover:text-accent transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-accent transition">
              Contact
            </Link>
            {session?.user.role === 'admin' && (
              <Link href="/admin" className="hover:text-accent transition">
                Admin
              </Link>
            )}
            {session?.user && (
              <button 
                onClick={() => signOut()} 
                className="hover:text-accent transition text-left"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;