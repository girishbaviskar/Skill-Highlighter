// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    skillsFound: 0,
    skills: [
      // Programming Languages
      'javascript', 'typescript', 'python', 'java', 'c#', 'c++', 'c', 'ruby', 'php', 'go', 'rust', 'swift', 'kotlin', 'scala', 'perl', 'r', 'matlab',
      
      // Web Technologies
      'html', 'css', 'html5', 'css3', 'sass', 'less', 'webgl', 'webassembly', 'webrtc', 'websocket',
      
      // Frontend Frameworks/Libraries
      'react', 'angular', 'vue', 'vue.js', 'jquery', 'bootstrap', 'tailwind css', 'material-ui', 'redux', 'next.js', 'nuxt.js', 'svelte', 'ember.js',
      
      // Backend Frameworks
      'node.js', 'express', 'express.js', 'django', 'flask', 'spring', 'laravel', 'asp.net', 'ruby on rails', 'fastapi', 'nestjs',
      
      // Databases
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'cassandra', 'oracle', 'sqlite', 'mariadb', 'dynamodb', 'firebase',
      'nosql', 'couchdb', 'neo4j', 'elasticsearch', 'influxdb', 'arangodb', 'rethinkdb', 'couchbase', 'hbase', 'ravendb',
      
      // Cloud Platforms & Services
      'aws', 'amazon web services', 'azure', 'google cloud', 'gcp', 'heroku', 'digitalocean', 'firebase', 'netlify', 'vercel',
      'lambda', 'ec2', 's3', 'rds', 'dynamodb', 'cloudfront', 'route 53', 'cloudwatch', 'sqs', 'sns',
      'azure functions', 'azure app service', 'azure cosmos db', 'azure sql', 'azure storage',
      'google cloud functions', 'google app engine', 'google cloud storage', 'google cloud sql', 'google cloud run',
      'cloudformation', 'terraform', 'serverless', 'kubernetes', 'docker', 'containerization',
      
      // DevOps & Tools
      'git', 'github', 'gitlab', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'terraform', 'ansible', 'puppet', 'chef',
      'prometheus', 'grafana', 'elk stack', 'splunk', 'new relic', 'datadog', 'nagios', 'zabbix',
      
      // Testing
      'jest', 'mocha', 'jasmine', 'selenium', 'cypress', 'junit', 'pytest', 'cucumber', 'testng',
      
      // Mobile Development
      'react native', 'flutter', 'android', 'ios', 'xamarin', 'ionic', 'cordova',
      
      // AI & Machine Learning
      'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'opencv', 'nltk', 'spacy',
      'machine learning', 'deep learning', 'neural networks', 'computer vision', 'nlp', 'natural language processing',
      
      // Security
      'oauth', 'jwt', 'ssl', 'tls', 'https', 'cors', 'xss', 'csrf', 'sql injection',
      'penetration testing', 'vulnerability assessment', 'security auditing', 'cryptography',
      
      // Methodologies
      'agile', 'scrum', 'kanban', 'tdd', 'bdd', 'ci/cd', 'devops', 'microservices',
      
      // Version Control
      'git', 'svn', 'mercurial', 'bitbucket',
      
      // Build Tools
      'webpack', 'babel', 'gulp', 'grunt', 'npm', 'yarn', 'maven', 'gradle',
      
      // IDEs & Editors
      'vs code', 'intellij', 'eclipse', 'sublime text', 'vim', 'emacs', 'atom',
      
      // Operating Systems
      'linux', 'unix', 'windows', 'macos', 'ios', 'android',
      
      // Networking
      'tcp/ip', 'http', 'rest', 'graphql', 'grpc', 'websocket', 'dns', 'cdn',
      
      // Design
      'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'indesign',
      
      // Project Management
      'jira', 'trello', 'asana', 'monday.com', 'confluence', 'notion',
      
      // Additional Cloud Services
      'cloud computing', 'serverless', 'function as a service', 'faas', 'platform as a service', 'paas',
      'infrastructure as a service', 'iaas', 'software as a service', 'saas',
      'cloud native', 'microservices architecture', 'container orchestration',
      
      // Database Technologies
      'database design', 'data modeling', 'data warehousing', 'etl', 'data pipeline',
      'big data', 'hadoop', 'spark', 'kafka', 'data lake', 'data warehouse',
      
      // Monitoring & Logging
      'application performance monitoring', 'apm', 'log management', 'system monitoring',
      'distributed tracing', 'service mesh', 'istio', 'envoy'
    ]
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(['enabled'], (result) => {
      if (result.enabled) {
        chrome.tabs.sendMessage(tabId, { action: 'toggleHighlighting', enabled: true });
      }
    });
  }
}); 