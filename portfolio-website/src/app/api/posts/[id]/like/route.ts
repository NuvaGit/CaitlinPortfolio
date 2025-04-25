import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const post = await Post.findById(params.id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Increment likes count
    post.likes += 1;
    await post.save();
    
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }
}