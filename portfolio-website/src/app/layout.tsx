import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/auth/AuthProvider';

// Remove the Inter font import that's causing issues
// and we'll load fonts via a link tag instead

export const metadata: Metadata = {
  title: 'Caitlin O\'Brien - Legal Professional',
  description: 'Caitlin O\'Brien - Law with Politics graduate and legal professional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add preconnect for better font loading performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load fonts manually instead of using Next.js font system */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Material Icons for the editor */}
        <link 
          href="https://fonts.googleapis.com/icon?family=Material+Icons" 
          rel="stylesheet"
        />
      </head>
      <body className="font-sans"> {/* Use font-sans class instead of the Inter className */}
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}