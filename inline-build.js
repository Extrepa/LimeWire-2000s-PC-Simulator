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
    // Skip external URLs (http://, https://, //)
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      return match; // Keep external scripts as-is
    }
    
    // Handle relative paths - remove leading slash if present
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
    const scriptPath = path.join(distDir, cleanSrc);
    
    if (fs.existsSync(scriptPath)) {
      const scriptContent = fs.readFileSync(scriptPath, 'utf8');
      // Keep type="module" for ES modules, remove crossorigin and src attributes
      let scriptTag = match
        .replace(/crossorigin[^>]*/gi, '')
        .replace(/src=["'][^"']+["']/, '');
      
      // Ensure we have a proper script tag
      if (!scriptTag.includes('<script')) {
        scriptTag = '<script' + scriptTag;
      }
      
      // If it was a module script, keep it as module
      const wasModule = /type=["']module["']/gi.test(match);
      if (!wasModule && !scriptTag.includes('type=')) {
        scriptTag = scriptTag.replace('<script', '<script type="module"');
      }
      
      return scriptTag.replace('></script>', `>${scriptContent}</script>`);
    }
    console.warn(`Warning: Script not found: ${scriptPath}`);
    return match;
  });
  
  // Inline stylesheets - remove non-existent CSS files
  html = html.replace(linkRegex, (match, href) => {
    // Skip external URLs
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      return match; // Keep external stylesheets as-is
    }
    
    if (href.endsWith('.css')) {
      const cleanHref = href.startsWith('/') ? href.slice(1) : href;
      const cssPath = path.join(distDir, cleanHref);
      
      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        return `<style>${cssContent}</style>`;
      } else {
        // Remove the link tag if CSS file doesn't exist
        console.warn(`Warning: CSS not found: ${cssPath} - removing link tag`);
        return '';
      }
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
