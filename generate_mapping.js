const fs = require('fs');
const path = require('path');

const baseDir = './assets/images';
const mapping = {};

const traverse = (dir) => {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      // Normalize paths for React Native require
      const relPath = fullPath.replace(/\\/g, '/').replace('assets/images', '/images');
      mapping[relPath] = fullPath.replace(/\\/g, '/');
    }
  }
};

traverse(baseDir);

let out = 'export const productImages = {\n';
for (let k in mapping) {
  out += `  '${k}': require('../../${mapping[k]}'),\n`;
}
out += '};\n';

fs.mkdirSync('./src/utils', { recursive: true });
fs.writeFileSync('./src/utils/imageMapping.js', out);
console.log('Generated src/utils/imageMapping.js');
