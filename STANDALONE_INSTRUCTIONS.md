# Creating a Standalone Single HTML File

This project has been set up to create a single standalone HTML file containing the entire Windows XP & LimeWire Simulator.

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build and create standalone HTML**:
   ```bash
   npm run build:standalone
   ```

   This will:
   - Build the project using Vite
   - Inline all JavaScript and CSS into a single HTML file
   - Create `standalone.html` in the project root

3. **Open the file**:
   - Simply open `standalone.html` in any modern web browser
   - No server required - it's completely self-contained!

## What Gets Created

The `standalone.html` file will contain:
- All React components (71+ files)
- All JavaScript code (bundled and minified)
- All CSS styles (inline)
- All dependencies (via CDN or inlined)
- The complete application

## File Size

The standalone HTML file will be approximately:
- **Development build**: ~2-3 MB
- **Production build** (minified): ~500 KB - 1 MB

## Manual Process

If the automated script doesn't work, you can manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the inline script:
   ```bash
   node inline-build.js
   ```

3. Or manually:
   - Open `dist/index.html`
   - Copy all content from `dist/assets/*.js` files into `<script>` tags
   - Copy all content from `dist/assets/*.css` files into `<style>` tags
   - Save as `standalone.html`

## Notes

- The standalone file requires an internet connection for:
  - Tailwind CSS (via CDN)
  - Google Fonts (Verdana)
  - External API calls (Gemini AI - requires API key)
  
- For a completely offline version, you would need to:
  - Download Tailwind CSS locally
  - Download fonts locally
  - Handle API key configuration differently

## Troubleshooting

If you encounter issues:

1. **Build fails**: Make sure all dependencies are installed (`npm install`)
2. **Script fails**: Check that `dist/` directory exists after building
3. **File too large**: This is normal - the project has 71+ component files
4. **API errors**: Make sure you have a valid Gemini API key set in your environment

## Alternative: Use Vite Plugin

You can also use `vite-plugin-singlefile` for a more robust solution:

```bash
npm install -D vite-plugin-singlefile
```

Then update `vite.config.ts` to use the plugin.
