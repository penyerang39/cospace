const fs = require('fs');
const path = require('path');

/**
 * Markdown scraper that converts markdown files to React components
 * Handles headers, lists, links, bold, italic, and other common markdown elements
 */

class MarkdownScraper {
  constructor() {
    this.legalDir = path.join(process.cwd(), 'public', 'legal');
    this.outputDir = path.join(process.cwd(), 'app', 'legal');
  }

  /**
   * Parse markdown content and convert to React JSX
   */
  parseMarkdown(content) {
    let lines = content.split('\n');
    let jsx = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let listItems = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Handle code blocks
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          jsx.push(`<pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code>${codeBlockContent.join('\n')}</code></pre>`);
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
          if (listItems.length > 0) {
            jsx.push(this.renderList(listItems));
            listItems = [];
            inList = false;
          }
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headers
      if (trimmedLine.startsWith('#')) {
        if (listItems.length > 0) {
          jsx.push(this.renderList(listItems));
          listItems = [];
          inList = false;
        }

        const level = trimmedLine.match(/^#+/)[0].length;
        const text = trimmedLine.replace(/^#+\s*/, '');
        const processedText = this.processInlineFormatting(text);
        
        const className = this.getHeaderClassName(level);
        jsx.push(`<h${level} className="${className}">${processedText}</h${level}>`);
        continue;
      }

      // Handle list items
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        if (!inList) {
          if (jsx.length > 0) {
            jsx.push('<br />');
          }
          inList = true;
        }
        
        const listText = trimmedLine.replace(/^[-*]\s+/, '');
        const processedText = this.processInlineFormatting(listText);
        listItems.push(processedText);
        continue;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (!inList) {
          if (jsx.length > 0) {
            jsx.push('<br />');
          }
          inList = true;
        }
        
        const listText = trimmedLine.replace(/^\d+\.\s+/, '');
        const processedText = this.processInlineFormatting(listText);
        listItems.push(processedText);
        continue;
      }

      // Handle indented list items (sub-items)
      if (trimmedLine.startsWith('    - ') || trimmedLine.startsWith('    * ') || /^\s{4}\d+\.\s/.test(trimmedLine)) {
        if (!inList) {
          if (jsx.length > 0) {
            jsx.push('<br />');
          }
          inList = true;
        }
        
        const listText = trimmedLine.replace(/^\s*[-*]\s+/, '').replace(/^\s*\d+\.\s+/, '');
        const processedText = this.processInlineFormatting(listText);
        listItems.push(processedText);
        continue;
      }

      // Handle regular paragraphs
      if (trimmedLine) {
        if (listItems.length > 0) {
          jsx.push(this.renderList(listItems));
          listItems = [];
          inList = false;
        }

        const processedText = this.processInlineFormatting(trimmedLine);
        jsx.push(`<p className="mb-4 leading-relaxed">${processedText}</p>`);
      } else {
        // Empty line
        if (listItems.length > 0) {
          jsx.push(this.renderList(listItems));
          listItems = [];
          inList = false;
        }
        jsx.push('<br />');
      }
    }

    // Handle any remaining list items
    if (listItems.length > 0) {
      jsx.push(this.renderList(listItems));
    }

    return jsx.join('\n');
  }

  /**
   * Process inline formatting (bold, italic, links)
   */
  processInlineFormatting(text) {
    // Handle bold text **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold">$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong className="font-semibold">$1</strong>');
    
    // Handle italic text *text* or _text_
    text = text.replace(/\*(.*?)\*/g, '<em className="italic">$1</em>');
    text = text.replace(/_(.*?)_/g, '<em className="italic">$1</em>');
    
    // Handle links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
    
    // Handle email addresses
    text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" className="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
    
    return text;
  }

  /**
   * Get CSS classes for headers based on level
   */
  getHeaderClassName(level) {
    const baseClasses = 'font-bold text-gray-900 dark:text-white mb-4 mt-6';
    
    switch (level) {
      case 1:
        return `${baseClasses} text-3xl`;
      case 2:
        return `${baseClasses} text-2xl`;
      case 3:
        return `${baseClasses} text-xl`;
      case 4:
        return `${baseClasses} text-lg`;
      case 5:
        return `${baseClasses} text-base`;
      case 6:
        return `${baseClasses} text-sm`;
      default:
        return `${baseClasses} text-lg`;
    }
  }

  /**
   * Render list items as JSX
   */
  renderList(items) {
    return `<ul className="list-disc list-inside mb-6 space-y-3 pl-4">
      ${items.map(item => `<li className="text-gray-700 dark:text-gray-300 leading-relaxed">${item}</li>`).join('')}
    </ul>`;
  }

  /**
   * Generate React component from markdown content
   */
  generateReactComponent(content, title) {
    const jsx = this.parseMarkdown(content);
    
    return `import React from 'react';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        ${jsx}
      </div>
    </main>
  );
}`;
  }

  /**
   * Process all legal markdown files
   */
  async processLegalFiles() {
    const fileMappings = {
      'PrivacyPolicy.md': 'privacy/page.tsx',
      'TOS.md': 'terms/page.tsx',
      'Agreement.md': 'subscription/page.tsx',
      'Disclaimer.md': 'acceptable-use/page.tsx'
    };

    for (const [mdFile, outputPath] of Object.entries(fileMappings)) {
      try {
        const mdPath = path.join(this.legalDir, mdFile);
        const outputFilePath = path.join(this.outputDir, outputPath);
        
        if (!fs.existsSync(mdPath)) {
          console.warn(`Markdown file not found: ${mdFile}`);
          continue;
        }

        if (!fs.existsSync(outputFilePath)) {
          console.warn(`Output file not found: ${outputPath}`);
          continue;
        }

        const content = fs.readFileSync(mdPath, 'utf8');
        const title = mdFile.replace('.md', '');
        const reactComponent = this.generateReactComponent(content, title);
        
        fs.writeFileSync(outputFilePath, reactComponent);
        console.log(`Updated: ${outputPath}`);
        
      } catch (error) {
        console.error(`Error processing ${mdFile}:`, error.message);
      }
    }
  }

  /**
   * Update the main legal page with links to all legal documents
   */
  async updateMainLegalPage() {
    const mainLegalPage = `import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Legal Documents</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Use
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Terms and conditions for using our services.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/subscription" className="hover:text-blue-600 dark:hover:text-blue-400">
                Subscription Agreement
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed terms for our subscription services.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/acceptable-use" className="hover:text-blue-600 dark:hover:text-blue-400">
                Acceptable Use Policy
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Guidelines for acceptable use of our platform.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}`;

    const mainLegalPath = path.join(this.outputDir, 'page.tsx');
    fs.writeFileSync(mainLegalPath, mainLegalPage);
    console.log('Updated main legal page');
  }

  /**
   * Run the complete scraping process
   */
  async run() {
    console.log('Starting markdown scraping process...');
    
    try {
      await this.processLegalFiles();
      await this.updateMainLegalPage();
      console.log('Markdown scraping completed successfully!');
    } catch (error) {
      console.error('Error during markdown scraping:', error);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const scraper = new MarkdownScraper();
  scraper.run();
}

module.exports = MarkdownScraper;
