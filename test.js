// Test file for comparing skill matching approaches
// Run with: node test.js

// Sample skills from our extension
const testSkills = [
  // Single word skills
  'javascript', 'python', 'react', 'docker', 'kubernetes', 'aws', 'git', 'sql',
  'java', 'typescript', 'angular', 'vue', 'nodejs', 'mongodb', 'redis',
  
  // Multi-word skills
  'cloud computing', 'machine learning', 'natural language processing',
  'microservices architecture', 'continuous integration', 'function as a service',
  'platform as a service', 'infrastructure as a service', 'web development',
  'software engineering', 'data science', 'artificial intelligence',
  'computer vision', 'deep learning', 'distributed systems'
];

// Sample job description with various skill mentions
const sampleJobDescription = `
Senior Software Engineer - Full Stack Development

We are seeking a talented Software Engineer to join our dynamic team. The ideal candidate will have experience in modern web development technologies and cloud computing platforms.

Key Requirements:
• 5+ years of experience in JavaScript, TypeScript, and Python
• Strong knowledge of React, Angular, or Vue.js frameworks
• Experience with Node.js and Express for backend development
• Proficiency in SQL databases (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis)
• Cloud computing experience with AWS, Azure, or Google Cloud Platform
• Container technologies: Docker and Kubernetes
• Version control: Git and collaborative development workflows
• Understanding of microservices architecture and distributed systems
• Experience with continuous integration and deployment (CI/CD)
• Knowledge of machine learning concepts and data science is a plus
• Familiarity with artificial intelligence and natural language processing
• Infrastructure as a Service (IaaS) and Platform as a Service (PaaS) experience
• Computer vision and deep learning experience preferred

Technical Skills:
- Frontend: React.js, TypeScript, HTML5, CSS3
- Backend: Node.js, Python, Java
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS Lambda, EC2, S3, Function as a Service
- DevOps: Docker, Kubernetes, Jenkins
- Testing: Jest, Cypress, unit testing

Nice to have:
• Experience with serverless computing and function-as-a-service
• Knowledge of web-development best practices
• Understanding of software-engineering principles
• Familiarity with data_science tools and libraries
`;

// Approach 1: Direct Text Content Matching
function directTextMatching(text, skills) {
  const results = [];
  const lowerText = text.toLowerCase();
  
  skills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      results.push(skill);
    }
  });
  
  return results;
}

