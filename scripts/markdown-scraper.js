import fs from 'fs';
import path from 'path';



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
   * Clean and normalize raw HTML so it is safe and consistent for React rendering
   * NOTE: This is a light normalizer, not a full sanitizer. Source is trusted repo content.
   */
  processHtml(rawHtml) {
    if (!rawHtml) return '';

    // Strip outer wrappers and unwanted nodes from Word-exported HTML
    let html = rawHtml
      // Remove DOCTYPE
      .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Drop <style> blocks
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
      // Drop <script> blocks
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      // Remove entire <head> section
      .replace(/<head[\s\S]*?>[\s\S]*?<\/head>/gi, '')
      // Keep only body innerHTML when present
      .replace(/^[\s\S]*?<body[^>]*>/i, '')
      .replace(/<\/body>[\s\S]*$/i, '')
      // Remove any remaining html tags
      .replace(/<\/?html[^>]*>/gi, '')
      // Strip inline styles to enforce design system (double and single quoted)
      .replace(/\sstyle=\"[^\"]*\"/gi, '')
      .replace(/\sstyle='[^']*'/gi, '')
      // Normalize bold/italic tags
      .replace(/<b>/gi, '<strong>')
      .replace(/<\/b>/gi, '</strong>')
      .replace(/<i>/gi, '<em>')
      .replace(/<\/i>/gi, '</em>')
      // Remove empty spans often present in exported HTML
      .replace(/<span>(\s|&nbsp;)*<\/span>/gi, '')
      // Convert non-breaking spaces to regular spaces
      .replace(/&nbsp;/g, ' ')
      // Remove target/rel attributes from links
      .replace(/\s(target|rel)\=\"[^\"]*\"/gi, '')
      .replace(/\s(target|rel)='[^']*'/gi, '')
      // Remove MS Word/Office specific attributes and classes (quoted and unquoted)
      .replace(/\s(xmlns|lang|xml:lang|v:|o:|w:)[^=]*=\"[^\"]*\"/gi, '')
      .replace(/\s(xmlns|lang|xml:lang|v:|o:|w:)[^=]*='[^']*'/gi, '')
      .replace(/\sclass=\"Mso[^\"]*\"/gi, '')
      .replace(/\sclass='Mso[^']*'/gi, '')
      .replace(/\sclass=Mso[^\s>]+/gi, '')
      .replace(/\sclass=WordSection1/gi, '')
      // Ensure mailto links remain intact if plain emails are present
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href=\"mailto:$1\">$1</a>');

    // Add Tailwind classes to common elements if missing (light-touch)
    // Headings spacing
    html = html.replace(/<h(\d)([^>]*)>/gi, (m, lvl, attrs) => {
      const level = Number(lvl);
      const className = this.getHeaderClassName(level);
      // merge class if exists
      if (/class=\"/.test(attrs)) {
        return `<h${level}${attrs.replace(/class=\"([^\"]*)\"/, `class=\"$1 ${className}\"`)}>`;
      }
      return `<h${level} class=\"${className}\"${attrs}>`;
    });

    // Lists spacing
    html = html.replace(/<ul(\s[^>]*)?>/gi, (m, attrs = '') => {
      const cls = 'list-disc list-inside mb-6 space-y-3 pl-4';
      if (/class=\"/.test(attrs)) {
        return `<ul${attrs.replace(/class=\"([^\"]*)\"/, `class=\"$1 ${cls}\"`)}>`;
      }
      return `<ul class=\"${cls}\"${attrs}>`;
    });

    html = html.replace(/<ol(\s[^>]*)?>/gi, (m, attrs = '') => {
      const cls = 'list-decimal list-inside mb-6 space-y-3 pl-4';
      if (/class=\"/.test(attrs)) {
        return `<ol${attrs.replace(/class=\"([^\"]*)\"/, `class=\"$1 ${cls}\"`)}>`;
      }
      return `<ol class=\"${cls}\"${attrs}>`;
    });

    // Paragraph spacing
    html = html.replace(/<p(\s[^>]*)?>/gi, (m, attrs = '') => {
      const cls = 'mb-4 leading-relaxed';
      if (/class=\"/.test(attrs)) {
        return `<p${attrs.replace(/class=\"([^\"]*)\"/, `class=\"$1 ${cls}\"`)}>`;
      }
      return `<p class=\"${cls}\"${attrs}>`;
    });

    // Link styling
    html = html.replace(/<a(\s[^>]*)?>/gi, (m, attrs = '') => {
      const cls = 'text-blue-600 dark:text-blue-400 hover:underline';
      if (/class=\"/.test(attrs)) {
        return `<a${attrs.replace(/class=\"([^\"]*)\"/, `class=\"$1 ${cls}\"`)}>`;
      }
      return `<a class=\"${cls}\"${attrs}>`;
    });

    return html;
  }

  /**
   * Generate a React component that renders provided HTML safely within our styled container
   */
  generateReactHtmlComponent(processedHtml) {
    const inlined = JSON.stringify(processedHtml);
    return `import React from 'react';

export default function Page() {
  return (
    <main className=\"max-w-4xl mx-auto px-6 py-8\">\n      <div className=\"prose prose-lg dark:prose-invert max-w-none\" dangerouslySetInnerHTML={{ __html: ${inlined} }} />\n    </main>
  );
}`;
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
  generateReactComponent(content) {
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
   * Process all legal files (prefer HTML, fallback to Markdown)
   */
  async processLegalFiles() {
    const fileMappings = [
      {
        // Privacy Policy
        html: 'Neo14 Privacy Policy.html',
        md: 'PrivacyPolicy.md',
        out: 'privacy/page.tsx'
      },
      {
        // Terms of Use
        html: 'Neo14 Terms of Use.html',
        md: 'TOS.md',
        out: 'terms/page.tsx'
      },
      {
        // Subscription Agreement
        html: 'Neo 14 Subscription Agreement.html',
        md: 'Agreement.md',
        out: 'subscription/page.tsx'
      },
      {
        // Disclaimer and AUP
        html: 'Neo14 Disclaimer and AUP.html',
        md: 'Disclaimer.md',
        out: 'acceptable-use/page.tsx'
      }
    ];

    for (const mapping of fileMappings) {
      const outputFilePath = path.join(this.outputDir, mapping.out);
      if (!fs.existsSync(outputFilePath)) {
        console.warn(`Output file not found: ${mapping.out}`);
        continue;
      }

      // Prefer HTML
      const htmlPath = path.join(this.legalDir, mapping.html);
      const mdPath = path.join(this.legalDir, mapping.md);

      try {
        if (fs.existsSync(htmlPath)) {
          const rawHtml = fs.readFileSync(htmlPath, 'utf8');
          const processedHtml = this.processHtml(rawHtml);
          const component = this.generateReactHtmlComponent(processedHtml);
          fs.writeFileSync(outputFilePath, component);
          console.log(`Updated from HTML: ${mapping.out}`);
          continue;
        }

        // Fallback to Markdown
        if (fs.existsSync(mdPath)) {
          const mdContent = fs.readFileSync(mdPath, 'utf8');
          const component = this.generateReactComponent(mdContent, mapping.md.replace('.md', ''));
          fs.writeFileSync(outputFilePath, component);
          console.log(`Updated from MD: ${mapping.out}`);
          continue;
        }

        console.warn(`No source found for ${mapping.out}`);
      } catch (error) {
        console.error(`Error processing ${mapping.out}:`, error.message);
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
    console.log('Starting legal content generation (HTML preferred, MD fallback)...');
    
    try {
      await this.processLegalFiles();
      await this.updateMainLegalPage();
      console.log('Legal content generation completed successfully!');
    } catch (error) {
      console.error('Error during markdown scraping:', error);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const scraper = new MarkdownScraper();
  scraper.run();
}

export default MarkdownScraper;
