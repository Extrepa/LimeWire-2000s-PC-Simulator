# Building a Standalone HTML File

To create a single HTML file containing the entire Windows XP & LimeWire Simulator:

## Option 1: Using Vite Build (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. The built files will be in the `dist/` directory. To create a single HTML file:
   - Copy `dist/index.html`
   - Inline the JavaScript from `dist/assets/*.js` into the HTML file
   - Inline the CSS from `dist/assets/*.css` into the HTML file

## Option 2: Using a Bundler Script

You can use tools like:
- `vite-plugin-singlefile` - Vite plugin to create single-file builds
- `webpack` with appropriate configuration
- `esbuild` to bundle everything

## Option 3: Manual Inlining

1. Build the project with `npm run build`
2. Read the generated files from `dist/`
3. Inline all `<script>` and `<link>` tags into a single HTML file

## Note

Due to the complexity of this project (71+ component files, TypeScript, React, external dependencies), creating a truly standalone single HTML file requires proper bundling. The project uses:
- React 19
- TypeScript/TSX
- Multiple external dependencies (lucide-react, @google/genai)
- ES modules

A single HTML file would be very large (likely 1-2MB+ minified) but is achievable with proper bundling.
