import fs from 'fs';
import path from 'path';



/**
 * Navigation Generation Script
 * 
 * This script automatically scans the app directory structure and generates
 * navigation-data.json based on the Next.js App Router file structure.
 * 
 * Features:
 * - Automatically detects routes with page.tsx files
 * - Handles nested routes (subdirectories)
 * - Formats labels from directory names
 * - Comprehensive error handling and logging
 * - File verification to prevent silent failures
 * - Exits with error code on failure to fail builds
 * 
 * Usage:
 * - npm run generate-nav (manual generation)
 * - npm run prebuild (automatic before builds)
 * - npm run dev (automatic in development)
 */

function formatLabel(segment) {
  return segment
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function scanAppDirectory(appDir) {
  const navigation = [];
  
  try {
    const entries = fs.readdirSync(appDir, { withFileTypes: true });
    console.log(`📂 Found ${entries.length} entries in app directory`);
    
    const routeDirs = entries.filter(entry => {
      if (!entry.isDirectory()) return false;
      
      // Skip special Next.js directories and files
      if (['api', 'globals.css', 'layout.tsx', 'page.tsx', 'favicon.ico', 'components', 'lib'].includes(entry.name)) {
        return false;
      }
      
      const dirPath = path.join(appDir, entry.name);
      const hasPageFile = fs.existsSync(path.join(dirPath, 'page.tsx'));
      
      if (hasPageFile) {
        console.log(`  ✓ Found route: ${entry.name}`);
      }
      
      return hasPageFile;
    });
    
    console.log(`🎯 Processing ${routeDirs.length} route directories`);
    
    for (const dir of routeDirs) {
      const dirPath = path.join(appDir, dir.name);
      const routePath = `/${dir.name}`;
      
      try {
        const subEntries = fs.readdirSync(dirPath, { withFileTypes: true });
        const subRoutes = subEntries
          .filter(subEntry => {
            if (!subEntry.isDirectory()) return false;
            const subDirPath = path.join(dirPath, subEntry.name);
            return fs.existsSync(path.join(subDirPath, 'page.tsx'));
          })
          .map(subEntry => ({
            label: formatLabel(subEntry.name),
            href: `${routePath}/${subEntry.name}`
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        
        const menuGroup = {
          label: formatLabel(dir.name),
          href: routePath,
        };
        
        if (subRoutes.length > 0) {
          menuGroup.items = subRoutes;
          console.log(`  └─ ${subRoutes.length} sub-routes for ${dir.name}`);
        }
        
        navigation.push(menuGroup);
      } catch (error) {
        console.error(`❌ Error processing directory ${dir.name}:`, error.message);
        // Continue with other directories
      }
    }
    
    // Sort main navigation items
    navigation.sort((a, b) => a.label.localeCompare(b.label));
    
    // Add Home at the beginning
    navigation.unshift({ label: "Home", href: "/" });
    
    return navigation;
  } catch (error) {
    console.error('❌ Error scanning app directory:', error);
    throw error; // Re-throw to be caught by generateNavigation
  }
}

function compareNavigation(previousNav, currentNav) {
  const changes = {
    added: [],
    removed: [],
    modified: []
  };
  
  // Create maps for easier comparison
  const prevMap = new Map();
  const currMap = new Map();
  
  // Build previous navigation map
  previousNav.forEach(route => {
    prevMap.set(route.href, {
      ...route,
      children: route.items ? new Set(route.items.map(item => item.href)) : new Set()
    });
  });
  
  // Build current navigation map
  currentNav.forEach(route => {
    currMap.set(route.href, {
      ...route,
      children: route.items ? new Set(route.items.map(item => item.href)) : new Set()
    });
  });
  
  // Check for added and modified routes
  currMap.forEach((currentRoute, href) => {
    const prevRoute = prevMap.get(href);
    
    if (!prevRoute) {
      changes.added.push({
        type: 'route',
        label: currentRoute.label,
        href: currentRoute.href,
        children: currentRoute.items || []
      });
    } else {
      // Check for child route changes
      const addedChildren = [...currentRoute.children].filter(child => !prevRoute.children.has(child));
      const removedChildren = [...prevRoute.children].filter(child => !currentRoute.children.has(child));
      
      if (addedChildren.length > 0 || removedChildren.length > 0) {
        changes.modified.push({
          type: 'route',
          label: currentRoute.label,
          href: currentRoute.href,
          addedChildren: addedChildren,
          removedChildren: removedChildren
        });
      }
    }
  });
  
  // Check for removed routes
  prevMap.forEach((prevRoute, href) => {
    if (!currMap.has(href)) {
      changes.removed.push({
        type: 'route',
        label: prevRoute.label,
        href: prevRoute.href,
        children: prevRoute.items || []
      });
    }
  });
  
  return changes;
}

function logNavigationChanges(changes) {
  const hasChanges = changes.added.length > 0 || changes.removed.length > 0 || changes.modified.length > 0;
  
  if (!hasChanges) {
    console.log('🔄 No navigation changes detected');
    return;
  }
  
  console.log('\n📊 NAVIGATION CHANGES DETECTED:');
  console.log('=====================================');
  
  if (changes.added.length > 0) {
    console.log(`\n🟢 ADDED ROUTES (${changes.added.length}):`);
    changes.added.forEach(change => {
      console.log(`  + ${change.label}: ${change.href}`);
      if (change.children.length > 0) {
        change.children.forEach(child => {
          console.log(`    └─ + ${child.label}: ${child.href}`);
        });
      }
    });
  }
  
  if (changes.removed.length > 0) {
    console.log(`\n🔴 REMOVED ROUTES (${changes.removed.length}):`);
    changes.removed.forEach(change => {
      console.log(`  - ${change.label}: ${change.href}`);
      if (change.children.length > 0) {
        change.children.forEach(child => {
          console.log(`    └─ - ${child.label}: ${child.href}`);
        });
      }
    });
  }
  
  if (changes.modified.length > 0) {
    console.log(`\n🟡 MODIFIED ROUTES (${changes.modified.length}):`);
    changes.modified.forEach(change => {
      console.log(`  ~ ${change.label}: ${change.href}`);
      if (change.addedChildren.length > 0) {
        change.addedChildren.forEach(child => {
          console.log(`    └─ + ${child}`);
        });
      }
      if (change.removedChildren.length > 0) {
        change.removedChildren.forEach(child => {
          console.log(`    └─ - ${child}`);
        });
      }
    });
  }
  
  console.log('\n=====================================\n');
}

function generateNavigation() {
  try {
    const appDir = path.join(process.cwd(), 'app');
    
    // Verify app directory exists
    if (!fs.existsSync(appDir)) {
      throw new Error(`App directory not found: ${appDir}`);
    }
    
    console.log(`🔍 Scanning app directory: ${appDir}`);
    const navigation = scanAppDirectory(appDir);
    
    const outputPath = path.join(process.cwd(), 'app', 'lib', 'navigation-data.json');
    
    // Ensure lib directory exists
    const libDir = path.dirname(outputPath);
    if (!fs.existsSync(libDir)) {
      console.log(`📁 Creating lib directory: ${libDir}`);
      fs.mkdirSync(libDir, { recursive: true });
    }
    
    // Load previous navigation for comparison
    let previousNavigation = [];
    let isFirstGeneration = false;
    
    try {
      if (fs.existsSync(outputPath)) {
        const previousData = fs.readFileSync(outputPath, 'utf8');
        previousNavigation = JSON.parse(previousData);
        console.log(`📖 Loaded previous navigation: ${previousNavigation.length} routes`);
      } else {
        isFirstGeneration = true;
        console.log('📖 No previous navigation file found - first generation');
      }
    } catch (error) {
      console.log(`⚠️  Could not load previous navigation: ${error.message}`);
      isFirstGeneration = true;
    }
    
    // Compare with previous navigation
    if (!isFirstGeneration) {
      const changes = compareNavigation(previousNavigation, navigation);
      logNavigationChanges(changes);
    }
    
    // Write with proper error handling
    const navigationJson = JSON.stringify(navigation, null, 2);
    fs.writeFileSync(outputPath, navigationJson, 'utf8');
    
    // Verify the file was written correctly
    const writtenData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    if (writtenData.length !== navigation.length) {
      throw new Error(`File verification failed: expected ${navigation.length} routes, got ${writtenData.length}`);
    }
    
    console.log(`✅ Navigation generated successfully: ${navigation.length} routes found`);
    console.log(`📄 Written to: ${outputPath}`);
    console.log(`✅ File verification passed`);
    
    // Log the routes for debugging
    console.log('📋 Generated routes:');
    navigation.forEach(route => {
      console.log(`  - ${route.label}: ${route.href}`);
      if (route.items) {
        route.items.forEach(item => {
          console.log(`    └─ ${item.label}: ${item.href}`);
        });
      }
    });
    
    return navigation;
  } catch (error) {
    console.error('❌ Error generating navigation:', error.message);
    console.error(error.stack);
    process.exit(1); // Exit with error code to fail the build
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateNavigation();
}

export { generateNavigation };
