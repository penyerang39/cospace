const fs = require('fs');
const path = require('path');

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
    
    const routeDirs = entries.filter(entry => {
      if (!entry.isDirectory()) return false;
      
      // Skip special Next.js directories and files
      if (['api', 'globals.css', 'layout.tsx', 'page.tsx', 'favicon.ico', 'components', 'lib'].includes(entry.name)) {
        return false;
      }
      
      const dirPath = path.join(appDir, entry.name);
      const hasPageFile = fs.existsSync(path.join(dirPath, 'page.tsx'));
      
      return hasPageFile;
    });
    
    for (const dir of routeDirs) {
      const dirPath = path.join(appDir, dir.name);
      const routePath = `/${dir.name}`;
      
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
      }
      
      navigation.push(menuGroup);
    }
    
    // Sort main navigation items
    navigation.sort((a, b) => a.label.localeCompare(b.label));
    
    // Add Home at the beginning
    navigation.unshift({ label: "Home", href: "/" });
    
    return navigation;
  } catch (error) {
    console.error('Error scanning app directory:', error);
    return [{ label: "Home", href: "/" }];
  }
}

function generateNavigation() {
  const appDir = path.join(process.cwd(), 'app');
  const navigation = scanAppDirectory(appDir);
  
  const outputPath = path.join(process.cwd(), 'app', 'lib', 'navigation-data.json');
  
  // Ensure lib directory exists
  const libDir = path.dirname(outputPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(navigation, null, 2));
  console.log(`✅ Navigation generated: ${navigation.length} routes found`);
  
  return navigation;
}

// Run if called directly
if (require.main === module) {
  generateNavigation();
}

module.exports = { generateNavigation };
