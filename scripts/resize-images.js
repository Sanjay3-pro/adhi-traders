// Resize images and generate WebP versions
// Usage:
// 1) npm install sharp
// 2) node scripts/resize-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'images');
const outDir = path.join(srcDir, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const sizes = [400, 800];

async function processFile(file) {
  const name = path.parse(file).name;
  const input = path.join(srcDir, file);
  for (const w of sizes) {
    const outJpg = path.join(outDir, `${name}-${w}.jpg`);
    const outWebp = path.join(outDir, `${name}-${w}.webp`);
    await sharp(input)
      .resize({ width: w })
      .jpeg({ quality: 78 })
      .toFile(outJpg);
    await sharp(input)
      .resize({ width: w })
      .webp({ quality: 72 })
      .toFile(outWebp);
    console.log(`Wrote ${outJpg} and ${outWebp}`);
  }
}

async function run() {
  const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const f of files) {
    await processFile(f);
  }
  console.log('All done. Optimized images are in images/optimized/');
}

run().catch(err => { console.error(err); process.exit(1); });