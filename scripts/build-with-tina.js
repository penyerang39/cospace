#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting build process...');

let hasErrors = false;

// Step 1: Generate navigation and scrape legal content
console.log('📝 Generating navigation and scraping legal content...');
try {
  execSync('pnpm run generate-nav && pnpm run scrape-legal', { stdio: 'inherit' });
  console.log('✅ Navigation and legal content generated successfully');
} catch (error) {
  console.error('❌ Navigation/legal generation failed:', error.message);
  hasErrors = true;
}

// Step 2: Build TinaCMS (self-hosted, always runs)
console.log('🦙 TinaCMS Build DISABLED - skipping...');
    // TinaCMS build temporarily disabled
    console.log('   TinaCMS disabled via toggle script');

// Step 3: Build Next.js
console.log('⚡ Building Next.js application...');
try {
  execSync('pnpm exec next build --turbopack --no-lint', { stdio: 'inherit' });
  console.log('✅ Next.js build completed successfully');
} catch (error) {
  console.error('❌ Next.js build failed:', error.message);
  hasErrors = true;
}

if (hasErrors) {
  console.log('⚠️  Build completed with errors - check output above for details');
  process.exit(1);
} else {
  console.log('🎉 Build completed successfully!');
}
