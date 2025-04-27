'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface PDFTextExtractorProps {
  pdfUrl: string | null;
  onTextExtracted: (text: string) => void;
}

const PDFTextExtractor: React.FC<PDFTextExtractorProps> = ({ pdfUrl, onTextExtracted }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const extractText = async () => {
    if (!pdfUrl) {
      setError('No PDF URL provided. Please upload a PDF first.');
      return;
    }

    setIsExtracting(true);
    setError(null);
    setIsComplete(false);

    try {
      const response = await axios.post('/api/extract-pdf', { pdfUrl });
      
      if (response.data.text) {
        onTextExtracted(response.data.text);
        setIsComplete(true);
      } else {
        setError('Failed to extract text. The PDF might be empty or protected.');
      }
    } catch (err: unknown) {
      console.error('Error extracting text:', err);

      if (axios.isAxiosError(err)) {
        // AxiosError gives us response data and message
        const axiosErr = err as AxiosError<{ error?: string }>;
        setError(axiosErr.response?.data?.error ?? axiosErr.message);
      } else {
        // Fallback for non-Axios errors
        setError('Failed to extract text from PDF');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-2">PDF Text Extraction</h3>
      
      {!pdfUrl ? (
        <div className="text-sm text-gray-500 mb-4">
          Upload a PDF first to extract its text
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Extract text from the uploaded PDF to create an article from it.
          </p>
          
          <button
            type="button"
            onClick={extractText}
            disabled={isExtracting || !pdfUrl}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
          >
            {isExtracting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Extracting Text...
              </>
            ) : isComplete ? (
              <>
                <svg className="h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Text Extracted
              </>
            ) : (
              'Extract Text from PDF'
            )}
          </button>
        </>
      )}
      
      {error && (
        <div className="mt-3 text-sm text-red-600">
          <p>{error}</p>
        </div>
      )}
      
      {isComplete && (
        <div className="mt-3 text-sm text-green-600">
          <p>Text has been successfully extracted and added to the article content.</p>
        </div>
      )}
    </div>
  );
};

export default PDFTextExtractor;
