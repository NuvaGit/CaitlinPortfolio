export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'user';
}

export interface Comment {
  _id: string;
  content: string;
  author: string | User;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  pdfUrl?: string;
  pdfText?: string; // Added field for extracted PDF text
  author: string | User;
  tags?: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  category: 'legal' | 'technical' | 'soft' | 'other';
}