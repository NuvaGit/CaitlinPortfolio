// src/app/api/upload-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a temporary file path
    const tempFilePath = join('/tmp', `upload-${Date.now()}-${file.name}`);
    
    // Write the buffer to the filesystem
    await writeFile(tempFilePath, buffer);
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'blog_pdfs',
      resource_type: 'raw' // Important for PDFs
    });
    
    console.log('PDF upload successful:', result);
    
    return NextResponse.json({ 
      url: result.secure_url,
      public_id: result.public_id 
    });
    
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to upload PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}