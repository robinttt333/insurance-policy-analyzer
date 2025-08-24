import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold">Insurance Policy Analyzer</h3>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering consumers with AI-powered insurance policy analysis. Our tool helps you identify red flags, 
              understand complex terms, and make informed decisions before signing any insurance contract.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Red Flags Guide */}
          <div>
            <h4 className="text-white font-semibold mb-4">Common Red Flags</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>High deductibles over $1,000</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Pre-existing condition exclusions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Vague coverage limitations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Long waiting periods</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Easy cancellation clauses</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Excessive documentation requirements</span>
              </li>
            </ul>
          </div>

          {/* Tips & Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Insurance Tips</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Always read the entire policy</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Compare multiple quotes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Understand your deductibles</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Know your coverage limits</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Review policies annually</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Keep detailed records</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">78%</div>
              <div className="text-sm text-gray-400">Claim denials are avoidable</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">$2,400</div>
              <div className="text-sm text-gray-400">Average unexpected costs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">15min</div>
              <div className="text-sm text-gray-400">Average review time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">8/10</div>
              <div className="text-sm text-gray-400">Policies have red flags</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Insurance Policy Analyzer. Built to protect consumers from unfair insurance practices.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm flex items-center space-x-1">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Made for consumers</span>
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Disclaimer:</strong> This tool provides general analysis for educational purposes only and does not constitute legal or financial advice. 
            Always consult with qualified professionals before making insurance decisions. Results are based on automated text analysis and may not capture all policy nuances.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;