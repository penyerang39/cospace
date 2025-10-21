#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting build process...');

try {
  // Step 1: Generate navigation and scrape legal content
  console.log('📝 Generating navigation and scraping legal content...');
  execSync('pnpm run generate-nav && pnpm run scrape-legal', { stdio: 'inherit' });
  
  // Step 2: Try to build TinaCMS
  console.log('🦙 Building TinaCMS...');
  try {
    execSync('pnpm exec tinacms build --partial-reindex', { stdio: 'inherit' });
    console.log('✅ TinaCMS build completed successfully');
  } catch (error) {
    console.log('⚠️  TinaCMS build failed, continuing with Next.js build...');
    console.log('   This is expected if Redis/Vercel KV is not configured yet');
  }
  
  // Step 3: Build Next.js
  console.log('⚡ Building Next.js application...');
  execSync('pnpm exec next build --turbopack', { stdio: 'inherit' });
  
  console.log('🎉 Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
