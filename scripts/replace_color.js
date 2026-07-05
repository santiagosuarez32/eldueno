const fs = require('fs');
const path = require('path');

const targetStr = /#ffe600/gi;
const replaceStr = '#FFFF33';
const searchDirs = ['app', 'src'];

function walkAndReplace(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.match(targetStr)) {
        const newContent = content.replace(targetStr, replaceStr);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

searchDirs.forEach(dir => walkAndReplace(path.join(__dirname, '..', dir)));
console.log("Color replacement complete.");
