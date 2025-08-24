import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up the worker for Create React App
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string | null;
  className?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, className = '' }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    console.error('PDF URL:', pdfUrl);
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  };

  if (!pdfUrl) {
    return null;
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Policy with Highlighted Red Flags</h3>
              <p className="text-sm text-gray-600">Yellow highlights indicate potential concerns</p>
            </div>
          </div>
          
          {!loading && !error && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Page {pageNumber} of {numPages}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <p className="text-gray-600">Loading PDF document...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-gray-500 text-sm">Please try refreshing the page or contact support</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex justify-center">
            <div className="border border-gray-300 rounded-lg shadow-inner bg-gray-50 p-4">
              <Document
                file={`http://localhost:5000${pdfUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center p-8">
                    <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center p-8 text-red-600">
                    Failed to load PDF
                  </div>
                }
                options={{
                  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                  cMapPacked: true,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={true}
                  className="shadow-lg"
                  scale={1.2}
                />
              </Document>
            </div>
          </div>
        )}
      </div>

      {!loading && !error && numPages > 1 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            {Array.from(new Array(numPages), (el, index) => (
              <button
                key={`page_${index + 1}`}
                onClick={() => setPageNumber(index + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  pageNumber === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;