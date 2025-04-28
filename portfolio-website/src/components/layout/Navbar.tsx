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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add custom animations to the document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes slideDown {
        0% { transform: translateY(-10px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-5px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'top-4' : 'top-0'}`} 
         style={{
           animationName: scrolled ? 'slideDown' : 'none',
           animationDuration: '0.5s',
           animationTimingFunction: 'ease-out'
         }}>
      <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-6xl px-4 sm:px-6 py-2' : 'max-w-full px-0 py-0'}`}>
        <div
          className={`flex items-center justify-between backdrop-blur-sm transition-all duration-300 ease-in-out ${
            scrolled
              ? 'h-14 rounded-xl border border-gray-500/30 shadow-lg bg-gray-800/90 dark:bg-gray-900/95'
              : 'h-16 rounded-none border-0 bg-gray-800'
          }`}
        >
          {/* Branding */}
          <div className="flex items-center px-6">
            <Link href="/" className="flex items-center">
              <span className="font-bold transition-all duration-300 text-white text-xl tracking-wide relative overflow-hidden group">
                <span className="bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 hover:from-blue-200 hover:to-purple-300 transition-all duration-500">Caitlin OBrien</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
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
                className="relative text-sm font-medium px-3 py-2 rounded-md transition-all duration-300 text-white hover:text-blue-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-400 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 ease-out"></span>
              </Link>
            ))}
            
            {/* Contact Button - Direct email link */}
            <a 
              href="mailto:caitlinobltc@gmail.com"
              className="font-medium text-sm px-5 py-2 rounded-md transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 mr-3"
            >
              Get in Touch
            </a>
            
            {/* Admin Link (if admin) */}
            {((session?.user as { role?: string })?.role) === 'admin' && (
              <Link 
                href="/admin" 
                className="text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white hover:text-white mr-3"
              >
                Admin
              </Link>
            )}
            
            {/* Sign Out Button (if logged in) */}
            {session?.user && (
              <button 
                onClick={() => signOut()} 
                className="text-sm font-medium px-4 py-2 mr-5 rounded-md transition-all duration-300 border border-gray-500 hover:border-gray-400 text-white hover:text-white hover:bg-gray-700"
              >
                Sign Out
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden px-6">
            <button 
              type="button"
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:rotate-180"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <FaTimes size={24} />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
                  <FaBars size={24} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Animated dropdown */}
      <div className={`md:hidden fixed left-0 right-0 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} transition-all duration-300 ease-in-out`}>
        <div className="mt-1 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-700 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item, index) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => item.targetId ? handleNavLinkClick(e, item.targetId, item.isExternal, item.href) : undefined}
                  className="block rounded-md px-4 py-2.5 text-base font-medium text-white hover:bg-gray-700/70 dark:hover:bg-gray-800/70 hover:translate-x-1 transform transition-all duration-300 ease-out"
                  style={isMenuOpen ? {
                    animationName: 'fadeIn',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    animationDelay: `${index * 75}ms`
                  } : {}}
                >
                  {item.name}
                </Link>
              ))}
              
              <a 
                href="mailto:caitlinobltc@gmail.com"
                className="block rounded-md px-4 py-2.5 text-base font-medium text-white bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 my-2"
              >
                Get in Touch
              </a>
              
              {(session?.user as { role?: string })?.role === 'admin' && (
                <Link 
                  href="/admin"
                  className="block rounded-md px-4 py-2.5 text-base font-medium text-white hover:bg-gray-700/70 dark:hover:bg-gray-800/70 hover:translate-x-1 transform transition-all duration-300"
                >
                  Admin
                </Link>
              )}
              
              {session?.user && (
                <button 
                  onClick={() => signOut()} 
                  className="block w-full text-left rounded-md px-4 py-2.5 text-base font-medium text-white hover:bg-gray-700/70 dark:hover:bg-gray-800/70 hover:translate-x-1 transform transition-all duration-300"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;