#!/usr/bin/env node
/**
 * Script to inline Vite build output into a single HTML file
 * Usage: node inline-build.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function inlineBuild() {
  const distDir = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist/ directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  // Read index.html
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found.');
    process.exit(1);
  }
  
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Find all script and link tags (including type="module")
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
  const linkRegex = /<link[^>]*href=["']([^"']+)["'][^>]*>/gi;
  
  // Inline scripts
  html = html.replace(scriptRegex, (match, src) => {
    // Handle relative paths
    const scriptPath = path.join(distDir, src.startsWith('/') ? src.slice(1) : src);
    if (fs.existsSync(scriptPath)) {
      const scriptContent = fs.readFileSync(scriptPath, 'utf8');
      // Remove type="module" if present, as we're inlining
      const scriptTag = match.replace(/type=["']module["']/gi, '').replace(/src=["'][^"']+["']/, '');
      return scriptTag.replace('></script>', `>${scriptContent}</script>`);
    }
    console.warn(`Warning: Script not found: ${scriptPath}`);
    return match;
  });
  
  // Inline stylesheets
  html = html.replace(linkRegex, (match, href) => {
    if (href.endsWith('.css')) {
      const cssPath = path.join(distDir, href.startsWith('/') ? href.slice(1) : href);
      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        return `<style>${cssContent}</style>`;
      }
      console.warn(`Warning: CSS not found: ${cssPath}`);
    }
    return match;
  });
  
  // Write standalone HTML
  const outputPath = path.join(__dirname, 'standalone.html');
  fs.writeFileSync(outputPath, html, 'utf8');
  
  console.log(`✅ Created standalone.html (${(html.length / 1024).toFixed(2)} KB)`);
  console.log('You can now open standalone.html in a browser!');
}

inlineBuild();
