const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define targets to convert and compress
const singleFiles = [
  { input: 'public/hero.jpeg', output: 'public/hero.webp' },
  { input: 'public/navbar.png', output: 'public/navbar.webp' },
  { input: 'public/og.webp', output: 'public/og.webp', isWebpSrc: true } // Needs special handling since src and dest are same
];

const directories = [
  'public/images',
  'public/services',
  'public/partners',
  'public/contact'
];

async function convertFile(inputPath, outputPath, isWebpSrc = false) {
  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping: ${inputPath} (does not exist)`);
    return;
  }

  try {
    let tempPath = outputPath;
    if (isWebpSrc) {
      tempPath = outputPath.replace('.webp', '_temp.webp');
    }

    // Convert to webp with quality 80
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(tempPath);

    if (isWebpSrc) {
      // Replace original file with optimized one
      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, outputPath);
    } else {
      // Delete original file if format changed
      fs.unlinkSync(inputPath);
    }

    const stats = fs.statSync(outputPath);
    const sizeInMB = stats.size / (1024 * 1024);
    console.log(`Converted: ${inputPath} -> ${outputPath} (${sizeInMB.toFixed(2)} MB)`);

    if (sizeInMB > 1.0) {
      console.warn(`WARNING: File ${outputPath} is larger than 1MB (${sizeInMB.toFixed(2)} MB). Re-compressing with quality 60...`);
      const retryTemp = outputPath.replace('.webp', '_retry.webp');
      await sharp(outputPath)
        .webp({ quality: 60 })
        .toFile(retryTemp);
      fs.unlinkSync(outputPath);
      fs.renameSync(retryTemp, outputPath);
      const retryStats = fs.statSync(outputPath);
      console.log(`Re-compressed: ${outputPath} -> ${retryStats.size / (1024 * 1024).toFixed(2)} MB`);
    }
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err);
  }
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist. Skipping...`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, path.basename(file, ext) + '.webp');
      await convertFile(inputPath, outputPath);
    }
  }
}

async function main() {
  console.log('Starting WebP conversion and optimization...');

  // Process single files
  for (const file of singleFiles) {
    await convertFile(file.input, file.output, file.isWebpSrc);
  }

  // Process directories
  for (const dir of directories) {
    console.log(`Processing directory: ${dir}`);
    await processDirectory(dir);
  }

  console.log('Image conversion and optimization complete!');
}

main();
