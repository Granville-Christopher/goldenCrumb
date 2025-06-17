const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'img');
const outputDir = path.join(__dirname, 'img-webp');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, path.basename(file, ext) + '.webp');

      sharp(inputFile)
        .webp({ quality: 80 })
        .toFile(outputFile)
        .then(() => {
          console.log(`Converted ${file} to WebP.`);
        })
        .catch(err => {
          console.error(`Error converting ${file}:`, err);
        });
    }
  });
});
