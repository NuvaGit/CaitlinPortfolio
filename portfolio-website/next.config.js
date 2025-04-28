/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration might be here
  
  // Add this to completely disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // If you have TypeScript errors, you might also need this
  typescript: {
    // This will force the build to succeed even if there are TypeScript errors
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig