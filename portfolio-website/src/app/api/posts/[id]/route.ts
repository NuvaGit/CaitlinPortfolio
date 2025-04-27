import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET a specific post by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Properly extract id using destructuring 
    const { id } = params;
    
    await connectToDatabase();
    const post = await Post.findById(id).populate('author', 'name').exec();
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT update a post (admin only)
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Properly extract id using destructuring
    const { id } = params;
    
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    await connectToDatabase();
    
    // If title was updated, update slug as well
    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE a post (admin only)
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Properly extract id using destructuring
    const { id } = params;
    
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectToDatabase();
    
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}