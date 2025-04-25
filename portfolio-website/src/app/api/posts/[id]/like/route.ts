import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    const id = params.id;
    
    await connectToDatabase();
    
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Increment likes count
    post.likes += 1;
    await post.save();
    
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    console.error('Failed to like post:', error);
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }
}