const fs = require('fs');
const path = require('path');
const { generateNavigation } = require('./generate-nav');

function watchNavigation() {
  const appDir = path.join(process.cwd(), 'app');
  
  console.log('🔍 Watching for route changes...');
  
  // Initial generation
  generateNavigation();
  
  // Watch for changes in the app directory
  fs.watch(appDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.includes('page.tsx')) {
      console.log(`📁 Route change detected: ${filename}`);
      setTimeout(() => {
        generateNavigation();
      }, 100); // Small delay to ensure file operations are complete
    }
  });
}

// Run if called directly
if (require.main === module) {
  watchNavigation();
}

module.exports = { watchNavigation };
