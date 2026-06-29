const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'services');

const images = ['correduria.jpeg', 'venta-propiedades.jpeg'];

async function processImages() {
  for (const file of images) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.jpeg', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 80 }) // Compress to webp at 80% quality
        .toFile(outputPath);
      console.log(`Successfully compressed ${file} to ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
