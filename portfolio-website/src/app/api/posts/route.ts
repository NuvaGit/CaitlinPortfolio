import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET all posts
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    // Build query
    const query: Record<string, unknown> = { isPublished: true };
    if (tag) {
      query.tags = tag;
    }
    
    // For admin users, show all posts including unpublished ones
    const session = await getServerSession(authOptions);
    if ((session as { user: { role: string } } | null)?.user.role === 'admin') {
      delete query.isPublished;
    }
    
    // Execute query with error handling
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('author', 'name')
      .exec();
    
    return NextResponse.json(posts);
  } catch (error: unknown) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

// POST create a new post (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session as { user: { role: string } }).user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^\"\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Create excerpt if not provided
    const excerpt = body.excerpt || body.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    
    const adminSession = session as { user: { role: string, id: string } };
    const post = await Post.create({
      title: body.title,
      slug,
      content: body.content,
      excerpt,
      author: adminSession.user.id,
      tags: body.tags || [],
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      featuredImage: body.featuredImage || null,
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}