import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // For admin access only, we're using environment variables
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          // Get or create the admin user
          await connectToDatabase();
          
          let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
          
          if (!adminUser) {
            adminUser = await User.create({
              name: 'Caitlin O\'Brien',
              email: process.env.ADMIN_EMAIL,
              role: 'admin',
            });
          }
          
          return {
            id: adminUser._id.toString(),
            name: adminUser.name,
            email: adminUser.email,
            role: adminUser.role,
          };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };