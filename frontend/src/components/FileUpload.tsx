import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Insurance Policy</h2>
        <p className="text-gray-600">Upload your PDF policy document to identify potential red flags and concerning clauses</p>
      </div>
      
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 transform ${
          isDragActive 
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 scale-105 shadow-lg' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 hover:scale-105'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full transition-all duration-300 ${
              isDragActive 
                ? 'bg-blue-500 shadow-lg scale-110' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100 hover:shadow-md'
            }`}>
              <svg
                className={`h-12 w-12 transition-colors duration-300 ${
                  isDragActive ? 'text-white' : 'text-blue-500'
                }`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <div>
            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-blue-600">Drop your PDF here!</p>
                <p className="text-blue-500">Release to analyze your policy</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-700">
                  Drag & drop your insurance policy PDF
                </p>
                <p className="text-gray-500">
                  or <span className="text-blue-600 font-medium">click to browse files</span>
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>PDF only</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Max 50MB</span>
            </div>
          </div>
        </div>

        {/* Animated background patterns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transition-transform duration-700 ${isDragActive ? 'scale-150 rotate-45' : ''}`}></div>
          <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 transition-transform duration-700 delay-150 ${isDragActive ? 'scale-150 -rotate-45' : ''}`}></div>
        </div>
      </div>

      {isLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-900 mb-1">Analyzing Your Policy</p>
              <p className="text-blue-700">Our AI is reviewing your document for potential red flags...</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;