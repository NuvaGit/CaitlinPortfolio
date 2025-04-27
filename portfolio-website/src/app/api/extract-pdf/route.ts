import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

// No need for manual worker import in modern versions
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the PDF URL from the request body
    const { pdfUrl } = await request.json();
    
    if (!pdfUrl) {
      return NextResponse.json({ error: 'No PDF URL provided' }, { status: 400 });
    }
    
    // Fetch the PDF file
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF file' }, { status: 400 });
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    
    // Extract text from all pages
    let fullText = '';
    
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    // Format the extracted text for display
    const formattedText = fullText
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with just two
      .trim();
    
    return NextResponse.json({ text: formattedText });
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return NextResponse.json({ 
      error: 'Failed to extract text from PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}