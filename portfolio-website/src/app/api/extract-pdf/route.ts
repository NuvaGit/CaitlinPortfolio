import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type {
  TextContent,
  TextItem,
  TextMarkedContent,
} from 'pdfjs-dist/types/src/display/api';

// No need for manual worker import in modern versions
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Define the expected shape of the incoming JSON
interface RequestBody {
  pdfUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin
    const session = (await getServerSession(authOptions)) as { user: { role: string } } | null;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse & type-assert the request body
    const { pdfUrl } = (await request.json()) as RequestBody;
    if (!pdfUrl) {
      return NextResponse.json(
        { error: 'No PDF URL provided' },
        { status: 400 }
      );
    }

    // Fetch the PDF file
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch PDF file' },
        { status: 400 }
      );
    }
    const arrayBuffer = await response.arrayBuffer();

    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    // Extract text from all pages
    let fullText = '';
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);

      // Tell TS that this is the typed TextContent
      const textContent: TextContent = await page.getTextContent();

      // Filter items to only TextItem, then extract the str property
      const pageText = textContent.items
        .filter((item): item is TextItem => 'str' in item)
        .map((item) => item.str)
        .join(' ');

      fullText += pageText + '\n\n';
    }

    // Tidy up extra blank lines
    const formattedText = fullText.replace(/\n{3,}/g, '\n\n').trim();

    return NextResponse.json({ text: formattedText });
  } catch (error: unknown) {
    console.error('Error extracting PDF text:', error);
    return NextResponse.json(
      {
        error: 'Failed to extract text from PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
