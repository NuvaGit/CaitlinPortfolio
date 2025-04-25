import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    if (!body.content || !body.author) {
      return NextResponse.json({ error: 'Comment content and author are required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    const post = await Post.findById(params.id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Add comment to post
    post.comments.push({
      content: body.content,
      author: body.author,
      createdAt: new Date(),
    });
    
    await post.save();
    
    return NextResponse.json(post.comments[post.comments.length - 1], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}