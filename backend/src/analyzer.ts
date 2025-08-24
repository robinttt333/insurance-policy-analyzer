import natural from 'natural';

// Define common red flag patterns in insurance policies
const RED_FLAGS = [
  {
    name: 'High Deductible',
    patterns: ['deductible of $1,000', 'deductible: $1000', 'high deductible'],
    description: 'The policy has a high deductible which may require significant out-of-pocket expenses before coverage begins.'
  },
  {
    name: 'Exclusions',
    patterns: ['not covered', 'excluded', 'exclusion', 'does not cover', 'will not pay for', 'no coverage'],
    description: 'The policy contains specific exclusions for certain conditions or scenarios.'
  },
  {
    name: 'Pre-existing Conditions',
    patterns: ['pre-existing', 'prior to coverage', 'previously diagnosed', 'previously treated'],
    description: 'The policy may not cover conditions that existed before the policy start date.'
  },
  {
    name: 'Waiting Period',
    patterns: ['waiting period', 'wait time', 'coverage begins after', 'days after effective date'],
    description: 'There is a waiting period before certain benefits become available.'
  },
  {
    name: 'Coverage Limits',
    patterns: ['maximum benefit', 'benefit limit', 'coverage limit', 'up to $', 'not to exceed'],
    description: 'The policy has specific monetary limits on coverage amounts.'
  },
  {
    name: 'Premium Increases',
    patterns: ['premium may increase', 'rates subject to change', 'premium adjustment', 'may adjust premiums'],
    description: 'Premiums may increase over time or under certain conditions.'
  },
  {
    name: 'Cancellation Terms',
    patterns: ['may cancel', 'right to cancel', 'terminate coverage', 'cancellation provision'],
    description: 'The insurer reserves the right to cancel the policy under certain conditions.'
  },
  {
    name: 'Required Documentation',
    patterns: ['documentation required', 'proof required', 'must provide evidence', 'must submit'],
    description: 'Specific documentation may be required to file claims or receive benefits.'
  }
];

export interface TextMatch {
  text: string;
  startIndex: number;
  endIndex: number;
  pageIndex: number;
}

export interface RedFlag {
  name: string;
  matches: string[];
  pageNumbers: number[];
  description: string;
  textMatches: TextMatch[];
}

export function analyzeInsurancePolicy(policyText: string): {
  redFlags: RedFlag[];
  summary: string;
} {
  const tokenizer = new natural.WordTokenizer();
  
  // Split text into pages (assuming pages are separated by form feeds or other markers)
  // This is a simple approximation - actual PDF page extraction would be more complex
  const pages = policyText.split('\f').map(page => page.trim());
  
  // Initialize result
  const redFlags: RedFlag[] = [];
  
  // Check for each red flag pattern
  RED_FLAGS.forEach(flag => {
    const matches: string[] = [];
    const pageNumbers: number[] = [];
    const textMatches: TextMatch[] = [];
    
    pages.forEach((pageText, pageIndex) => {
      // Check for each pattern in the red flag
      flag.patterns.forEach(pattern => {
        // Convert text to lowercase for case-insensitive matching
        const lowerPageText = pageText.toLowerCase();
        const lowerPattern = pattern.toLowerCase();
        
        let searchIndex = 0;
        while (true) {
          const matchIndex = lowerPageText.indexOf(lowerPattern, searchIndex);
          if (matchIndex === -1) break;
          
          // Extract the context around the match
          const contextStart = Math.max(0, matchIndex - 50);
          const contextEnd = Math.min(pageText.length, matchIndex + pattern.length + 50);
          const context = pageText.substring(contextStart, contextEnd).trim();
          
          matches.push(context);
          if (!pageNumbers.includes(pageIndex + 1)) {
            pageNumbers.push(pageIndex + 1);
          }
          
          // Store exact match position for highlighting
          textMatches.push({
            text: pageText.substring(matchIndex, matchIndex + pattern.length),
            startIndex: matchIndex,
            endIndex: matchIndex + pattern.length,
            pageIndex: pageIndex
          });
          
          searchIndex = matchIndex + 1;
        }
      });
    });
    
    if (matches.length > 0) {
      redFlags.push({
        name: flag.name,
        matches,
        pageNumbers,
        description: flag.description,
        textMatches
      });
    }
  });
  
  // Generate a summary of findings
  let summary = 'No red flags were found in this policy.';
  
  if (redFlags.length > 0) {
    summary = `Found ${redFlags.length} potential areas of concern in this insurance policy. `;
    summary += `These include: ${redFlags.map(flag => flag.name).join(', ')}. `;
    summary += 'Please review the detailed findings for more information.';
  }
  
  return {
    redFlags,
    summary
  };
}