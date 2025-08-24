import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import InfoBanner from './components/InfoBanner';
import Footer from './components/Footer';

interface TextMatch {
  text: string;
  startIndex: number;
  endIndex: number;
  pageIndex: number;
}

interface RedFlag {
  name: string;
  matches: string[];
  pageNumbers: number[];
  description: string;
  textMatches: TextMatch[];
}

interface AnalysisResults {
  redFlags: RedFlag[];
  summary: string;
  highlightedPdfUrl?: string;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('policyFile', file);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data: AnalysisResults = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to analyze the PDF file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Insurance Policy Analyzer
              </h1>
              <p className="text-gray-600 mt-1">AI-powered policy review and red flag detection</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <InfoBanner />
          
          <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-8 lg:p-12">
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
              
              {error && (
                <div className="mt-8 p-6 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-400 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-800 font-medium">{error}</span>
                  </div>
                </div>
              )}
              
              {results && <ResultsDisplay results={results} />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;