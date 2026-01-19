const fs = require('fs');
const path = require('path');

// Read all component files
function readComponentFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...readComponentFiles(fullPath));
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Convert TypeScript/JSX to plain JavaScript (basic conversion)
function convertToJS(content, filePath) {
  let js = content;
  
  // Remove TypeScript type annotations (basic)
  js = js.replace(/:\s*[A-Z][a-zA-Z0-9<>\[\]|&\s,{}?]*(\s*[=,;\)\]\}])/g, '$1');
  js = js.replace(/<[A-Z][a-zA-Z0-9<>\[\]|&\s,{}?]*>/g, '');
  js = js.replace(/export\s+(enum|interface|type)\s+\w+[^;]*;/g, '');
  js = js.replace(/export\s+enum\s+(\w+)\s*\{([^}]+)\}/g, (match, name, body) => {
    const entries = body.split(',').map(e => e.trim().split('=')[0].trim()).filter(Boolean);
    return `const ${name} = { ${entries.map((e, i) => `${e}: '${e}'`).join(', ')} };`;
  });
  
  // Handle imports - we'll inline everything
  js = js.replace(/import\s+.*?from\s+['"](.*?)['"];?/g, '');
  js = js.replace(/import\s+\{([^}]+)\}\s+from\s+['"](.*?)['"];?/g, '');
  js = js.replace(/import\s+(\w+)\s+from\s+['"](.*?)['"];?/g, '');
  
  // Handle exports
  js = js.replace(/export\s+default\s+/g, '');
  js = js.replace(/export\s+const\s+/g, 'const ');
  js = js.replace(/export\s+function\s+/g, 'function ');
  js = js.replace(/export\s+interface\s+\w+[^;{]*\{[^}]*\}/g, '');
  
  return js;
}

// Main bundling function
function bundleToHTML() {
  const rootDir = __dirname;
  const componentsDir = path.join(rootDir, 'components');
  const servicesDir = path.join(rootDir, 'services');
  
  // Read all files
  const componentFiles = readComponentFiles(componentsDir);
  const serviceFiles = readComponentFiles(servicesDir);
  
  // Read main files
  const typesContent = fs.readFileSync(path.join(rootDir, 'types.ts'), 'utf8');
  const appContent = fs.readFileSync(path.join(rootDir, 'App.tsx'), 'utf8');
  const indexContent = fs.readFileSync(path.join(rootDir, 'index.tsx'), 'utf8');
  
  // Convert and combine
  let allCode = '';
  
  // Add types
  allCode += convertToJS(typesContent, 'types.ts') + '\n\n';
  
  // Add services
  for (const file of serviceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    allCode += convertToJS(content, file) + '\n\n';
  }
  
  // Add components
  for (const file of componentFiles) {
    const content = fs.readFileSync(file, 'utf8');
    allCode += convertToJS(content, file) + '\n\n';
  }
  
  // Add App
  allCode += convertToJS(appContent, 'App.tsx') + '\n\n';
  
  // Add index
  allCode += convertToJS(indexContent, 'index.tsx') + '\n\n';
  
  // Create HTML template
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Windows XP & LimeWire Simulator Pro v2.7</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Verdana:wght@400;700&display=swap');
    body {
      font-family: 'Verdana', sans-serif;
      background-color: #2b4f6b;
      overflow: hidden;
      user-select: none;
    }
    .win-shadow {
      box-shadow: 4px 4px 15px rgba(0,0,0,0.5), inset 1px 1px 0 rgba(255,255,255,0.2);
    }
    .scrollbar-retro::-webkit-scrollbar {
      width: 16px;
      height: 16px;
    }
    .scrollbar-retro::-webkit-scrollbar-track {
      background: #e0e0e0;
      border-left: 1px solid #808080;
    }
    .scrollbar-retro::-webkit-scrollbar-thumb {
      background: #c0c0c0;
      border: 2px solid #e0e0e0;
      border-right-color: #404040;
      border-bottom-color: #404040;
    }
    body::after {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                  linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      z-index: 999999;
      background-size: 100% 3px, 3px 100%;
      pointer-events: none;
      opacity: 0.15;
    }
    ::selection {
      background: #000080;
      color: white;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slideUp 0.15s ease-out;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // Inline all code here
    ${allCode}
  </script>
</body>
</html>`;
  
  // Write HTML file
  fs.writeFileSync(path.join(rootDir, 'standalone.html'), html, 'utf8');
  console.log('Created standalone.html');
}

bundleToHTML();
