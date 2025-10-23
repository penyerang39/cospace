#!/usr/bin/env node

/**
 * TinaCMS Toggle Script
 * 
 * Temporarily disables TinaCMS without breaking the build
 * - Moves TinaCMS files to .tinacms-disabled/
 * - Updates build script to skip TinaCMS
 * - Creates minimal fallback files
 * 
 * Usage:
 *   node scripts/toggle-tinacms.js disable
 *   node scripts/toggle-tinacms.js enable
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DISABLED_DIR = '.tinacms-disabled';
const BUILD_SCRIPT = 'scripts/build-with-tina.js';

// Files to temporarily move when disabling
const TINACMS_FILES = [
  'tina/config.ts',
  'tina/database.ts',
  'tina/__generated__',
  'pages/api/tina',
  'app/admin',
  'lib/tina-nextauth-provider.ts',
  'auth.ts',
  'app/api/auth',
];

// Files to create as fallbacks (simplified - no admin route)
const FALLBACK_FILES = {
  'tina/config.ts': `// TinaCMS Disabled - Minimal config
export default {
  authProvider: null,
  contentApiUrlOverride: '/api/tina/gql',
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
      static: true,
    },
  },
  schema: {
    collections: [],
  },
};`,
  'pages/api/tina/[...routes].ts': `// TinaCMS Disabled - Fallback API
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(503).json({ 
    error: 'TinaCMS is temporarily disabled',
    message: 'Use toggle script to re-enable'
  });
}`,
};


function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function moveFile(src, dest) {
  if (fs.existsSync(src)) {
    ensureDirectoryExists(path.dirname(dest));
    fs.renameSync(src, dest);
    console.log(`  Moved: ${src} → ${dest}`);
    return true;
  }
  return false;
}

function createFallbackFile(filePath, content) {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`  Created fallback: ${filePath}`);
}

function updateBuildScript(disable = true) {
  if (!fs.existsSync(BUILD_SCRIPT)) {
    console.log(`  Warning: Build script not found: ${BUILD_SCRIPT}`);
    return;
  }

  let content = fs.readFileSync(BUILD_SCRIPT, 'utf8');
  
  if (disable) {
    // Comment out TinaCMS build step
    content = content.replace(
      /console\.log\('🦙 Building TinaCMS\.\.\.'\);\s*try\s*\{[\s\S]*?catch \(error\) \{[\s\S]*?\}/,
      `console.log('🦙 TinaCMS Build DISABLED - skipping...');
    // TinaCMS build temporarily disabled
    console.log('   TinaCMS disabled via toggle script');`
    );
  } else {
    // Restore TinaCMS build step
    content = content.replace(
      /console\.log\('🦙 TinaCMS Build DISABLED - skipping\.\.\.'\);[\s\S]*?console\.log\('   TinaCMS disabled via toggle script'\);/,
      `console.log('🦙 Building TinaCMS...');
    try {
      execSync('pnpm exec tinacms build --partial-reindex', { stdio: 'inherit' });
      console.log('✅ TinaCMS build completed successfully');
    } catch (error) {
      console.error('❌ TinaCMS build failed:', error.message);
      console.log('   Skipping TinaCMS build and continuing with Next.js...');
      // Don't set hasErrors = true for TinaCMS failures to allow deployment
    }`
    );
  }
  
  fs.writeFileSync(BUILD_SCRIPT, content);
  console.log(`  Updated: ${BUILD_SCRIPT}`);
}

function updatePackageJson(disable = true) {
  const packageJsonPath = 'package.json';
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`  Warning: package.json not found: ${packageJsonPath}`);
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (disable) {
      // Store original scripts for restoration
      if (!packageJson._originalScripts) {
        packageJson._originalScripts = {
          dev: packageJson.scripts.dev,
          'dev:prod': packageJson.scripts['dev:prod']
        };
      }
      
      // Update dev scripts to skip TinaCMS
      packageJson.scripts.dev = 'cross-env TINA_PUBLIC_IS_LOCAL=true npm run generate-nav && npm run scrape-legal && next dev --turbopack';
      packageJson.scripts['dev:prod'] = 'cross-env TINA_PUBLIC_IS_LOCAL=false npm run generate-nav && npm run scrape-legal && next dev --turbopack';
      
      console.log('  Updated dev scripts to skip TinaCMS');
    } else {
      // Restore original scripts
      if (packageJson._originalScripts) {
        packageJson.scripts.dev = packageJson._originalScripts.dev;
        packageJson.scripts['dev:prod'] = packageJson._originalScripts['dev:prod'];
        delete packageJson._originalScripts;
        
        console.log('  Restored original dev scripts');
      }
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`  Updated: ${packageJsonPath}`);
  } catch (error) {
    console.log(`  Warning: Could not update package.json: ${error.message}`);
  }
}

function updateNavigationData(disable = true) {
  const navDataPath = 'app/lib/navigation-data.json';
  
  if (!fs.existsSync(navDataPath)) {
    console.log(`  Warning: Navigation data not found: ${navDataPath}`);
    return;
  }
  
  try {
    const navData = JSON.parse(fs.readFileSync(navDataPath, 'utf8'));
    
    if (disable) {
      // Remove admin route from navigation
      navData.routes = navData.routes.filter(route => route.path !== '/admin');
      console.log('  Removed admin route from navigation');
    } else {
      // Add admin route back to navigation (if it exists in disabled files)
      const disabledNavPath = path.join(DISABLED_DIR, navDataPath);
      if (fs.existsSync(disabledNavPath)) {
        const originalNavData = JSON.parse(fs.readFileSync(disabledNavPath, 'utf8'));
        const adminRoute = originalNavData.routes.find(route => route.path === '/admin');
        if (adminRoute) {
          navData.routes.push(adminRoute);
          console.log('  Restored admin route to navigation');
        }
      }
    }
    
    fs.writeFileSync(navDataPath, JSON.stringify(navData, null, 2));
    console.log(`  Updated: ${navDataPath}`);
  } catch (error) {
    console.log(`  Warning: Could not update navigation data: ${error.message}`);
  }
}

function updateGitignore() {
  const gitignorePath = '.gitignore';
  const gitignoreEntry = `# TinaCMS disabled files
${DISABLED_DIR}/
`;
  
  let gitignoreContent = '';
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  }
  
  if (!gitignoreContent.includes(`${DISABLED_DIR}/`)) {
    gitignoreContent += gitignoreEntry;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log(`  Updated: ${gitignorePath}`);
  }
}

function disable() {
  console.log('🔧 Disabling TinaCMS...');
  
  // Create disabled directory
  ensureDirectoryExists(DISABLED_DIR);
  
  // Move TinaCMS files
  let movedCount = 0;
  TINACMS_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      const dest = path.join(DISABLED_DIR, file);
      if (moveFile(file, dest)) {
        movedCount++;
      }
    }
  });
  
  // Create fallback files
  Object.entries(FALLBACK_FILES).forEach(([filePath, content]) => {
    createFallbackFile(filePath, content);
  });
  
  // Update build script
  updateBuildScript(true);
  
  // Update package.json scripts
  updatePackageJson(true);
  
  // Update navigation data
  updateNavigationData(true);
  
  // Update gitignore
  updateGitignore();
  
  console.log(`✅ TinaCMS disabled successfully!`);
  console.log(`   Moved ${movedCount} files to ${DISABLED_DIR}/`);
  console.log(`   Created fallback files`);
  console.log(`   Updated build script to skip TinaCMS`);
  console.log(`   Updated .gitignore`);
  console.log('');
  console.log('To re-enable: node scripts/toggle-tinacms.js enable');
}

function enable() {
  console.log('🔧 Re-enabling TinaCMS...');
  
  if (!fs.existsSync(DISABLED_DIR)) {
    console.log('❌ No disabled files found. TinaCMS may already be enabled.');
    return;
  }
  
  // Restore TinaCMS files
  let restoredCount = 0;
  TINACMS_FILES.forEach(file => {
    const src = path.join(DISABLED_DIR, file);
    if (fs.existsSync(src)) {
      if (moveFile(src, file)) {
        restoredCount++;
      }
    }
  });
  
  // Remove fallback files
  Object.keys(FALLBACK_FILES).forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`  Removed fallback: ${filePath}`);
    }
  });
  
  // Update build script
  updateBuildScript(false);
  
  // Update package.json scripts
  updatePackageJson(false);
  
  // Update navigation data
  updateNavigationData(false);
  
  // Clean up disabled directory if empty
  try {
    const remainingFiles = fs.readdirSync(DISABLED_DIR);
    if (remainingFiles.length === 0) {
      fs.rmdirSync(DISABLED_DIR);
      console.log(`  Removed empty directory: ${DISABLED_DIR}`);
    }
  } catch (error) {
    // Directory not empty or other error - ignore
  }
  
  console.log(`✅ TinaCMS re-enabled successfully!`);
  console.log(`   Restored ${restoredCount} files from ${DISABLED_DIR}/`);
  console.log(`   Removed fallback files`);
  console.log(`   Updated build script to include TinaCMS`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Commit changes');
  console.log('  2. Push to trigger new deployment');
  console.log('  3. Test authentication flow');
}

// Main execution
const command = process.argv[2];

if (command === 'disable') {
  disable();
} else if (command === 'enable') {
  enable();
} else {
  console.log('TinaCMS Toggle Script');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/toggle-tinacms.js disable  - Disable TinaCMS');
  console.log('  node scripts/toggle-tinacms.js enable   - Re-enable TinaCMS');
  console.log('');
  console.log('This script temporarily moves TinaCMS files to .tinacms-disabled/');
  console.log('and creates minimal fallbacks to prevent build failures.');
  process.exit(1);
}
