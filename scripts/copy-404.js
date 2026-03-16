const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const notFoundPath = path.join(buildDir, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Copied index.html to 404.html for GitHub Pages SPA fallback.');
} else {
  console.warn('build/index.html not found; skipping 404.html copy.');
}
