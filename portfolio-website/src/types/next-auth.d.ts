// File: src/types/next-auth.d.ts
declare module "next-auth" {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'admin' | 'user';
    }
  }
  
  /**
   * Extending the built-in user types
   */
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: 'admin' | 'user';
  }
}