// Approach 2: Word Boundary Regex Matching
function wordBoundaryMatching(text, skills) {
  const results = [];
  
  skills.forEach(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
    
    if (regex.test(text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Approach 3: Flexible Multi-word Matching
function flexibleMatching(text, skills) {
  const results = [];
  
  function createFlexibleRegex(skill) {
    if (!skill.includes(' ')) {
      // Single word - use word boundary
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escapedSkill}\\b`, 'gi');
    } else {
      // Multi-word - allow flexible separators
      const words = skill.split(/\s+/);
      const pattern = words
        .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('\\s*[-_\\s]\\s*');
      return new RegExp(`\\b${pattern}\\b`, 'gi');
    }
  }
  
  skills.forEach(skill => {
    const regex = createFlexibleRegex(skill);
    if (regex.test(text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Approach 4: Hybrid Approach
function hybridMatching(text, skills) {
  const results = [];
  const lowerText = text.toLowerCase();
  
  function matchSkill(skill, text) {
    const lowerSkill = skill.toLowerCase();
    
    // Single word skills - use word boundary
    if (!skill.includes(' ')) {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      return regex.test(text);
    }
    
    // Multi-word skills - hybrid approach
    else {
      // First try exact phrase match with boundary check
      if (lowerText.includes(lowerSkill)) {
        const index = lowerText.indexOf(lowerSkill);
        const before = index === 0 || /[\s\n\r\t]/.test(lowerText[index - 1]);
        const after = index + lowerSkill.length === lowerText.length || 
                     /[\s\n\r\t]/.test(lowerText[index + lowerSkill.length]);
        
        if (before && after) return true;
      }
      
      // Fallback to flexible separator matching
      const words = skill.split(/\s+/);
      const pattern = words
        .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('\\s*[-_\\s]\\s*');
      const flexibleRegex = new RegExp(`\\b${pattern}\\b`, 'gi');
      return flexibleRegex.test(text);
    }
  }
  
  skills.forEach(skill => {
    if (matchSkill(skill, text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Approach 5: Element-Targeted Matching (simulated)
function elementTargetedMatching(text, skills) {
  // Simulate targeting specific elements by splitting text into "elements"
  const simulatedElements = [
    // Simulate <li> elements
    ...text.match(/•[^•\n]*/g) || [],
    // Simulate <code> or technical terms in parentheses
    ...text.match(/\([^)]*\)/g) || [],
    // Simulate <span> - technical terms after colons
    ...text.match(/:\s*[^\n]*/g) || []
  ];
  
  const results = [];
  
  simulatedElements.forEach(elementText => {
    skills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      if (regex.test(elementText)) {
        if (!results.includes(skill)) {
          results.push(skill);
        }
      }
    });
  });
  
  return results;
}

// OPTIMIZED REGEX APPROACHES

// Optimization 1: Pre-compiled Regex Cache
const regexCache = new Map();

function preCompiledRegexMatching(text, skills) {
  const results = [];
  
  skills.forEach(skill => {
    let regex = regexCache.get(skill);
    if (!regex) {
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
      regexCache.set(skill, regex);
    }
    
    // Reset regex lastIndex to avoid state issues
    regex.lastIndex = 0;
    
    if (regex.test(text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Optimization 2: Combined Single Regex with Alternation
let combinedRegex = null;
let skillIndexMap = null;

function combinedRegexMatching(text, skills) {
  // Build combined regex once
  if (!combinedRegex) {
    const escapedSkills = skills.map(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `(\\b${escaped}\\b)`;
    });
    
    combinedRegex = new RegExp(escapedSkills.join('|'), 'gi');
    
    // Create a map to find which skill matched
    skillIndexMap = new Map();
    skills.forEach((skill, index) => {
      skillIndexMap.set(index + 1, skill); // +1 because capture groups start at 1
    });
  }
  
  const results = [];
  const foundSkills = new Set();
  let match;
  
  // Reset regex
  combinedRegex.lastIndex = 0;
  
  while ((match = combinedRegex.exec(text)) !== null) {
    // Find which capture group matched
    for (let i = 1; i <= skills.length; i++) {
      if (match[i] && !foundSkills.has(skillIndexMap.get(i))) {
        foundSkills.add(skillIndexMap.get(i));
        results.push(skillIndexMap.get(i));
        break;
      }
    }
  }
  
  return results;
}

// Optimization 3: Text Preprocessing + Optimized Regex
function preprocessedRegexMatching(text, skills) {
  // Preprocess text once
  const normalizedText = text.toLowerCase()
    .replace(/[^\w\s.-]/g, ' ') // Replace special chars with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const results = [];
  
  skills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase().replace(/\s+/g, ' ');
    
    if (!skill.includes(' ')) {
      // Single word - simple word boundary
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedText)) {
        results.push(skill);
      }
    } else {
      // Multi-word - handle spaces and separators
      const words = normalizedSkill.split(' ');
      const pattern = words
        .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('\\s+'); // Only spaces after normalization
      const regex = new RegExp(`\\b${pattern}\\b`, 'i');
      if (regex.test(normalizedText)) {
        results.push(skill);
      }
    }
  });
  
  return results;
}

// Optimization 4: Lazy Evaluation with Early Filtering
function lazyEvaluationMatching(text, skills) {
  const lowerText = text.toLowerCase();
  const results = [];
  
  // First pass: Quick character-based filtering
  const candidateSkills = skills.filter(skill => {
    const firstWord = skill.split(' ')[0].toLowerCase();
    return lowerText.includes(firstWord);
  });
  
  // Second pass: Regex validation on candidates only
  candidateSkills.forEach(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
    
    if (regex.test(text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Optimization 5: Optimized Combined with Non-capturing Groups
function optimizedCombinedRegex(text, skills) {
  // Group skills by type for better regex optimization
  const singleWordSkills = skills.filter(s => !s.includes(' '));
  const multiWordSkills = skills.filter(s => s.includes(' '));
  
  const results = [];
  
  // Single regex for single-word skills
  if (singleWordSkills.length > 0) {
    const singleWordPattern = singleWordSkills
      .map(skill => skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    const singleWordRegex = new RegExp(`\\b(?:${singleWordPattern})\\b`, 'gi');
    
    let match;
    while ((match = singleWordRegex.exec(text)) !== null) {
      const foundSkill = singleWordSkills.find(s => 
        s.toLowerCase() === match[0].toLowerCase()
      );
      if (foundSkill && !results.includes(foundSkill)) {
        results.push(foundSkill);
      }
    }
  }
  
  // Individual regex for multi-word skills (more complex patterns)
  multiWordSkills.forEach(skill => {
    const words = skill.split(/\s+/);
    const pattern = words
      .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('\\s+');
    const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
    
    if (regex.test(text)) {
      results.push(skill);
    }
  });
  
  return results;
}

// Optimization 6: String-based with Regex Validation
function stringBasedWithValidation(text, skills) {
  const lowerText = text.toLowerCase();
  const results = [];
  const wordBoundaryChars = /[\s\n\r\t.,;:!?()[\]{}"'-]/;
  
  skills.forEach(skill => {
    const lowerSkill = skill.toLowerCase();
    let index = lowerText.indexOf(lowerSkill);
    
    while (index !== -1) {
      // Check word boundaries manually
      const before = index === 0 || wordBoundaryChars.test(lowerText[index - 1]);
      const after = index + lowerSkill.length === lowerText.length || 
                   wordBoundaryChars.test(lowerText[index + lowerSkill.length]);
      
      if (before && after) {
        results.push(skill);
        break; // Found this skill, move to next
      }
      
      index = lowerText.indexOf(lowerSkill, index + 1);
    }
  });
  
  return results;
}

// Performance testing function
function performanceTest(testFunction, name, text, skills, iterations = 1000) {
  console.log(`\n🔬 Testing: ${name}`);
  console.log('─'.repeat(50));
  
  // Warm up
  for (let i = 0; i < 10; i++) {
    testFunction(text, skills);
  }
  
  // Actual timing
  const startTime = performance.now();
  
  let results;
  for (let i = 0; i < iterations; i++) {
    results = testFunction(text, skills);
  }
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / iterations;
  
  console.log(`⏱️  Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`⏱️  Average time: ${avgTime.toFixed(4)}ms per execution`);
  console.log(`📊 Skills found: ${results.length}`);
  console.log(`📋 Results: ${results.slice(0, 10).join(', ')}${results.length > 10 ? '...' : ''}`);
  
  return {
    name,
    totalTime,
    avgTime,
    skillsFound: results.length,
    results: results.sort()
  };
}

// Run all tests
function runAllTests() {
  console.log('🚀 SKILL MATCHING PERFORMANCE COMPARISON');
  console.log('='.repeat(50));
  console.log(`📄 Job description length: ${sampleJobDescription.length} characters`);
  console.log(`🎯 Total skills to test: ${testSkills.length}`);
  console.log(`🔄 Iterations per test: 1000`);
  
  const testResults = [];
  
  // Test each approach
  testResults.push(performanceTest(directTextMatching, 'Direct Text Matching', sampleJobDescription, testSkills));
  testResults.push(performanceTest(wordBoundaryMatching, 'Word Boundary Regex', sampleJobDescription, testSkills));
  testResults.push(performanceTest(flexibleMatching, 'Flexible Multi-word', sampleJobDescription, testSkills));
  testResults.push(performanceTest(hybridMatching, 'Hybrid Approach', sampleJobDescription, testSkills));
  testResults.push(performanceTest(elementTargetedMatching, 'Element-Targeted', sampleJobDescription, testSkills));
  testResults.push(performanceTest(preCompiledRegexMatching, 'Pre-compiled Regex Cache', sampleJobDescription, testSkills));
  testResults.push(performanceTest(combinedRegexMatching, 'Combined Single Regex with Alternation', sampleJobDescription, testSkills));
  testResults.push(performanceTest(preprocessedRegexMatching, 'Text Preprocessing + Optimized Regex', sampleJobDescription, testSkills));
  testResults.push(performanceTest(lazyEvaluationMatching, 'Lazy Evaluation with Early Filtering', sampleJobDescription, testSkills));
  testResults.push(performanceTest(optimizedCombinedRegex, 'Optimized Combined with Non-capturing Groups', sampleJobDescription, testSkills));
  testResults.push(performanceTest(stringBasedWithValidation, 'String-based with Regex Validation', sampleJobDescription, testSkills));
  
  // Summary comparison
  console.log('\n📊 PERFORMANCE SUMMARY');
  console.log('='.repeat(50));
  
  // Sort by performance
  const sortedBySpeed = [...testResults].sort((a, b) => a.avgTime - b.avgTime);
  const sortedByAccuracy = [...testResults].sort((a, b) => b.skillsFound - a.skillsFound);
  
  console.log('\n🏃 SPEED RANKING (fastest to slowest):');
  sortedBySpeed.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}: ${result.avgTime.toFixed(4)}ms avg`);
  });
  
  console.log('\n🎯 ACCURACY RANKING (most skills found):');
  sortedByAccuracy.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}: ${result.skillsFound} skills found`);
  });
  
  // Detailed comparison
  console.log('\n🔍 DETAILED RESULTS COMPARISON:');
  console.log('─'.repeat(80));
  
  const allFoundSkills = new Set();
  testResults.forEach(result => {
    result.results.forEach(skill => allFoundSkills.add(skill));
  });
  
  console.log(`\n📋 All unique skills found across methods: ${allFoundSkills.size}`);
  console.log(Array.from(allFoundSkills).sort().join(', '));
  
  // Show differences
  console.log('\n❓ SKILL DETECTION DIFFERENCES:');
  testResults.forEach(result => {
    const missed = Array.from(allFoundSkills).filter(skill => !result.results.includes(skill));
    const extra = result.results.filter(skill => !allFoundSkills.has(skill));
    
    console.log(`\n${result.name}:`);
    if (missed.length > 0) {
      console.log(`  ❌ Missed: ${missed.join(', ')}`);
    }
    if (extra.length > 0) {
      console.log(`  ➕ Extra: ${extra.join(', ')}`);
    }
    if (missed.length === 0 && extra.length === 0) {
      console.log(`  ✅ Perfect match with consensus`);
    }
  });
  
  return testResults;
}

// Add Node.js compatibility check
if (typeof performance === 'undefined') {
  global.performance = require('perf_hooks').performance;
}

// Run the tests
runAllTests(); 