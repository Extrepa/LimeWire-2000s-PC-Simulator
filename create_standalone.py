#!/usr/bin/env python3
"""
Bundles the Windows XP & LimeWire Simulator into a single HTML file.
This script reads all TypeScript/TSX files and creates a standalone HTML.
"""

import os
import re
import json
from pathlib import Path

def read_file(filepath):
    """Read a file and return its content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return ""

def get_all_files(directory, extensions=('.tsx', '.ts')):
    """Recursively get all files with given extensions."""
    files = []
    for root, dirs, filenames in os.walk(directory):
        # Skip node_modules and other build directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', 'dist', '.git']]
        for filename in filenames:
            if any(filename.endswith(ext) for ext in extensions):
                files.append(os.path.join(root, filename))
    return sorted(files)

def convert_imports_to_inline(content, file_map):
    """Convert import statements to variable references (simplified)."""
    # This is a simplified version - a full implementation would need
    # proper AST parsing and dependency resolution
    lines = content.split('\n')
    result = []
    imports = []
    
    for line in lines:
        # Skip import statements (we'll handle them separately)
        if line.strip().startswith('import '):
            # Extract what's being imported
            match = re.match(r"import\s+(.+?)\s+from\s+['\"](.+?)['\"]", line)
            if match:
                imports.append((match.group(1), match.group(2)))
            continue
        result.append(line)
    
    return '\n'.join(result), imports

def create_standalone_html():
    """Create a standalone HTML file with all code bundled."""
    root_dir = Path(__file__).parent
    
    # Get all source files
    components_dir = root_dir / 'components'
    services_dir = root_dir / 'services'
    
    component_files = get_all_files(str(components_dir))
    service_files = get_all_files(str(services_dir))
    main_files = [
        root_dir / 'types.ts',
        root_dir / 'App.tsx',
        root_dir / 'index.tsx'
    ]
    
    # Create file map for dependency resolution
    all_files = {}
    for f in component_files + service_files:
        if os.path.exists(f):
            all_files[f] = read_file(f)
    for f in main_files:
        if f.exists():
            all_files[str(f)] = read_file(f)
    
    # Read the original index.html for styling
    index_html = root_dir / 'index.html'
    html_template = read_file(index_html) if index_html.exists() else ""
    
    # Create the bundled code
    bundled_code = []
    
    # Add types first
    if (root_dir / 'types.ts').exists():
        bundled_code.append("// types.ts")
        bundled_code.append(read_file(root_dir / 'types.ts'))
        bundled_code.append("")
    
    # Add services
    for service_file in sorted(service_files):
        bundled_code.append(f"// {os.path.basename(service_file)}")
        bundled_code.append(read_file(service_file))
        bundled_code.append("")
    
    # Add components
    for component_file in sorted(component_files):
        bundled_code.append(f"// {os.path.basename(component_file)}")
        bundled_code.append(read_file(component_file))
        bundled_code.append("")
    
    # Add App
    if (root_dir / 'App.tsx').exists():
        bundled_code.append("// App.tsx")
        bundled_code.append(read_file(root_dir / 'App.tsx'))
        bundled_code.append("")
    
    # Add index
    if (root_dir / 'index.tsx').exists():
        bundled_code.append("// index.tsx")
        bundled_code.append(read_file(root_dir / 'index.tsx'))
        bundled_code.append("")
    
    # Create the HTML
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Windows XP & LimeWire Simulator Pro v2.7</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Verdana:wght@400;700&display=swap');
    body {{
      font-family: 'Verdana', sans-serif;
      background-color: #2b4f6b;
      overflow: hidden;
      user-select: none;
    }}
    .win-shadow {{
      box-shadow: 4px 4px 15px rgba(0,0,0,0.5), inset 1px 1px 0 rgba(255,255,255,0.2);
    }}
    .scrollbar-retro::-webkit-scrollbar {{
      width: 16px;
      height: 16px;
    }}
    .scrollbar-retro::-webkit-scrollbar-track {{
      background: #e0e0e0;
      border-left: 1px solid #808080;
    }}
    .scrollbar-retro::-webkit-scrollbar-thumb {{
      background: #c0c0c0;
      border: 2px solid #e0e0e0;
      border-right-color: #404040;
      border-bottom-color: #404040;
    }}
    body::after {{
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
    }}
    ::selection {{
      background: #000080;
      color: white;
    }}
    @keyframes slideUp {{
      from {{ transform: translateY(100%); }}
      to {{ transform: translateY(0); }}
    }}
    .animate-slide-up {{
      animation: slideUp 0.15s ease-out;
    }}
  </style>
  <script type="importmap">
  {{
    "imports": {{
      "react": "https://esm.sh/react@19.2.3",
      "react-dom": "https://esm.sh/react-dom@19.2.3",
      "react/jsx-runtime": "https://esm.sh/react@19.2.3/jsx-runtime",
      "lucide-react": "https://esm.sh/lucide-react@0.562.0",
      "@google/genai": "https://esm.sh/@google/genai@1.34.0"
    }}
  }}
  </script>
</head>
<body>
  <div id="root"></div>
  <div id="loading" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 18px; text-align: center;">
    <div>Loading Windows XP Simulator...</div>
    <div style="font-size: 12px; margin-top: 10px; opacity: 0.7;">This may take a moment on first load</div>
  </div>
  
  <script type="module">
    // Note: This creates a single HTML file, but due to the complexity of the project,
    // it still uses ES modules from CDN. For a truly self-contained file, you would need
    // to use a bundler like Vite, Webpack, or esbuild to create a single bundled JavaScript file.
    
    // The code below loads the application using ES modules
    // To create a truly standalone file, run: npm run build, then inline the dist output
    
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    
    // Import the main app (this would need to be the bundled version)
    // For now, we'll provide instructions
    document.getElementById('loading').innerHTML = `
      <div style="max-width: 500px;">
        <h2 style="margin-bottom: 20px;">To create a standalone HTML file:</h2>
        <ol style="text-align: left; line-height: 1.8;">
          <li>Install dependencies: <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">npm install</code></li>
          <li>Build the project: <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">npm run build</code></li>
          <li>Copy the contents of <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">dist/index.html</code> and <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">dist/assets/*.js</code></li>
          <li>Inline the JavaScript into the HTML file</li>
        </ol>
        <p style="margin-top: 20px; font-size: 11px; opacity: 0.8;">
          Alternatively, use a bundler like esbuild or webpack to create a single bundle.
        </p>
      </div>
    `;
  </script>
</body>
</html>"""
    
    # Write the HTML file
    output_file = root_dir / 'standalone.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Created {output_file}")
    print(f"Note: This is a template. For a truly standalone file, you need to:")
    print("  1. Build the project with: npm run build")
    print("  2. Inline the bundled JavaScript from dist/ into the HTML")

if __name__ == '__main__':
    create_standalone_html()
