import React, { useState } from 'react';

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
}

interface ResultsDisplayProps {
  results: AnalysisResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null);

  const toggleExpand = (flagName: string) => {
    if (expandedFlag === flagName) {
      setExpandedFlag(null);
    } else {
      setExpandedFlag(flagName);
    }
  };

  return (
    <div className="mt-12 space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Analysis Complete
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
            <p className="text-blue-800 leading-relaxed">{results.summary}</p>
          </div>
        </div>
      </div>

      {results.redFlags.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Red Flags Detected</h3>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
              {results.redFlags.length} issue{results.redFlags.length > 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid gap-4">
            {results.redFlags.map((flag, index) => (
              <div 
                key={flag.name} 
                className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-200"
                  onClick={() => toggleExpand(flag.name)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                        {flag.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Found on page{flag.pageNumbers.length > 1 ? 's' : ''} {flag.pageNumbers.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {flag.matches.length} match{flag.matches.length > 1 ? 'es' : ''}
                    </div>
                    <svg 
                      className={`h-6 w-6 text-gray-400 transition-all duration-300 ${expandedFlag === flag.name ? 'transform rotate-180 text-red-500' : 'group-hover:text-red-500'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
                
                {expandedFlag === flag.name && (
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50 animate-slide-down">
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Why This Matters
                      </h5>
                      <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border-l-4 border-blue-500">
                        {flag.description}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Relevant Policy Text
                      </h5>
                      <div className="space-y-4">
                        {flag.matches.map((match, matchIndex) => (
                          <div key={matchIndex} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                                Match #{matchIndex + 1}
                              </span>
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                Page {flag.pageNumbers[Math.min(matchIndex, flag.pageNumbers.length - 1)]}
                              </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500">
                              <p className="text-gray-800 font-mono text-sm leading-relaxed">
                                "...{match}..."
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 text-center shadow-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">All Clear!</h3>
          <p className="text-green-700 text-lg">No red flags were detected in this policy.</p>
          <p className="text-green-600 text-sm mt-2">Your policy appears to have standard terms and conditions.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;