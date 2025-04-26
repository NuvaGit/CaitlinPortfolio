'use client';

import { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

// Define navigation item shape
interface NavItem {
  name: string;
  href: string;
  targetId?: string;
  isExternal?: boolean; 
}

const Navbar = () => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -80; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId?: string,
    isExternal = false,
    href?: string
  ): void => {
    if (isExternal) {
      setIsMenuOpen(false);
      return;
    }
    
    if (targetId && isHomePage) {
      e.preventDefault();
      scrollToSection(targetId);
      setIsMenuOpen(false);
    } else if (targetId && !isHomePage && href?.startsWith('#')) {
      e.preventDefault();
      router.push('/');
      // Wait for navigation to complete
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
      setIsMenuOpen(false);
    }
  };

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about', targetId: 'about' },
    { name: 'Experience', href: '#experience', targetId: 'experience' },
    { name: 'Skills', href: '#skills', targetId: 'skills' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-4' : 'top-0'}`}>
      <div className={`mx-auto transition-all duration-300 ${scrolled ? 'max-w-6xl px-4 sm:px-6 py-2' : 'max-w-full px-0 py-0'}`}>
        <div
          className={`flex items-center justify-between backdrop-blur-sm transition-all duration-300 ease-in-out ${
            scrolled
              ? 'h-14 rounded-xl border border-blue-600/30 shadow-lg bg-blue-600/90 dark:bg-blue-700/90'
              : 'h-16 rounded-none border-0 bg-blue-800'
          }`}
        >
          {/* Branding */}
          <div className="flex items-center px-4">
            <Link href="/" className="flex items-center">
              <span className="font-bold transition-all duration-300 text-white text-lg">
                Caitlin O'Brien
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={(e) => item.targetId ? handleNavLinkClick(e, item.targetId, item.isExternal, item.href) : undefined}
                className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-300 text-white hover:text-white hover:bg-white/20"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Contact Button - Direct email link */}
            <a 
              href="mailto:caitlinobltc@gmail.com"
              className="font-medium text-sm px-4 py-2 rounded-md transition-all duration-300 bg-white/20 text-white hover:bg-white/30"
            >
              Get in Touch
            </a>
            
            {/* Admin Link (if admin) */}
            {session?.user.role === 'admin' && (
              <Link 
                href="/admin" 
                className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-300 text-white hover:text-white hover:bg-white/20"
              >
                Admin
              </Link>
            )}
            
            {/* Sign Out Button (if logged in) */}
            {session?.user && (
              <button 
                onClick={() => signOut()} 
                className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-300 text-white hover:text-white hover:bg-white/20"
              >
                Sign Out
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden px-4">
            <button 
              type="button"
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-1 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="bg-blue-600 dark:bg-blue-700 rounded-lg border border-blue-500 dark:border-blue-600 shadow-lg overflow-hidden">
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => item.targetId ? handleNavLinkClick(e, item.targetId, item.isExternal, item.href) : undefined}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
                >
                  {item.name}
                </Link>
              ))}
              
              <a 
                href="mailto:caitlinobltc@gmail.com"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
              >
                Get in Touch
              </a>
              
              {session?.user.role === 'admin' && (
                <Link 
                  href="/admin"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
                >
                  Admin
                </Link>
              )}
              
              {session?.user && (
                <button 
                  onClick={() => signOut()} 
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;